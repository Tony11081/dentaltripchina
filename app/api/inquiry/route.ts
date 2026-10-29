import { NextResponse } from "next/server";
import { z } from "zod";
import { mailerReady, sendMail } from "@/lib/mailer";
import { companyProfile } from "@/data/company-profile";
import { notifyLead, saveLead } from "@/lib/lead-store";

const MAX_FILES = 3;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif"
]);

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  whatsapp: z
    .string()
    .optional()
    .transform((value) => (value || "").trim())
    .refine((value) => !value || value.replace(/\D/g, "").length >= 8, {
      message: "Please provide a complete WhatsApp number."
    }),
  contactPreference: z
    .enum(["email-only", "email-and-whatsapp", "whatsapp-only"])
    .default("email-only"),
  country: z.string().min(2),
  procedures: z.array(z.string()).min(1),
  city: z.string().optional(),
  travelDates: z.string().optional(),
  notes: z.string().optional(),
  consent: z.literal("1")
});

function toArray(value: FormDataEntryValue | FormDataEntryValue[] | null) {
  if (Array.isArray(value)) return value.map(String);
  if (!value) return [];
  return [String(value)];
}

function toFieldErrors(issues: z.ZodIssue[]) {
  return issues.reduce<Record<string, string>>((errors, issue) => {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : "form";
    if (!errors[key]) {
      errors[key] = issue.message;
    }
    return errors;
  }, {});
}

export async function POST(request: Request) {
  const form = await request.formData();

  if (String(form.get("_gotcha") || "").trim() !== "") {
    return NextResponse.json({
      ok: true,
      message: "Thank you. We received your request."
    });
  }

  const procedures = toArray(form.getAll("procedures"));
  const uploadFiles = form
    .getAll("medicalFiles")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const legacyWhatsapp = String(form.get("whatsapp") || "").trim();
  const whatsappCountryCode = String(form.get("whatsappCountryCode") || "").trim();
  const whatsappLocalNumber = String(form.get("whatsappLocalNumber") || "").trim();
  const whatsapp =
    legacyWhatsapp ||
    (whatsappLocalNumber ? `${whatsappCountryCode} ${whatsappLocalNumber}`.trim() : "");

  const parsed = schema.safeParse({
    fullName: String(form.get("fullName") || "").trim(),
    email: String(form.get("email") || "").trim(),
    whatsapp,
    contactPreference: String(form.get("contactPreference") || "email-only").trim(),
    country: String(form.get("country") || "").trim(),
    procedures,
    city: String(form.get("city") || "").trim() || undefined,
    travelDates: String(form.get("travelDates") || "").trim() || undefined,
    notes: String(form.get("notes") || "").trim() || undefined,
    consent: String(form.get("consent") || "")
  });

  if (!parsed.success) {
    const fieldErrors = toFieldErrors(parsed.error.issues);

    return NextResponse.json(
      {
        ok: false,
        message: Object.values(fieldErrors)[0] || "Please complete all required fields.",
        fieldErrors
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  if (uploadFiles.length > MAX_FILES) {
    return NextResponse.json(
      {
        ok: false,
        message: `Please upload up to ${MAX_FILES} files.`,
        fieldErrors: {
          medicalFiles: `Please upload up to ${MAX_FILES} files.`
        }
      },
      { status: 422 }
    );
  }

  const invalidFile = uploadFiles.find((file) => {
    const invalidSize = file.size > MAX_FILE_SIZE_BYTES;
    const invalidType = file.type && !allowedMimeTypes.has(file.type);
    return invalidSize || invalidType;
  });

  if (invalidFile) {
    return NextResponse.json(
      {
        ok: false,
        message: `Unsupported or too large file: ${invalidFile.name}.`,
        fieldErrors: {
          medicalFiles: `Unsupported or too large file: ${invalidFile.name}.`
        }
      },
      { status: 422 }
    );
  }

  const attachments = await Promise.all(
    uploadFiles.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined
    }))
  );

  if (data.contactPreference !== "email-only" && !data.whatsapp) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please provide WhatsApp number or choose Email only.",
        fieldErrors: {
          whatsappLocalNumber:
            "Please provide WhatsApp number or switch contact preference to Email only.",
          contactPreference: "WhatsApp is required for this contact preference."
        }
      },
      { status: 422 }
    );
  }

  const operatorEmail = process.env.DTC_OPERATOR_EMAIL;
  const summary = [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Contact preference: ${data.contactPreference}`,
    `WhatsApp: ${data.whatsapp || "Not provided"}`,
    `Country: ${data.country}`,
    `Procedures: ${data.procedures.join(", ")}`,
    `Preferred City: ${data.city || "Not decided"}`,
    `Travel Dates: ${data.travelDates || "Not provided"}`,
    `Notes: ${data.notes || "Not provided"}`,
    `Attachments: ${
      attachments.length ? attachments.map((item) => item.filename).join(", ") : "No files uploaded"
    }`
  ].join("\n");

  // 1) Persist first: the lead must survive even if email is missing or fails.
  let leadId = "";
  try {
    const saved = await saveLead("inquiry", { ...data }, attachments);
    leadId = saved.id;
  } catch (error) {
    console.error("[inquiry] Failed to persist lead.", error);
  }

  // 2) Email the operator when SMTP is configured.
  let emailed = false;
  if (operatorEmail && mailerReady) {
    try {
      await sendMail({
        to: operatorEmail,
        subject: `[DentalTripChina] New inquiry from ${data.fullName}`,
        replyTo: data.email,
        text: ["New inquiry submission", "---------------------", summary, leadId ? `Lead ID: ${leadId}` : ""]
          .filter(Boolean)
          .join("\n"),
        attachments
      });
      emailed = true;
    } catch (error) {
      console.error("[inquiry] Failed to send operator email.", error);
    }
  }

  if (!leadId && !emailed) {
    console.error("[inquiry] Lead could not be stored or emailed.");
    return NextResponse.json(
      {
        ok: false,
        message: `Inquiry service is temporarily unavailable. Please email ${companyProfile.supportEmail} and we will reply quickly.`
      },
      { status: 503 }
    );
  }

  console.info(`[inquiry] Lead received ${leadId || "(email only)"} emailed=${emailed}`);
  await notifyLead(
    `New DTC inquiry: ${data.procedures.join(", ")}`,
    [summary, leadId ? `Lead ID: ${leadId}` : ""].filter(Boolean).join("\n")
  );

  // 3) Courtesy auto-reply to the patient (best effort).
  if (mailerReady) {
    try {
      await sendMail({
        to: data.email,
        subject: "We received your enquiry | DentalTripChina.com",
        text: `Thank you, ${data.fullName.split(" ")[0]}! We will respond via your preferred channel within 2 hours. Check your spam folder if you don't hear from us.`
      });
    } catch (error) {
      console.error("[inquiry] Failed to send auto-reply.", error);
    }
  }

  return NextResponse.json({
    ok: true,
    message: `Thank you, ${data.fullName.split(" ")[0]}! We will respond via your preferred channel within 2 hours. Check your spam folder if you don't hear from us.`,
    analytics: {
      procedure: data.procedures[0],
      country: data.country,
      city: data.city || "Not decided"
    }
  });
}

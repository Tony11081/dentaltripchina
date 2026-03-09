import { NextResponse } from "next/server";
import { z } from "zod";
import { companyProfile } from "@/data/company-profile";
import { mailerReady, sendMail } from "@/lib/mailer";

const schema = z
  .object({
    fullName: z.string().min(2),
    contact: z.string().min(5),
    city: z.string().min(2),
    airport: z.string().optional(),
    destination: z.string().min(2),
    arrivalDate: z.string().min(8),
    arrivalTime: z.string().optional(),
    returnTransfer: z.enum(["Yes", "No"]),
    returnDate: z.string().optional(),
    passengers: z.string().min(1),
    luggage: z.string().min(1),
    vehiclePreference: z.string().optional(),
    specialRequirements: z.array(z.string()).optional(),
    consent: z.literal("1")
  })
  .superRefine((value, ctx) => {
    if (value.city !== "Other" && !value.airport) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Airport is required for Shanghai/Beijing city selection.",
        path: ["airport"]
      });
    }

    if (value.returnTransfer === "Yes" && !value.returnDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Return date is required when return transfer is selected.",
        path: ["returnDate"]
      });
    }
  });

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
      message: "We received your transport request. Expect your quote within 2 hours."
    });
  }

  const parsed = schema.safeParse({
    fullName: String(form.get("fullName") || "").trim(),
    contact: String(form.get("contact") || "").trim(),
    city: String(form.get("city") || "").trim(),
    airport: String(form.get("airport") || "").trim() || undefined,
    destination: String(form.get("destination") || "").trim(),
    arrivalDate: String(form.get("arrivalDate") || "").trim(),
    arrivalTime: String(form.get("arrivalTime") || "").trim() || undefined,
    returnTransfer: String(form.get("returnTransfer") || "") as "Yes" | "No",
    returnDate: String(form.get("returnDate") || "").trim() || undefined,
    passengers: String(form.get("passengers") || "").trim(),
    luggage: String(form.get("luggage") || "").trim(),
    vehiclePreference:
      String(form.get("vehiclePreference") || "").trim() || undefined,
    specialRequirements: form.getAll("specialRequirements").map(String),
    consent: String(form.get("consent") || "")
  });

  if (!parsed.success) {
    const fieldErrors = toFieldErrors(parsed.error.issues);

    return NextResponse.json(
      {
        ok: false,
        message:
          Object.values(fieldErrors)[0] || "Please complete all required fields correctly.",
        fieldErrors
      },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const operatorEmail = process.env.DTC_OPERATOR_EMAIL;

  if (!operatorEmail || !mailerReady) {
    console.error(
      "[transport] Missing operator routing or SMTP configuration, refusing submission to prevent lead loss."
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          `Transport quote service is temporarily unavailable. Please email ${companyProfile.supportEmail} while we restore operator routing.`
      },
      { status: 503 }
    );
  }

  try {
    await sendMail({
      to: operatorEmail,
      subject: `[DentalTripChina] New transport request from ${data.fullName}`,
      text: [
        "Transport quote request",
        "----------------------",
        `Name: ${data.fullName}`,
        `Contact: ${data.contact}`,
        `City: ${data.city}`,
        `Airport: ${data.airport || "N/A"}`,
        `Destination: ${data.destination}`,
        `Arrival Date: ${data.arrivalDate}`,
        `Arrival Time: ${data.arrivalTime || "Not provided"}`,
        `Return Transfer: ${data.returnTransfer}`,
        `Return Date: ${data.returnDate || "Not provided"}`,
        `Passengers: ${data.passengers}`,
        `Luggage: ${data.luggage}`,
        `Vehicle Preference: ${data.vehiclePreference || "No preference"}`,
        `Special Requirements: ${(data.specialRequirements || []).join(", ") || "None"}`
      ].join("\n")
    });

    if (data.contact.includes("@")) {
      await sendMail({
        to: data.contact,
        subject: "We received your transport request | DentalTripChina.com",
        text: "We received your transport request. Expect your quote within 2 hours."
      });
    }
  } catch (error) {
    console.error("[transport] Failed to send transport request email.", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          `Transport quote service is temporarily unavailable. Please email ${companyProfile.supportEmail} while we restore operator routing.`
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "We received your transport request. Expect your quote within 2 hours.",
    analytics: { city: data.city }
  });
}

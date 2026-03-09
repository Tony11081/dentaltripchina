"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const procedureOptions = [
  "Dental Implants",
  "All-on-4 Full Mouth",
  "Veneers",
  "Root Canal",
  "LASIK Eye Surgery",
  "Health Checkup",
  "Cosmetic Procedure",
  "Not sure yet"
];

const whatsappDialCodes = [
  { label: "UK (+44)", value: "+44" },
  { label: "US/CA (+1)", value: "+1" },
  { label: "Australia (+61)", value: "+61" },
  { label: "Germany (+49)", value: "+49" },
  { label: "France (+33)", value: "+33" },
  { label: "Netherlands (+31)", value: "+31" },
  { label: "Singapore (+65)", value: "+65" },
  { label: "China (+86)", value: "+86" },
  { label: "Other (+)", value: "+" }
];

type FieldErrors = Record<string, string>;

function joinDescribedBy(...ids: Array<string | undefined>) {
  const tokens = ids.filter(Boolean);
  return tokens.length ? tokens.join(" ") : undefined;
}

export function InquiryForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const getErrorId = (name: string) => `${name}-error`;

  const renderFieldError = (name: string) =>
    fieldErrors[name] ? (
      <span className="field-error" id={getErrorId(name)}>
        {fieldErrors[name]}
      </span>
    ) : null;

  const clearFieldErrors = (name: string) => {
    setFieldErrors((current) => {
      const next = { ...current };
      let changed = false;
      const clear = (key: string) => {
        if (next[key]) {
          delete next[key];
          changed = true;
        }
      };

      clear(name);

      if (
        name === "contactPreference" ||
        name === "whatsappCountryCode" ||
        name === "whatsappLocalNumber"
      ) {
        clear("contactPreference");
        clear("whatsappLocalNumber");
      }

      if (name === "procedures") clear("procedures");
      if (name === "medicalFiles") clear("medicalFiles");

      return changed ? next : current;
    });
  };

  const markFormStart = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("funnel_form_start", {
      form: "inquiry",
      path: typeof window !== "undefined" ? window.location.pathname : "unknown"
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const contactPreference = String(formData.get("contactPreference") || "email-only");
    const whatsappLocalNumber = String(formData.get("whatsappLocalNumber") || "").trim();
    const selectedProcedures = formData.getAll("procedures").map(String).filter(Boolean);
    const files = formData
      .getAll("medicalFiles")
      .filter((item): item is File => item instanceof File && item.size > 0);
    const nextErrors: FieldErrors = {};

    if (!selectedProcedures.length) {
      nextErrors.procedures = "Select at least one procedure so we can route your enquiry.";
    }

    if (contactPreference !== "email-only" && !whatsappLocalNumber) {
      nextErrors.whatsappLocalNumber =
        "Please add a WhatsApp number or switch contact preference to Email only.";
      nextErrors.contactPreference = "WhatsApp is required for this contact preference.";
    }

    if (files.length > 3) {
      nextErrors.medicalFiles = "Please upload up to 3 files.";
    }

    const oversized = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversized) {
      nextErrors.medicalFiles = `File is too large: ${oversized.name}. Max file size is 10MB.`;
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setIsError(true);
      setMessage(Object.values(nextErrors)[0]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        analytics?: { procedure: string; country: string; city: string };
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !payload.ok) {
        setIsError(true);
        setFieldErrors(payload.fieldErrors || {});
        setMessage(payload.message || "Submission failed. Please try again.");
        return;
      }

      if (payload.analytics) {
        trackEvent("inquiry_form_submit", payload.analytics);
        trackEvent("inquiry_submit", payload.analytics);
        trackEvent("funnel_form_submit", payload.analytics);
      }

      setMessage(payload.message);
      setFieldErrors({});
      form.reset();
    } catch {
      setIsError(true);
      setMessage("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="dtc-form"
      onSubmit={onSubmit}
      onFocusCapture={markFormStart}
      onChangeCapture={(event) => {
        const { target } = event;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLSelectElement ||
          target instanceof HTMLTextAreaElement
        ) {
          clearFieldErrors(target.name);
        }
      }}
    >
      <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" />

      <div className="form-grid two">
        <label>
          <span>Full Name *</span>
          <input
            type="text"
            name="fullName"
            placeholder="Your full name"
            required
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? getErrorId("fullName") : undefined}
          />
          {renderFieldError("fullName")}
        </label>
        <label>
          <span>Email Address *</span>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? getErrorId("email") : undefined}
          />
          {renderFieldError("email")}
        </label>
        <label>
          <span>WhatsApp Number (optional)</span>
          <div className="phone-split">
            <select
              name="whatsappCountryCode"
              defaultValue=""
              aria-label="WhatsApp country code"
              aria-invalid={Boolean(fieldErrors.whatsappLocalNumber)}
              aria-describedby={joinDescribedBy(
                "whatsapp-note",
                fieldErrors.whatsappLocalNumber ? getErrorId("whatsappLocalNumber") : undefined
              )}
            >
              <option value="">No WhatsApp / Email only</option>
              {whatsappDialCodes.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="whatsappLocalNumber"
              placeholder="7700 900123"
              aria-label="WhatsApp local number"
              aria-invalid={Boolean(fieldErrors.whatsappLocalNumber)}
              aria-describedby={joinDescribedBy(
                "whatsapp-note",
                fieldErrors.whatsappLocalNumber ? getErrorId("whatsappLocalNumber") : undefined
              )}
            />
          </div>
          <span className="field-note" id="whatsapp-note">
            Leave blank if you prefer email-only communication.
          </span>
          {renderFieldError("whatsappLocalNumber")}
        </label>
        <label>
          <span>Preferred Contact Channel *</span>
          <select
            name="contactPreference"
            defaultValue="email-only"
            required
            aria-invalid={Boolean(fieldErrors.contactPreference)}
            aria-describedby={
              fieldErrors.contactPreference ? getErrorId("contactPreference") : undefined
            }
          >
            <option value="email-only">Email only</option>
            <option value="email-and-whatsapp">Email and WhatsApp</option>
            <option value="whatsapp-only">WhatsApp only</option>
          </select>
          {renderFieldError("contactPreference")}
        </label>
        <label>
          <span>Country of Residence *</span>
          <select
            name="country"
            required
            aria-invalid={Boolean(fieldErrors.country)}
            aria-describedby={fieldErrors.country ? getErrorId("country") : undefined}
          >
            <option value="">Select country</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Canada</option>
            <option>United States</option>
            <option>Germany</option>
            <option>France</option>
            <option>Netherlands</option>
            <option>Other Europe</option>
            <option>Other</option>
          </select>
          {renderFieldError("country")}
        </label>
      </div>

      <fieldset
        aria-invalid={Boolean(fieldErrors.procedures)}
        aria-describedby={fieldErrors.procedures ? getErrorId("procedures") : undefined}
      >
        <legend>Procedure of Interest *</legend>
        <div className="checkbox-grid">
          {procedureOptions.map((item) => (
            <label key={item}>
              <input type="checkbox" name="procedures" value={item} /> {item}
            </label>
          ))}
        </div>
        {renderFieldError("procedures")}
      </fieldset>

      <fieldset
        aria-invalid={Boolean(fieldErrors.city)}
        aria-describedby={fieldErrors.city ? getErrorId("city") : undefined}
      >
        <legend>Preferred City</legend>
        <div className="radio-grid">
          {["Shanghai", "Beijing", "Flexible", "Not decided"].map((city) => (
            <label key={city}>
              <input type="radio" name="city" value={city} /> {city}
            </label>
          ))}
        </div>
        {renderFieldError("city")}
      </fieldset>

      <div className="form-grid two">
        <label>
          <span>Approximate Travel Dates</span>
          <input
            type="text"
            name="travelDates"
            placeholder="e.g. April 2026 or flexible"
            aria-invalid={Boolean(fieldErrors.travelDates)}
            aria-describedby={fieldErrors.travelDates ? getErrorId("travelDates") : undefined}
          />
          {renderFieldError("travelDates")}
        </label>
        <label className="full">
          <span>Tell us more</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Any specific concerns, questions, or context that would help us prepare your quote..."
            aria-invalid={Boolean(fieldErrors.notes)}
            aria-describedby={fieldErrors.notes ? getErrorId("notes") : undefined}
          />
          {renderFieldError("notes")}
        </label>
        <label className="full">
          <span>Upload Records (optional)</span>
          <input
            type="file"
            name="medicalFiles"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
            multiple
            aria-invalid={Boolean(fieldErrors.medicalFiles)}
            aria-describedby={joinDescribedBy(
              "medical-files-note",
              fieldErrors.medicalFiles ? getErrorId("medicalFiles") : undefined
            )}
          />
          <span className="field-note" id="medical-files-note">
            Up to 3 files, max 10MB each (PDF/JPG/PNG/WEBP/HEIC).
          </span>
          {renderFieldError("medicalFiles")}
        </label>
      </div>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          value="1"
          required
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? getErrorId("consent") : undefined}
        />
        <span>
          I agree to be contacted regarding my enquiry. I understand my data will
          only be shared with selected providers for treatment coordination.
        </span>
      </label>
      {renderFieldError("consent")}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Request Free Consultation"}
      </button>

      {message ? (
        <p
          className={isError ? "message error" : "message"}
          role={isError ? "alert" : "status"}
          aria-live={isError ? "assertive" : "polite"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

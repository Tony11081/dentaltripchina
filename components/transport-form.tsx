"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const airportByCity: Record<string, string[]> = {
  Shanghai: ["Pudong (PVG)", "Hongqiao (SHA)"],
  Beijing: ["Capital (PEK)", "Daxing (PKX)"]
};

type FieldErrors = Record<string, string>;

export function TransportForm() {
  const [city, setCity] = useState<string>("");
  const [needReturn, setNeedReturn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const minDate = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().slice(0, 10);
  }, []);

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

      if (name === "city") {
        clear("city");
        clear("airport");
      }

      if (name === "returnTransfer") {
        clear("returnTransfer");
        clear("returnDate");
      }

      return changed ? next : current;
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
    const nextErrors: FieldErrors = {};
    const selectedCity = String(formData.get("city") || "").trim();
    const airport = String(formData.get("airport") || "").trim();
    const returnTransfer = String(formData.get("returnTransfer") || "").trim();
    const returnDate = String(formData.get("returnDate") || "").trim();

    if (selectedCity && selectedCity !== "Other" && !airport) {
      nextErrors.airport = "Select the arrival airport for Shanghai or Beijing.";
    }

    if (returnTransfer === "Yes" && !returnDate) {
      nextErrors.returnDate = "Add a return date when return transfer is selected.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setIsError(true);
      setMessage(Object.values(nextErrors)[0]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/transport", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        analytics?: { city: string };
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !payload.ok) {
        setIsError(true);
        setFieldErrors(payload.fieldErrors || {});
        setMessage(payload.message || "Submission failed. Please try again.");
        return;
      }

      if (payload.analytics) {
        trackEvent("transport_quote_submit", payload.analytics);
      }

      setMessage(payload.message);
      setFieldErrors({});
      form.reset();
      setCity("");
      setNeedReturn(false);
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
            required
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? getErrorId("fullName") : undefined}
          />
          {renderFieldError("fullName")}
        </label>
        <label>
          <span>Email or WhatsApp *</span>
          <input
            type="text"
            name="contact"
            required
            aria-invalid={Boolean(fieldErrors.contact)}
            aria-describedby={fieldErrors.contact ? getErrorId("contact") : undefined}
          />
          {renderFieldError("contact")}
        </label>
      </div>

      <fieldset
        aria-invalid={Boolean(fieldErrors.city)}
        aria-describedby={fieldErrors.city ? getErrorId("city") : undefined}
      >
        <legend>City *</legend>
        <div className="radio-grid">
          {["Shanghai", "Beijing", "Other"].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="city"
                value={value}
                required
                onChange={() => setCity(value)}
              />
              {value}
            </label>
          ))}
        </div>
        {renderFieldError("city")}
      </fieldset>

      {city && city !== "Other" ? (
        <label>
          <span>Airport *</span>
          <select
            name="airport"
            required
            aria-invalid={Boolean(fieldErrors.airport)}
            aria-describedby={fieldErrors.airport ? getErrorId("airport") : undefined}
          >
            <option value="">Select airport</option>
            {airportByCity[city].map((airport) => (
              <option key={airport}>{airport}</option>
            ))}
          </select>
          {renderFieldError("airport")}
        </label>
      ) : null}

      <div className="form-grid two">
        <label className="full">
          <span>Destination (Hospital/Hotel/Area) *</span>
          <input
            type="text"
            name="destination"
            placeholder="Hospital name or area name — e.g. Jiahui Hospital, Xuhui District"
            required
            aria-invalid={Boolean(fieldErrors.destination)}
            aria-describedby={fieldErrors.destination ? getErrorId("destination") : undefined}
          />
          {renderFieldError("destination")}
        </label>
        <label>
          <span>Arrival Date *</span>
          <input
            type="date"
            name="arrivalDate"
            min={minDate}
            required
            aria-invalid={Boolean(fieldErrors.arrivalDate)}
            aria-describedby={fieldErrors.arrivalDate ? getErrorId("arrivalDate") : undefined}
          />
          {renderFieldError("arrivalDate")}
        </label>
        <label>
          <span>Arrival Time (Flight)</span>
          <input
            type="time"
            name="arrivalTime"
            aria-invalid={Boolean(fieldErrors.arrivalTime)}
            aria-describedby={fieldErrors.arrivalTime ? getErrorId("arrivalTime") : undefined}
          />
          {renderFieldError("arrivalTime")}
        </label>
      </div>

      <fieldset
        aria-invalid={Boolean(fieldErrors.returnTransfer)}
        aria-describedby={
          fieldErrors.returnTransfer ? getErrorId("returnTransfer") : undefined
        }
      >
        <legend>Return Transfer? *</legend>
        <div className="radio-grid">
          <label>
            <input
              type="radio"
              name="returnTransfer"
              value="Yes"
              required
              onChange={() => setNeedReturn(true)}
            />
            Yes (need return)
          </label>
          <label>
            <input
              type="radio"
              name="returnTransfer"
              value="No"
              required
              onChange={() => setNeedReturn(false)}
            />
            No (one-way only)
          </label>
        </div>
        {renderFieldError("returnTransfer")}
      </fieldset>

      {needReturn ? (
        <label>
          <span>Return Date *</span>
          <input
            type="date"
            name="returnDate"
            min={minDate}
            required
            aria-invalid={Boolean(fieldErrors.returnDate)}
            aria-describedby={fieldErrors.returnDate ? getErrorId("returnDate") : undefined}
          />
          {renderFieldError("returnDate")}
        </label>
      ) : null}

      <div className="form-grid three">
        <label>
          <span>Number of Passengers *</span>
          <select
            name="passengers"
            required
            aria-invalid={Boolean(fieldErrors.passengers)}
            aria-describedby={fieldErrors.passengers ? getErrorId("passengers") : undefined}
          >
            <option value="">Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
          {renderFieldError("passengers")}
        </label>

        <label>
          <span>Luggage *</span>
          <select
            name="luggage"
            required
            aria-invalid={Boolean(fieldErrors.luggage)}
            aria-describedby={fieldErrors.luggage ? getErrorId("luggage") : undefined}
          >
            <option value="">Select</option>
            <option>Light (1-2 bags)</option>
            <option>Standard (3-4 bags)</option>
            <option>Heavy (5+ bags)</option>
          </select>
          {renderFieldError("luggage")}
        </label>

        <label>
          <span>Vehicle Preference</span>
          <select
            name="vehiclePreference"
            aria-invalid={Boolean(fieldErrors.vehiclePreference)}
            aria-describedby={
              fieldErrors.vehiclePreference ? getErrorId("vehiclePreference") : undefined
            }
          >
            <option>No preference</option>
            <option>Standard (Sedan)</option>
            <option>Business (MPV)</option>
            <option>Premium (Luxury)</option>
          </select>
          {renderFieldError("vehiclePreference")}
        </label>
      </div>

      <fieldset
        aria-invalid={Boolean(fieldErrors.specialRequirements)}
        aria-describedby={
          fieldErrors.specialRequirements ? getErrorId("specialRequirements") : undefined
        }
      >
        <legend>Special Requirements</legend>
        <div className="checkbox-grid">
          {["Wheelchair access", "Child seat", "None"].map((value) => (
            <label key={value}>
              <input type="checkbox" name="specialRequirements" value={value} /> {value}
            </label>
          ))}
        </div>
        {renderFieldError("specialRequirements")}
      </fieldset>

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
          not be shared with third parties.
        </span>
      </label>
      {renderFieldError("consent")}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Request Transport Quote"}
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

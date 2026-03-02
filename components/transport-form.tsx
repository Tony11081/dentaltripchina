"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const airportByCity: Record<string, string[]> = {
  Shanghai: ["Pudong (PVG)", "Hongqiao (SHA)"],
  Beijing: ["Capital (PEK)", "Daxing (PKX)"]
};

export function TransportForm() {
  const [city, setCity] = useState<string>("");
  const [needReturn, setNeedReturn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const minDate = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().slice(0, 10);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/transport", {
        method: "POST",
        body: formData
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        analytics?: { city: string };
      };

      if (!response.ok || !payload.ok) {
        setIsError(true);
        setMessage(payload.message || "Submission failed. Please try again.");
        return;
      }

      if (payload.analytics) {
        trackEvent("transport_quote_submit", payload.analytics);
      }

      setMessage(payload.message);
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
    <form className="dtc-form" onSubmit={onSubmit}>
      <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" />

      <div className="form-grid two">
        <label>
          <span>Full Name *</span>
          <input type="text" name="fullName" required />
        </label>
        <label>
          <span>Email or WhatsApp *</span>
          <input type="text" name="contact" required />
        </label>
      </div>

      <fieldset>
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
      </fieldset>

      {city && city !== "Other" ? (
        <label>
          <span>Airport *</span>
          <select name="airport" required>
            <option value="">Select airport</option>
            {airportByCity[city].map((airport) => (
              <option key={airport}>{airport}</option>
            ))}
          </select>
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
          />
        </label>
        <label>
          <span>Arrival Date *</span>
          <input type="date" name="arrivalDate" min={minDate} required />
        </label>
        <label>
          <span>Arrival Time (Flight)</span>
          <input type="time" name="arrivalTime" />
        </label>
      </div>

      <fieldset>
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
      </fieldset>

      {needReturn ? (
        <label>
          <span>Return Date *</span>
          <input type="date" name="returnDate" min={minDate} required />
        </label>
      ) : null}

      <div className="form-grid three">
        <label>
          <span>Number of Passengers *</span>
          <select name="passengers" required>
            <option value="">Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </label>

        <label>
          <span>Luggage *</span>
          <select name="luggage" required>
            <option value="">Select</option>
            <option>Light (1-2 bags)</option>
            <option>Standard (3-4 bags)</option>
            <option>Heavy (5+ bags)</option>
          </select>
        </label>

        <label>
          <span>Vehicle Preference</span>
          <select name="vehiclePreference">
            <option>No preference</option>
            <option>Standard (Sedan)</option>
            <option>Business (MPV)</option>
            <option>Premium (Luxury)</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend>Special Requirements</legend>
        <div className="checkbox-grid">
          {["Wheelchair access", "Child seat", "None"].map((value) => (
            <label key={value}>
              <input type="checkbox" name="specialRequirements" value={value} /> {value}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="consent">
        <input type="checkbox" name="consent" value="1" required />
        <span>
          I agree to be contacted regarding my enquiry. I understand my data will
          not be shared with third parties.
        </span>
      </label>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Request Transport Quote"}
      </button>

      {message ? <p className={isError ? "message error" : "message"}>{message}</p> : null}
    </form>
  );
}

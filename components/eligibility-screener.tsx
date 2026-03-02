"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { procedures } from "@/data/procedures";
import { procedureTrustProfiles } from "@/data/trust";
import { trackEvent } from "@/lib/analytics";

export function EligibilityScreener() {
  const [procedureSlug, setProcedureSlug] = useState(procedures[0]?.slug || "");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<"safe" | "unsafe" | null>(null);

  const trustProfile = useMemo(
    () => procedureTrustProfiles.find((item) => item.procedureSlug === procedureSlug),
    [procedureSlug]
  );
  const selectedProcedure = procedures.find((item) => item.slug === procedureSlug);

  const concerns = trustProfile?.chinaTravelNotRecommended || [];

  const onToggle = (item: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [item]: value }));
  };

  const onEvaluate = () => {
    const hasConcern = concerns.some((item) => checked[item]);
    const nextResult = hasConcern ? "unsafe" : "safe";
    setResult(nextResult);

    trackEvent("eligibility_screen_complete", {
      procedure: procedureSlug,
      result: nextResult,
      concern_count: concerns.filter((item) => checked[item]).length
    });
  };

  return (
    <section className="section container">
      <p className="section-kicker">Suitability Screen</p>
      <h2>Who Should Not Travel Yet</h2>
      <p className="section-lede muted">
        This is an early filter, not diagnosis. If any item applies, we recommend pausing
        travel and obtaining physician clearance first.
      </p>

      <div className="card">
        <div className="form-grid two">
          <label>
            <span>Procedure</span>
            <select
              value={procedureSlug}
              onChange={(event) => {
                setProcedureSlug(event.target.value);
                setChecked({});
                setResult(null);
              }}
            >
              {procedures.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset>
          <legend>Check any statement that applies</legend>
          <div className="checkbox-grid">
            {concerns.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={Boolean(checked[item])}
                  onChange={(event) => onToggle(item, event.target.checked)}
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>

        <p>
          <button type="button" className="btn btn-primary" onClick={onEvaluate}>
            Evaluate Suitability
          </button>
        </p>

        {result === "unsafe" ? (
          <>
            <p className="message error">
              Travel not recommended at this stage. Please request physician clearance and
              diagnostics first.
            </p>
            <article className="card trust-block">
              <h3>Next Steps Before Re-Screening</h3>
              <ol className="trust-steps">
                <li>
                  Book a GP or specialist review and discuss the flagged items for{" "}
                  {selectedProcedure?.title || "this procedure"}.
                </li>
                <li>
                  Request written clearance plus any required diagnostics or lab reports.
                </li>
                <li>
                  Return with those documents for a second suitability review before booking.
                </li>
              </ol>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact">
                  Contact us to discuss your case
                </Link>
                <Link className="btn btn-secondary" href="/verification">
                  Check doctor and hospital verification
                </Link>
              </div>
            </article>
          </>
        ) : null}

        {result === "safe" ? (
          <p className="message">
            No immediate red-flag selected. A clinical review is still required before booking.
          </p>
        ) : null}
      </div>
    </section>
  );
}

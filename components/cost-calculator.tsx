"use client";

import { useMemo, useState } from "react";
import { procedures } from "@/data/procedures";
import { trackEvent } from "@/lib/analytics";
import { LocalizedPrice } from "@/components/localized-price";

interface BudgetResult {
  low: number;
  median: number;
  high: number;
}

export function CostCalculator() {
  const [procedureSlug, setProcedureSlug] = useState(procedures[0]?.slug || "");
  const [flightCost, setFlightCost] = useState(980);
  const [hotelPerNight, setHotelPerNight] = useState(130);
  const [hotelNights, setHotelNights] = useState(8);
  const [followUpCost, setFollowUpCost] = useState(220);
  const [extraLow, setExtraLow] = useState(180);
  const [extraHigh, setExtraHigh] = useState(680);
  const [result, setResult] = useState<BudgetResult | null>(null);

  const selectedProcedure = useMemo(
    () => procedures.find((item) => item.slug === procedureSlug) || procedures[0],
    [procedureSlug]
  );

  const onCalculate = () => {
    if (!selectedProcedure) return;

    const treatmentBase = selectedProcedure.prices.chinaUsd;
    const travelTotal = flightCost + hotelPerNight * hotelNights;
    const low = treatmentBase * 0.92 + travelTotal + followUpCost * 0.9 + extraLow;
    const median = treatmentBase + travelTotal + followUpCost + (extraLow + extraHigh) / 2;
    const high = treatmentBase * 1.18 + travelTotal + followUpCost * 1.2 + extraHigh;

    setResult({ low, median, high });

    trackEvent("budget_calculator_run", {
      procedure: selectedProcedure.slug,
      low_budget: Math.round(low),
      median_budget: Math.round(median),
      high_budget: Math.round(high)
    });
  };

  return (
    <section className="section container">
      <p className="section-kicker">Budget Tool</p>
      <h2>One-Click Full Cost Calculator</h2>
      <p className="section-lede muted">
        Include treatment, flight and hotel, follow-up, and possible extra fees in one
        transparent estimate.
      </p>

      <div className="card calculator-shell">
        <div className="form-grid three calculator-grid">
          <label>
            <span>Procedure</span>
            <select
              value={procedureSlug}
              onChange={(event) => setProcedureSlug(event.target.value)}
            >
              {procedures.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Round-trip Flight (USD)</span>
            <input
              type="number"
              min={0}
              value={flightCost}
              onChange={(event) => setFlightCost(Number(event.target.value) || 0)}
            />
          </label>

          <label>
            <span>Hotel per Night (USD)</span>
            <input
              type="number"
              min={0}
              value={hotelPerNight}
              onChange={(event) => setHotelPerNight(Number(event.target.value) || 0)}
            />
          </label>

          <label>
            <span>Hotel Nights</span>
            <input
              type="number"
              min={1}
              value={hotelNights}
              onChange={(event) => setHotelNights(Number(event.target.value) || 1)}
            />
          </label>

          <label>
            <span>Follow-Up Budget (USD)</span>
            <input
              type="number"
              min={0}
              value={followUpCost}
              onChange={(event) => setFollowUpCost(Number(event.target.value) || 0)}
            />
          </label>

          <label>
            <span>Possible Extra Cost Low (USD)</span>
            <input
              type="number"
              min={0}
              value={extraLow}
              onChange={(event) => setExtraLow(Number(event.target.value) || 0)}
            />
          </label>

          <label>
            <span>Possible Extra Cost High (USD)</span>
            <input
              type="number"
              min={0}
              value={extraHigh}
              onChange={(event) => setExtraHigh(Number(event.target.value) || 0)}
            />
          </label>
        </div>

        <div className="calculator-actions">
          <button type="button" className="btn btn-primary" onClick={onCalculate}>
            Calculate Low / Median / High Budget
          </button>
        </div>

        {result ? (
          <div className="table-scroll calculator-result">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Estimated Total Budget (Localized)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Low</td>
                  <td><LocalizedPrice usd={Math.round(result.low)} /></td>
                </tr>
                <tr className="advantage-row">
                  <td>
                    Median
                    <span className="advantage-chip">Recommended Planning Baseline</span>
                  </td>
                  <td className="advantage-cell">
                    <LocalizedPrice usd={Math.round(result.median)} emphasize />
                  </td>
                </tr>
                <tr>
                  <td>High</td>
                  <td><LocalizedPrice usd={Math.round(result.high)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

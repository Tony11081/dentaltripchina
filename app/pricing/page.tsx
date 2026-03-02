import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { procedures } from "@/data/procedures";
import { getUsdFxReferenceNote } from "@/lib/currency";
import { LocalizedPrice } from "@/components/localized-price";

export const metadata: Metadata = {
  title: "Pricing"
};

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" }
        ]}
      />

      <Hero
        eyebrow="Transparent Cost Comparison"
        title="Procedure Pricing in China vs UK/US"
        subtitle="Indicative ranges for planning. Final quote depends on case complexity and treatment scope."
      />

      <section className="section container">
        <p className="muted section-lede">
          Prices auto-localize for UK/AU visitors while keeping USD as the baseline for
          like-for-like global comparison.
        </p>
        <p className="trust-note">{getUsdFxReferenceNote()}</p>
        <table className="price-table">
          <thead>
            <tr>
              <th>Procedure</th>
              <th className="advantage-head">China (USD)</th>
              <th>United States (USD)</th>
              <th>United Kingdom (USD / GBP est.)</th>
              <th>Australia (USD)</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((item) => (
              <tr key={item.slug}>
                <td>{item.title}</td>
                <td className="advantage-cell">
                  <LocalizedPrice usd={item.prices.chinaUsd} showUsdHint={false} />
                </td>
                <td>
                  <LocalizedPrice usd={item.prices.usUsd} showUsdHint={false} />
                </td>
                <td>
                  <LocalizedPrice usd={item.prices.ukUsd} />
                </td>
                <td>
                  {item.prices.auUsd ? (
                    <LocalizedPrice usd={item.prices.auUsd} />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="advantage-cell">{item.savingsPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section container">
        <p className="section-kicker">Time Comparison</p>
        <h2>Appointment Wait and Treatment Timeline</h2>
        <p className="muted section-lede">
          China usually allows rapid scheduling, so appointment waiting can be treated as negligible for planning.
        </p>
        <p>
          <Link href="/cost-calculator">Use the full low/median/high cost calculator</Link>
        </p>
        <div className="table-scroll">
          <table className="price-table timeline-table">
            <thead>
              <tr>
                <th>Procedure</th>
                <th className="advantage-head">China Appointment</th>
                <th className="advantage-head">China Treatment</th>
                <th>US Appointment</th>
                <th>US Treatment</th>
                <th>UK Appointment</th>
                <th>UK Treatment</th>
                <th>AU Appointment</th>
                <th>AU Treatment</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((item) => (
                <tr key={item.slug}>
                  <td>{item.title}</td>
                  <td className="advantage-cell">
                    {item.timeComparison.china.appointmentWait}
                  </td>
                  <td className="advantage-cell">
                    {item.timeComparison.china.treatmentTime}
                  </td>
                  <td>{item.timeComparison.unitedStates.appointmentWait}</td>
                  <td>{item.timeComparison.unitedStates.treatmentTime}</td>
                  <td>{item.timeComparison.unitedKingdom.appointmentWait}</td>
                  <td>{item.timeComparison.unitedKingdom.treatmentTime}</td>
                  <td>{item.timeComparison.australia.appointmentWait}</td>
                  <td>{item.timeComparison.australia.treatmentTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

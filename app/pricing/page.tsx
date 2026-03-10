import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { procedures } from "@/data/procedures";
import { getUsdFxReferenceNote } from "@/lib/currency";
import { LocalizedPrice } from "@/components/localized-price";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Compare indicative procedure pricing and treatment timelines in China versus UK, US, and Australia.",
  path: "/pricing",
  imagePath: pageImageAssets.pricingHero.src
});

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
        heroImageSrc={pageImageAssets.pricingHero.src}
        heroImageAlt={pageImageAssets.pricingHero.alt}
        heroMetrics={[
          { value: `${procedures.length}`, label: "Core procedures" },
          { value: "USD", label: "Baseline currency" },
          { value: "1-5d", label: "Typical China booking" }
        ]}
        panelTitle="Compare scope and timing, not just the headline fee"
        panelDescription="This page is meant to get a patient from broad curiosity to a realistic budget conversation."
        panelList={[
          "Procedure-level China vs UK/US/AU pricing",
          "Separate wait time from treatment duration",
          "Jump into the full cost calculator when ready"
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Before You Compare</p>
        <h2>What These Numbers Mean in Practice</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Planning Estimate, Not Final Quote</h3>
            <p>
              Prices on this page are planning estimates, not final medical quotations.
              Final hospital pricing depends on diagnostics, case complexity, materials,
              and confirmed treatment scope.
            </p>
            <p className="trust-note">
              Itemized quotes are available before travel.
            </p>
          </article>

          <article className="card trust-block">
            <h3>What Is Usually Not Included</h3>
            <p>
              International airfare is not included unless explicitly stated. Hotel,
              medication, follow-up, local transfers, and additional diagnostics may be
              quoted separately or adjusted after review.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Who You Pay and How</h3>
            <p>
              Hospital treatment fees are paid directly to the hospital. Our coordination
              fee is billed separately by us.
            </p>
            <p className="trust-note">
              Formal invoices are available for our billed services and for hospital billing
              where provided by the hospital.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Service Fee, Cancellation, and Scope Changes</h3>
            <p>
              Our service fee starts once case work begins. If a client cancels mid-process,
              the refundable portion depends on work already completed and any committed
              third-party costs.
            </p>
            <p className="trust-note">
              If added coordination time materially expands the service scope, extra service
              time may be billed. Hospital refund rules remain under each provider&apos;s policy.
            </p>
          </article>
        </div>
      </section>

      <section className="section container" id="pricing-table">
        <nav className="section-nav" aria-label="Pricing page sections">
          <a className="section-link" href="#pricing-table">
            Compare pricing
          </a>
          <a className="section-link" href="#time-comparison">
            Compare timelines
          </a>
          <Link className="section-link" href="/cost-calculator">
            Open calculator
          </Link>
        </nav>
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

      <section className="section container" id="time-comparison">
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

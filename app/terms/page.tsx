import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Service terms for treatment coordination, quoting boundaries, cancellations, and liability scope."
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Compliance</p>
        <h1>Terms of Service</h1>
        <p className="section-lede muted">
          Effective date: February 26, 2026. These terms govern coordination services,
          quote validity, cancellations, and service limitations.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/editorial-lab.svg"
            alt="Terms and process ledger illustration"
            width={1200}
            height={760}
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        <article className="card trust-block">
          <h2>Service Scope</h2>
          <ul className="trust-list">
            <li>Provider matching, scheduling support, and travel coordination assistance.</li>
            <li>Educational pricing and timeline estimates before final hospital confirmation.</li>
            <li>No direct provision of diagnosis, surgery, or medical prescriptions.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Quote Boundaries</h2>
          <ul className="trust-list">
            <li>Quotes are indicative unless marked as provider-issued final quotation.</li>
            <li>Complexity changes may alter treatment plan and price.</li>
            <li>Currency fluctuations and third-party logistics costs are outside our control.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Cancellation and Rescheduling</h2>
          <ul className="trust-list">
            <li>One free reschedule if requested at least 72 hours in advance.</li>
            <li>Provider no-show penalties may apply after confirmation cutoff.</li>
            <li>Hospital clinical fee refund policy is controlled by each provider.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Liability and Clinical Decisions</h2>
          <ul className="trust-list">
            <li>All medical decisions remain with licensed treating clinicians.</li>
            <li>Clinical outcomes vary; no guaranteed result is promised.</li>
            <li>
              For clinical warnings and boundaries, see <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}

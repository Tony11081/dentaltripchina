import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Service terms for treatment coordination, quoting boundaries, cancellations, and liability scope.",
  path: "/terms",
  imagePath: pageImageAssets.aboutHero.src
});

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
            src={pageImageAssets.aboutHero.src}
            alt={pageImageAssets.aboutHero.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        <article className="card trust-block">
          <h2>Service Scope</h2>
          <ul className="trust-list">
            <li>Provider matching, scheduling support, translation coordination, and travel assistance.</li>
            <li>Educational pricing and timeline estimates before final hospital confirmation.</li>
            <li>Our coordination fee is separate from hospital treatment fees.</li>
            <li>No direct provision of diagnosis, surgery, or medical prescriptions.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Quote Boundaries</h2>
          <ul className="trust-list">
            <li>Quotes are indicative unless marked as provider-issued final quotation.</li>
            <li>Complexity changes may alter treatment plan and price.</li>
            <li>International airfare is excluded unless explicitly stated.</li>
            <li>Currency fluctuations and third-party logistics costs are outside our control.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Cancellation and Rescheduling</h2>
          <ul className="trust-list">
            <li>Our coordination fee begins once case work starts.</li>
            <li>If a client cancels after work has started, the refundable portion depends on work already completed and any committed third-party costs.</li>
            <li>Provider no-show penalties or hospital refund rules are controlled by each provider.</li>
            <li>Additional coordination time may be billed when the agreed service scope materially expands.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Payment Flow</h2>
          <ul className="trust-list">
            <li>Hospital treatment fees are paid directly to the hospital.</li>
            <li>Our service fee is billed separately by us.</li>
            <li>Formal invoices are available for our billed services and for hospital billing where provided by the hospital.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Liability and Clinical Decisions</h2>
          <ul className="trust-list">
            <li>All medical decisions remain with licensed treating clinicians.</li>
            <li>Clinical responsibility and malpractice liability remain with the treating hospital and clinicians.</li>
            <li>Clinical outcomes vary; no guaranteed result is promised.</li>
            <li>
              We support patients with records, translations, timelines, and provider communication when disputes or complications arise.
            </li>
            <li>
              For clinical warnings and boundaries, see <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}

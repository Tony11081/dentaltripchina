import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How DentalTripChina handles cross-border medical travel data, retention windows, and deletion requests.",
  path: "/privacy",
  imagePath: pageImageAssets.verificationBanner.src
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Compliance</p>
        <h1>Privacy Policy</h1>
        <p className="section-lede muted">
          Effective date: February 26, 2026. This policy explains what data we collect,
          how cross-border sharing works for treatment coordination, and how deletion
          requests are handled.
        </p>

        <figure className="editorial-image">
          <Image
            src={pageImageAssets.verificationBanner.src}
            alt={pageImageAssets.verificationBanner.alt}
            width={1200}
            height={900}
            priority
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        <article className="card trust-block">
          <h2>Data We Collect</h2>
          <ul className="trust-list">
            <li>Identity and contact details (name, email, WhatsApp, country).</li>
            <li>Treatment intent, timeline preferences, and city preference.</li>
            <li>Optional notes you provide for case triage.</li>
            <li>Initial anonymous or partial-information enquiries are accepted before full case review.</li>
            <li>Operational logs (response timing, form events, support history).</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Cross-Border Medical Data Handling</h2>
          <ul className="trust-list">
            <li>Records are handled on a need-to-know basis by authorized coordination staff.</li>
            <li>With patient consent, records may be shared with up to 3 shortlisted hospitals for case review and quote comparison.</li>
            <li>Minimum-necessary fields are transferred for scheduling and triage.</li>
            <li>Transfers occur over access-controlled channels with role-based permissions.</li>
            <li>No sale of patient data to advertisers or data brokers.</li>
          </ul>
          <p className="trust-note">
            Sensitive records should be uploaded only through approved secure channels.
          </p>
        </article>

        <article className="card trust-block">
          <h2>Retention Period</h2>
          <ul className="trust-list">
            <li>Inquiry records: up to 24 months.</li>
            <li>Operational quality logs: up to 36 months.</li>
            <li>Deleted sooner when valid legal or patient deletion requests apply.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Deletion Workflow</h2>
          <ol className="trust-steps">
            <li>Email a deletion request with your contact details and inquiry timestamp.</li>
            <li>Identity verification is completed within 2 business days.</li>
            <li>Data is erased or anonymized within 14 business days unless legal hold applies.</li>
            <li>You receive a completion confirmation and scope summary.</li>
          </ol>
          <p>
            Request deletion via <Link href="/contact">Contact page</Link>.
          </p>
        </article>

        <article className="card trust-block">
          <h2>Communication Channels</h2>
          <p>
            Email-only communication is supported and does not automatically slow the process.
            WhatsApp is optional.
          </p>
          <p className="trust-note">
            Full quoting, hospital review, and booking require identity and medical details even
            if the first enquiry is anonymous.
          </p>
        </article>
      </section>
    </>
  );
}

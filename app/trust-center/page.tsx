import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  CredentialBlock,
  DoctorProfiles,
  EmergencyPathway,
  SiteDisclosurePanel
} from "@/components/trust-sections";
import {
  hospitalTrustProfiles,
  siteTrustStatements,
  procedureTrustProfiles
} from "@/data/trust";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Credential verification, doctor profiles, risk disclosures, pricing transparency, and patient data handling policy."
};

export default function TrustCenterPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Trust Center", href: "/trust-center" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Trust Center</p>
        <h1>Safety, Credentials, and Transparency</h1>
        <p className="section-lede muted">
          This page explains how we validate providers, review medical content,
          handle patient data, and communicate treatment risk and cost boundaries.
        </p>
      </section>

      <section className="section container">
        <p className="section-kicker">Hospital Credentials</p>
        <h2>Verification Ledger</h2>
        <div className="card-grid two">
          {hospitalTrustProfiles.map((profile) => (
            <CredentialBlock
              key={profile.hospitalSlug}
              lastVerified={profile.credentialLastVerified}
              source={profile.credentialSource}
              verifyUrl={
                profile.hospitalSlug === "tongren-eye-center"
                  ? "https://www.bjtrh.org/"
                  : "https://www.jointcommissioninternational.org/"
              }
              notes={profile.credentialNotes}
            />
          ))}
        </div>
      </section>

      <DoctorProfiles doctors={hospitalTrustProfiles.flatMap((item) => item.doctors)} />

      <section className="section container">
        <p className="section-kicker">Clinical Disclosures</p>
        <h2>Risk and Pricing Standards</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Risk Disclosure Standard</h3>
            <p>
              Every procedure page includes suitability, contraindications, common
              risks, urgent warning signs, and recovery checkpoints.
            </p>
            <p>
              <strong>Tracked procedures:</strong> {procedureTrustProfiles.length}
            </p>
          </article>

          <article className="card trust-block">
            <h3>Pricing Transparency Standard</h3>
            <p>
              Quotations separate included and excluded items and highlight probable
              additional costs before booking confirmation.
            </p>
            <p className="trust-note">No hidden “all-inclusive” claims.</p>
          </article>

          <article className="card trust-block">
            <h3>Claims & Testimonial Standard</h3>
            <p>{siteTrustStatements.testimonialPolicy}</p>
            <p className="trust-note">{siteTrustStatements.contentReviewPolicy}</p>
          </article>
        </div>
      </section>

      <EmergencyPathway
        items={[
          "Urgent symptom reports are triaged immediately and escalated to provider channels.",
          "In-country patients are directed to nearest clinically appropriate emergency facility.",
          "Returned patients receive continuity documentation for local follow-up.",
          "Serious events are logged and included in quarterly quality review."
        ]}
      />

      <SiteDisclosurePanel />

      <section className="section container">
        <p className="section-kicker">Trust Operations</p>
        <h2>Verification, Cases, and SLA</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Doctor & Hospital Verification</h3>
            <p>License references, public verification links, and scope boundaries.</p>
            <p>
              <Link href="/verification">Open verification ledger</Link>
            </p>
          </article>
          <article className="card trust-block">
            <h3>Real Case Center</h3>
            <p>Includes both standard outcomes and complication-managed patient journeys.</p>
            <p>
              <Link href="/case-studies">Open case center</Link>
            </p>
          </article>
          <article className="card trust-block">
            <h3>Post-Op SLA & Metrics</h3>
            <p>Published response commitments and monthly performance indicators.</p>
            <p>
              <Link href="/care-sla">SLA</Link> | <Link href="/trust-dashboard">Dashboard</Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <article className="card trust-block">
          <h3>Need Full Policy Package?</h3>
          <p>
            For partner due diligence, regulator requests, or legal review, contact us
            and request the provider verification and compliance packet.
          </p>
          <p>
            <Link className="btn btn-secondary" href="/contact">
              Request Policy Packet
            </Link>
          </p>
        </article>
      </section>
    </>
  );
}

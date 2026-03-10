import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Hero } from "@/components/hero";
import {
  CredentialBlock,
  DoctorProfiles,
  EmergencyPathway,
  SiteDisclosurePanel
} from "@/components/trust-sections";
import { hospitals } from "@/data/hospitals";
import {
  hospitalTrustProfiles,
  siteTrustStatements,
  procedureTrustProfiles
} from "@/data/trust";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

const allDoctors = hospitalTrustProfiles.flatMap((item) => item.doctors);
const latestVerification = [...hospitalTrustProfiles]
  .sort((left, right) =>
    new Date(left.credentialLastVerified).getTime() -
    new Date(right.credentialLastVerified).getTime()
  )
  .at(-1)?.credentialLastVerified;

export const metadata: Metadata = buildMetadata({
  title: "Trust Center",
  description:
    "Credential verification, doctor profiles, risk disclosures, pricing transparency, and patient data handling policy.",
  path: "/trust-center",
  imagePath: pageImageAssets.trustCenterHero.src
});

export default function TrustCenterPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Trust Center", href: "/trust-center" }
        ]}
      />

      <Hero
        eyebrow="Trust Center"
        title="Safety, Credentials, and Transparency"
        subtitle="Use this page as the evidence layer behind provider selection, official-source checks, non-clinical service boundaries, and post-op escalation."
        ctaHref="/verification"
        ctaText="Open verification ledger"
        heroImageSrc={pageImageAssets.trustCenterHero.src}
        heroImageAlt={pageImageAssets.trustCenterHero.alt}
        heroMetrics={[
          { value: `${hospitals.length}`, label: "Hospitals tracked" },
          { value: `${allDoctors.length}`, label: "Named doctors" },
          {
            value: latestVerification ? formatShortDate(latestVerification) : "Current",
            label: "Latest verification"
          }
        ]}
        panelTitle="Evidence before reassurance"
        panelDescription="The trust layer works only if patients can see what was verified, when it was checked, and where the boundary sits."
        panelList={[
          "Public credential sources and verification dates",
          "Named doctor profiles with treatment boundaries",
          "Risk, pricing, privacy, and escalation standards"
        ]}
      />

      <section className="section container">
        <nav className="section-nav" aria-label="Trust Center sections">
          <a className="section-link" href="#trust-proof-strip">
            Proof strip
          </a>
          <a className="section-link" href="#verification-ledger">
            Verification
          </a>
          <a className="section-link" href="#doctor-profiles">
            Doctors
          </a>
          <a className="section-link" href="#clinical-standards">
            Standards
          </a>
          <a className="section-link" href="#trust-operations">
            Operations
          </a>
        </nav>
        <p className="section-kicker">Trust Snapshot</p>
        <h2>What Is Tracked, Verified, and Routinely Updated</h2>
        <p className="section-lede muted">
          This page explains how we validate providers, review medical content,
          handle patient data, and communicate treatment risk and cost boundaries.
        </p>
        <div className="card-grid four trust-metric-cards" id="trust-proof-strip">
          <article className="card trust-block">
            <p className="card-eyebrow">Verification Scope</p>
            <h3>{hospitalTrustProfiles.length} Active facility profiles</h3>
            <p>Each facility record includes credential source notes and a dated verification stamp.</p>
          </article>
          <article className="card trust-block">
            <p className="card-eyebrow">Doctor Coverage</p>
            <h3>{allDoctors.length} named clinicians</h3>
            <p>Profiles include registry links, experience, languages, and treatment boundaries.</p>
          </article>
          <article className="card trust-block">
            <p className="card-eyebrow">Procedure Standards</p>
            <h3>{procedureTrustProfiles.length} procedure frameworks</h3>
            <p>Risk, exclusions, recovery checkpoints, and pricing boundaries are published side by side.</p>
          </article>
          <article className="card trust-block">
            <p className="card-eyebrow">Latest Refresh</p>
            <h3>{latestVerification ? formatShortDate(latestVerification) : "Current"}</h3>
            <p>Trust content is intended to show the last verification moment, not just timeless marketing copy.</p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Definitions</p>
        <h2>What Verification Means and Where Responsibility Sits</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>What “Verified Hospital” Means</h3>
            <p>{siteTrustStatements.verifiedHospitalDefinition}</p>
          </article>
          <article className="card trust-block">
            <h3>Source Links and Evidence</h3>
            <p>
              Where available, we provide direct links to hospital websites, public
              registries, and source materials so patients can verify key facts themselves.
            </p>
          </article>
          <article className="card trust-block">
            <h3>Who Pays and Who Is Responsible</h3>
            <p>
              Hospital treatment fees are paid directly to the hospital. Clinical responsibility
              remains with the treating hospital and licensed clinicians.
            </p>
            <p className="trust-note">
              Our role is coordination, translation, records transfer, scheduling, and
              continuity support.
            </p>
          </article>
        </div>
      </section>

      <section className="section container" id="verification-ledger">
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

      <div id="doctor-profiles">
        <DoctorProfiles doctors={allDoctors} />
      </div>

      <section className="section container" id="clinical-standards">
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
          "For urgent non-emergency concerns, we aim to acknowledge and start escalation within 15 minutes.",
          "Within 2 hours, we aim to provide a documented next-step response that may include hospital coordination, same-day review arrangements, translation support, medication clarification, or advice to seek local emergency care.",
          "In any medical emergency, patients should go to the nearest emergency department first.",
          "Clinical responsibility remains with the treating hospital and licensed clinicians; our role is to coordinate communication, records transfer, appointment scheduling, translation, and continuity support.",
          "If a dispute arises, we support the patient by organizing records, translations, timelines, and communication with the provider."
        ]}
      />

      <SiteDisclosurePanel />

      <section className="section container" id="trust-operations">
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
            <p>Published 15-minute escalation and 2-hour next-step guidance commitments with monthly performance indicators.</p>
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

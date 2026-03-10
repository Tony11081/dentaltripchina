import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  companyIdentityDisclosureNote,
  companyProfile,
  publishedCompanyIdentityItems
} from "@/data/company-profile";
import { siteTrustStatements } from "@/data/trust";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "How DentalTripChina coordinates provider matching, logistics, and English-speaking treatment planning in China.",
  path: "/about",
  imagePath: pageImageAssets.aboutHero.src
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" }
        ]}
      />

      <Hero
        eyebrow="About DentalTripChina"
        title="Built for Safe, Transparent Medical Travel"
        subtitle="We coordinate care planning with officially partnered hospitals in Beijing and Shanghai. We do not replace hospital diagnosis or clinical decision-making."
        heroImageSrc={pageImageAssets.aboutHero.src}
        heroImageAlt={pageImageAssets.aboutHero.alt}
        heroMetrics={[
          { value: "Coordination", label: "Service role" },
          { value: "2h", label: "Response target" },
          { value: "24/7", label: "Active-client urgent support" }
        ]}
        panelTitle="What we handle and what stays with the hospital"
        panelDescription="The about page should make commercial scope and clinical boundaries obvious before anyone books."
        panelList={[
          "Provider matching and quote coordination",
          "Travel and intake planning support",
          "No diagnosis, prescriptions, or outcome guarantees"
        ]}
      />

      <section className="section container card-grid three">
        <article className="card">
          <h3>Official Hospital Partnerships</h3>
          <p>
            We work with officially partnered hospitals and departments and help patients
            compare options by treatment fit, availability, communication standards, and
            travel constraints.
          </p>
        </article>
        <article className="card">
          <h3>Logistics Coordination</h3>
          <p>
            We help align your appointment schedule with airport transfer and accommodation planning.
          </p>
        </article>
        <article className="card">
          <h3>English Support</h3>
          <p>
            English-speaking coordination and interpretation support are arranged throughout the
            planning and in-country treatment process.
          </p>
        </article>
      </section>

      <section className="section container">
        <p className="section-kicker">Company Identity</p>
        <h2>Who Operates This Service</h2>
        <div className="card-grid two">
          <article className="card trust-block">
            <h3>Legal and Registration Details</h3>
            {publishedCompanyIdentityItems.length ? (
              <ul className="trust-list">
                {publishedCompanyIdentityItems.map((item) => (
                  <li key={item.key}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="trust-note">{companyIdentityDisclosureNote}</p>
            )}
            <p className="trust-note">
              <strong>Last updated:</strong> {companyProfile.infoLastUpdated}
            </p>
          </article>

          <article className="card trust-block">
            <h3>Operations and Contact Channels</h3>
            <ul className="trust-list">
              <li>
                <strong>Operations desk:</strong> {companyProfile.operationsAddress}
              </li>
              <li>
                <strong>Support email:</strong>{" "}
                <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>
              </li>
              <li>
                <strong>X-ray inbox:</strong>{" "}
                <a href={`mailto:${companyProfile.xrayInboxEmail}`}>{companyProfile.xrayInboxEmail}</a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${companyProfile.supportPhone.replace(/\s+/g, "")}`}>
                  {companyProfile.supportPhone}
                </a>
              </li>
              <li>
                <strong>Pre-booking support:</strong> {companyProfile.businessHours}
              </li>
              <li>
                <strong>Active-client support:</strong> {companyProfile.activeClientSupportHours}
              </li>
            </ul>
            <p>
              <Link href="/contact">Open contact and inquiry options</Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Operating Model</p>
        <h2>How We Work and Where Responsibility Sits</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Commercial Independence</h3>
            <p>
              {companyProfile.serviceFeeSummary}
            </p>
          </article>

          <article className="card trust-block">
            <h3>Who You Pay</h3>
            <p>
              {companyProfile.treatmentPaymentSummary}
            </p>
            <p className="trust-note">
              Itemized quotes can be provided before travel, and hospital billing remains
              separate from our coordination fee.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Doctors, Liability, and Advocacy</h3>
            <p>
              {siteTrustStatements.doctorAssignmentPolicy}
            </p>
            <p className="trust-note">
              Clinical responsibility remains with the treating hospital and licensed clinicians.
              We support patients with records, translations, and escalation coordination.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

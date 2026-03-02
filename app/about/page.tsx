import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { companyProfile } from "@/data/company-profile";

export const metadata: Metadata = {
  title: "About"
};

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
        subtitle="We are a medical travel coordination service. We do not replace hospital diagnosis or clinical decision-making."
      />

      <section className="section container card-grid three">
        <article className="card">
          <h3>Hospital Matching</h3>
          <p>
            We shortlist providers by treatment fit, availability, communication standards,
            and patient travel constraints.
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
            Our process prioritizes institutions with dedicated international service teams.
          </p>
        </article>
      </section>

      <section className="section container">
        <p className="section-kicker">Company Identity</p>
        <h2>Who Operates This Service</h2>
        <div className="card-grid two">
          <article className="card trust-block">
            <h3>Legal and Registration Details</h3>
            <ul className="trust-list">
              <li>
                <strong>Legal entity:</strong> {companyProfile.legalEntityName}
              </li>
              <li>
                <strong>Registration number:</strong> {companyProfile.registrationNumber}
              </li>
              <li>
                <strong>Registration jurisdiction:</strong>{" "}
                {companyProfile.registrationJurisdiction}
              </li>
              <li>
                <strong>Registered office:</strong> {companyProfile.registeredAddress}
              </li>
            </ul>
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
                <strong>Hours:</strong> {companyProfile.businessHours}
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
            <h3>Service Role Boundary</h3>
            <p>
              We are a coordination service. Hospitals and licensed doctors make final
              diagnosis, candidacy, and treatment decisions.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Commercial Transparency</h3>
            <p>
              Cost plans separate treatment fees from travel/logistics. Incentives or
              referral relationships are disclosed in writing before booking.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Escalation and Complaint Path</h3>
            <p>
              Red-flag symptoms follow published SLA pathways. Formal complaints are tracked
              with handling timelines and closure records.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

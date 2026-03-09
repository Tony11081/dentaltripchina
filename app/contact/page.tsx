import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryForm } from "@/components/inquiry-form";
import { siteTrustStatements } from "@/data/trust";
import { companyProfile } from "@/data/company-profile";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Free Medical Tourism Consultation",
  description:
    "Get a free cost estimate for dental, LASIK, or health checkup in China. Response within 2 hours.",
  path: "/contact",
  imagePath: pageImageAssets.contactHero.src
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" }
        ]}
      />

      <Hero
        eyebrow="Free Consultation"
        title="Request Your Personalized Treatment Plan"
        subtitle="Share your needs and choose your contact channel: email only, WhatsApp, or both."
        secondaryHref={`mailto:${companyProfile.supportEmail}`}
        secondaryText="Email Support"
        heroImageSrc={pageImageAssets.contactHero.src}
        heroImageAlt={pageImageAssets.contactHero.alt}
        heroMetrics={[
          { value: "2h", label: "Response target" },
          { value: "Email", label: "Works without WhatsApp" },
          { value: "3 files", label: "Record uploads" }
        ]}
        panelTitle="Choose the channel that fits your comfort level"
        panelDescription="The contact flow now makes email-first enquiries feel as valid as WhatsApp-first ones."
        panelList={[
          "Email only, WhatsApp only, or both",
          "Optional records upload for faster triage",
          "Privacy and response expectations shown upfront"
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Contact Options</p>
        <h2>Choose the Channel You Prefer</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Email (No WhatsApp Required)</h3>
            <p>
              <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>
            </p>
            <p className="trust-note">Best for first contact if you prefer not to share phone yet.</p>
          </article>

          <article className="card trust-block">
            <h3>X-ray / Records Inbox</h3>
            <p>
              <a href={`mailto:${companyProfile.xrayInboxEmail}`}>{companyProfile.xrayInboxEmail}</a>
            </p>
            <p className="trust-note">
              Send clear images or reports with your name and inquiry date for faster triage.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Phone and Hours</h3>
            <p>
              <a href={`tel:${companyProfile.supportPhone.replace(/\s+/g, "")}`}>
                {companyProfile.supportPhone}
              </a>
            </p>
            <p className="trust-note">{companyProfile.businessHours}</p>
          </article>
        </div>
      </section>

      <section className="section container">
        <div className="cta-box">
          <h2>Inquiry Form</h2>
          <p>You can submit with email only. WhatsApp is optional.</p>
          <InquiryForm />
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Data & Consent</p>
        <h2>Privacy and Communication Transparency</h2>
        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Why We Collect Your Data</h3>
            <ul className="trust-list">
              {siteTrustStatements.dataHandling.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card trust-block">
            <h3>Response Promise</h3>
            <p>
              We respond within 2 hours for standard inquiries and escalate urgent
              concerns immediately through provider channels.
            </p>
            <p className="trust-note">
              Never share passports or sensitive records over unsecured channels.
            </p>
          </article>

          <article className="card trust-block">
            <h3>Patient Rights</h3>
            <p>
              You can request correction or deletion of your inquiry data. We honor
              valid requests according to applicable privacy rules.
            </p>
            <p>
              <Link href="/trust-center">Read full trust and policy details</Link>
            </p>
            <p>
              <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link> |{" "}
              <Link href="/medical-disclaimer">Medical Disclaimer</Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

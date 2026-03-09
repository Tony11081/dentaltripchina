import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "China Visa-Free Medical Tourism",
  description:
    "Travel preparation checklist for visa-free entry, medical documents, and scheduling assumptions before treatment in China.",
  path: "/china-visa-free-medical-tourism",
  imagePath: pageImageAssets.visaHero.src
});

export default function VisaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: "China Visa-Free Medical Tourism",
            href: "/china-visa-free-medical-tourism"
          }
        ]}
      />

      <Hero
        eyebrow="Visa & Travel"
        title="China Visa-Free Medical Tourism Guide"
        subtitle="Preparation checklist for medical travel documentation and scheduling."
        heroImageSrc={pageImageAssets.visaHero.src}
        heroImageAlt={pageImageAssets.visaHero.alt}
      />

      <section className="section container">
        <p className="section-kicker">Checklist</p>
        <h2>Travel Folder for Cross-Border Care</h2>
        <p className="muted section-lede">
          Entry policies change. Always confirm eligibility and required documents using official sources
          before booking.
        </p>
        <div className="card-grid two">
          <article className="card">
            <h3>Before You Book</h3>
            <ul className="trust-list">
              <li>Confirm passport validity and entry requirements for your nationality.</li>
              <li>Align your intended stay length with the clinical timeline (including follow-ups).</li>
              <li>Prepare a basic medical summary (conditions, medications, allergies).</li>
            </ul>
          </article>
          <article className="card">
            <h3>Carry-On Essentials</h3>
            <ul className="trust-list">
              <li>Hospital contact card + emergency pathway instructions.</li>
              <li>Appointment schedule and receipts folder.</li>
              <li>Any imaging or lab reports you have (PDF is fine).</li>
            </ul>
          </article>
        </div>
        <p>
          <Link className="btn btn-primary" href="/travel-support">
            See travel support options
          </Link>{" "}
          <Link className="btn btn-secondary" href="/contact">
            Ask us to review your timeline
          </Link>
        </p>
      </section>
    </>
  );
}

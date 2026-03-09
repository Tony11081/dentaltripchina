import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TransportForm } from "@/components/transport-form";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Transport Quote",
  description:
    "Request airport transfer planning for medical travel in Shanghai or Beijing with schedule-first coordination.",
  path: "/transport",
  imagePath: pageImageAssets.transportHero.src
});

export default function TransportPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transport", href: "/transport" }
        ]}
      />

      <Hero
        eyebrow="Airport Transfers"
        title="Request a Transport Quote"
        subtitle="Shanghai and Beijing arrival/departure transfer coordination for medical travelers."
        heroImageSrc={pageImageAssets.transportHero.src}
        heroImageAlt={pageImageAssets.transportHero.alt}
      />

      <section className="section container">
        <p className="section-kicker">What You Get</p>
        <h2>Arrival Logistics Without Guesswork</h2>
        <div className="card-grid three">
          <article className="card">
            <h3>Schedule-First</h3>
            <p>We plan around clinic times and recovery windows, not just flight arrival.</p>
          </article>
          <article className="card">
            <h3>Special Needs</h3>
            <p>Wheelchair access and luggage constraints are captured up front.</p>
          </article>
          <article className="card">
            <h3>Clear Scope</h3>
            <p>One-way or return. Airport to hotel, or airport to hospital (when appropriate).</p>
          </article>
        </div>

        <div className="cta-box">
          <h2>Transport Request Form</h2>
          <TransportForm />
        </div>
      </section>
    </>
  );
}

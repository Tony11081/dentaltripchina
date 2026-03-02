import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Travel Support"
};

export default function TravelSupportPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Travel Support", href: "/travel-support" }
        ]}
      />

      <Hero
        eyebrow="Trip Logistics (Optional)"
        title="Medical-First Travel Support"
        subtitle="Hotel shortlists, airport transfers, and arrival checklists designed for recovery and clinic schedules."
        heroImageSrc="/editorial/travel-suite.svg"
        heroImageAlt="Travel and recovery planning dossier for medical travelers"
      />

      <section className="section container">
        <p className="section-kicker">What We Coordinate</p>
        <h2>Travel That Serves the Treatment Plan</h2>
        <p className="muted section-lede">
          We are a cross-border care coordination service. When you request travel support, we keep the
          medical schedule, recovery needs, and safety constraints as the primary decision drivers.
        </p>

        <div className="card-grid three">
          <article className="card">
            <h3>Airport Transfers</h3>
            <p>Arrival/departure transfers aligned with appointment times and hospital locations.</p>
            <p>
              <Link className="btn btn-secondary" href="/transport">
                Request transport quote
              </Link>
            </p>
          </article>
          <article className="card">
            <h3>Recovery-Friendly Hotels</h3>
            <p>Quiet rooms, elevator access, and easy hospital access for follow-ups and checkups.</p>
            <p>
              <Link className="btn btn-secondary" href="/hotels">
                View stay guidance
              </Link>
            </p>
          </article>
          <article className="card">
            <h3>Entry & Document Checklist</h3>
            <p>Travel folder guidance so you always have the right documents and contacts on hand.</p>
            <p>
              <Link className="btn btn-secondary" href="/china-visa-free-medical-tourism">
                Open visa guide
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Budget</p>
        <h2>All-In Budget, Not Just Hospital Fees</h2>
        <p className="muted section-lede">
          For high-intent decisions, patients need the full picture: treatment + travel + follow-up + the
          realistic range for additional fees.
        </p>
        <p>
          <Link className="btn btn-primary" href="/cost-calculator">
            Open full cost calculator
          </Link>
        </p>
      </section>

      <section className="section container">
        <div className="cta-box">
          <h2>Want Us to Build a Trip Plan Around Your Treatment?</h2>
          <p>
            Share your dates, city preference, and procedure type. We will propose a schedule-first plan and
            the minimum viable stay length.
          </p>
          <p>
            <Link className="btn btn-primary" href="/contact">
              Request a personalized plan
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Hotels"
};

export default function HotelsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Hotels", href: "/hotels" }
        ]}
      />

      <Hero
        eyebrow="Accommodation"
        title="Hotels for Medical Travelers"
        subtitle="Stay options near partner hospitals with easy transfer access."
        heroImageSrc="/editorial/travel-suite.svg"
        heroImageAlt="Recovery-friendly stay planning for medical travel"
      />

      <section className="section container">
        <p className="section-kicker">Selection Rules</p>
        <h2>What Makes a Hotel “Recovery-Friendly”</h2>
        <div className="card-grid three">
          <article className="card">
            <h3>Quiet + Sleep</h3>
            <p>Soundproofing, stable AC, blackout curtains, and a predictable room layout.</p>
          </article>
          <article className="card">
            <h3>Access + Safety</h3>
            <p>Elevator access, late check-in, and reliable front desk support for arrivals.</p>
          </article>
          <article className="card">
            <h3>Transfer Time</h3>
            <p>Minimize commute on follow-up days. We optimize for travel time, not sightseeing.</p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">City Areas</p>
        <h2>Where Most Patients Stay</h2>
        <div className="card-grid three">
          <article className="card">
            <h3>Shanghai: Jiahui Area</h3>
            <p>Convenient for short dental appointments and checkups, with stable transfer routes.</p>
          </article>
          <article className="card">
            <h3>Beijing: Chaoyang District</h3>
            <p>Common base for international hospital visits, with multiple hotel options.</p>
          </article>
          <article className="card">
            <h3>Longer Recovery Stays</h3>
            <p>When you need a quieter pace (or companion support), we suggest longer-stay style options.</p>
          </article>
        </div>
        <p className="trust-note">
          Note: We can provide a shortlist and booking guidance. Final booking is typically made directly by
          the patient to reduce markup risk and improve transparency.
        </p>
        <p>
          <Link className="btn btn-primary" href="/contact">
            Request a hotel shortlist
          </Link>{" "}
          <Link className="btn btn-secondary" href="/transport">
            Arrange airport transfers
          </Link>
        </p>
      </section>
    </>
  );
}

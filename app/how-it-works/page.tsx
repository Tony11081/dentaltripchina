import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InquiryForm } from "@/components/inquiry-form";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "How It Works",
  description:
    "A clear four-step process for provider matching, planning, travel coordination, and follow-up support.",
  path: "/how-it-works",
  imagePath: pageImageAssets.howItWorksHero.src
});

export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "How It Works", href: "/how-it-works" }
        ]}
      />

      <Hero
        eyebrow="Simple 4-Step Process"
        title="From First Message to Treatment Follow-Up"
        subtitle="Everything is coordinated in one flow so you can plan your trip with clarity."
        heroImageSrc={pageImageAssets.howItWorksHero.src}
        heroImageAlt={pageImageAssets.howItWorksHero.alt}
        heroMetrics={[
          { value: "4", label: "Clear steps" },
          { value: "1 team", label: "Single desk" },
          { value: "2h", label: "Initial response" }
        ]}
        panelTitle="A planning flow built to reduce uncertainty"
        panelDescription="The process is intentionally linear so patients can compare options, lock dates, and keep follow-up visible."
        panelList={[
          "Case brief and timeline intake",
          "Provider shortlist with scope notes",
          "Travel and follow-up coordination"
        ]}
      />

      <section className="section container card-grid two">
        <article className="card">
          <h3>1. Share Your Case</h3>
          <p>Submit your goals, budget range, and preferred timeline.</p>
        </article>
        <article className="card">
          <h3>2. Receive Options</h3>
          <p>Get a shortlist of hospitals, indicative costs, and treatment notes.</p>
        </article>
        <article className="card">
          <h3>3. Confirm Your Plan</h3>
          <p>Choose provider and package, then lock your treatment schedule.</p>
        </article>
        <article className="card">
          <h3>4. Travel & Treatment</h3>
          <p>Arrive with logistics in place and complete treatment with follow-up support.</p>
        </article>
      </section>

      <section className="section container">
        <div className="cta-box">
          <h2>Start with a Free Consultation</h2>
          <p className="muted">
            Red-flag escalation target: 15 minutes. Clinical pathway guidance target: 2 hours.
          </p>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}

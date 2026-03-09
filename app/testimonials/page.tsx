import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { testimonials } from "@/data/testimonials";
import { siteTrustStatements } from "@/data/trust";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Verified Patient Testimonials",
  description:
    "Read disclosure-labeled patient testimonials and see how verification and incentive policies are handled.",
  path: "/testimonials",
  imagePath: pageImageAssets.testimonialsHero.src
});

export default function TestimonialsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Testimonials", href: "/testimonials" }
        ]}
      />

      <Hero
        eyebrow="Patient Stories"
        title="Experiences from International Patients"
        subtitle="Verified and disclosure-labeled testimonials from patients who traveled to China for treatment."
        heroImageSrc={pageImageAssets.testimonialsHero.src}
        heroImageAlt={pageImageAssets.testimonialsHero.alt}
      />

      <section className="section container card-grid three">
        {testimonials.map((item) => (
          <article className="card trust-block" key={item.id}>
            <h3>{item.name}</h3>
            <p className="muted">
              {item.country} | {item.procedure}
            </p>
            <p>{item.content}</p>
            <p className={`badge ${item.verified ? "verified-badge" : "unverified-badge"}`}>
              {item.verified ? "Verified Patient" : "Unverified Submission"}
            </p>
            <p className="trust-note">
              <strong>Incentive disclosure:</strong> {item.incentiveDisclosure}
            </p>
            <p className="muted">
              <strong>Verification method:</strong> {item.verificationMethod}
            </p>
          </article>
        ))}
      </section>

      <section className="section container">
        <article className="card trust-block">
          <h2>Review Integrity Policy</h2>
          <p>{siteTrustStatements.incentiveDisclosurePolicy}</p>
          <p>
            For deeper context and complication-handled narratives, read the{" "}
            <Link href="/case-studies">Real Case Center</Link>.
          </p>
        </article>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { careSlaTargets } from "@/data/trust-dashboard";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Post-Op Support SLA",
  description:
    "Service level commitments for red-flag escalation, clinical pathway response, and continuity handoff.",
  path: "/care-sla",
  imagePath: pageImageAssets.careSlaBanner.src
});

export default function CareSlaPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Post-Op SLA", href: "/care-sla" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Service Commitment</p>
        <h1>Post-Op Support SLA</h1>
        <p className="section-lede muted">
          We publish measurable post-op escalation targets so patients know response
          expectations before treatment.
        </p>
        <figure className="editorial-image">
          <Image
            src={pageImageAssets.careSlaBanner.src}
            alt={pageImageAssets.careSlaBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container card-grid three">
        {careSlaTargets.map((item) => (
          <article className="card trust-block" key={item.trigger}>
            <p className="card-eyebrow">SLA Target</p>
            <h3>{item.trigger}</h3>
            <p className="trust-note">{item.target}</p>
            <p className="muted">
              <strong>Owner:</strong> {item.owner}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

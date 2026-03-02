import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { careSlaTargets } from "@/data/trust-dashboard";

export const metadata: Metadata = {
  title: "Post-Op Support SLA",
  description:
    "Service level commitments for red-flag escalation, clinical pathway response, and continuity handoff."
};

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
            src="/editorial/sla-shield.svg"
            alt="Post-operative response SLA illustration"
            width={1200}
            height={760}
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

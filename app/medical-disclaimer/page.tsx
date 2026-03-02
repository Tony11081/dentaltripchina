import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "Clinical boundaries, emergency guidance, and why content does not replace physician diagnosis."
};

export default function MedicalDisclaimerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Medical Disclaimer", href: "/medical-disclaimer" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Clinical Boundaries</p>
        <h1>Medical Disclaimer</h1>
        <p className="section-lede muted">
          Educational content on this website supports decision-making but does not replace
          clinical diagnosis or physician-led treatment planning.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/sla-shield.svg"
            alt="Medical safety shield illustration"
            width={1200}
            height={760}
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        <article className="card trust-block">
          <h2>What This Website Can Do</h2>
          <ul className="trust-list">
            <li>Explain typical procedures, costs, and timeline ranges.</li>
            <li>Provide provider credential references and operational policies.</li>
            <li>Support appointment and logistics coordination.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>What This Website Cannot Do</h2>
          <ul className="trust-list danger">
            <li>Diagnose disease or determine final treatment suitability.</li>
            <li>Replace emergency department evaluation.</li>
            <li>Guarantee outcomes, recovery speed, or complication-free treatment.</li>
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Emergency Rule</h2>
          <p>
            If you have severe pain, fever, heavy bleeding, acute vision change, chest pain,
            or neurological symptoms, seek local emergency care immediately.
          </p>
          <p className="trust-note">
            Coordination support must never delay emergency treatment.
          </p>
        </article>

        <article className="card trust-block">
          <h2>Post-Op Escalation Commitment</h2>
          <ul className="trust-list">
            <li>Red-flag escalation target: 15 minutes.</li>
            <li>Clinical pathway guidance target: 2 hours.</li>
            <li>Local continuity handoff summary target: 24 hours.</li>
          </ul>
        </article>
      </section>
    </>
  );
}

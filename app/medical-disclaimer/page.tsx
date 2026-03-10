import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { companyProfile } from "@/data/company-profile";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Medical Disclaimer",
  description:
    "Clinical boundaries, emergency guidance, and why content does not replace physician diagnosis.",
  path: "/medical-disclaimer",
  imagePath: pageImageAssets.careSlaBanner.src
});

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
            src={pageImageAssets.careSlaBanner.src}
            alt={pageImageAssets.careSlaBanner.alt}
            width={1200}
            height={900}
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
          <h2>Clinical Liability and Service Scope</h2>
          <p>
            Clinical responsibility and malpractice liability rest with the treating hospital
            and licensed clinicians.
          </p>
          <p>
            {companyProfile.legalEntityName} does not practice medicine, diagnose, prescribe,
            or guarantee treatment outcomes.
          </p>
          <p className="trust-note">
            Our role is limited to non-clinical coordination services, including provider
            matching, scheduling, translation support, records handling, billing clarification,
            and patient communication.
          </p>
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
            <li>Urgent non-emergency concerns are targeted for escalation within 15 minutes.</li>
            <li>Documented next-step guidance is targeted within 2 hours.</li>
            <li>Guidance may include hospital coordination, review arrangements, translation support, medication clarification, or advice to seek local emergency care.</li>
          </ul>
        </article>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EligibilityScreener } from "@/components/eligibility-screener";

export const metadata: Metadata = {
  title: "Not Suitable Screening",
  description:
    "Pre-screen who should not travel to China for treatment before physician clearance."
};

export default function EligibilityScreeningPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Eligibility Screening", href: "/eligibility-screening" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Risk Filter</p>
        <h1>Not Suitable Screening</h1>
        <p className="section-lede muted">
          This reverse screening identifies profiles that should pause travel and obtain
          physician clearance first.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/sla-shield.svg"
            alt="Suitability and safety screening illustration"
            width={1200}
            height={760}
          />
        </figure>
      </section>

      <EligibilityScreener />
    </>
  );
}

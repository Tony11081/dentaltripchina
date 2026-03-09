import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyCard } from "@/components/case-study-card";
import { caseStudies } from "@/data/case-studies";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Real Case Center",
  description:
    "Real international treatment cases with planning scope, timeline, total spend, and follow-up outcomes.",
  path: "/case-studies",
  imagePath: pageImageAssets.caseStudiesBanner.src
});

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Real Case Center", href: "/case-studies" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Clinical Transparency</p>
        <h1>Real Case Center</h1>
        <p className="section-lede muted">
          Each case includes pre-treatment context, treatment plan, timeline, total spend,
          and post-op follow-up. Complication-managed cases are included.
        </p>
        <figure className="editorial-image">
          <Image
            src={pageImageAssets.caseStudiesBanner.src}
            alt={pageImageAssets.caseStudiesBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        {caseStudies.map((item) => (
          <CaseStudyCard key={item.slug} item={item} />
        ))}
      </section>
    </>
  );
}

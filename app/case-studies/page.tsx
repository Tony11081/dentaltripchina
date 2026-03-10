import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyCard } from "@/components/case-study-card";
import { JsonLd } from "@/components/json-ld";
import { ExtractableSummary } from "@/components/extractable-summary";
import { caseStudies } from "@/data/case-studies";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Real Case Center",
  description:
    "Real international treatment cases with planning scope, timeline, total spend, and follow-up outcomes.",
  path: "/case-studies",
  imagePath: pageImageAssets.caseStudiesBanner.src
});

export default function CaseStudiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/case-studies")}#webpage`,
        url: absoluteUrl("/case-studies"),
        name: "Real Case Center",
        description:
          "Real international treatment cases with planning scope, timeline, total spend, and follow-up outcomes.",
        inLanguage: "en-GB"
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/case-studies")}#itemlist`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/case-studies/${item.slug}`),
          name: item.title
        }))
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Real Case Center", href: "/case-studies" }
        ]}
      />

      <section className="section container">
        <JsonLd data={schema} />
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

      <section className="section container">
        <ExtractableSummary
          eyebrow="Case Library"
          title="Fast Summary"
          description="This block summarizes what the case library contains and why it matters before users open individual cases."
          id="case-library-summary"
          items={[
            {
              label: "What cases include",
              value:
                "Patient context, proposed plan, timeline, total spend, follow-up details, and complication handling when applicable."
            },
            {
              label: "Case count",
              value: `${caseStudies.length} public case studies`
            },
            {
              label: "How to use them",
              value:
                "Use case pages to benchmark total pathway cost and timeline assumptions, not as a guarantee of identical outcomes."
            }
          ]}
        />
      </section>

      <section className="section container card-grid two">
        {caseStudies.map((item) => (
          <CaseStudyCard key={item.slug} item={item} />
        ))}
      </section>
    </>
  );
}

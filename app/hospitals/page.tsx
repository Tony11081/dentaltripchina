import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HospitalCard } from "@/components/hospital-card";
import { JsonLd } from "@/components/json-ld";
import { ExtractableSummary } from "@/components/extractable-summary";
import { hospitals } from "@/data/hospitals";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Partner Hospitals",
  description:
    "Compare verified hospital profiles in Shanghai and Beijing with department highlights, intake notes, and credential references.",
  path: "/hospitals",
  imagePath: pageImageAssets.hospitalsHero.src
});

export default async function HospitalsPage({
  searchParams
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const params = await searchParams;
  const city = params.city;

  const filtered =
    city && (city === "shanghai" || city === "beijing")
      ? hospitals.filter((hospital) => hospital.city === city)
      : hospitals;
  const pageUrl =
    city && (city === "shanghai" || city === "beijing")
      ? absoluteUrl(`/hospitals?city=${city}`)
      : absoluteUrl("/hospitals");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: city ? `Hospitals in ${city}` : "Partner Hospitals",
        description:
          "Compare source-linked hospital profiles in Shanghai and Beijing with department highlights, intake notes, and credential references.",
        inLanguage: "en-GB"
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: filtered.length,
        itemListElement: filtered.map((hospital, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/hospital/${hospital.slug}`),
          name: hospital.name
        }))
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Hospitals", href: "/hospitals" }
        ]}
      />

      <Hero
        eyebrow="Partner Hospitals"
        title="Trusted Hospitals in Shanghai and Beijing"
        subtitle="Compare source-linked providers with international patient support."
        heroImageSrc={pageImageAssets.hospitalsHero.src}
        heroImageAlt={pageImageAssets.hospitalsHero.alt}
      />

      <section className="section container">
        <JsonLd data={schema} />
        <p className="section-kicker">Profile Access</p>
        <p className="muted section-lede">
          Each hospital card opens a full profile with doctor names, license numbers,
          treatment scope boundaries, payment methods, map, and post-op escalation pathway.
        </p>
        <p>
          Filter:
          <Link href="/hospitals" style={{ marginLeft: 8 }}>
            All
          </Link>
          <Link href="/hospitals?city=shanghai" style={{ marginLeft: 8 }}>
            Shanghai
          </Link>
          <Link href="/hospitals?city=beijing" style={{ marginLeft: 8 }}>
            Beijing
          </Link>
          <Link href="/verification" style={{ marginLeft: 12 }}>
            Doctor & Hospital Verification
          </Link>
        </p>
        <ExtractableSummary
          eyebrow="Hospital Collection"
          title="Fast Summary"
          description="This block summarizes the provider collection for list-page extraction and scan-reading."
          id="hospitals-summary"
          items={[
            {
              label: "Collection scope",
              value:
                "Hospital profiles include department highlights, payment methods, intake notes, credential sources, named doctors where published, and post-op escalation pathways."
            },
            {
              label: "Visible profiles",
              value: `${filtered.length} hospitals${city ? ` in ${city}` : " across Beijing and Shanghai"}`
            },
            {
              label: "Verification route",
              value: "Each profile links to official hospital sources and the central verification ledger."
            }
          ]}
        />
        <div className="card-grid three">
          {filtered.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      </section>
    </>
  );
}

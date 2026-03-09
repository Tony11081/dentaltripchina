import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HospitalCard } from "@/components/hospital-card";
import { hospitals } from "@/data/hospitals";
import { buildMetadata } from "@/lib/metadata";
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
        subtitle="Compare accredited providers with international patient support."
        heroImageSrc={pageImageAssets.hospitalsHero.src}
        heroImageAlt={pageImageAssets.hospitalsHero.alt}
      />

      <section className="section container">
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
        <div className="card-grid three">
          {filtered.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      </section>
    </>
  );
}

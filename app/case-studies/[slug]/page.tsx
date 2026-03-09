import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LocalizedPrice } from "@/components/localized-price";
import { caseStudies } from "@/data/case-studies";
import { procedures } from "@/data/procedures";
import { buildMetadata } from "@/lib/metadata";
import { getCaseStudyImage } from "@/lib/site-images";

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((caseItem) => caseItem.slug === slug);

  if (!item) return { title: "Case Not Found" };

  const caseImage = getCaseStudyImage(item.slug);

  return buildMetadata({
    title: `${item.title} | Case Study`,
    description: item.patientContext,
    path: `/case-studies/${item.slug}`,
    imagePath: caseImage.src,
    type: "article",
    modifiedTime: "2026-02-26"
  });
}

function getTotal(item: (typeof caseStudies)[number]) {
  return (
    item.costBreakdown.treatmentUsd +
    item.costBreakdown.flightHotelUsd +
    item.costBreakdown.followUpUsd +
    item.costBreakdown.extraUsd
  );
}

export default async function CaseStudyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = caseStudies.find((caseItem) => caseItem.slug === slug);

  if (!item) notFound();

  const procedure = procedures.find((entry) => entry.slug === item.procedureSlug);
  const caseImage = getCaseStudyImage(item.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    about: procedure?.title || item.procedureSlug,
    author: {
      "@type": "Organization",
      name: "DentalTripChina Clinical Desk"
    },
    dateModified: "2026-02-26"
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Real Case Center", href: "/case-studies" },
          { label: item.title, href: `/case-studies/${item.slug}` }
        ]}
      />

      <section className="section container">
        <JsonLd data={schema} />
        <p className="section-kicker">Case File</p>
        <h1>{item.title}</h1>
        <p className="section-lede muted">{item.patientContext}</p>
        <figure className="editorial-image">
          <Image src={caseImage.src} alt={caseImage.alt} width={1200} height={900} />
        </figure>

        <div className="card-grid three">
          <article className="card trust-block">
            <h3>Procedure</h3>
            <p>{procedure?.title || item.procedureSlug}</p>
            <p className="muted">
              {item.country} patient | {item.city}
            </p>
          </article>

          <article className="card trust-block">
            <h3>Total Spend</h3>
            <p className="price-line">
              <LocalizedPrice usd={getTotal(item)} emphasize />
            </p>
            <ul className="trust-list">
              <li>
                Treatment: <LocalizedPrice usd={item.costBreakdown.treatmentUsd} />
              </li>
              <li>
                Flight + hotel: <LocalizedPrice usd={item.costBreakdown.flightHotelUsd} />
              </li>
              <li>
                Follow-up: <LocalizedPrice usd={item.costBreakdown.followUpUsd} />
              </li>
              <li>
                Extra: <LocalizedPrice usd={item.costBreakdown.extraUsd} />
              </li>
            </ul>
          </article>

          <article className="card trust-block">
            <h3>Verification</h3>
            <p>
              {item.testimonial.verified ? "Verified patient evidence on file" : "Unverified submission"}
            </p>
            <p className="trust-note">{item.testimonial.incentiveDisclosure}</p>
          </article>
        </div>
      </section>

      <section className="section container card-grid two">
        <article className="card trust-block">
          <h2>Treatment Plan</h2>
          <ul className="trust-list">
            {item.proposedPlan.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Timeline</h2>
          <ol className="trust-steps">
            {item.timeline.map((line) => (
              <li key={`${line.day}-${line.event}`}>
                <strong>{line.day}:</strong> {line.event}
              </li>
            ))}
          </ol>
        </article>

        <article className="card trust-block">
          <h2>Outcome</h2>
          <p>{item.outcome}</p>
          <ul className="trust-list">
            {item.followUp.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h2>Complication Handling</h2>
          {item.complication.occurred ? (
            <>
              <p>{item.complication.summary}</p>
              <ul className="trust-list danger">
                {(item.complication.action || []).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No complication event recorded in the acute treatment phase.</p>
          )}
        </article>
      </section>

      <section className="section container">
        <article className="card trust-block">
          <h2>Patient Quote</h2>
          <p>“{item.testimonial.quote}”</p>
          <p className="trust-note">{item.testimonial.incentiveDisclosure}</p>
        </article>
      </section>

      <section className="section container">
        <div className="cta-box">
          <h2>Need a Similar Plan?</h2>
          <p>
            Share your records and goals. We will map a comparable pathway with
            timeline, budget range, and risk-screening notes.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Request a similar plan
            </Link>
            {procedure ? (
              <Link className="btn btn-secondary" href={`/${procedure.slug}`}>
                View related procedure
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

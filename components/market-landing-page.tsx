import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CaseStudyCard } from "@/components/case-study-card";
import { ExtractableSummary } from "@/components/extractable-summary";
import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { HospitalCard } from "@/components/hospital-card";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { ProcedureCard } from "@/components/procedure-card";
import {
  SiteDisclosurePanel,
  SourceReferenceSection
} from "@/components/trust-sections";
import { caseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/posts";
import { MarketLandingPage } from "@/lib/types";
import { absoluteUrl } from "@/lib/metadata";
import { getBlogPostImage, getProcedureImage } from "@/lib/site-images";
import { getHospitalsBySlugs, getProcedureBySlug } from "@/lib/content";
import { LocalizedPrice } from "@/components/localized-price";
import { CardMedia } from "@/components/card-media";

interface MarketLandingPageViewProps {
  page: MarketLandingPage;
}

interface SourceItem {
  label: string;
  href: string;
  description: string;
  linkText: string;
  external?: boolean;
}

function dedupePosts(items: typeof blogPosts) {
  return items.filter(
    (post, index, all) => all.findIndex((candidate) => candidate.slug === post.slug) === index
  );
}

export function MarketLandingPageView({ page }: MarketLandingPageViewProps) {
  const procedure = getProcedureBySlug(page.procedureSlug);
  if (!procedure) return null;

  const relatedHospitals = getHospitalsBySlugs(procedure.partnerHospitalSlugs);
  const relatedCase =
    caseStudies.find(
      (item) => item.procedureSlug === procedure.slug && item.country === page.countryName
    ) || caseStudies.find((item) => item.procedureSlug === procedure.slug);
  const relatedPosts = dedupePosts([
    ...blogPosts.filter(
      (post) =>
        post.relatedProcedureSlug === procedure.slug && post.countryFocus === page.countryName
    ),
    ...blogPosts.filter((post) => post.relatedProcedureSlug === procedure.slug)
  ]).slice(0, 3);
  const relatedCities = Array.from(
    new Set(
      relatedHospitals.map((hospital) =>
        hospital.city === "shanghai" ? "Shanghai" : "Beijing"
      )
    )
  ).join(" and ");
  const procedureImage = getProcedureImage(procedure.slug);
  const pageUrl = absoluteUrl(`/${page.slug}`);

  const collectionItems = [
    {
      name: procedure.title,
      url: absoluteUrl(`/${procedure.slug}`)
    },
    ...relatedHospitals.map((hospital) => ({
      name: hospital.name,
      url: absoluteUrl(`/hospital/${hospital.slug}`)
    })),
    ...relatedPosts.map((post) => ({
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`)
    })),
    ...(relatedCase
      ? [
          {
            name: relatedCase.title,
            url: absoluteUrl(`/case-studies/${relatedCase.slug}`)
          }
        ]
      : [])
  ];

  const sourceReferences: SourceItem[] = [
    {
      label: `${procedure.title} Procedure Guide`,
      href: `/${procedure.slug}`,
      description:
        "Primary treatment page for pricing, timing, suitability, FAQ answers, and related hospital pathways.",
      linkText: "Open procedure guide"
    },
    {
      label: "Pricing Page",
      href: "/pricing",
      description:
        "Baseline comparison page for China vs home-market private-care estimates across core procedures.",
      linkText: "Open pricing"
    },
    {
      label: "Verification Ledger",
      href: "/verification",
      description:
        "Named-doctor registry links, hospital verification timestamps, and source references.",
      linkText: "Open verification"
    },
    {
      label: "Trust Center",
      href: "/trust-center",
      description:
        "Published responsibility boundaries, escalation commitments, privacy notes, and trust methodology.",
      linkText: "Open trust center"
    },
    ...relatedHospitals.flatMap((hospital) => [
      {
        label: `Hospital Profile: ${hospital.name}`,
        href: `/hospital/${hospital.slug}`,
        description:
          "Hospital capability, department highlights, payment methods, and intake notes for this treatment path.",
        linkText: "Open hospital profile"
      },
      hospital.website
        ? {
            label: `Official Site: ${hospital.name}`,
            href: hospital.website,
            description:
              "Provider-published service and contact information used as an external source.",
            linkText: "Visit official site",
            external: true
          }
        : {
            label: `Official Listing: ${hospital.name}`,
            href: hospital.jciVerifyUrl,
            description:
              "Official accreditation or public hospital listing used as an external source.",
            linkText: "Open official listing",
            external: true
          }
    ]),
    ...relatedPosts.map((post) => ({
      label: `Planning Article: ${post.title}`,
      href: `/blog/${post.slug}`,
      description:
        "Supporting editorial guide linked to this treatment pathway and market-specific decision questions.",
      linkText: "Open article"
    })),
    ...(relatedCase
      ? [
          {
            label: `Related Case Study: ${relatedCase.title}`,
            href: `/case-studies/${relatedCase.slug}`,
            description:
              "Real patient pathway with total spend, timeline, and follow-up outcome relevant to this treatment.",
            linkText: "Open case study"
          }
        ]
      : [])
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.metaDescription,
        inLanguage: "en-GB",
        about: [
          {
            "@type": "Country",
            name: page.countryName
          },
          {
            "@type": "MedicalProcedure",
            name: procedure.title,
            url: absoluteUrl(`/${procedure.slug}`)
          }
        ],
        mainEntity: {
          "@id": `${pageUrl}#itemlist`
        }
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: collectionItems.length,
        itemListElement: collectionItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: item.url,
          name: item.name
        }))
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: `${page.countryCode} Guide`, href: `/${page.slug}` }
        ]}
      />

      <Hero
        eyebrow={`${page.countryCode} Market Guide`}
        title={page.heroTitle}
        subtitle={page.heroDescription}
        heroImageSrc={procedureImage.src}
        heroImageAlt={procedureImage.alt}
        heroMetrics={[
          { value: `${procedure.savingsPct}%`, label: "Typical savings" },
          { value: `${relatedHospitals.length}`, label: "Hospital profiles" },
          { value: page.chinaAppointmentWait, label: "China booking" }
        ]}
        panelTitle="Country-specific planning, not generic medical tourism copy"
        panelDescription={page.collectionSummary}
        panelList={[
          `Compare China vs ${page.comparatorLabel.toLowerCase()}`,
          "Open the most relevant hospitals, case studies, and planning articles",
          "Request a quote only after fit, timing, and source links are clear"
        ]}
      />

      <section className="section container" id="market-overview">
        <JsonLd data={collectionSchema} />
        <JsonLd data={faqSchema} />
        <nav className="section-nav" aria-label={`${page.title} sections`}>
          <a className="section-link" href="#market-overview">
            Overview
          </a>
          <a className="section-link" href="#market-collection">
            Collection
          </a>
          <a className="section-link" href="#market-faq">
            FAQ
          </a>
          <a className="section-link" href="#market-sources">
            Sources
          </a>
          <a className="section-link" href="#market-request">
            Request plan
          </a>
        </nav>

        <ExtractableSummary
          eyebrow="At A Glance"
          title="Fast Summary"
          description="This block gives search engines, AI systems, and first-time visitors the shortest useful answer for this country-and-procedure query."
          id="market-summary"
          items={[
            {
              label: "Short answer",
              value: page.shortAnswer
            },
            {
              label: "China estimate",
              value: <LocalizedPrice usd={page.chinaPriceUsd} emphasize showUsdHint={false} />
            },
            {
              label: `${page.countryCode} private-care reference`,
              value: <LocalizedPrice usd={page.homeMarketPriceUsd} emphasize showUsdHint={false} />,
              note: page.homeMarketReferenceNote
            },
            {
              label: "China booking window",
              value: page.chinaAppointmentWait
            },
            {
              label: `${page.countryCode} booking window`,
              value: page.homeMarketAppointmentWait
            },
            {
              label: "Best-fit city coverage",
              value: relatedCities || "Shanghai and Beijing"
            }
          ]}
        />

        <div className="card-grid two">
          <article className="card">
            <p className="card-eyebrow">Country Context</p>
            <h2>What This Page Helps You Decide</h2>
            <p>{page.marketContext}</p>
            <p>{page.collectionSummary}</p>
            {page.homeMarketReferenceNote ? (
              <p className="trust-note">{page.homeMarketReferenceNote}</p>
            ) : null}
            <div className="badge-row">
              <span className="badge">China stay: {procedure.durationDays}</span>
              <span className="badge">China treatment: {page.chinaTreatmentTime}</span>
              <span className="badge">
                {page.countryCode} treatment: {page.homeMarketTreatmentTime}
              </span>
            </div>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">Why Compare China</p>
            <h3>{page.countryCode} Patient Decision Signals</h3>
            <ul className="trust-list">
              {page.whyPatientsConsiderChina.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Planning Checklist</p>
        <h2>What to Validate Before You Book</h2>
        <div className="card-grid four">
          {page.planningChecklist.map((item) => (
            <article className="card trust-block" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="market-collection">
        <p className="section-kicker">Collection Page</p>
        <h2>Start with the Core Procedure, Then Open the Right Supporting Resources</h2>
        <div className="card-grid three">
          <ProcedureCard procedure={procedure} />
          {relatedHospitals.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      </section>

      {relatedPosts.length ? (
        <section className="section container">
          <p className="section-kicker">Related Planning Articles</p>
          <h2>Articles Most Relevant to {page.countryCode} Patients</h2>
          <div className="card-grid three">
            {relatedPosts.map((post) => {
              const image = getBlogPostImage(post);

              return (
                <article className="card" key={post.slug}>
                  <CardMedia src={image.src} alt={image.alt} />
                  <p className="card-eyebrow">{post.countryFocus || page.countryName}</p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <p className="trust-note">
                    Updated {post.dateUpdated} | {post.budgetFocus || "Planning guide"}
                  </p>
                  <p>
                    <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
                      Read article
                    </Link>
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {relatedCase ? (
        <section className="section container">
          <p className="section-kicker">Related Case</p>
          <h2>Real Patient Pathway to Compare Against Your Plan</h2>
          <div className="card-grid two">
            <CaseStudyCard item={relatedCase} />
          </div>
        </section>
      ) : null}

      <section className="section container" id="market-faq">
        <p className="section-kicker">Country-Specific FAQ</p>
        <FaqList items={page.faqItems} />
      </section>

      <SourceReferenceSection
        eyebrow="Primary Sources"
        title="Verification Inputs and Supporting Sources"
        description="Use these pages and official provider links to verify claims, compare providers, and audit country-specific planning assumptions."
        items={sourceReferences}
        id="market-sources"
      />

      <SiteDisclosurePanel />

      <section className="section container" id="market-request">
        <div className="cta-box">
          <h2>Request a {page.countryCode}-Specific Treatment Plan</h2>
          <p>
            Tell us your procedure, budget, records, and travel window. We will map a
            provider shortlist, itemized quote path, and realistic timeline before you book.
          </p>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}

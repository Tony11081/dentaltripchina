import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { HospitalCard } from "@/components/hospital-card";
import { InquiryForm } from "@/components/inquiry-form";
import { ProcedureTimeComparison } from "@/components/time-comparison";
import {
  EmergencyPathway,
  PricingDisclosure,
  RiskDisclosure,
  SiteDisclosurePanel
} from "@/components/trust-sections";
import {
  getCityGuideBySlug,
  getHospitalsBySlugs,
  getProcedureBySlug
} from "@/lib/content";
import { hospitals } from "@/data/hospitals";
import { procedures } from "@/data/procedures";
import { cityGuides } from "@/data/cities";
import { JsonLd } from "@/components/json-ld";
import { hospitalTrustProfiles, procedureTrustProfiles } from "@/data/trust";
import { getUsdFxReferenceNote } from "@/lib/currency";
import { LocalizedPrice } from "@/components/localized-price";

export function generateStaticParams() {
  return [...procedures, ...cityGuides].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);

  if (procedure) {
    return {
      title: `${procedure.title} Cost in China (2026)`,
      description: `Get ${procedure.title} in China at trusted hospitals. Compare prices vs US and UK.`
    };
  }

  const cityGuide = getCityGuideBySlug(slug);
  if (cityGuide) {
    return {
      title: cityGuide.title,
      description: cityGuide.summary
    };
  }

  return {
    title: "Page Not Found"
  };
}

export default async function RootSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const procedure = getProcedureBySlug(slug);
  if (procedure) {
    const relatedHospitals = getHospitalsBySlugs(procedure.partnerHospitalSlugs);
    const procedureTrust = procedureTrustProfiles.find(
      (item) => item.procedureSlug === procedure.slug
    );
    const emergencyPathway =
      hospitalTrustProfiles.find((item) =>
        procedure.partnerHospitalSlugs.includes(item.hospitalSlug)
      )?.emergencyPathway || [];

    const schema = {
      "@context": "https://schema.org",
      "@type": procedure.schemaType,
      name: procedure.title,
      description: procedure.excerpt,
      offers: {
        "@type": "Offer",
        price: procedure.prices.chinaUsd,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "DentalTripChina.com"
        }
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: procedure.faqs.map((faq) => ({
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
            { label: procedure.title, href: `/${procedure.slug}` }
          ]}
        />

        <Hero
          eyebrow="Procedure Guide"
          title={procedure.heroHeadline}
          subtitle={procedure.excerpt}
          secondaryHref={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000"}?text=${encodeURIComponent(
            `Hi, I'd like to know more about ${procedure.title} in China. Can you help?`
          )}`}
        />

        <section className="section container">
          <JsonLd data={schema} />
          <JsonLd data={faqSchema} />

          <article className="card">
            <h2>Procedure Overview</h2>
            {procedure.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="badge-row">
              <span className="badge">Typical stay: {procedure.durationDays}</span>
              <span className="badge">{procedure.servicePackage}</span>
              <span className="badge">Save {procedure.savingsPct}%</span>
            </div>
          </article>

          {procedure.timelineDisclosure ? (
            <article className="card trust-block">
              <p className="card-eyebrow">Timeline Clarity</p>
              <h3>{procedure.timelineDisclosure.title}</h3>
              <ul className="trust-list">
                {procedure.timelineDisclosure.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {procedure.timelineDisclosure.note ? (
                <p className="trust-note">{procedure.timelineDisclosure.note}</p>
              ) : null}
            </article>
          ) : null}
        </section>

        <section className="section container">
          <h2>Price Comparison (Localized Display + USD Baseline)</h2>
          <table className="price-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Estimated Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="advantage-row">
                <td>
                  China
                  <span className="advantage-chip">Advantage</span>
                </td>
                <td className="advantage-cell">
                  <LocalizedPrice usd={procedure.prices.chinaUsd} emphasize showUsdHint={false} />
                </td>
              </tr>
              <tr>
                <td>United States</td>
                <td>
                  <LocalizedPrice usd={procedure.prices.usUsd} showUsdHint={false} />
                </td>
              </tr>
              <tr>
                <td>United Kingdom</td>
                <td><LocalizedPrice usd={procedure.prices.ukUsd} /></td>
              </tr>
              {procedure.prices.auUsd ? (
                <tr>
                  <td>Australia</td>
                  <td><LocalizedPrice usd={procedure.prices.auUsd} /></td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <p className="trust-note">{getUsdFxReferenceNote()}</p>
        </section>

        <ProcedureTimeComparison procedure={procedure} />

        <section className="section container">
          <h2>Recommended Hospitals</h2>
          <div className="card-grid three">
            {relatedHospitals.map((hospital) => (
              <HospitalCard key={hospital.slug} hospital={hospital} />
            ))}
          </div>
        </section>

        <section className="section container">
          <FaqList items={procedure.faqs} />
        </section>

        {procedureTrust ? <RiskDisclosure trust={procedureTrust} /> : null}
        {procedureTrust ? <PricingDisclosure trust={procedureTrust} /> : null}
        {emergencyPathway.length ? <EmergencyPathway items={emergencyPathway} /> : null}

        <section className="section container card-grid three">
          <article className="card trust-block">
            <h3>Not Suitable Screening</h3>
            <p>
              Use the pre-screen tool to identify profiles that should pause travel until
              physician clearance is completed.
            </p>
            <p>
              <Link href="/eligibility-screening">Open screening tool</Link>
            </p>
          </article>

          <article className="card trust-block">
            <h3>Post-Op SLA</h3>
            <p>
              Red-flag escalation target: 15 minutes. Clinical pathway target: 2 hours.
            </p>
            <p>
              <Link href="/care-sla">Read SLA details</Link>
            </p>
          </article>

          <article className="card trust-block">
            <h3>Full Budget Planning</h3>
            <p>
              Build low/median/high budget ranges including travel and follow-up costs.
            </p>
            <p>
              <Link href="/cost-calculator">Open cost calculator</Link>
            </p>
          </article>
        </section>

        <SiteDisclosurePanel />

        <section className="section container">
          <div className="cta-box">
            <h2>Request a Personalized Cost Estimate</h2>
            <InquiryForm />
          </div>
        </section>
      </>
    );
  }

  const cityGuide = getCityGuideBySlug(slug);
  if (cityGuide) {
    const cityHospitalList = hospitals.filter(
      (hospital) => hospital.city === cityGuide.city.toLowerCase()
    );

    const citySchema = {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: cityGuide.title,
      description: cityGuide.summary,
      about: {
        "@type": "City",
        name: cityGuide.city
      }
    };

    const cityFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cityGuide.faqs.map((faq) => ({
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
            { label: cityGuide.title, href: `/${cityGuide.slug}` }
          ]}
        />

        <Hero
          eyebrow="City Guide"
          title={cityGuide.title}
          subtitle={cityGuide.summary}
        />

        <section className="section container">
          <JsonLd data={citySchema} />
          <JsonLd data={cityFaqSchema} />
          <article className="card">
            <p className="card-eyebrow">City Overview</p>
            {cityGuide.sections.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </section>

        <section className="section container">
          <p className="section-kicker">Transport Guide</p>
          <h2>Arrival and In-City Movement</h2>
          <div className="card-grid two">
            {cityGuide.transportGuide.map((item) => (
              <article className="card trust-block" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <p className="section-kicker">Accommodation Areas</p>
          <h2>Recommended Stay Zones</h2>
          <div className="card-grid three">
            {cityGuide.stayAreas.map((area) => (
              <article className="card trust-block" key={area.area}>
                <h3>{area.area}</h3>
                <p>{area.description}</p>
                <p className="trust-note">
                  <strong>Typical nightly range:</strong> {area.typicalNightlyUsd}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container">
          <p className="section-kicker">Entry and Compliance</p>
          <h2>Visa and Arrival Preparation</h2>
          <article className="card trust-block">
            <ul className="trust-list">
              {cityGuide.entryTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section container">
          <h2>{cityGuide.city} Hospitals</h2>
          <div className="card-grid three">
            {cityHospitalList.map((hospital) => (
              <HospitalCard key={hospital.slug} hospital={hospital} />
            ))}
          </div>
        </section>

        <section className="section container">
          <p className="section-kicker">City FAQs</p>
          <FaqList items={cityGuide.faqs} />
        </section>
      </>
    );
  }

  notFound();
}

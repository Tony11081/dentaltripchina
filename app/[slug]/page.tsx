import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqList } from "@/components/faq-list";
import { HospitalCard } from "@/components/hospital-card";
import { InquiryForm } from "@/components/inquiry-form";
import { MarketLandingPageView } from "@/components/market-landing-page";
import { ProcedureTimeComparison } from "@/components/time-comparison";
import {
  EmergencyPathway,
  PricingDisclosure,
  RiskDisclosure,
  SiteDisclosurePanel,
  SourceReferenceSection
} from "@/components/trust-sections";
import { ExtractableSummary } from "@/components/extractable-summary";
import {
  getCaseStudiesByProcedureSlug,
  getCityGuideBySlug,
  getHospitalsBySlugs,
  getMarketLandingBySlug,
  getProcedureBySlug
} from "@/lib/content";
import { hospitals } from "@/data/hospitals";
import { procedures } from "@/data/procedures";
import { cityGuides } from "@/data/cities";
import { marketLandingPages } from "@/data/market-pages";
import { JsonLd } from "@/components/json-ld";
import { hospitalTrustProfiles, procedureTrustProfiles } from "@/data/trust";
import { getUsdFxReferenceNote } from "@/lib/currency";
import { LocalizedPrice } from "@/components/localized-price";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { editorialUpdates } from "@/data/editorial-updates";
import { getCityGuideImage, getProcedureImage } from "@/lib/site-images";

interface SourceItem {
  label: string;
  href: string;
  description: string;
  linkText: string;
  external?: boolean;
}

export function generateStaticParams() {
  return [...procedures, ...cityGuides, ...marketLandingPages].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);

  if (procedure) {
    const procedureImage = getProcedureImage(procedure.slug);

    return buildMetadata({
      title: `${procedure.title} Cost in China (2026)`,
      description: `Get ${procedure.title} in China at trusted hospitals. Compare prices vs US and UK.`,
      path: `/${procedure.slug}`,
      imagePath: procedureImage.src
    });
  }

  const cityGuide = getCityGuideBySlug(slug);
  if (cityGuide) {
    const cityImage = getCityGuideImage(cityGuide.slug);

    return buildMetadata({
      title: cityGuide.title,
      description: cityGuide.summary,
      path: `/${cityGuide.slug}`,
      imagePath: cityImage.src
    });
  }

  const marketLandingPage = getMarketLandingBySlug(slug);
  if (marketLandingPage) {
    return buildMetadata({
      title: marketLandingPage.title,
      description: marketLandingPage.metaDescription,
      path: `/${marketLandingPage.slug}`,
      imagePath: `/market-og/${marketLandingPage.slug}`
    });
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
    const featuredCase = getCaseStudiesByProcedureSlug(procedure.slug)[0];
    const emergencyPathway =
      hospitalTrustProfiles.find((item) =>
        procedure.partnerHospitalSlugs.includes(item.hospitalSlug)
      )?.emergencyPathway || [];
    const procedureImage = getProcedureImage(procedure.slug);
    const pageUrl = absoluteUrl(`/${procedure.slug}`);
    const procedureUpdate = editorialUpdates.find((item) => item.page === `/${procedure.slug}`);
    const sourceReferences = [
      {
        label: "Provider Verification Desk",
        href: "/verification",
        description:
          "Named-doctor registry links, hospital verification timestamps, and scope boundaries for partner providers.",
        linkText: "Open verification page"
      },
      {
        label: "Trust Center",
        href: "/trust-center",
        description:
          "Published escalation targets, trust metrics, and quality-monitoring policies that support treatment pages.",
        linkText: "Open trust center"
      },
      {
        label: "Post-Op Support SLA",
        href: "/care-sla",
        description:
          "Response-time commitments for red-flag escalation, clinical pathway guidance, and continuity handoff.",
        linkText: "Read SLA details"
      },
      procedureUpdate
        ? {
            label: "Latest Public Content Update",
            href: "/content-updates",
            description: `${procedureUpdate.date}: ${procedureUpdate.change}`,
            linkText: "Open update log"
          }
        : {
            label: "Editorial Review Policy",
            href: "/editorial-policy",
            description:
              "Methodology for how medical planning content is drafted, reviewed, and refreshed.",
            linkText: "Read editorial policy"
          },
      featuredCase
        ? {
            label: "Related Case Study",
            href: `/case-studies/${featuredCase.slug}`,
            description:
              "Real patient pathway with total spend, treatment timeline, and follow-up outcome for this procedure.",
            linkText: "Open case study"
          }
        : null,
      ...relatedHospitals.flatMap((hospital) => [
        {
          label: `Hospital Profile: ${hospital.name}`,
          href: `/hospital/${hospital.slug}`,
          description:
            "Hospital capability, department highlights, and verification evidence for this treatment pathway.",
          linkText: "Open hospital profile"
        },
        hospital.website
          ? {
              label: `Official Site: ${hospital.name}`,
              href: hospital.website,
              description:
                "Provider-published service and contact information used as a supporting external source.",
              linkText: "Visit official site",
              external: true
            }
          : {
              label: `Official Listing: ${hospital.name}`,
              href: hospital.jciVerifyUrl,
              description:
                "Official accreditation or public hospital listing used as an external source reference.",
              linkText: "Open official listing",
              external: true
            }
      ])
    ].filter((item): item is SourceItem => item !== null);
    const sourceUrls = sourceReferences.map((item) =>
      item.external ? item.href : absoluteUrl(item.href)
    );

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": procedure.schemaType,
          "@id": `${pageUrl}#procedure`,
          name: procedure.title,
          url: pageUrl,
          description: procedure.excerpt,
          image: absoluteUrl(procedureImage.src),
          mainEntityOfPage: {
            "@id": `${pageUrl}#webpage`
          },
          howPerformed: procedure.body.join(" "),
          preparation:
            "Share current diagnostics, relevant medical history, and travel constraints before treatment confirmation.",
          ...(procedureTrust
            ? {
                followup: procedureTrust.recoveryMilestones.join(" "),
                possibleComplication: procedureTrust.commonRisks.join("; ")
              }
            : {}),
          performer: relatedHospitals.map((hospital) => ({
            "@type": "Hospital",
            name: hospital.name,
            url: absoluteUrl(`/hospital/${hospital.slug}`)
          })),
          offers: {
            "@type": "Offer",
            url: pageUrl,
            price: procedure.prices.chinaUsd,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "DentalTripChina",
              url: absoluteUrl("/")
            }
          }
        },
        {
          "@type": "MedicalWebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: `${procedure.title} Cost in China (2026)`,
          description: procedure.excerpt,
          about: {
            "@id": `${pageUrl}#procedure`
          },
          inLanguage: "en-GB",
          relatedLink: sourceUrls,
          ...(procedureUpdate ? { lastReviewed: procedureUpdate.date } : {})
        }
      ]
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
          heroImageSrc={procedureImage.src}
          heroImageAlt={procedureImage.alt}
          secondaryHref={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000"}?text=${encodeURIComponent(
            `Hi, I'd like to know more about ${procedure.title} in China. Can you help?`
          )}`}
          heroMetrics={[
            { value: `${procedure.savingsPct}%`, label: "Typical savings" },
            { value: procedure.durationDays, label: "Typical stay" },
            { value: `${relatedHospitals.length}`, label: "Partner hospitals" }
          ]}
          panelTitle="Use this page to decide fit, timing, and total budget"
          panelDescription="Procedure pages now surface the key commercial and clinical checks before a patient has to contact support."
          panelList={[
            `Compare ${procedure.title} pricing against home-market references`,
            "See trust, risk, and recovery notes on the same page",
            "Jump straight to hospitals, FAQs, or request form"
          ]}
        />

        <section className="section container" id="overview">
          <JsonLd data={schema} />
          <JsonLd data={faqSchema} />
          <nav className="section-nav" aria-label={`${procedure.title} page sections`}>
            <a className="section-link" href="#overview">
              Overview
            </a>
            <a className="section-link" href="#prices">
              Pricing
            </a>
            <a className="section-link" href="#timeline">
              Timeline
            </a>
            <a className="section-link" href="#hospitals">
              Hospitals
            </a>
            <a className="section-link" href="#faq">
              FAQs
            </a>
            <a className="section-link" href="#sources">
              Sources
            </a>
            <a className="section-link" href="#request">
              Request estimate
            </a>
          </nav>

          <ExtractableSummary
            eyebrow="At A Glance"
            title="Fast Summary"
            description="This block isolates the shortest useful answer on price, timing, fit, and freshness for users, search results, and AI retrieval."
            id="procedure-summary"
            items={[
              {
                label: "Typical China estimate",
                value: <LocalizedPrice usd={procedure.prices.chinaUsd} emphasize showUsdHint={false} />
              },
              {
                label: "Typical China booking wait",
                value: procedure.timeComparison.china.appointmentWait
              },
              {
                label: "Typical stay in China",
                value: procedure.durationDays
              },
              {
                label: "Often suitable for",
                value: procedureTrust
                  ? procedureTrust.suitableFor.slice(0, 2).join(" | ")
                  : "Patients with complete diagnostics and realistic travel windows."
              },
              {
                label: "Pause travel if",
                value: procedureTrust
                  ? procedureTrust.chinaTravelNotRecommended[0]
                  : "Physician clearance has not been completed."
              },
              {
                label: "Latest public review",
                value: procedureUpdate?.date || "Current public version"
              }
            ]}
          />

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

        <section className="section container" id="prices">
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

        <div id="timeline">
          <ProcedureTimeComparison procedure={procedure} />
        </div>

        <section className="section container" id="hospitals">
          <h2>Recommended Hospitals</h2>
          <div className="card-grid three">
            {relatedHospitals.map((hospital) => (
              <HospitalCard key={hospital.slug} hospital={hospital} />
            ))}
          </div>
        </section>

        <section className="section container" id="faq">
          <FaqList items={procedure.faqs} />
        </section>

        {procedureTrust ? <RiskDisclosure trust={procedureTrust} /> : null}
        {procedureTrust ? <PricingDisclosure trust={procedureTrust} /> : null}
        {emergencyPathway.length ? <EmergencyPathway items={emergencyPathway} /> : null}

        <SourceReferenceSection
          eyebrow="Primary Sources"
          title="Verification Inputs and Supporting Sources"
          description="Use these pages and official provider links to verify claims, compare providers, and audit the planning assumptions."
          items={sourceReferences}
          id="sources"
        />

        <section className="section container card-grid three">
          <article className="card trust-block">
            <h3>Fit Before Booking</h3>
            <p>
              If your available travel window is too short for safe treatment and follow-up,
              we will tell you directly before booking and recommend pre-clearance or postponement.
            </p>
            <p>
              <Link href="/eligibility-screening">Open screening tool</Link>
            </p>
          </article>

          <article className="card trust-block">
            <h3>Pre-Travel Quote and Video Consultation</h3>
            <p>
              Itemized quotes can be issued before travel. Doctor video consultation may be
              arranged after deposit and case pre-screening, depending on hospital and specialty availability.
            </p>
            <p>
              <Link href="/contact">Request a quote</Link>
            </p>
          </article>

          <article className="card trust-block">
            <h3>Post-Op Support and Responsibility</h3>
            <p>
              Urgent non-emergency concerns target 15-minute escalation and 2-hour next-step
              guidance. Clinical responsibility remains with the treating hospital and licensed clinicians.
            </p>
            <p>
              <Link href="/care-sla">Read SLA details</Link>
            </p>
          </article>
        </section>

        <SiteDisclosurePanel />

        <section className="section container" id="request">
          <div className="cta-box">
            <h2>Request a Personalized Cost Estimate</h2>
            <InquiryForm />
          </div>
        </section>
      </>
    );
  }

  const marketLandingPage = getMarketLandingBySlug(slug);
  if (marketLandingPage) {
    return <MarketLandingPageView page={marketLandingPage} />;
  }

  const cityGuide = getCityGuideBySlug(slug);
  if (cityGuide) {
    const cityHospitalList = hospitals.filter(
      (hospital) => hospital.city === cityGuide.city.toLowerCase()
    );
    const cityImage = getCityGuideImage(cityGuide.slug);

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
          heroImageSrc={cityImage.src}
          heroImageAlt={cityImage.alt}
          heroMetrics={[
            { value: cityGuide.city, label: "Destination" },
            { value: `${cityHospitalList.length}`, label: "Hospital profiles" },
            { value: "Arrival", label: "Travel planning" }
          ]}
          panelTitle="Plan the city around the treatment schedule"
          panelDescription="City guides work best when they connect airport arrival, stay zones, and provider access in one page."
          panelList={[
            "Review transport and stay guidance by city",
            "Check entry preparation before booking",
            "Jump straight into city-specific hospital profiles"
          ]}
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

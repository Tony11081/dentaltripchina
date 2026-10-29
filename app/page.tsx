import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { PriceGap, type PriceGapItem } from "@/components/price-gap";
import { procedures } from "@/data/procedures";
import { hospitals } from "@/data/hospitals";
import { cityGuides } from "@/data/cities";
import { caseStudies } from "@/data/case-studies";
import { marketLandingPages } from "@/data/market-pages";
import { companyProfile } from "@/data/company-profile";
import { buildMetadata } from "@/lib/metadata";
import { formatUsd, getUsdFxReferenceNote } from "@/lib/currency";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Dental Treatment in China at a Third of the Price | DentalTripChina",
  description:
    "Dental implants, All-on-4, veneers, LASIK and health checks at JCI-accredited hospitals in Shanghai and Beijing. Compare prices, send your X-ray, and get a quote within 2 hours.",
  path: "/",
  imagePath: pageImageAssets.homeHero.src
});

// Short labels and plain-language stay times for the price comparison.
const priceGapMeta: Record<string, { label: string; stay: string }> = {
  "dental-implants-china": {
    label: "Dental implant",
    stay: "3–5 days, then 3–6 months of healing before the final crown"
  },
  "all-on-4-china": { label: "All-on-4", stay: "5–7 days" },
  "veneers-china": { label: "Veneers", stay: "2–4 days" },
  "root-canal-china": { label: "Root canal", stay: "1–2 days" },
  "lasik-china": { label: "LASIK", stay: "2–3 days" },
  "health-checkup-china": { label: "Health check", stay: "1–2 days" }
};

const cityName: Record<string, string> = { shanghai: "Shanghai", beijing: "Beijing" };

const homeFaqs = [
  {
    question: "Can I finish dental implants in one trip?",
    answer:
      "Usually not. The first trip covers scans and placing the implant, normally 3–5 days in China. The bone then needs 3–6 months to heal before the final crown is fitted, either on a second short trip or with a dentist at home, agreed before you travel."
  },
  {
    question: "How do I get a price for my own teeth?",
    answer:
      "Send an X-ray, a CT scan or clear photos with the quote form. A coordinator reviews them with the hospital and replies with a written plan and estimate, usually within 2 hours."
  },
  {
    question: "Who do I pay, and when?",
    answer:
      "You pay the hospital directly for treatment. Our coordination fee is separate and billed by us. We do not take commission from hospitals."
  },
  {
    question: "Do I need a visa?",
    answer:
      "Many nationalities can now enter China visa-free for short stays. Rules depend on your passport, so check our visa guide before booking flights."
  },
  {
    question: "What happens if something goes wrong after I fly home?",
    answer:
      "Your coordinator stays in touch by message and video after you leave. If you need care, we arrange a review with the hospital and share your records with your dentist at home."
  }
];

export default function HomePage() {
  const fxNote = getUsdFxReferenceNote();

  const priceGapItems: PriceGapItem[] = procedures
    .filter((procedure) => priceGapMeta[procedure.slug])
    .map((procedure) => ({
      slug: procedure.slug,
      label: priceGapMeta[procedure.slug].label,
      title: procedure.title.replace(" in China", ""),
      chinaUsd: procedure.prices.chinaUsd,
      homeUsd: {
        uk: procedure.prices.ukUsd,
        us: procedure.prices.usUsd,
        au: procedure.prices.auUsd
      },
      stay: priceGapMeta[procedure.slug].stay
    }));

  const featuredHospitals = hospitals.slice(0, 3);
  const featuredCase = caseStudies[0];
  const caseTotal = featuredCase
    ? Object.values(featuredCase.costBreakdown).reduce((sum, value) => sum + value, 0)
    : 0;

  const marketGuideGroups = Array.from(
    marketLandingPages.reduce((groups, page) => {
      const current = groups.get(page.countryName) || [];
      current.push(page);
      groups.set(page.countryName, current);
      return groups;
    }, new Map<string, typeof marketLandingPages>())
  ).slice(0, 3);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <p className="eyebrow">Shanghai and Beijing</p>
            <h1>Dental care in China, at a third of the price at home.</h1>
            <p className="home-hero-lede">
              We match you with internationally accredited hospitals, plan your trip around the
              treatment, and stay with you in English from the first X-ray to the follow-up at
              home.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary" href="#quote">
                Send your X-ray for a free quote
              </Link>
              <Link href="/pricing">See all prices</Link>
            </div>
            <p className="home-hero-note">
              A written plan and estimate, usually within 2 hours. No obligation.
            </p>
          </div>

          <PriceGap items={priceGapItems} fxNote={fxNote} />
        </div>
      </section>

      <section className="hospital-strip" aria-label="Partner hospitals">
        <div className="container hospital-strip-inner">
          <p className="hospital-strip-label">Our partner hospitals</p>
          {featuredHospitals.map((hospital) => (
            <p className="hospital-strip-item" key={hospital.slug}>
              <strong>{hospital.name}</strong>
              <span>
                {hospital.jciYear > 0
                  ? `${cityName[hospital.city]}, JCI accredited since ${hospital.jciYear}`
                  : `${cityName[hospital.city]}, specialist eye hospital`}
              </span>
            </p>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="journey-title">
        <h2 id="journey-title">How a treatment trip works</h2>
        <p className="section-lede">
          Most patients spend between two days and a week in China. Here is what happens, and
          when.
        </p>
        <ol className="journey">
          <li>
            <span className="journey-when">Today</span>
            <h3>Send your X-ray</h3>
            <p>Upload an X-ray, scan or photos. No X-ray yet? Describe what is wrong.</p>
          </li>
          <li>
            <span className="journey-when">Within 2 hours</span>
            <h3>Get a plan and quote</h3>
            <p>A coordinator matches you with a hospital and sends a written estimate.</p>
          </li>
          <li>
            <span className="journey-when">Before you fly</span>
            <h3>Book the trip</h3>
            <p>We arrange the appointments, airport pickup and a hotel near the hospital.</p>
          </li>
          <li>
            <span className="journey-when">In China</span>
            <h3>Have the treatment</h3>
            <p>English-speaking support at each appointment, and one person to message.</p>
          </li>
          <li>
            <span className="journey-when">Back home</span>
            <h3>Follow-up</h3>
            <p>Video check-ins after you leave, and records shared with your own dentist.</p>
          </li>
        </ol>
      </section>

      <section className="section home-prices" aria-labelledby="prices-title">
        <div className="container">
          <div className="home-prices-head">
            <div>
              <h2 id="prices-title">Typical prices</h2>
              <p className="section-lede">
                Hospital prices for a standard case, compared with typical private prices at
                home. Your quote depends on your scans.
              </p>
            </div>
            <Link className="btn btn-secondary" href="/cost-calculator">
              Estimate your total trip cost
            </Link>
          </div>

          <div className="table-scroll">
            <table className="home-price-table">
              <thead>
                <tr>
                  <th scope="col">Treatment</th>
                  <th scope="col" className="num">
                    In China
                  </th>
                  <th scope="col" className="num">
                    UK
                  </th>
                  <th scope="col" className="num">
                    US
                  </th>
                  <th scope="col" className="num">
                    Australia
                  </th>
                  <th scope="col">Time in China</th>
                </tr>
              </thead>
              <tbody>
                {procedures.map((procedure) => (
                  <tr key={procedure.slug}>
                    <th scope="row">
                      <Link href={`/${procedure.slug}`}>
                        {procedure.title.replace(" in China", "")}
                      </Link>
                    </th>
                    <td className="num china" data-label="In China">
                      {formatUsd(procedure.prices.chinaUsd)}
                    </td>
                    <td className="num home" data-label="UK">
                      {formatUsd(procedure.prices.ukUsd)}
                    </td>
                    <td className="num home" data-label="US">
                      {formatUsd(procedure.prices.usUsd)}
                    </td>
                    <td className="num home" data-label="Australia">
                      {procedure.prices.auUsd ? formatUsd(procedure.prices.auUsd) : "Not listed"}
                    </td>
                    <td className="stay">
                      {priceGapMeta[procedure.slug]?.stay || procedure.durationDays}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="home-prices-note">
            All prices in US dollars so they can be compared. Flights and hotel are not included.
          </p>
        </div>
      </section>

      <section className="section container" aria-labelledby="hospitals-title">
        <h2 id="hospitals-title">The hospitals we work with</h2>
        <p className="section-lede">
          International hospitals with English-speaking staff, most of them accredited by Joint
          Commission International. You choose the hospital; we explain the options.
        </p>
        <div className="home-hospitals">
          {featuredHospitals.map((hospital) => (
            <article className="home-hospital" key={hospital.slug}>
              <figure>
                <Image
                  src={hospital.heroImageSrc}
                  alt={hospital.heroImageAlt}
                  width={800}
                  height={600}
                  sizes="(max-width: 980px) 100vw, 33vw"
                />
              </figure>
              <p className="home-hospital-city">{cityName[hospital.city]}</p>
              <h3>
                <Link href={`/hospital/${hospital.slug}`}>{hospital.name}</Link>
              </h3>
              <p>{hospital.summary}</p>
              <ul className="home-hospital-meta">
                {hospital.jciYear > 0 && (
                  <li className="jci">
                    <a href={hospital.jciVerifyUrl} target="_blank" rel="noopener noreferrer">
                      JCI accredited since {hospital.jciYear}
                    </a>
                  </li>
                )}
                {hospital.englishStaff && <li>English-speaking staff</li>}
              </ul>
            </article>
          ))}
        </div>
        <p className="case-links-row">
          <Link href="/hospitals">All hospitals and departments</Link>
        </p>
      </section>

      {featuredCase && (
        <section className="section container" aria-labelledby="case-title">
          <h2 id="case-title">One patient&apos;s trip, with every cost</h2>
          <div className="home-case">
            <div>
              <blockquote>&ldquo;{featuredCase.testimonial.quote}&rdquo;</blockquote>
              <p className="home-case-who">
                Patient from the {featuredCase.country === "United Kingdom" ? "UK" : featuredCase.country},
                treated in {featuredCase.city}. {featuredCase.testimonial.incentiveDisclosure}
              </p>
              <p className="home-case-context">{featuredCase.patientContext}</p>
              <p className="home-case-context">{featuredCase.outcome}</p>
              <div className="home-case-links">
                <Link href={`/case-studies/${featuredCase.slug}`}>Read the full day-by-day case</Link>
                <Link href="/case-studies">More patient stories</Link>
              </div>
            </div>
            <aside className="home-case-ledger" aria-label="Trip cost breakdown">
              <h3>What the trip cost</h3>
              <p>{featuredCase.title.split(": ").slice(-1)[0]}</p>
              <dl>
                <dt>Treatment</dt>
                <dd>{formatUsd(featuredCase.costBreakdown.treatmentUsd)}</dd>
                <dt>Flights and hotel</dt>
                <dd>{formatUsd(featuredCase.costBreakdown.flightHotelUsd)}</dd>
                <dt>Follow-up</dt>
                <dd>{formatUsd(featuredCase.costBreakdown.followUpUsd)}</dd>
                <dt>Other</dt>
                <dd>{formatUsd(featuredCase.costBreakdown.extraUsd)}</dd>
                <div className="total" style={{ display: "contents" }}>
                  <dt>Total</dt>
                  <dd>{formatUsd(caseTotal)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      )}

      <section className="section home-fees" aria-labelledby="fees-title">
        <div className="container">
          <h2 id="fees-title">How we are paid</h2>
          <div className="home-fees-grid">
            <div>
              <h3>You pay the hospital directly</h3>
              <p>Treatment fees go straight to the hospital, at the hospital&apos;s own prices.</p>
            </div>
            <div>
              <h3>Our fee is separate</h3>
              <p>
                We charge a coordination fee for matching, translation, scheduling and travel
                support, billed by us.
              </p>
            </div>
            <div>
              <h3>No hospital commission</h3>
              <p>
                Hospitals do not pay us for referrals, so the hospital we suggest is the one that
                fits your case.
              </p>
            </div>
          </div>
          <p className="home-fees-note">
            We are a travel and coordination service, not a clinic. Diagnosis and treatment are
            provided by licensed hospitals and clinicians in China.{" "}
            <Link href="/about">Who we are</Link>
          </p>
        </div>
      </section>

      <section className="section container home-faq" aria-labelledby="faq-title">
        <div>
          <h2 id="faq-title">Questions patients ask first</h2>
          <p className="section-lede">
            Something else on your mind? Write to{" "}
            <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>.
          </p>
        </div>
        <div className="faq-list">
          {homeFaqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>
                {faq.answer}
                {faq.question === "Do I need a visa?" && (
                  <>
                    {" "}
                    <Link href="/china-visa-free-medical-tourism">Read the visa guide</Link>.
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="section home-quote" id="quote" aria-labelledby="quote-title">
        <div className="container home-quote-inner">
          <div>
            <h2 id="quote-title">Get your treatment plan and quote</h2>
            <p className="section-lede">
              Free, with no obligation. The more you send, the more exact the quote.
            </p>
            <ol className="home-quote-steps">
              <li>Tell us what you need and where you are travelling from.</li>
              <li>Attach an X-ray, scan or photos if you have them.</li>
              <li>We reply by your chosen channel, usually within 2 hours.</li>
            </ol>
          </div>
          <div className="home-quote-form">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="container home-guides" aria-labelledby="guides-title">
        <h2 id="guides-title" className="section-kicker">
          Planning guides
        </h2>
        <div className="home-guides-grid">
          <div>
            <h3>Cities</h3>
            <ul>
              {cityGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/${guide.slug}`}>{guide.title.split(" - ")[0]}</Link>
                </li>
              ))}
              <li>
                <Link href="/china-visa-free-medical-tourism">Visa-free entry</Link>
              </li>
            </ul>
          </div>
          {marketGuideGroups.map(([country, pages]) => (
            <div key={country}>
              <h3>From {country === "United Kingdom" ? "the UK" : country === "United States" ? "the US" : country}</h3>
              <ul>
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/${page.slug}`}>
                      {page.title.split(":")[0].replace(/^[A-Z]{2} /, "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

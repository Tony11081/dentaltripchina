import { Hero } from "@/components/hero";
import Link from "next/link";
import { TrustBar } from "@/components/trust-bar";
import { ProcedureCard } from "@/components/procedure-card";
import { HospitalCard } from "@/components/hospital-card";
import { CaseStudyCard } from "@/components/case-study-card";
import { InquiryForm } from "@/components/inquiry-form";
import { SiteDisclosurePanel } from "@/components/trust-sections";
import { procedures } from "@/data/procedures";
import { hospitals } from "@/data/hospitals";
import { cityGuides } from "@/data/cities";
import { caseStudies } from "@/data/case-studies";
import { testimonials } from "@/data/testimonials";
import {
  companyIdentityDisclosureNote,
  companyProfile,
  publishedCompanyIdentityItems
} from "@/data/company-profile";

export default function HomePage() {
  const featuredCases = caseStudies.slice(0, 2);
  const featuredQuotes = testimonials.filter((item) => item.verified).slice(0, 2);

  return (
    <>
      <Hero
        eyebrow="Dental, LASIK, Checkups"
        title="World-Class Medical Care in China - Save 70%+"
        subtitle="Compare treatment plans at trusted hospitals in Shanghai and Beijing with English support and transparent pricing."
        heroImageSrc="/editorial/hero-consultation.svg"
        heroImageAlt="Consultation planning dashboard for medical travel in China"
        heroImagePriority
        heroMetrics={[
          { value: `${procedures.length}`, label: "Core procedures" },
          { value: `${hospitals.length}`, label: "Verified hospitals" },
          { value: "2h", label: "Reply target" }
        ]}
        panelTitle="Start with price, provider fit, and verification"
        panelDescription="Use the site as a planning desk, not just a brochure. Compare scope, timing, and trust signals before you enquire."
        panelList={[
          "Jump from pricing to provider profiles in one flow",
          "Check named doctors and verification dates",
          "Send records only when you are ready"
        ]}
      />

      <TrustBar />

      <section className="section container">
        <p className="section-kicker">Start Here</p>
        <h2>Choose the Fastest Next Step</h2>
        <div className="card-grid four">
          <article className="card trust-block">
            <h3>Compare Prices</h3>
            <p>See procedure-by-procedure pricing and wait-time comparisons before contacting us.</p>
            <p>
              <Link className="btn btn-secondary" href="/pricing">
                Open pricing table
              </Link>
            </p>
          </article>
          <article className="card trust-block">
            <h3>Check Hospitals</h3>
            <p>Review departments, location, and international intake notes for each hospital.</p>
            <p>
              <Link className="btn btn-secondary" href="/hospitals">
                Browse hospitals
              </Link>
            </p>
          </article>
          <article className="card trust-block">
            <h3>Verify Trust Signals</h3>
            <p>Open doctor, hospital, and policy evidence before committing to a plan.</p>
            <p>
              <Link className="btn btn-secondary" href="/trust-center">
                Open trust center
              </Link>
            </p>
          </article>
          <article className="card trust-block">
            <h3>Request a Plan</h3>
            <p>Share your procedure, budget, and timeline to receive a tailored next-step recommendation.</p>
            <p>
              <Link className="btn btn-primary" href="/contact">
                Request free quote
              </Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Operator Desk</p>
        <h2>Contact, Identity, and Responsibility Boundary</h2>
        <article className="card trust-block">
          {publishedCompanyIdentityItems.length ? (
            publishedCompanyIdentityItems.map((item) => (
              <p key={item.key}>
                <strong>{item.label}:</strong> {item.value}
              </p>
            ))
          ) : (
            <p className="trust-note">{companyIdentityDisclosureNote}</p>
          )}
          <p>
            <strong>Support channels:</strong>{" "}
            <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>{" "}
            |{" "}
            <a href={`tel:${companyProfile.supportPhone.replace(/\s+/g, "")}`}>
              {companyProfile.supportPhone}
            </a>
          </p>
          <p>
            <strong>Operations desk:</strong> {companyProfile.operationsAddress}
          </p>
          <p className="trust-note">
            We are a coordination service for cross-border care planning. Hospitals make final
            clinical decisions.
          </p>
          <p>
            <Link href="/about">Open full company profile</Link>
          </p>
        </article>
      </section>

      <section className="section container">
        <p className="section-kicker">Our Advantages</p>
        <h2>Why Patients Choose Our Service</h2>
        <p className="section-lede muted">
          We are a coordination service built around speed, transparency, and verifiable
          trust. China-specific advantages are highlighted with real evidence.
        </p>
        <div className="card-grid three">
          <article className="card trust-block">
            <p className="card-eyebrow">China Time Advantage</p>
            <h3>Appointment Wait Is Often Negligible</h3>
            <p>Most procedures can be scheduled quickly in China private pathways.</p>
            <p className="home-adv-value">China: 1-5 days | UK/US/AU: weeks to months</p>
            <p>
              <Link href="/pricing">See appointment and treatment timeline table</Link>
            </p>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">China Cost Advantage</p>
            <h3>70-85% Typical Savings vs UK/US</h3>
            <p>Clear quote scopes and one-click low/median/high total budget planning.</p>
            <p className="home-adv-value">Treatment + flight + hotel + follow-up + extras</p>
            <p>
              <Link href="/cost-calculator">Open full cost calculator</Link>
            </p>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">Verification Advantage</p>
            <h3>Named Doctors, License IDs, Public Links</h3>
            <p>Each partner profile includes latest verification date and scope boundary.</p>
            <p className="home-adv-value">No anonymous provider claims</p>
            <p>
              <Link href="/verification">Open doctor and hospital verification</Link>
            </p>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">Safety Advantage</p>
            <h3>Post-Op SLA You Can Audit</h3>
            <p>Red-flag escalation and clinical guidance windows are publicly committed.</p>
            <p className="home-adv-value">15 min escalation | 2h care-path guidance</p>
            <p>
              <Link href="/care-sla">Read post-op SLA details</Link>
            </p>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">Transparency Advantage</p>
            <h3>Real Cases, Including Complications</h3>
            <p>We publish full timelines, total costs, and complication management actions.</p>
            <p className="home-adv-value">Not only success stories</p>
            <p>
              <Link href="/case-studies">Open real case center</Link>
            </p>
          </article>

          <article className="card trust-block">
            <p className="card-eyebrow">Service Advantage</p>
            <h3>English Coordination from Inquiry to Follow-Up</h3>
            <p>One team handles provider matching, travel flow, and continuity handoff.</p>
            <p className="home-adv-value">Median first response: 17 minutes</p>
            <p>
              <Link href="/trust-dashboard">View monthly trust metrics</Link>
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Feature Issue</p>
        <div className="editorial-note">
          <p>
            Patients from the UK, Australia, and North America increasingly choose
            China for quality care with lower out-of-pocket cost. We curate providers
            based on standards, communication, and treatment fit.
          </p>
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Treatment Index</p>
        <h2>Popular Procedures</h2>
        <p className="muted section-lede">
          Compare treatment costs and expected travel timelines for the most requested services.
        </p>
        <div className="card-grid three">
          {procedures.slice(0, 6).map((procedure) => (
            <ProcedureCard key={procedure.slug} procedure={procedure} />
          ))}
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Provider Desk</p>
        <h2>Featured Hospitals</h2>
        <div className="card-grid three">
          {hospitals.slice(0, 3).map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      </section>

      <section className="section container">
        <p className="section-kicker">Real Outcomes</p>
        <h2>Real Cases and Patient Voices</h2>
        <p className="muted section-lede">
          Read full case timelines with total spend and follow-up details, then compare with
          verified patient quotes.
        </p>
        <div className="card-grid two">
          {featuredCases.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="card-grid two case-quotes-grid">
          {featuredQuotes.map((item) => (
            <article className="card trust-block" key={item.id}>
              <p className="card-eyebrow">
                {item.country} | {item.procedure}
              </p>
              <h3>{item.name}</h3>
              <p>“{item.content}”</p>
              <p className="trust-note">
                {item.verified ? "Verified Patient" : "Unverified"} | {item.incentiveDisclosure}
              </p>
            </article>
          ))}
        </div>
        <p className="case-links-row">
          <Link href="/case-studies">Open full Real Case Center</Link> |{" "}
          <Link href="/testimonials">Open all testimonials</Link>
        </p>
      </section>

      <section className="section container">
        <p className="section-kicker">City Guide</p>
        <h2>Shanghai & Beijing Medical Tourism Pages</h2>
        <div className="card-grid two">
          {cityGuides.map((guide) => (
            <article className="card" key={guide.slug}>
              <h3>
                <Link href={`/${guide.slug}`}>{guide.title}</Link>
              </h3>
              <p>{guide.summary}</p>
              <p>
                <Link className="btn btn-secondary" href={`/${guide.slug}`}>
                  Open City Guide
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <SiteDisclosurePanel />

      <section className="section container">
        <div className="cta-box">
          <h2>Get Your Personal Treatment Plan in 2 Hours</h2>
          <p>
            Submit your case details and receive provider recommendations, price estimates,
            and suggested next steps.
          </p>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}

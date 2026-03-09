import Link from "next/link";
import {
  DoctorProfile,
  ProcedureTrustProfile,
  siteTrustStatements
} from "@/data/trust";

interface CredentialBlockProps {
  lastVerified: string;
  source: string;
  verifyUrl: string;
  notes: string;
}

export function CredentialBlock({
  lastVerified,
  source,
  verifyUrl,
  notes
}: CredentialBlockProps) {
  return (
    <article className="card trust-block">
      <p className="card-eyebrow">Credential Verification</p>
      <h3>Independent Credential Check</h3>
      <p>
        <strong>Last verified:</strong> {lastVerified}
      </p>
      <p>
        <strong>Source:</strong> {source}
      </p>
      <p>{notes}</p>
      <p>
        <a href={verifyUrl} target="_blank" rel="noopener noreferrer">
          Open official verification source
        </a>
      </p>
    </article>
  );
}

interface DoctorProfilesProps {
  doctors: DoctorProfile[];
}

export function DoctorProfiles({ doctors }: DoctorProfilesProps) {
  if (!doctors.length) return null;

  return (
    <section className="section container">
      <p className="section-kicker">Doctor Desk</p>
      <h2>Named Specialists</h2>
      <div className="card-grid two">
        {doctors.map((doctor) => (
          <article className="card trust-block" key={doctor.licenseNumber}>
            <p className="card-eyebrow">Clinical Profile</p>
            <h3>{doctor.name}</h3>
            <p className="muted">{doctor.title}</p>
            <p>
              <strong>License:</strong> {doctor.licenseNumber}
            </p>
            <p>
              <strong>Experience:</strong> {doctor.yearsExperience} years
            </p>
            <p>
              <strong>Specialties:</strong> {doctor.specialties.join(", ")}
            </p>
            <p>
              <strong>Languages:</strong> {doctor.languages.join(", ")}
            </p>
            <p>
              <strong>Last verified:</strong> {doctor.verificationLastChecked}
            </p>
            <p>
              <a href={doctor.verificationUrl} target="_blank" rel="noopener noreferrer">
                Verify professional registry
              </a>
            </p>
            <h4>Scope Boundary</h4>
            <ul className="trust-list compact">
              {doctor.treatmentBoundary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

interface RiskDisclosureProps {
  trust: ProcedureTrustProfile;
}

export function RiskDisclosure({ trust }: RiskDisclosureProps) {
  return (
    <section className="section container">
      <p className="section-kicker">Clinical Safety</p>
      <h2>Risk, Eligibility, and Recovery Notes</h2>
      <div className="card-grid three">
        <article className="card trust-block">
          <h3>Suitable For</h3>
          <ul className="trust-list">
            {trust.suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Not Suitable For</h3>
          <ul className="trust-list">
            {trust.notSuitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Not Recommended for China Travel Yet</h3>
          <ul className="trust-list danger">
            {trust.chinaTravelNotRecommended.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h3>Common Risks</h3>
          <ul className="trust-list">
            {trust.commonRisks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Urgent Warning Signs</h3>
          <ul className="trust-list danger">
            {trust.urgentWarningSigns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h3>Recovery Milestones</h3>
          <ul className="trust-list">
            {trust.recoveryMilestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="trust-note">{trust.noOutcomeGuarantee}</p>
        </article>
      </div>
    </section>
  );
}

interface PricingDisclosureProps {
  trust: ProcedureTrustProfile;
}

export function PricingDisclosure({ trust }: PricingDisclosureProps) {
  return (
    <section className="section container">
      <p className="section-kicker">Cost Clarity</p>
      <h2>What Is Included and What Is Not</h2>
      <div className="card-grid three">
        <article className="card trust-block">
          <h3>Included</h3>
          <ul className="trust-list">
            {trust.pricingIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h3>Not Included</h3>
          <ul className="trust-list">
            {trust.pricingExcludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Possible Extra Costs</h3>
          <ul className="trust-list">
            {trust.possibleExtraCosts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h3>Policy Summary</h3>
          <p>
            <strong>Refund:</strong> {trust.refundPolicy}
          </p>
          <p>
            <strong>Reschedule:</strong> {trust.reschedulePolicy}
          </p>
          <p className="trust-note">Final hospital policy may vary by specialty service line.</p>
        </article>
      </div>
    </section>
  );
}

interface EmergencyPathwayProps {
  items: string[];
}

export function EmergencyPathway({ items }: EmergencyPathwayProps) {
  return (
    <section className="section container">
      <p className="section-kicker">Post-Op Safety</p>
      <h2>Emergency and Follow-Up Pathway</h2>
      <article className="card trust-block">
        <ol className="trust-steps">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </article>
    </section>
  );
}

export function SiteDisclosurePanel() {
  return (
    <section className="section container">
      <p className="section-kicker">Trust Policy</p>
      <h2>How We Handle Safety, Privacy, and Claims</h2>
      <div className="card-grid three">
        <article className="card trust-block">
          <h3>Testimonials and Claims</h3>
          <p>{siteTrustStatements.testimonialPolicy}</p>
          <p className="trust-note">{siteTrustStatements.incentiveDisclosurePolicy}</p>
        </article>

        <article className="card trust-block">
          <h3>Privacy and Data Handling</h3>
          <p>{siteTrustStatements.privacySummary}</p>
          <ul className="trust-list">
            {siteTrustStatements.dataHandling.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card trust-block">
          <h3>Medical Content Review</h3>
          <p>{siteTrustStatements.contentReviewPolicy}</p>
          <p className="trust-note">{siteTrustStatements.legalDisclaimer}</p>
          <p>
            <Link href="/trust-center">Open full Trust Center</Link>
          </p>
        </article>
      </div>
    </section>
  );
}

interface BlogReviewBadgeProps {
  reviewer: {
    name: string;
    title: string;
    reviewDate: string;
  };
  disclosure: string;
}

export function BlogReviewBadge({ reviewer, disclosure }: BlogReviewBadgeProps) {
  return (
    <article className="card trust-block blog-review">
      <p className="card-eyebrow">Medical Review</p>
      <p>
        <strong>Reviewed by:</strong> {reviewer.name}
      </p>
      <p>
        <strong>Role:</strong> {reviewer.title}
      </p>
      <p>
        <strong>Review date:</strong> {reviewer.reviewDate}
      </p>
      <p className="trust-note">{disclosure}</p>
    </article>
  );
}

interface SourceReferenceItem {
  label: string;
  href: string;
  description: string;
  linkText?: string;
  external?: boolean;
}

interface SourceReferenceSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: SourceReferenceItem[];
  id?: string;
  columns?: "two" | "three";
}

export function SourceReferenceSection({
  eyebrow,
  title,
  description,
  items,
  id,
  columns = "three"
}: SourceReferenceSectionProps) {
  if (!items.length) return null;

  return (
    <section className="section container" id={id}>
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-lede muted">{description}</p> : null}
      <div className={`card-grid ${columns}`}>
        {items.map((item) => (
          <article className="card trust-block" key={`${item.label}-${item.href}`}>
            <p className="card-eyebrow">Source Link</p>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
            <p>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.linkText || "Open source"}
                </a>
              ) : (
                <Link href={item.href}>{item.linkText || "Open source"}</Link>
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

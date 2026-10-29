import Link from "next/link";
import { SealMark } from "@/components/seal-mark";
import { telHref } from "@/lib/contact";
import {
  companyIdentityDisclosureNote,
  companyProfile,
  publishedCompanyIdentityItems
} from "@/data/company-profile";

export function SiteFooter() {
  const legalDisclosure = publishedCompanyIdentityItems.length
    ? publishedCompanyIdentityItems
        .map((item) => `${item.label}: ${item.value}`)
        .join(" | ")
    : companyIdentityDisclosureNote;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-kicker">
              <SealMark size={30} />
              DentalTripChina
            </span>
            <p>
              We plan dental, eye and health-check trips to accredited hospitals in Shanghai
              and Beijing, with English-speaking support from first message to follow-up.
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>
            </p>
            {companyProfile.supportPhone && (
              <p>
                <strong>Phone:</strong>{" "}
                <a href={telHref(companyProfile.supportPhone)}>{companyProfile.supportPhone}</a>
              </p>
            )}
          </div>
          <ul className="footer-links">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/case-studies">Patient stories</Link>
            </li>
            <li>
              <Link href="/verification">Verification</Link>
            </li>
            <li>
              <Link href="/cost-calculator">Cost calculator</Link>
            </li>
            <li>
              <Link href="/china-visa-free-medical-tourism">Visa-free entry</Link>
            </li>
            <li>
              <Link href="/trust-center">Trust center</Link>
            </li>
            <li>
              <Link href="/trust-dashboard">Trust dashboard</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/authors">Authors</Link>
            </li>
            <li>
              <Link href="/editorial-policy">Editorial policy</Link>
            </li>
            <li>
              <Link href="/content-updates">Content updates</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/medical-disclaimer">Medical disclaimer</Link>
            </li>
          </ul>
        </div>

        <p className="disclaimer">
          Medical disclaimer: DentalTripChina.com provides coordination support and
          does not replace professional diagnosis or treatment advice. Clinical responsibility
          remains with the treating hospital and licensed clinicians.
          <br />
          {companyProfile.treatmentPaymentSummary}
          <br />
          {legalDisclosure}
          <br />
          Images on this website are representative visuals unless explicitly labeled as
          documentary photography.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
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
            <span className="footer-kicker">DentalTripChina.com</span>
            <h2>Care, Travel, Clarity</h2>
            <p>
              World-class dental, LASIK, and health checkup planning in China with
              English-speaking support.
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${companyProfile.supportEmail}`}>{companyProfile.supportEmail}</a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${companyProfile.supportPhone.replace(/\s+/g, "")}`}>
                {companyProfile.supportPhone}
              </a>
            </p>
          </div>
          <ul className="footer-links">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/case-studies">Case Center</Link>
            </li>
            <li>
              <Link href="/verification">Verification</Link>
            </li>
            <li>
              <Link href="/cost-calculator">Cost Calculator</Link>
            </li>
            <li>
              <Link href="/china-visa-free-medical-tourism">Visa Guide</Link>
            </li>
            <li>
              <Link href="/trust-center">Trust Center</Link>
            </li>
            <li>
              <Link href="/trust-dashboard">Trust Dashboard</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/authors">Authors</Link>
            </li>
            <li>
              <Link href="/editorial-policy">Editorial Policy</Link>
            </li>
            <li>
              <Link href="/content-updates">Content Updates</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/medical-disclaimer">Medical Disclaimer</Link>
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

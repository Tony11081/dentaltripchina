import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GAScript } from "@/components/ga-script";
import { FunnelTracker } from "@/components/funnel-tracker";
import { JsonLd } from "@/components/json-ld";
import { companyProfile, companyProfileStatus } from "@/data/company-profile";
import { absoluteUrl, defaultSocialImage } from "@/lib/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Medical Tourism China - Save 70%+ | DentalTripChina",
    template: "%s | DentalTripChina"
  },
  description:
    "World-class dental implants, LASIK, and health checkups in China. JCI-accredited hospitals. English support. Free quote in 2 hours.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Medical Tourism China - Save 70%+ | DentalTripChina",
    description:
      "World-class dental implants, LASIK, and health checkups in China. JCI-accredited hospitals. English support. Free quote in 2 hours.",
    siteName: "DentalTripChina",
    images: [
      {
        url: absoluteUrl(defaultSocialImage),
        alt: "DentalTripChina planning dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Tourism China - Save 70%+ | DentalTripChina",
    description:
      "World-class dental implants, LASIK, and health checkups in China. JCI-accredited hospitals. English support. Free quote in 2 hours.",
    images: [absoluteUrl(defaultSocialImage)]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyProfile.brandName,
    url: siteUrl,
    email: companyProfile.supportEmail,
    telephone: companyProfile.supportPhone,
    description:
      "Cross-border treatment coordination for dental care, LASIK, and health checkups in China.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyProfile.supportPhone,
      contactType: "customer support",
      availableLanguage: ["en-US", "en-GB", "en-AU"]
    }
  };

  if (companyProfileStatus.hasPublishedLegalEntity) {
    orgSchema.legalName = companyProfile.legalEntityName;
  }

  if (companyProfileStatus.hasPublishedRegisteredAddress) {
    orgSchema.address = {
      "@type": "PostalAddress",
      streetAddress: companyProfile.registeredAddress,
      addressCountry: "CN"
    };
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DentalTripChina.com",
    url: siteUrl
  };

  return (
    <html lang="en-GB">
      <body>
        <GAScript />
        <FunnelTracker />
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}

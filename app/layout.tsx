import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GAScript } from "@/components/ga-script";
import { FunnelTracker } from "@/components/funnel-tracker";
import { JsonLd } from "@/components/json-ld";
import { companyProfile, companyProfileStatus } from "@/data/company-profile";
import {
  absoluteUrl,
  defaultRobots,
  defaultSocialImage,
  siteAlternateTypes
} from "@/lib/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "DentalTripChina",
  title: {
    default: "Medical Tourism China - Save 70%+ | DentalTripChina",
    template: "%s | DentalTripChina"
  },
  description:
    "Compare source-linked dental, LASIK, and health checkup pathways in China with published verification, pricing ranges, and travel-planning guidance.",
  alternates: {
    types: siteAlternateTypes
  },
  robots: defaultRobots,
  openGraph: {
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
    images: [absoluteUrl(defaultSocialImage)]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyProfile.brandName,
    alternateName: companyProfile.legalEntityName,
    url: siteUrl,
    email: companyProfile.supportEmail,
    telephone: companyProfile.supportPhone,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon")
    },
    description:
      "Cross-border treatment coordination for dental care, LASIK, and health checkups in China.",
    knowsAbout: [
      "Dental implants in China",
      "LASIK in China",
      "Health checkups in China",
      "Medical travel planning",
      "Hospital verification",
      "Cross-border treatment coordination"
    ],
    areaServed: [
      { "@type": "Country", name: "China" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "Canada" }
    ],
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
    url: siteUrl,
    inLanguage: "en-GB",
    publisher: {
      "@id": `${siteUrl}#organization`
    }
  };

  return (
    <html lang="en-GB">
      <head>
        <link rel="alternate" type="application/rss+xml" href={absoluteUrl("/rss.xml")} />
        <link rel="alternate" type="application/feed+json" href={absoluteUrl("/feed.json")} />
        <link rel="alternate" type="text/plain" href={absoluteUrl("/llms.txt")} />
        <link rel="alternate" type="application/json" href={absoluteUrl("/knowledge.json")} />
      </head>
      <body>
        <GAScript />
        <FunnelTracker />
        <JsonLd data={{ ...orgSchema, "@id": `${siteUrl}#organization` }} />
        <JsonLd data={websiteSchema} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}

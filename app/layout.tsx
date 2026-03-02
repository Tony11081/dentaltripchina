import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { GAScript } from "@/components/ga-script";
import { FunnelTracker } from "@/components/funnel-tracker";
import { JsonLd } from "@/components/json-ld";
import { companyProfile } from "@/data/company-profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Medical Tourism China - Save 70%+ | DentalTripChina",
    template: "%s | DentalTripChina"
  },
  description:
    "World-class dental implants, LASIK, and health checkups in China. JCI-accredited hospitals. English support. Free quote in 2 hours.",
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: companyProfile.brandName,
    legalName: companyProfile.legalEntityName,
    url: siteUrl,
    email: companyProfile.supportEmail,
    telephone: companyProfile.supportPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyProfile.registeredAddress,
      addressCountry: "CN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyProfile.supportPhone,
      contactType: "customer support",
      availableLanguage: ["en-GB", "en-AU"]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DentalTripChina.com",
    url: siteUrl
  };

  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${sourceSans.variable} ${cormorant.variable}`}>
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

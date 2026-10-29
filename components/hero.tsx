"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import { hasWhatsapp, whatsappHref } from "@/lib/contact";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaHref?: string;
  ctaText?: string;
  secondaryHref?: string;
  secondaryText?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImagePriority?: boolean;
  heroMetrics?: Array<{
    value: string;
    label: string;
  }>;
  panelTitle?: string;
  panelDescription?: string;
  panelList?: string[];
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaHref = "/contact",
  ctaText = "Request Free Quote",
  secondaryHref,
  secondaryText = "Chat on WhatsApp",
  heroImageSrc,
  heroImageAlt = "International patient consultation planning",
  heroImagePriority = false,
  heroMetrics = [
    { value: "70-85%", label: "Typical savings" },
    { value: "2h", label: "Quote response" },
    { value: "EN", label: "Staff support" }
  ],
  panelTitle = "Save 70-85% vs UK/US Pricing",
  panelDescription = "Published hospital sources, fast response, and transparent planning.",
  panelList = [
    "Quote in under 2 hours",
    "English-speaking patient support",
    "Travel and transfer coordination"
  ]
}: HeroProps) {
  // Without a real WhatsApp number, a WhatsApp CTA falls back to a free-quote link.
  const usesWhatsapp = !secondaryHref || secondaryHref.includes("wa.me");
  const waHref = secondaryHref && (!usesWhatsapp || hasWhatsapp) ? secondaryHref : whatsappHref();
  const secondaryLabel = usesWhatsapp && !hasWhatsapp ? "Ask a question" : secondaryText;
  const opensNewTab = /^https?:/.test(waHref);

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <ul className="hero-metrics">
            {heroMetrics.map((item) => (
              <li key={`${item.value}-${item.label}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <Link
              className="btn btn-primary"
              href={ctaHref}
              onClick={() =>
                trackEvent("funnel_cta_click", { cta_type: "primary", cta_target: ctaHref })
              }
            >
              {ctaText}
            </Link>
            <a
              className="btn btn-secondary"
              href={waHref}
              target={opensNewTab ? "_blank" : undefined}
              rel={opensNewTab ? "noopener noreferrer" : undefined}
              onClick={() => {
                trackEvent(waHref.includes("wa.me") ? "funnel_whatsapp_click" : "funnel_secondary_click", {
                  location: "hero",
                  cta_target: waHref
                });
              }}
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
        <div className="hero-panel">
          {heroImageSrc ? (
            <figure className="hero-visual">
              <Image
                src={heroImageSrc}
                alt={heroImageAlt}
                width={1200}
                height={900}
                priority={heroImagePriority}
                fetchPriority={heroImagePriority ? "high" : "auto"}
              />
            </figure>
          ) : null}
          <h3>{panelTitle}</h3>
          <p>{panelDescription}</p>
          <ul className="hero-panel-list">
            {panelList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

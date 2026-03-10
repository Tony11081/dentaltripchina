"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

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
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000";
  const waHref =
    secondaryHref ||
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi, I'm interested in medical care in China. Can you help?"
    )}`;

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
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent(waHref.includes("wa.me") ? "funnel_whatsapp_click" : "funnel_secondary_click", {
                  location: "hero",
                  cta_target: waHref
                });
              }}
            >
              {secondaryText}
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

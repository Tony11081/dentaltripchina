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
  heroImagePriority = false
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
            <li>
              <strong>70-85%</strong>
              <span>Typical savings</span>
            </li>
            <li>
              <strong>2h</strong>
              <span>Quote response</span>
            </li>
            <li>
              <strong>EN</strong>
              <span>Staff support</span>
            </li>
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
          <h3>Save 70-85% vs UK/US Pricing</h3>
          <p>JCI-accredited hospitals, fast response, and transparent planning.</p>
          <ul className="hero-panel-list">
            <li>Quote in under 2 hours</li>
            <li>English-speaking patient support</li>
            <li>Travel and transfer coordination</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

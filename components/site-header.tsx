"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const desktopNavItems = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/case-studies", label: "Case Center" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/verification", label: "Verification" },
  { href: "/trust-center", label: "Trust" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" }
];

const drawerGroups = [
  {
    title: "Service",
    items: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/pricing", label: "Pricing" },
      { href: "/cost-calculator", label: "Cost Calculator" },
      { href: "/travel-support", label: "Travel Support" },
      { href: "/contact", label: "Free Quote" }
    ]
  },
  {
    title: "Trust",
    items: [
      { href: "/case-studies", label: "Case Center" },
      { href: "/verification", label: "Verification" },
      { href: "/trust-center", label: "Trust Center" },
      { href: "/trust-dashboard", label: "Trust Dashboard" },
      { href: "/care-sla", label: "Post-Op SLA" },
      { href: "/eligibility-screening", label: "Eligibility Screening" }
    ]
  },
  {
    title: "Content",
    items: [
      { href: "/blog", label: "Blog" },
      { href: "/authors", label: "Authors" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/content-updates", label: "Content Updates" },
      { href: "/medical-tourism-shanghai", label: "Shanghai Guide" },
      { href: "/medical-tourism-beijing", label: "Beijing Guide" }
    ]
  }
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'm interested in medical care in China. Can you help?"
  )}`;

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="DentalTripChina home">
          <span className="logo-mark">DTC</span>
          <span>DentalTripChina.com</span>
        </Link>

        <nav id="primary-navigation" aria-label="Primary" className="primary-nav desktop-nav">
          <ul className="nav-list">
            {desktopNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-controls="mobile-navigation-drawer"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          Menu
        </button>

        <div className="header-actions">
          <span className="support-pill">24/7 English Support</span>
          <Link href="/contact" className="btn btn-primary">
            Free Quote
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={`nav-overlay ${menuOpen ? "open" : ""}`}
        aria-label="Close navigation menu"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-navigation-drawer"
        aria-label="Mobile navigation"
        className={`nav-drawer ${menuOpen ? "open" : ""}`}
      >
        <div className="nav-drawer-head">
          <p>Navigation</p>
          <button type="button" className="nav-close" onClick={() => setMenuOpen(false)}>
            Close
          </button>
        </div>

        <div className="nav-drawer-groups">
          {drawerGroups.map((group) => (
            <section className="nav-drawer-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="nav-drawer-list">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="nav-drawer-cta">
          <Link href="/contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Free Quote
          </Link>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </aside>
    </header>
  );
}

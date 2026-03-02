"use client";

import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8613800138000";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi, I'm interested in medical care in China. Can you help?"
  )}`;

  return (
    <a
      id="whatsapp-sticky"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent("whatsapp_click", { location: "sticky_button" });
        trackEvent("funnel_whatsapp_click", { location: "sticky_button" });
      }}
      aria-label="Chat with us on WhatsApp"
    >
      <span>WhatsApp</span>
    </a>
  );
}

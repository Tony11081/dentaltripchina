"use client";

import { trackEvent } from "@/lib/analytics";
import { hasWhatsapp, whatsappHref } from "@/lib/contact";

export function WhatsAppButton() {
  if (!hasWhatsapp) return null;
  const href = whatsappHref();

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

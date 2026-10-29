// Single source of truth for public contact channels.
// The old code fell back to a fake WhatsApp number (8613800138000), which sent every
// WhatsApp click to a stranger. When no real number is configured we now hide the
// WhatsApp button and route people to the contact form instead.

const PLACEHOLDER_NUMBERS = new Set(["8613800138000"]);

const rawWhatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

export const whatsappNumber = rawWhatsapp && !PLACEHOLDER_NUMBERS.has(rawWhatsapp) ? rawWhatsapp : "";

export const hasWhatsapp = whatsappNumber.length > 0;

export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'm interested in medical care in China. Can you help?";

export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  if (!hasWhatsapp) return "/contact";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

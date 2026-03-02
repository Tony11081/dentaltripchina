export type CurrencyCode = "USD" | "GBP" | "AUD";

const DEFAULT_USD_TO_GBP_RATE = 0.79;
const DEFAULT_USD_TO_AUD_RATE = 1.55;

function parseRate(value: string | undefined, fallback: number) {
  const parsed = Number.parseFloat(value || `${fallback}`);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const usdToGbpRate = parseRate(
  process.env.NEXT_PUBLIC_USD_GBP_RATE,
  DEFAULT_USD_TO_GBP_RATE
);
export const usdToAudRate = parseRate(
  process.env.NEXT_PUBLIC_USD_AUD_RATE,
  DEFAULT_USD_TO_AUD_RATE
);

export function usdToGbp(usd: number) {
  return usd * usdToGbpRate;
}

export function usdToAud(usd: number) {
  return usd * usdToAudRate;
}

export function convertUsd(usd: number, currency: CurrencyCode) {
  if (currency === "GBP") return usdToGbp(usd);
  if (currency === "AUD") return usdToAud(usd);
  return usd;
}

export function formatCurrency(value: number, currency: CurrencyCode) {
  const locale =
    currency === "GBP" ? "en-GB" : currency === "AUD" ? "en-AU" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatCurrencyFromUsd(usd: number, currency: CurrencyCode) {
  return formatCurrency(convertUsd(usd, currency), currency);
}

export function formatUsd(usd: number) {
  return formatCurrency(usd, "USD");
}

export function formatGbpFromUsd(usd: number) {
  return formatCurrencyFromUsd(usd, "GBP");
}

export function formatAudFromUsd(usd: number) {
  return formatCurrencyFromUsd(usd, "AUD");
}

export function getPreferredCurrencyFromLocale(locale: string | undefined): CurrencyCode {
  const normalized = (locale || "").toLowerCase();
  if (normalized.includes("en-gb") || normalized.includes("-gb")) return "GBP";
  if (normalized.includes("en-au") || normalized.includes("-au")) return "AUD";
  return "USD";
}

export function getUsdFxReferenceNote() {
  const label = process.env.NEXT_PUBLIC_USD_FX_REFERENCE_NOTE;
  if (label) return label;
  return `Indicative conversion uses 1 USD ≈ ${usdToGbpRate.toFixed(
    2
  )} GBP and ≈ ${usdToAudRate.toFixed(2)} AUD for planning only.`;
}

export function getUsdGbpReferenceNote() {
  return getUsdFxReferenceNote();
}

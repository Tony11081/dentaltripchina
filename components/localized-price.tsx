"use client";

import {
  CurrencyCode,
  formatCurrencyFromUsd,
  formatUsd,
  getPreferredCurrencyFromLocale
} from "@/lib/currency";

interface LocalizedPriceProps {
  usd: number;
  className?: string;
  showUsdHint?: boolean;
  emphasize?: boolean;
}

export function LocalizedPrice({
  usd,
  className,
  showUsdHint = true,
  emphasize = false
}: LocalizedPriceProps) {
  const stored =
    typeof window !== "undefined" ? window.localStorage.getItem("dtc_currency") : null;
  const currency: CurrencyCode =
    stored === "USD" || stored === "GBP" || stored === "AUD"
      ? stored
      : getPreferredCurrencyFromLocale(
          typeof navigator !== "undefined" ? navigator.language : "en-US"
        );

  const primary = formatCurrencyFromUsd(usd, currency);
  const showSecondary = showUsdHint && currency !== "USD";

  return (
    <span className={className} suppressHydrationWarning>
      {emphasize ? <strong>{primary}</strong> : primary}
      {showSecondary ? <span className="muted"> ({formatUsd(usd)})</span> : null}
    </span>
  );
}

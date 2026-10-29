"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { convertUsd, formatCurrency, type CurrencyCode } from "@/lib/currency";

export interface PriceGapItem {
  slug: string;
  label: string;
  title: string;
  chinaUsd: number;
  homeUsd: { uk: number; us: number; au: number };
  stay: string;
}

type Origin = "uk" | "us" | "au";

const origins: Array<{ id: Origin; label: string; place: string; currency: CurrencyCode }> = [
  { id: "uk", label: "United Kingdom", place: "the UK", currency: "GBP" },
  { id: "us", label: "United States", place: "the US", currency: "USD" },
  { id: "au", label: "Australia", place: "Australia", currency: "AUD" }
];

function guessOrigin(): Origin {
  if (typeof navigator === "undefined") return "uk";
  const locale = (navigator.language || "").toLowerCase();
  if (locale.endsWith("-us")) return "us";
  if (locale.endsWith("-au")) return "au";
  return "uk";
}

export function PriceGap({ items, fxNote }: { items: PriceGapItem[]; fxNote: string }) {
  const [slug, setSlug] = useState(items[0]?.slug);
  const [origin, setOrigin] = useState<Origin>("uk");

  useEffect(() => {
    setOrigin(guessOrigin());
  }, []);

  const item = items.find((entry) => entry.slug === slug) || items[0];
  const place = origins.find((entry) => entry.id === origin) || origins[0];

  const figures = useMemo(() => {
    const home = convertUsd(item.homeUsd[origin], place.currency);
    const china = convertUsd(item.chinaUsd, place.currency);
    return {
      home: formatCurrency(home, place.currency),
      china: formatCurrency(china, place.currency),
      saving: formatCurrency(home - china, place.currency),
      share: Math.round((china / home) * 100)
    };
  }, [item, origin, place.currency]);

  return (
    <section className="price-gap" aria-labelledby="price-gap-title">
      <div className="price-gap-head">
        <h2 className="price-gap-title" id="price-gap-title">
          Compare a typical price
        </h2>
        <div className="price-gap-tabs" role="group" aria-label="Treatment">
          {items.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              className="price-gap-tab"
              aria-pressed={entry.slug === item.slug}
              onClick={() => {
                setSlug(entry.slug);
                trackEvent("price_gap_select", { procedure: entry.slug });
              }}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <label className="price-gap-origin">
          Compared with
          <select value={origin} onChange={(event) => setOrigin(event.target.value as Origin)}>
            {origins.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="price-gap-rows" aria-live="polite">
        <li className="price-gap-row home">
          <span className="label">Typical price in {place.place}</span>
          <span className="price-gap-amount">{figures.home}</span>
        </li>
        <li className="price-gap-row china">
          <span className="label">At our partner hospitals in China</span>
          <span className="price-gap-amount">{figures.china}</span>
        </li>
        <li className="price-gap-row saving">
          <span className="label">
            You pay about {figures.share}% of the price at home
          </span>
          <span className="price-gap-amount">{figures.saving} less</span>
        </li>
      </ul>

      <div className="price-gap-foot">
        <p>
          {item.title}. Time in China: {item.stay}. Flights and hotel are extra.
        </p>
        <p>{fxNote}</p>
        <p>
          <Link href={`/${item.slug}`}>What this price includes</Link>
        </p>
      </div>
    </section>
  );
}

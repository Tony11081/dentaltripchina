import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CostCalculator } from "@/components/cost-calculator";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Full Cost Calculator",
  description:
    "One-click low, median, and high budget estimate including treatment, flight, hotel, follow-up, and extras.",
  path: "/cost-calculator",
  imagePath: pageImageAssets.costCalculatorBanner.src
});

export default function CostCalculatorPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cost Calculator", href: "/cost-calculator" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Planning Tool</p>
        <h1>Full Cost Calculator</h1>
        <p className="section-lede muted">
          Build a realistic low/median/high budget before travel. This calculator combines
          treatment fee, flight and hotel, follow-up, and possible extra costs.
        </p>
        <figure className="editorial-image">
          <Image
            src={pageImageAssets.costCalculatorBanner.src}
            alt={pageImageAssets.costCalculatorBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <CostCalculator />
    </>
  );
}

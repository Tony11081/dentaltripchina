import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TrustDashboardTable } from "@/components/trust-dashboard-table";

export const metadata: Metadata = {
  title: "Trust Dashboard",
  description:
    "Monthly trust metrics: response time, appointment fulfillment, complaint resolution, and post-op follow-up completion."
};

export default function TrustDashboardPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Trust Dashboard", href: "/trust-dashboard" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Transparency Metrics</p>
        <h1>Trust Dashboard</h1>
        <p className="section-lede muted">
          We publish monthly operational quality indicators so patients can audit consistency,
          not just marketing claims.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/verification-ledger.svg"
            alt="Operational trust dashboard illustration"
            width={1200}
            height={760}
          />
        </figure>
      </section>

      <TrustDashboardTable />
    </>
  );
}

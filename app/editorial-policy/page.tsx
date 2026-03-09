import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Review Policy",
  description:
    "How medical and travel content is drafted, clinically reviewed, and updated with change logs.",
  path: "/editorial-policy",
  imagePath: pageImageAssets.authorsBanner.src
});

export default function EditorialPolicyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Editorial Policy", href: "/editorial-policy" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Content Integrity</p>
        <h1>Editorial Review Policy</h1>
        <p className="section-lede muted">
          Every medical article follows a drafting, review, and update cycle with named
          reviewers and visible update dates.
        </p>

        <figure className="editorial-image">
          <Image
            src={pageImageAssets.authorsBanner.src}
            alt={pageImageAssets.authorsBanner.alt}
            width={1200}
            height={900}
            priority
          />
        </figure>

        <div className="card-grid three">
          <article className="card trust-block">
            <h3>1. Drafting</h3>
            <p>
              Authors draft content using real treatment pathways, cost boundaries, and
              patient-support SOPs.
            </p>
          </article>

          <article className="card trust-block">
            <h3>2. Medical Review</h3>
            <p>
              Clinical reviewers validate safety logic, contraindications, and timeline
              realism before publication.
            </p>
          </article>

          <article className="card trust-block">
            <h3>3. Scheduled Updates</h3>
            <p>
              High-intent pages are reviewed monthly or when provider process changes are
              detected.
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <article className="card trust-block">
          <h2>Transparency Rules</h2>
          <ul className="trust-list">
            <li>Every blog article shows author and latest update date.</li>
            <li>Medical review badge appears on health-related content.</li>
            <li>Update records are published on the content update log.</li>
          </ul>
          <p>
            View the update ledger: <Link href="/content-updates">Content Updates</Link>
          </p>
        </article>
      </section>
    </>
  );
}

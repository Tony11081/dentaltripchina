import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, getRelatedCaseForPost } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { blogPosts } from "@/data/posts";
import { blogTrustProfiles } from "@/data/trust";
import { BlogReviewBadge } from "@/components/trust-sections";
import { LocalizedPrice } from "@/components/localized-price";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const trust = blogTrustProfiles.find((item) => item.postSlug === slug);

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const postImage = post.coverImage || "/editorial/hero-consultation.svg";
  const wordCount = post.content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const relatedCase = getRelatedCaseForPost(post.slug);
  const relatedCaseTotal = relatedCase
    ? relatedCase.costBreakdown.treatmentUsd +
      relatedCase.costBreakdown.flightHotelUsd +
      relatedCase.costBreakdown.followUpUsd +
      relatedCase.costBreakdown.extraUsd
    : 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `${siteUrl}${postImage}`,
    author: {
      "@type": "Person",
      name: post.authorName
    },
    datePublished: post.datePublished,
    dateModified: post.dateUpdated,
    wordCount,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "DentalTripChina.com"
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` }
        ]}
      />

      <section className="section container article-wrap">
        <JsonLd data={schema} />
        <article>
          <h1>{post.title}</h1>
          <p className="muted">
            By{" "}
            {post.authorSlug ? (
              <Link href={`/authors/${post.authorSlug}`}>{post.authorName}</Link>
            ) : (
              post.authorName
            )}{" "}
            | Published: {post.datePublished} | Updated: {post.dateUpdated} | {readTimeMinutes} min
            read
          </p>

          <figure className="editorial-image">
            <Image
              src={postImage}
              alt={`${post.title} article cover`}
              width={1200}
              height={900}
            />
          </figure>

          <div className="badge-row">
            <span className="badge">{post.category}</span>
            {post.countryFocus ? <span className="badge">{post.countryFocus}</span> : null}
            {post.budgetFocus ? <span className="badge">{post.budgetFocus}</span> : null}
            {post.timelineFocus ? <span className="badge">{post.timelineFocus}</span> : null}
          </div>

          <div className="article-content">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {trust ? (
            <div className="article-review-wrap">
              <BlogReviewBadge reviewer={trust.medicalReviewer} disclosure={trust.disclosure} />
            </div>
          ) : null}

          <article className="card trust-block">
            <h3>Editorial Transparency</h3>
            <p>
              Review method and update policy are published on{" "}
              <Link href="/editorial-policy">Editorial Policy</Link>.
            </p>
            <p>
              Recent material edits are published on{" "}
              <Link href="/content-updates">Content Update Log</Link>.
            </p>
          </article>

          {relatedCase ? (
            <article className="card trust-block">
              <h3>Related Real Case</h3>
              <p>
                <strong>{relatedCase.title}</strong>
              </p>
              <p className="muted">
                {relatedCase.country} | {relatedCase.city} | Total pathway cost:{" "}
                <LocalizedPrice usd={relatedCaseTotal} />
              </p>
              <p>{relatedCase.outcome}</p>
              <p>
                <Link className="btn btn-secondary" href={`/case-studies/${relatedCase.slug}`}>
                  View related case study
                </Link>
              </p>
            </article>
          ) : null}

          <div className="hero-actions">
            {post.relatedProcedureSlug ? (
              <Link className="btn btn-secondary" href={`/${post.relatedProcedureSlug}`}>
                View Related Procedure
              </Link>
            ) : null}
            <Link className="btn btn-primary" href="/contact">
              Request a Personalized Plan
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}

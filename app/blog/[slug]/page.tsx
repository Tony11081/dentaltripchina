import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogPostBySlug,
  getHospitalsBySlugs,
  getProcedureBySlug,
  getRelatedCaseForPost
} from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { blogPosts } from "@/data/posts";
import { blogTrustProfiles } from "@/data/trust";
import { BlogReviewBadge, SourceReferenceSection } from "@/components/trust-sections";
import { LocalizedPrice } from "@/components/localized-price";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { getBlogPostImage } from "@/lib/site-images";

interface SourceItem {
  label: string;
  href: string;
  description: string;
  linkText: string;
  external?: boolean;
}

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

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    imagePath: getBlogPostImage(post).src,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateUpdated
  });
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

  const postImage = getBlogPostImage(post);
  const wordCount = post.content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const relatedCase = getRelatedCaseForPost(post.slug);
  const relatedProcedure = post.relatedProcedureSlug
    ? getProcedureBySlug(post.relatedProcedureSlug)
    : undefined;
  const relatedHospitals = relatedProcedure
    ? getHospitalsBySlugs(relatedProcedure.partnerHospitalSlugs)
    : [];
  const relatedCaseTotal = relatedCase
    ? relatedCase.costBreakdown.treatmentUsd +
      relatedCase.costBreakdown.flightHotelUsd +
      relatedCase.costBreakdown.followUpUsd +
      relatedCase.costBreakdown.extraUsd
    : 0;
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const aboutEntities = [
    relatedProcedure
      ? {
          "@type": "MedicalProcedure",
          name: relatedProcedure.title,
          url: absoluteUrl(`/${relatedProcedure.slug}`)
        }
      : null,
    post.countryFocus ? { "@type": "Place", name: post.countryFocus } : null,
    ...relatedHospitals.slice(0, 2).map((hospital) => ({
      "@type": "Hospital",
      name: hospital.name,
      url: absoluteUrl(`/hospital/${hospital.slug}`)
    }))
  ].filter(Boolean);

  const sourceReferences = [
    post.authorSlug
      ? {
          label: `Author Profile: ${post.authorName}`,
          href: `/authors/${post.authorSlug}`,
          description:
            "Credentials, specialties, and last profile review for the named author behind this article.",
          linkText: "Open author profile"
        }
      : null,
    relatedProcedure
      ? {
          label: `Procedure Guide: ${relatedProcedure.title}`,
          href: `/${relatedProcedure.slug}`,
          description:
            "Primary planning page for the treatment pathway, cost bands, timing, and FAQs referenced here.",
          linkText: "View procedure guide"
        }
      : null,
    relatedCase
      ? {
          label: "Related Case Study",
          href: `/case-studies/${relatedCase.slug}`,
          description:
            "Real patient case with timeline, total spend, and follow-up outcome linked to this topic.",
          linkText: "Open case study"
        }
      : null,
    {
      label: "Editorial Review Policy",
      href: "/editorial-policy",
      description: trust
        ? `Review workflow and disclosure rules for content medically reviewed on ${trust.medicalReviewer.reviewDate}.`
        : "Review workflow, medical review rules, and update standards used for editorial content.",
      linkText: "Read editorial policy"
    },
    {
      label: "Content Update Log",
      href: "/content-updates",
      description:
        "Public ledger for material updates affecting pricing, risk guidance, and patient-planning content.",
      linkText: "Open update log"
    },
    ...relatedHospitals.slice(0, 2).flatMap((hospital) => [
      {
        label: `Hospital Profile: ${hospital.name}`,
        href: `/hospital/${hospital.slug}`,
        description:
          "Hospital-level capability, verification timestamps, and intake notes for this provider.",
        linkText: "Open hospital profile"
      },
      hospital.website
        ? {
            label: `Official Site: ${hospital.name}`,
            href: hospital.website,
            description:
              "Provider-published service and contact information used as an external source reference.",
            linkText: "Visit official site",
            external: true
          }
        : {
            label: `Official Listing: ${hospital.name}`,
            href: hospital.jciVerifyUrl,
            description:
              "Official accreditation or hospital listing source referenced for provider verification.",
            linkText: "Open official listing",
            external: true
          }
    ])
  ].filter((item): item is SourceItem => item !== null);

  const citationUrls = sourceReferences.map((item) =>
    item.external ? item.href : absoluteUrl(item.href)
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(postImage.src),
        author: {
          "@type": "Person",
          name: post.authorName,
          ...(post.authorSlug ? { url: absoluteUrl(`/authors/${post.authorSlug}`) } : {})
        },
        ...(trust
          ? {
              reviewedBy: {
                "@type": "Person",
                name: trust.medicalReviewer.name,
                jobTitle: trust.medicalReviewer.title
              }
            }
          : {}),
        datePublished: post.datePublished,
        dateModified: post.dateUpdated,
        wordCount,
        articleSection: post.category,
        keywords: post.tags,
        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`
        },
        publisher: {
          "@type": "Organization",
          name: "DentalTripChina",
          url: absoluteUrl("/")
        },
        isAccessibleForFree: true,
        inLanguage: "en-GB",
        about: aboutEntities,
        citation: citationUrls
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: post.title,
        description: post.excerpt,
        datePublished: post.datePublished,
        dateModified: post.dateUpdated,
        inLanguage: "en-GB",
        isPartOf: {
          "@type": "WebSite",
          name: "DentalTripChina",
          url: absoluteUrl("/")
        }
      }
    ]
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

          <nav className="section-nav" aria-label="Article sections">
            <a className="section-link" href="#article-body">
              Article
            </a>
            {trust ? (
              <a className="section-link" href="#medical-review">
                Medical review
              </a>
            ) : null}
            <a className="section-link" href="#article-sources">
              Sources
            </a>
            {relatedCase ? (
              <a className="section-link" href="#related-case">
                Related case
              </a>
            ) : null}
            <a className="section-link" href="#article-cta">
              Request plan
            </a>
          </nav>

          <figure className="editorial-image">
            <Image
              src={postImage.src}
              alt={postImage.alt}
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

          <div className="article-content" id="article-body">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {trust ? (
            <div className="article-review-wrap" id="medical-review">
              <BlogReviewBadge reviewer={trust.medicalReviewer} disclosure={trust.disclosure} />
            </div>
          ) : null}
        </article>
      </section>

      <SourceReferenceSection
        eyebrow="Primary Sources"
        title="Sources and Review Inputs"
        description="These references are the main documents, pages, and provider sources used to support the article."
        items={sourceReferences}
        id="article-sources"
      />

      {relatedCase ? (
        <section className="section container" id="related-case">
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
        </section>
      ) : null}

      <section className="section container" id="article-cta">
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
      </section>
    </>
  );
}

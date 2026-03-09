import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Hero } from "@/components/hero";
import { CardMedia } from "@/components/card-media";
import { getPostsByCategory } from "@/lib/content";
import { blogPosts } from "@/data/posts";
import { buildMetadata } from "@/lib/metadata";
import { getBlogCategoryImage, getBlogPostImage } from "@/lib/site-images";

function formatCategoryLabel(slug: string) {
  return slug
    .split("-")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryLabel = formatCategoryLabel(slug);

  return buildMetadata({
    title: `${categoryLabel} Articles`,
    description: `Planning guides, cost notes, and travel logistics for ${categoryLabel.toLowerCase()}.`,
    path: `/blog/category/${slug}`,
    imagePath: getBlogCategoryImage(slug).src
  });
}

export function generateStaticParams() {
  return Array.from(new Set(blogPosts.map((post) => post.category))).map((slug) => ({
    slug
  }));
}

export default async function BlogCategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);

  if (!posts.length) notFound();

  const categoryLabel = formatCategoryLabel(slug);
  const categoryImage = getBlogCategoryImage(slug);
  const latestUpdatedPost = [...posts].sort((left, right) =>
    left.dateUpdated.localeCompare(right.dateUpdated)
  )[posts.length - 1];
  const countryCount = new Set(posts.map((post) => post.countryFocus).filter(Boolean)).size;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: categoryLabel, href: `/blog/category/${slug}` }
        ]}
      />

      <Hero
        eyebrow="Blog Category"
        title={`${categoryLabel} Planning Guides`}
        subtitle="Curated articles that move from cost assumptions to timeline and candidacy decisions."
        heroImageSrc={categoryImage.src}
        heroImageAlt={categoryImage.alt}
        heroMetrics={[
          { value: `${posts.length}`, label: "Articles" },
          { value: `${countryCount || 1}`, label: "Market lenses" },
          {
            value: latestUpdatedPost ? formatShortDate(latestUpdatedPost.dateUpdated) : "Current",
            label: "Latest refresh"
          }
        ]}
        panelTitle="Read the pieces that reduce uncertainty first"
        panelDescription="This category page is organized as a decision shelf, not just a tag archive."
        panelList={[
          "Start with cost scope and exclusions",
          "Then validate timeline and travel assumptions",
          "Move to a direct enquiry once your shortlist is stable"
        ]}
      />

      <section className="section container">
        <nav className="section-nav" aria-label={`${categoryLabel} category sections`}>
          <a className="section-link" href="#category-articles">
            Browse articles
          </a>
          <Link className="section-link" href="/blog">
            All categories
          </Link>
          <Link className="section-link" href="/contact">
            Ask a case question
          </Link>
        </nav>
        <p className="section-kicker">Category Archive</p>
        <h2>{categoryLabel} Articles</h2>
        <p className="section-lede muted">
          Use this cluster when you already know the topic, but still need better cost,
          travel, or provider-fit judgment before requesting a quote.
        </p>
        <div className="card-grid three">
          {posts.map((post) => {
            const image = getBlogPostImage(post);

            return (
              <article className="card" key={post.slug} id={post === posts[0] ? "category-articles" : undefined}>
                <CardMedia src={image.src} alt={image.alt} />
                <p className="card-eyebrow">{post.countryFocus || "Global planning"}</p>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="muted">
                  {post.budgetFocus || "Flexible budget"} |{" "}
                  {post.timelineFocus || "Timeline guidance included"}
                </p>
                <p>{post.excerpt}</p>
                <p className="trust-note">
                  Updated {formatShortDate(post.dateUpdated)} | Reviewed content by {post.authorName}
                </p>
                <p>
                  <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
                    Read article
                  </Link>
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

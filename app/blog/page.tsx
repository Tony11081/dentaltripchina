import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardMedia } from "@/components/card-media";
import { blogPosts } from "@/data/posts";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPostImage, pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Editorial planning guides covering costs, timelines, candidacy, and travel decisions for treatment in China.",
  path: "/blog",
  imagePath: pageImageAssets.blogBanner.src
});

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">SEO Editorial Hub</p>
        <h1>Project × Country × Budget × Timeline</h1>
        <p className="section-lede muted">
          Topic clusters are structured for patient intent: procedure type, origin country,
          budget range, and treatment timeline.
        </p>
        <div className="badge-row">
          {categories.map((category) => (
            <Link className="badge" key={category} href={`/blog/category/${category}`}>
              {category}
            </Link>
          ))}
        </div>
        <figure className="editorial-image">
          <Image
            src={pageImageAssets.blogBanner.src}
            alt={pageImageAssets.blogBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container card-grid three">
        {posts.map((post) => {
          const image = getBlogPostImage(post);

          return (
          <article className="card" key={post.slug}>
            <CardMedia src={image.src} alt={image.alt} />
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="muted">
              Published {post.datePublished} | Updated {post.dateUpdated} | {post.category}
            </p>
            <p>{post.excerpt}</p>
            <div className="badge-row">
              {post.countryFocus ? <span className="badge">{post.countryFocus}</span> : null}
              {post.budgetFocus ? <span className="badge">{post.budgetFocus}</span> : null}
              {post.timelineFocus ? <span className="badge">{post.timelineFocus}</span> : null}
            </div>
            {post.authorSlug ? (
              <p className="muted">
                By <Link href={`/authors/${post.authorSlug}`}>{post.authorName}</Link>
              </p>
            ) : null}
            <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
              Read article
            </Link>
          </article>
          );
        })}
      </section>
    </>
  );
}

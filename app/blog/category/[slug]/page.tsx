import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getPostsByCategory } from "@/lib/content";
import { blogPosts } from "@/data/posts";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Blog Category: ${slug}`,
    description: `Articles for ${slug} planning.`
  };
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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: slug, href: `/blog/category/${slug}` }
        ]}
      />

      <section className="section container">
        <h1>Category: {slug}</h1>
        <div className="card-grid three">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="muted">
                {post.countryFocus || "Global"} | {post.budgetFocus || "Flexible budget"}
              </p>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

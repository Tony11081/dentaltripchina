import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { blogAuthors } from "@/data/authors";
import { blogPosts } from "@/data/posts";

export function generateStaticParams() {
  return blogAuthors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = blogAuthors.find((item) => item.slug === slug);

  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} | Author Profile`,
    description: author.profile
  };
}

export default async function AuthorDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = blogAuthors.find((item) => item.slug === slug);
  if (!author) notFound();

  const posts = blogPosts.filter((post) => post.authorSlug === author.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authors", href: "/authors" },
          { label: author.name, href: `/authors/${author.slug}` }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Author Profile</p>
        <h1>{author.name}</h1>
        <p className="muted">{author.title}</p>
        <p className="trust-note">
          Profile identity may be an editorial identifier where direct publication of personal
          identifiers is restricted. Medical claims are reviewed by qualified clinical reviewers.
        </p>

        <div className="card-grid two">
          <article className="card trust-block">
            <h2>Credentials</h2>
            <ul className="trust-list">
              {author.credentials.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="trust-note">
              <strong>Last profile review:</strong> {author.lastProfileReview}
            </p>
          </article>

          <article className="card trust-block">
            <h2>Review Method</h2>
            <p>{author.reviewMethod}</p>
            <p>
              <strong>Specialties:</strong> {author.specialties.join(", ")}
            </p>
          </article>
        </div>
      </section>

      <section className="section container">
        <h2>Articles by {author.name}</h2>
        <div className="card-grid three">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="muted">
                Updated {post.dateUpdated} | {post.countryFocus || "Global"}
              </p>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

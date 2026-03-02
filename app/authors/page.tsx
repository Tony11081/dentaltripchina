import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { blogAuthors } from "@/data/authors";

export const metadata: Metadata = {
  title: "Editorial Authors",
  description:
    "Meet medical reviewers and editors behind our treatment, policy, and travel content."
};

export default function AuthorsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authors", href: "/authors" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Editorial Team</p>
        <h1>Authors and Reviewers</h1>
        <p className="section-lede muted">
          Medical and compliance content is authored and reviewed by named professionals.
        </p>
        <p className="trust-note">
          Transparency note: where privacy or employment policy limits publishing full personal
          identifiers, we use editorial profile names. Clinical claims are reviewed against
          provider protocols and carry review dates on each article.
        </p>
        <figure className="editorial-image">
          <Image
            src="/editorial/editorial-lab.svg"
            alt="Editorial review team illustration"
            width={1200}
            height={760}
          />
        </figure>
      </section>

      <section className="section container card-grid two">
        {blogAuthors.map((author) => (
          <article className="card trust-block" key={author.slug}>
            <h3>
              <Link href={`/authors/${author.slug}`}>{author.name}</Link>
            </h3>
            <p className="muted">{author.title}</p>
            <p>{author.profile}</p>
            <p>
              <strong>Specialties:</strong> {author.specialties.join(", ")}
            </p>
            <p>
              <Link className="btn btn-secondary" href={`/authors/${author.slug}`}>
                View profile
              </Link>
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

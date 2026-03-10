import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CardMedia } from "@/components/card-media";
import { ExtractableSummary } from "@/components/extractable-summary";
import { blogAuthors } from "@/data/authors";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { getAuthorPortrait, pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Authors",
  description:
    "Meet the medical reviewers and editors behind our treatment, policy, and travel content.",
  path: "/authors",
  imagePath: pageImageAssets.authorsBanner.src
});

export default function AuthorsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/authors")}#webpage`,
        url: absoluteUrl("/authors"),
        name: "Authors and Reviewers",
        description:
          "Medical and compliance content is authored and reviewed by named professionals.",
        inLanguage: "en-GB"
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl("/authors")}#itemlist`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: blogAuthors.length,
        itemListElement: blogAuthors.map((author, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/authors/${author.slug}`),
          name: author.name
        }))
      }
    ]
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authors", href: "/authors" }
        ]}
      />

      <section className="section container">
        <JsonLd data={schema} />
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
            src={pageImageAssets.authorsBanner.src}
            alt={pageImageAssets.authorsBanner.alt}
            width={1200}
            height={900}
          />
        </figure>
      </section>

      <section className="section container">
        <ExtractableSummary
          eyebrow="Editorial Signals"
          title="Fast Summary"
          description="This block helps machines and users identify who writes and reviews the content."
          id="authors-summary"
          items={[
            {
              label: "Named profiles",
              value: `${blogAuthors.length} author and reviewer profiles`
            },
            {
              label: "Coverage",
              value:
                "Clinical content review, patient-planning guidance, policy, and compliance-oriented travel information."
            },
            {
              label: "Trust use",
              value:
                "Each article links back to named author profiles and carries published or reviewed dates for auditability."
            }
          ]}
        />
      </section>

      <section className="section container card-grid two">
        {blogAuthors.map((author) => {
          const portrait = getAuthorPortrait(author.slug);

          return (
            <article className="card trust-block" key={author.slug}>
              <CardMedia src={portrait.src} alt={portrait.alt} portrait />
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
          );
        })}
      </section>
    </>
  );
}

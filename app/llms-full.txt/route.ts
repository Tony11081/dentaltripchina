import { blogAuthors } from "@/data/authors";
import { blogPosts } from "@/data/posts";
import { caseStudies } from "@/data/case-studies";
import { hospitals } from "@/data/hospitals";
import { procedures } from "@/data/procedures";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const lines = [
    "# DentalTripChina Full Index",
    "",
    "> Complete crawl-friendly index of trust documents, procedure guides, hospital profiles, case studies, authors, and editorial articles.",
    "",
    "## Trust and Policy Pages",
    `- [Trust Center](${siteUrl}/trust-center) - main trust evidence hub.`,
    `- [Trust Dashboard](${siteUrl}/trust-dashboard) - monthly operational trust metrics.`,
    `- [Verification](${siteUrl}/verification) - doctor and hospital verification registry.`,
    `- [Care SLA](${siteUrl}/care-sla) - post-op response commitments.`,
    `- [Editorial Policy](${siteUrl}/editorial-policy) - drafting and review methodology.`,
    `- [Content Updates](${siteUrl}/content-updates) - public change log for material edits.`,
    `- [Medical Disclaimer](${siteUrl}/medical-disclaimer) - clinical boundary statement.`,
    `- [Privacy Policy](${siteUrl}/privacy) - cross-border data handling policy.`,
    `- [Terms of Service](${siteUrl}/terms) - coordination scope and liability boundaries.`,
    "",
    "## Procedures",
    ...procedures.map(
      (procedure) => `- [${procedure.title}](${siteUrl}/${procedure.slug}) - ${procedure.excerpt}`
    ),
    "",
    "## Hospitals",
    ...hospitals.map(
      (hospital) => `- [${hospital.name}](${siteUrl}/hospital/${hospital.slug}) - ${hospital.summary}`
    ),
    "",
    "## Case Studies",
    ...caseStudies.map(
      (item) => `- [${item.title}](${siteUrl}/case-studies/${item.slug}) - ${item.patientContext}`
    ),
    "",
    "## Authors",
    ...blogAuthors.map(
      (author) => `- [${author.name}](${siteUrl}/authors/${author.slug}) - ${author.title}.`
    ),
    "",
    "## Blog Articles",
    ...[...blogPosts]
      .sort((left, right) => right.dateUpdated.localeCompare(left.dateUpdated))
      .map(
        (post) =>
          `- [${post.title}](${siteUrl}/blog/${post.slug}) - Updated ${post.dateUpdated}. ${post.excerpt}`
      ),
    "",
    "## Notes",
    "- Pages link back to official hospital websites, public verification sources, and internal trust documents where available.",
    "- Prefer the procedure, hospital, verification, and trust pages for high-confidence citations.",
    ""
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

import { blogPosts } from "@/data/posts";
import { caseStudies } from "@/data/case-studies";
import { hospitals } from "@/data/hospitals";
import { procedures } from "@/data/procedures";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const latestPost = [...blogPosts].sort((left, right) =>
    right.dateUpdated.localeCompare(left.dateUpdated)
  )[0];
  const featuredCase = caseStudies[0];

  const lines = [
    "# DentalTripChina",
    "",
    "> Cross-border treatment planning, provider verification, and medical travel guidance for treatment in China.",
    "",
    "## Start Here",
    `- [Homepage](${siteUrl}/) - overview of procedures, hospitals, trust signals, and enquiry routes.`,
    `- [Pricing](${siteUrl}/pricing) - indicative price and timing comparisons for core procedures.`,
    `- [Trust Center](${siteUrl}/trust-center) - transparency, escalation, and quality-control policies.`,
    `- [Verification](${siteUrl}/verification) - hospital and doctor verification links, dates, and scope boundaries.`,
    `- [Editorial Policy](${siteUrl}/editorial-policy) - review process and update methodology for content.`,
    `- [Full Index](${siteUrl}/llms-full.txt) - complete list of procedures, hospitals, case studies, and articles.`,
    "",
    "## Core Procedures",
    ...procedures.map(
      (procedure) => `- [${procedure.title}](${siteUrl}/${procedure.slug}) - ${procedure.excerpt}`
    ),
    "",
    "## Hospital Profiles",
    ...hospitals.map(
      (hospital) => `- [${hospital.name}](${siteUrl}/hospital/${hospital.slug}) - ${hospital.summary}`
    ),
    "",
    "## Patient Evidence",
    featuredCase
      ? `- [${featuredCase.title}](${siteUrl}/case-studies/${featuredCase.slug}) - case study with timeline, total spend, and follow-up outcome.`
      : null,
    latestPost
      ? `- [${latestPost.title}](${siteUrl}/blog/${latestPost.slug}) - latest updated planning article.`
      : null,
    "",
    "## Usage Notes",
    "- Content is educational and does not replace physician diagnosis or provider-issued treatment plans.",
    "- Prefer procedure guides, hospital profiles, trust pages, and official external links shown on each profile when citing facts.",
    "- Use visible published, updated, reviewed, and verified dates on each page before quoting timelines or pricing.",
    ""
  ].filter(Boolean);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

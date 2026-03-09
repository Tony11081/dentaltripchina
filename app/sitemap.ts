import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { blogAuthors } from "@/data/authors";
import { caseStudies } from "@/data/case-studies";
import { cityGuides } from "@/data/cities";
import { companyProfile } from "@/data/company-profile";
import { editorialUpdates } from "@/data/editorial-updates";
import { hospitals } from "@/data/hospitals";
import { blogPosts } from "@/data/posts";
import { procedures } from "@/data/procedures";
import { hospitalTrustProfiles } from "@/data/trust";
import { monthlyTrustMetrics } from "@/data/trust-dashboard";

const fileDateCache = new Map<string, Date | undefined>();

function toDate(value?: string | null) {
  if (!value) return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function latestDate(...values: Array<Date | undefined>) {
  const valid = values.filter((value): value is Date => Boolean(value));
  if (!valid.length) return undefined;

  return valid.sort((left, right) => left.getTime() - right.getTime()).at(-1);
}

function getTrackedFileDate(relativePath: string) {
  if (fileDateCache.has(relativePath)) {
    return fileDateCache.get(relativePath);
  }

  const absolutePath = path.join(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    fileDateCache.set(relativePath, undefined);
    return undefined;
  }

  try {
    const committedAt = execSync(`git log -1 --format=%cI -- ${JSON.stringify(relativePath)}`, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();

    const gitDate = toDate(committedAt);
    if (gitDate) {
      fileDateCache.set(relativePath, gitDate);
      return gitDate;
    }
  } catch {
    // Fallback handled below when git history is unavailable in the deployment artifact.
  }

  const fileDate = statSync(absolutePath).mtime;
  fileDateCache.set(relativePath, fileDate);
  return fileDate;
}

function latestTrackedFileDate(...relativePaths: string[]) {
  return latestDate(...relativePaths.map((relativePath) => getTrackedFileDate(relativePath)));
}

const latestCompanyInfoDate =
  toDate(companyProfile.infoLastUpdated) || latestTrackedFileDate("data/company-profile.ts");

const latestVerificationDate = latestDate(
  ...hospitalTrustProfiles.map((profile) => toDate(profile.credentialLastVerified))
);

const latestTrustMetricDate = latestDate(
  ...monthlyTrustMetrics.map((metric) => toDate(`${metric.month}-01`))
);

const latestEditorialUpdateDate = latestDate(
  ...editorialUpdates.map((update) => toDate(update.date))
);

const latestBlogDate = latestDate(...blogPosts.map((post) => toDate(post.dateUpdated)));
const latestAuthorProfileDate = latestDate(
  ...blogAuthors.map((author) => toDate(author.lastProfileReview))
);

const staticPageLastModified: Record<string, Date | undefined> = {
  "": latestDate(
    latestCompanyInfoDate,
    latestVerificationDate,
    latestEditorialUpdateDate,
    latestBlogDate,
    latestTrackedFileDate("app/page.tsx")
  ),
  "/about": latestDate(
    latestCompanyInfoDate,
    latestTrackedFileDate("app/about/page.tsx", "data/company-profile.ts")
  ),
  "/how-it-works": latestTrackedFileDate("app/how-it-works/page.tsx"),
  "/hospitals": latestDate(
    latestVerificationDate,
    latestTrackedFileDate("app/hospitals/page.tsx", "data/hospitals.ts", "data/trust.ts")
  ),
  "/pricing": latestDate(
    toDate(editorialUpdates.find((update) => update.page === "/pricing")?.date),
    latestTrackedFileDate("app/pricing/page.tsx", "data/procedures.ts")
  ),
  "/contact": latestDate(
    latestCompanyInfoDate,
    latestTrackedFileDate("app/contact/page.tsx", "data/company-profile.ts")
  ),
  "/testimonials": latestTrackedFileDate("app/testimonials/page.tsx", "data/testimonials.ts"),
  "/trust-center": latestDate(
    latestVerificationDate,
    latestTrustMetricDate,
    latestTrackedFileDate("app/trust-center/page.tsx", "data/trust.ts", "data/trust-dashboard.ts")
  ),
  "/trust-dashboard": latestDate(
    latestTrustMetricDate,
    latestTrackedFileDate("app/trust-dashboard/page.tsx", "data/trust-dashboard.ts")
  ),
  "/verification": latestDate(
    latestVerificationDate,
    latestTrackedFileDate("app/verification/page.tsx", "data/trust.ts", "data/hospitals.ts")
  ),
  "/case-studies": latestTrackedFileDate("app/case-studies/page.tsx", "data/case-studies.ts"),
  "/cost-calculator": latestTrackedFileDate("app/cost-calculator/page.tsx"),
  "/eligibility-screening": latestTrackedFileDate(
    "app/eligibility-screening/page.tsx",
    "data/trust.ts"
  ),
  "/care-sla": latestDate(
    latestTrustMetricDate,
    latestTrackedFileDate("app/care-sla/page.tsx", "data/trust-dashboard.ts")
  ),
  "/transport": latestTrackedFileDate("app/transport/page.tsx"),
  "/hotels": latestTrackedFileDate("app/hotels/page.tsx"),
  "/travel-support": latestTrackedFileDate("app/travel-support/page.tsx"),
  "/privacy": latestTrackedFileDate("app/privacy/page.tsx", "data/company-profile.ts"),
  "/terms": latestTrackedFileDate("app/terms/page.tsx", "data/company-profile.ts"),
  "/medical-disclaimer": latestTrackedFileDate("app/medical-disclaimer/page.tsx"),
  "/authors": latestDate(
    latestAuthorProfileDate,
    latestTrackedFileDate("app/authors/page.tsx", "data/authors.ts")
  ),
  "/editorial-policy": latestDate(
    latestEditorialUpdateDate,
    latestTrackedFileDate("app/editorial-policy/page.tsx")
  ),
  "/content-updates": latestDate(
    latestEditorialUpdateDate,
    latestTrackedFileDate("app/content-updates/page.tsx", "data/editorial-updates.ts")
  ),
  "/china-visa-free-medical-tourism": latestDate(
    toDate(
      editorialUpdates.find((update) => update.page === "/china-visa-free-medical-tourism")?.date
    ),
    latestTrackedFileDate("app/china-visa-free-medical-tourism/page.tsx")
  ),
  "/blog": latestDate(latestBlogDate, latestTrackedFileDate("app/blog/page.tsx", "data/posts.ts"))
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

  const staticPages = Object.entries(staticPageLastModified).map(([route, lastModified]) => ({
    url: `${siteUrl}${route}`,
    lastModified: lastModified || latestTrackedFileDate("app/layout.tsx") || new Date("2026-02-27")
  }));

  const procedurePages = procedures.map((procedure) => {
    const procedureUpdate = editorialUpdates.find((update) => update.page === `/${procedure.slug}`);
    const relatedPostDate = latestDate(
      ...blogPosts
        .filter((post) => post.relatedProcedureSlug === procedure.slug)
        .map((post) => toDate(post.dateUpdated))
    );

    return {
      url: `${siteUrl}/${procedure.slug}`,
      lastModified:
        latestDate(
          toDate(procedureUpdate?.date),
          relatedPostDate,
          latestTrackedFileDate("app/[slug]/page.tsx", "data/procedures.ts", "data/trust.ts")
        ) || new Date("2026-02-27")
    };
  });

  const cityGuidePages = cityGuides.map((guide) => ({
    url: `${siteUrl}/${guide.slug}`,
    lastModified:
      latestTrackedFileDate("app/[slug]/page.tsx", "data/cities.ts") ||
      new Date("2026-02-27")
  }));

  const hospitalPages = hospitals.map((hospital) => {
    const trustProfile = hospitalTrustProfiles.find((profile) => profile.hospitalSlug === hospital.slug);

    return {
      url: `${siteUrl}/hospital/${hospital.slug}`,
      lastModified:
        latestDate(
          toDate(trustProfile?.credentialLastVerified),
          latestTrackedFileDate("app/hospital/[slug]/page.tsx", "data/hospitals.ts", "data/trust.ts")
        ) || new Date("2026-02-27")
    };
  });

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: toDate(post.dateUpdated) || new Date("2026-02-27")
  }));

  const categoryPages = Array.from(new Set(blogPosts.map((post) => post.category))).map((category) => {
    const categoryDate = latestDate(
      ...blogPosts
        .filter((post) => post.category === category)
        .map((post) => toDate(post.dateUpdated))
    );

    return {
      url: `${siteUrl}/blog/category/${category}`,
      lastModified:
        latestDate(categoryDate, latestTrackedFileDate("app/blog/category/[slug]/page.tsx")) ||
        new Date("2026-02-27")
    };
  });

  const caseStudyPages = caseStudies.map((item) => ({
    url: `${siteUrl}/case-studies/${item.slug}`,
    lastModified:
      latestTrackedFileDate("app/case-studies/[slug]/page.tsx", "data/case-studies.ts") ||
      new Date("2026-02-27")
  }));

  const authorPages = blogAuthors.map((author) => ({
    url: `${siteUrl}/authors/${author.slug}`,
    lastModified:
      latestDate(
        toDate(author.lastProfileReview),
        latestTrackedFileDate("app/authors/[slug]/page.tsx", "data/authors.ts")
      ) || new Date("2026-02-27")
  }));

  return [
    ...staticPages,
    ...procedurePages,
    ...cityGuidePages,
    ...hospitalPages,
    ...blogPages,
    ...categoryPages,
    ...caseStudyPages,
    ...authorPages
  ];
}

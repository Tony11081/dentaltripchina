import type { MetadataRoute } from "next";
import { procedures } from "@/data/procedures";
import { cityGuides } from "@/data/cities";
import { hospitals } from "@/data/hospitals";
import { blogPosts } from "@/data/posts";
import { caseStudies } from "@/data/case-studies";
import { blogAuthors } from "@/data/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

  const staticPages = [
    "",
    "/about",
    "/how-it-works",
    "/hospitals",
    "/pricing",
    "/contact",
    "/testimonials",
    "/trust-center",
    "/trust-dashboard",
    "/verification",
    "/case-studies",
    "/cost-calculator",
    "/eligibility-screening",
    "/care-sla",
    "/transport",
    "/hotels",
    "/travel-support",
    "/privacy",
    "/terms",
    "/medical-disclaimer",
    "/authors",
    "/editorial-policy",
    "/content-updates",
    "/china-visa-free-medical-tourism",
    "/blog"
  ];

  const now = new Date();

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now
    })),
    ...procedures.map((item) => ({
      url: `${siteUrl}/${item.slug}`,
      lastModified: now
    })),
    ...cityGuides.map((item) => ({
      url: `${siteUrl}/${item.slug}`,
      lastModified: now
    })),
    ...hospitals.map((item) => ({
      url: `${siteUrl}/hospital/${item.slug}`,
      lastModified: now
    })),
    ...blogPosts.map((item) => ({
      url: `${siteUrl}/blog/${item.slug}`,
      lastModified: new Date(item.dateUpdated)
    })),
    ...Array.from(new Set(blogPosts.map((item) => item.category))).map((category) => ({
      url: `${siteUrl}/blog/category/${category}`,
      lastModified: now
    })),
    ...caseStudies.map((item) => ({
      url: `${siteUrl}/case-studies/${item.slug}`,
      lastModified: now
    })),
    ...blogAuthors.map((author) => ({
      url: `${siteUrl}/authors/${author.slug}`,
      lastModified: now
    }))
  ];
}

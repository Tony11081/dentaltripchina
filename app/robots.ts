import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const disallow = ["/api/", "/thank-you"];
  const discoveryRoutes = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/rss.xml",
    "/feed.json",
    "/knowledge.json"
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User"],
        allow: discoveryRoutes,
        disallow
      },
      {
        userAgent: ["GPTBot", "Google-Extended"],
        allow: discoveryRoutes,
        disallow
      }
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`
  };
}

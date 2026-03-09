import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const disallow = ["/api/", "/thank-you"];

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
        allow: ["/", "/llms.txt", "/llms-full.txt", "/rss.xml"],
        disallow
      },
      {
        userAgent: ["GPTBot", "Google-Extended"],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/rss.xml"],
        disallow
      }
    ],
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`
  };
}

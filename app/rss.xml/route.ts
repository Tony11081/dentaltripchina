import { blogPosts } from "@/data/posts";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const posts = [...blogPosts].sort((left, right) => right.dateUpdated.localeCompare(left.dateUpdated));
  const latestUpdated = posts[0]?.dateUpdated || new Date().toISOString().slice(0, 10);
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <dc:creator>${escapeXml(post.authorName)}</dc:creator>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>DentalTripChina Editorial Feed</title>
    <link>${siteUrl}</link>
    <description>Updated articles on treatment costs, timelines, candidacy, and medical travel planning in China.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date(latestUpdated).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

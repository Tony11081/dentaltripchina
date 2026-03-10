import { blogPosts } from "@/data/posts";

export function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";
  const posts = [...blogPosts].sort((left, right) => right.dateUpdated.localeCompare(left.dateUpdated));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "DentalTripChina Editorial Feed",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description:
      "Updated articles on treatment costs, timelines, provider fit, verification, and medical travel planning in China.",
    language: "en-GB",
    authors: [
      {
        name: "DentalTripChina Editorial Desk",
        url: `${siteUrl}/editorial-policy`
      }
    ],
    items: posts.map((post) => ({
      id: `${siteUrl}/blog/${post.slug}`,
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      summary: post.excerpt,
      content_text: post.content.join("\n\n"),
      date_published: new Date(post.datePublished).toISOString(),
      date_modified: new Date(post.dateUpdated).toISOString(),
      authors: [
        {
          name: post.authorName,
          url: post.authorSlug ? `${siteUrl}/authors/${post.authorSlug}` : undefined
        }
      ],
      tags: [post.category, ...post.tags],
      language: "en-GB"
    }))
  };

  return Response.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

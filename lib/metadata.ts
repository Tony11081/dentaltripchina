import type { Metadata } from "next";
import { pageImageAssets } from "@/lib/site-images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

export const defaultSocialImage = pageImageAssets.homeHero.src;

export const siteAlternateTypes: NonNullable<Metadata["alternates"]>["types"] = {
  "application/rss+xml": [
    {
      url: absoluteUrl("/rss.xml"),
      title: "DentalTripChina RSS Feed"
    }
  ],
  "application/feed+json": [
    {
      url: absoluteUrl("/feed.json"),
      title: "DentalTripChina JSON Feed"
    }
  ],
  "text/plain": [
    {
      url: absoluteUrl("/llms.txt"),
      title: "DentalTripChina llms.txt"
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      title: "DentalTripChina full LLM index"
    }
  ],
  "application/json": [
    {
      url: absoluteUrl("/knowledge.json"),
      title: "DentalTripChina structured knowledge index"
    }
  ]
};

export const defaultRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1
  },
  "max-snippet": -1,
  "max-image-preview": "large",
  "max-video-preview": -1
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  imagePath = defaultSocialImage,
  type = "website",
  publishedTime,
  modifiedTime
}: BuildMetadataOptions): Metadata {
  const image = absoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: siteAlternateTypes
    },
    robots: defaultRobots,
    openGraph: {
      type,
      url: absoluteUrl(path),
      title,
      description,
      siteName: "DentalTripChina",
      images: [
        {
          url: image,
          alt: title
        }
      ],
      publishedTime,
      modifiedTime
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

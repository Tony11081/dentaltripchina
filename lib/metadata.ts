import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

export const defaultSocialImage = "/editorial/hero-consultation.svg";

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
      canonical: path
    },
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

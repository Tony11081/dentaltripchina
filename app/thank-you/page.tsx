import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { pageImageAssets } from "@/lib/site-images";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Thank You",
    description: "Your request has been received and our coordination desk will follow up shortly.",
    path: "/thank-you",
    imagePath: pageImageAssets.homeHero.src
  }),
  robots: {
    index: false,
    follow: false
  }
};

export default function ThankYouPage() {
  return (
    <section className="section container">
      <article className="card">
        <h1>Thank You</h1>
        <p>
          Your request has been received. We will respond to your WhatsApp or
          email within 2 hours.
        </p>
        <p>
          <Link className="btn btn-primary" href="/">
            Back to Homepage
          </Link>
        </p>
      </article>
    </section>
  );
}

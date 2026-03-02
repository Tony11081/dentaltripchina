import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
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

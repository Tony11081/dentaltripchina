import Link from "next/link";
import { procedures } from "@/data/procedures";

export default function NotFound() {
  return (
    <section className="section container">
      <article className="card">
        <h1>Page Not Found</h1>
        <p>We could not find the page you requested.</p>
        <p>
          <Link className="btn btn-primary" href="/">
            Back to Home
          </Link>
        </p>
      </article>

      <h2>Popular Procedures</h2>
      <div className="card-grid three">
        {procedures.slice(0, 4).map((item) => (
          <article className="card" key={item.slug}>
            <h3>
              <Link href={`/${item.slug}`}>{item.title}</Link>
            </h3>
            <p>{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

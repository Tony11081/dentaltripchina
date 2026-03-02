import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { editorialUpdates } from "@/data/editorial-updates";

export const metadata: Metadata = {
  title: "Content Update Log",
  description:
    "Versioned update ledger for pricing, safety guidance, and policy pages."
};

export default function ContentUpdatesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Content Updates", href: "/content-updates" }
        ]}
      />

      <section className="section container">
        <p className="section-kicker">Version History</p>
        <h1>Content Update Log</h1>
        <p className="section-lede muted">
          We publish material edits that affect decision-making, safety, pricing boundaries,
          or travel preparation.
        </p>

        <div className="table-scroll">
          <table className="price-table timeline-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Page</th>
                <th>Change Summary</th>
                <th>Reviewer</th>
              </tr>
            </thead>
            <tbody>
              {editorialUpdates.map((item, index) => (
                <tr key={`${item.date}-${item.page}`} className={index === 0 ? "advantage-row" : ""}>
                  <td>{item.date}</td>
                  <td>{item.page}</td>
                  <td>{item.change}</td>
                  <td>{item.reviewer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

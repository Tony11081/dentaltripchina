import Link from "next/link";
import { CaseStudy } from "@/lib/types";
import { LocalizedPrice } from "@/components/localized-price";

interface CaseStudyCardProps {
  item: CaseStudy;
}

function getTotalCost(item: CaseStudy) {
  return (
    item.costBreakdown.treatmentUsd +
    item.costBreakdown.flightHotelUsd +
    item.costBreakdown.followUpUsd +
    item.costBreakdown.extraUsd
  );
}

export function CaseStudyCard({ item }: CaseStudyCardProps) {
  return (
    <article className="card case-card">
      <p className="card-eyebrow">{item.country} Case</p>
      <h3>
        <Link href={`/case-studies/${item.slug}`}>{item.title}</Link>
      </h3>
      <p>{item.patientContext}</p>
      <p className="muted">
        {item.city} | Total spend: <LocalizedPrice usd={getTotalCost(item)} emphasize />
      </p>
      <div className="badge-row">
        <span className="badge">{item.complication.occurred ? "Complication Managed" : "No Complication"}</span>
        <span className="badge">{item.testimonial.verified ? "Verified Patient" : "Unverified"}</span>
      </div>
      <p>
        <Link className="btn btn-secondary" href={`/case-studies/${item.slug}`}>
          Read full case
        </Link>
      </p>
    </article>
  );
}

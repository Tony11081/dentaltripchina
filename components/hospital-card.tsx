import Link from "next/link";
import { Hospital } from "@/lib/types";
import { CardMedia } from "@/components/card-media";

interface HospitalCardProps {
  hospital: Hospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const specialtyPreview = hospital.departmentHighlights.slice(0, 2).map((item) => item.name);
  const profileHref = `/hospital/${hospital.slug}`;

  return (
    <article className="card hospital-card">
      <CardMedia src={hospital.heroImageSrc} alt={hospital.heroImageAlt} />
      <p className="card-eyebrow">Hospital</p>
      <h3>
        <Link href={profileHref}>{hospital.name}</Link>
      </h3>
      <p>{hospital.summary}</p>
      <p className="muted">{hospital.address}</p>
      <p className="muted">
        Key departments: {specialtyPreview.join(" | ")}
      </p>
      <div className="badge-row">
        <span className="badge">{hospital.city.toUpperCase()}</span>
        {hospital.jciYear > 0 ? <span className="badge">JCI Since {hospital.jciYear}</span> : null}
        {hospital.englishStaff ? <span className="badge">English Staff</span> : null}
      </div>
      <p className="hospital-card-cta">
        <Link className="btn btn-secondary" href={profileHref}>
          View hospital profile →
        </Link>
      </p>
      <p>
        <a href={hospital.jciVerifyUrl} target="_blank" rel="noopener noreferrer">
          Verify accreditation
        </a>
      </p>
    </article>
  );
}

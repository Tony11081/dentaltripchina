import Link from "next/link";
import { Procedure } from "@/lib/types";
import { getUsdFxReferenceNote } from "@/lib/currency";
import { LocalizedPrice } from "@/components/localized-price";
import { CardMedia } from "@/components/card-media";
import { getProcedureImage } from "@/lib/site-images";

interface ProcedureCardProps {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  const image = getProcedureImage(procedure.slug);

  return (
    <article className="card procedure-card">
      <CardMedia src={image.src} alt={image.alt} />
      <p className="card-eyebrow">Procedure</p>
      <h3>
        <Link href={`/${procedure.slug}`}>{procedure.title}</Link>
      </h3>
      <p>{procedure.excerpt}</p>
      <p className="price-line">
        <LocalizedPrice usd={procedure.prices.chinaUsd} emphasize />
        <span className="muted">
          {" "}
          / <LocalizedPrice usd={procedure.prices.usUsd} showUsdHint={false} /> (US)
        </span>
      </p>
      <p className="muted">
        UK/AU reference: <LocalizedPrice usd={procedure.prices.ukUsd} />
      </p>
      <p className="muted">{getUsdFxReferenceNote()}</p>
      <span className="badge">Save {procedure.savingsPct}%</span>
    </article>
  );
}

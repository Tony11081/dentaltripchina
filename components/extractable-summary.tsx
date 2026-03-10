import type { ReactNode } from "react";

interface SummaryItem {
  label: string;
  value: ReactNode;
  note?: ReactNode;
}

interface ExtractableSummaryProps {
  eyebrow: string;
  title: string;
  description?: string;
  items: SummaryItem[];
  id?: string;
}

function getGridClass(count: number) {
  if (count >= 4) return "four";
  if (count === 2) return "two";
  return "three";
}

export function ExtractableSummary({
  eyebrow,
  title,
  description,
  items,
  id
}: ExtractableSummaryProps) {
  return (
    <div id={id}>
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-lede muted">{description}</p> : null}
      <div className={`card-grid ${getGridClass(items.length)}`}>
        {items.map((item) => (
          <article className="card trust-block" key={item.label}>
            <h3>{item.label}</h3>
            <p>{item.value}</p>
            {item.note ? <p className="trust-note">{item.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

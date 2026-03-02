import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentaltripchina.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`
    }))
  };

  return (
    <section className="container breadcrumb-wrap">
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, index) => (
            <li key={`${item.href}-${index}`}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

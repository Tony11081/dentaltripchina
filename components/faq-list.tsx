import { FaqItem } from "@/lib/types";

interface FaqListProps {
  items: FaqItem[];
}

export function FaqList({ items }: FaqListProps) {
  if (!items.length) return null;

  return (
    <section className="section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {items.map((faq) => (
          <details key={faq.question} className="faq-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

import FaqList from "@/components/page/FaqList";

export type Faq = { q: string; a: string };

/**
 * Visible FAQ section + matching FAQPage JSON-LD from one source array,
 * so the markup always reflects what readers (and AI crawlers) can see.
 */
export default function BlogFaq({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="not-prose mt-14" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="kicker">FAQ</p>
      <h2 id="faq-heading" className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Frequently asked questions
      </h2>
      <FaqList items={faqs} className="mt-6" />
    </section>
  );
}

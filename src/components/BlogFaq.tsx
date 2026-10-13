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
    <section className="mt-12" aria-labelledby="faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm">
            <summary className="cursor-pointer list-none font-semibold text-gray-900 flex justify-between gap-4">
              <h3 className="text-base font-semibold">{f.q}</h3>
              <span className="text-primary-600 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

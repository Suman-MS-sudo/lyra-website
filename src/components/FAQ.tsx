import Link from "next/link";
import { homeFaqs } from "@/lib/home-faqs";
import { IconPlus } from "@/components/store/icons";

/**
 * Visible homepage FAQ. Answers stay in the HTML (inside <details>), matching the FAQPage
 * JSON-LD built from the same homeFaqs array.
 */
export default function FAQ() {
  return (
    <section id="faq" className="bg-canvas py-20 sm:py-24 lg:py-32">
      <div className="lyra-container grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <p className="kicker">Common Questions</p>
          <h2 className="mt-4 text-display-lg font-semibold text-ink">Lyra Enterprises Answers Your Buying Questions Directly</h2>
          <p className="mt-5 text-lg text-body">Real prices, real capacities, no guesswork — not vague marketing copy.</p>
          <div className="mt-8 rounded-[20px] border border-line bg-subtle p-6">
            <p className="font-display text-base font-semibold text-ink">Still deciding?</p>
            <p className="mt-1 text-sm text-muted">Compare every model side by side, or ask our team directly.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/compare-sanitary-napkin-vending-machines" className="btn btn-secondary h-10 px-4 text-sm">
                Compare models
              </Link>
              <Link href="#contact" className="btn btn-primary h-10 px-4 text-sm">
                Ask sales
              </Link>
            </div>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {homeFaqs.map((item, k) => (
            <details key={item.q} className="faq group" open={k === 0}>
              <summary className="flex items-start justify-between gap-6 py-6">
                <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{item.q}</h3>
                <span className="faq-icon mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line text-ink transition-transform duration-300 group-hover:border-line-strong">
                  <IconPlus className="h-4 w-4" />
                </span>
              </summary>
              <p className="-mt-2 max-w-2xl pb-6 pr-12 text-[15px] leading-relaxed text-body">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

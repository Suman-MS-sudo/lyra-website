import { IconPlus } from "@/components/store/icons";

type Item = { q: string; a: React.ReactNode };

/** Accordion FAQ. Answers stay in the HTML (inside <details>) so they remain crawlable. */
export default function FaqList({ items, className = "", openFirst = true }: { items: Item[]; className?: string; openFirst?: boolean }) {
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((f, k) => (
        <details key={typeof f.q === "string" ? f.q : k} className="faq group" open={openFirst && k === 0}>
          <summary className="flex items-start justify-between gap-6 py-5">
            <h3 className="font-display text-base font-semibold leading-snug text-ink sm:text-[17px]">{f.q}</h3>
            <span className="faq-icon mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line text-ink transition-transform duration-300 group-hover:border-line-strong">
              <IconPlus className="h-4 w-4" />
            </span>
          </summary>
          <div className="-mt-1 max-w-3xl pb-6 pr-12 text-[15px] leading-relaxed text-body">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

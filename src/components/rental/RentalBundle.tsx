import { CUSTOMER_DOES, LYRA_DOES } from "@/lib/rental";
import { IconCheck } from "@/components/store/icons";

/**
 * The all-inclusive bundle at a glance: everything Lyra does versus the customer's only jobs.
 * Token colours only, so it works on light and dark (`.dark`) sections.
 */
export default function RentalBundle({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? "md:grid-cols-[1.4fr_1fr]" : "lg:grid-cols-[1.5fr_1fr]"}`}>
      <div className="rounded-[24px] border border-primary-500/40 bg-brand-soft p-6 sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Lyra takes care of</p>
        <ul className={`mt-4 grid gap-x-6 gap-y-2.5 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
          {LYRA_DOES.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary-600 text-white">
                <IconCheck className="h-3 w-3" strokeWidth={2.6} />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[24px] border border-line bg-surface p-6 sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">You only</p>
        <ul className="mt-4 space-y-2.5">
          {CUSTOMER_DOES.map((t, k) => (
            <li key={t} className="flex items-start gap-3 text-[14.5px] leading-snug text-ink">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line-strong font-display text-xs font-semibold text-ink">
                {k + 1}
              </span>
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
          No service contracts, no spare parts to buy and no repair bills for normal wear and tear. Napkins are ordered from Lyra and arrive ready to load.
        </p>
      </div>
    </div>
  );
}

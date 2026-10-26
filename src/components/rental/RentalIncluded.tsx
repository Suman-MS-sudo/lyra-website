import { RENTAL_INCLUDED } from "@/lib/rental";
import { IconBarChart, IconBolt, IconHeadset, IconPackage, IconShield, IconWifi, IconWrench, IconX } from "@/components/store/icons";

const ICONS = {
  install: IconPackage,
  service: IconWrench,
  parts: IconShield,
  breakdown: IconHeadset,
  monitor: IconBarChart,
  alerts: IconBolt,
  updates: IconWifi,
} as const;

/**
 * What the monthly rent covers, plus the one exclusion (napkin refills).
 * `compact` renders a chip row for dense spots such as the homepage band.
 */
export default function RentalIncluded({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <ul className="flex flex-wrap gap-2" aria-label="Included in the rent">
        {RENTAL_INCLUDED.map(({ key, title }) => {
          const Icon = ICONS[key];
          return (
            <li key={key} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-ink">
              <Icon className="h-4 w-4 text-brand" /> {title}
            </li>
          );
        })}
        <li className="inline-flex items-center gap-2 rounded-full border border-dashed border-line px-3.5 py-2 text-[13px] text-muted">
          <IconX className="h-4 w-4" /> Napkin refills extra
        </li>
      </ul>
    );
  }

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RENTAL_INCLUDED.map(({ key, title, body }) => {
          const Icon = ICONS[key];
          return (
            <li key={key} className="spotlight rounded-[22px] border border-line bg-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{body}</p>
            </li>
          );
        })}
        <li className="rounded-[22px] border border-dashed border-line-strong p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-subtle text-muted">
            <IconX className="h-[22px] w-[22px]" />
          </span>
          <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">Not included: napkin refills</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-body">
            Refills are bought from Lyra: individually wrapped XL (280 mm) and XXL (320 mm) napkins made to fit every Lyra machine.
          </p>
        </li>
      </ul>
    </div>
  );
}

import Link from "next/link";
import { RENTAL_PATH, RENTAL_PLANS, rupees } from "@/lib/rental";
import { IconArrowRight } from "@/components/store/icons";

/**
 * Slim "or rent it" banner for inner pages: the three monthly prices and a link to the rental page.
 * `title` lets each page phrase it for its own context (e.g. a product name).
 */
export default function RentalCallout({
  title = "Prefer to rent? All-inclusive from ₹999 a month",
  body = "Lyra supplies, installs, services, repairs and monitors a Solo WiFi, Solo Ethernet or Solo RFID machine, and supplies the napkins. You only refill it.",
  className = "",
}: {
  title?: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      aria-label="Rental plans"
      className={`theme-light relative overflow-hidden rounded-[24px] bg-night p-6 text-white sm:p-8 ${className}`}
    >
      <div aria-hidden className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-primary-600/40 blur-3xl" />
      <div aria-hidden className="grid-lines absolute inset-0 opacity-[0.06] [mask-image:linear-gradient(to_right,#000,transparent_70%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400" /> New · Rental plans
          </p>
          <p className="mt-3 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{title}</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">{body}</p>
        </div>
        <div>
          <ul className="grid grid-cols-3 gap-2">
            {RENTAL_PLANS.map((p) => (
              <li key={p.id} className={`rounded-2xl border px-3 py-3 text-center ${p.popular ? "border-primary-400/60 bg-primary-500/15" : "border-white/10 bg-white/[0.04]"}`}>
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/55">{p.capacity} napkins</span>
                <span className="mt-1 block font-display text-lg font-semibold text-white tabular">{rupees(p.price)}</span>
                <span className="block text-[10.5px] text-white/50">/month + GST</span>
              </li>
            ))}
          </ul>
          <Link href={RENTAL_PATH} className="btn btn-primary mt-3 h-11 w-full">
            See rental plans <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

/** RentalCallout inside a page-width section, for dropping between inner-page sections. */
export function RentalBand(props: Parameters<typeof RentalCallout>[0]) {
  return (
    <section className="bg-canvas pt-14 sm:pt-20">
      <div className="lyra-container">
        <RentalCallout {...props} />
      </div>
    </section>
  );
}

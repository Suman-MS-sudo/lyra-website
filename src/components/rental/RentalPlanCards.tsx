import Link from "next/link";
import {
  RENTAL_ADVANCE_MONTHS,
  RENTAL_DEPOSIT,
  RENTAL_MIN_YEARS,
  RENTAL_MODELS,
  RENTAL_PATH,
  RENTAL_PLANS,
  rentWithGst,
  rupees,
  type RentalPlan,
} from "@/lib/rental";
import { IconArrowRight, IconCheck } from "@/components/store/icons";

/** Ten-cell meter that fills with the plan's napkin capacity (100 = full). */
function CapacityMeter({ capacity }: { capacity: number }) {
  const filled = Math.round(capacity / 10);
  return (
    <span aria-hidden className="flex h-10 items-end gap-[3px]">
      {Array.from({ length: 10 }, (_, k) => (
        <span
          key={k}
          style={{ height: `${30 + k * 7}%` }}
          className={`w-[5px] rounded-full ${k < filled ? "bg-primary-500" : "bg-line-strong/60"}`}
        />
      ))}
    </span>
  );
}

/**
 * The three monthly rental plans as cards. Works on light and dark surfaces (token colours only).
 * `planHref` decides where each card's button goes: the rental page form by default.
 */
export default function RentalPlanCards({
  planHref = (p: RentalPlan) => `${RENTAL_PATH}?plan=${p.id}#enquire`,
  headingLevel = "h3",
}: {
  planHref?: (p: RentalPlan) => string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:gap-5">
      {RENTAL_PLANS.map((p) => (
        <li
          key={p.id}
          className={`spotlight relative flex flex-col rounded-[24px] border p-6 sm:p-7 ${
            p.popular
              ? "border-primary-500/60 bg-surface shadow-[0_30px_70px_-30px_rgb(var(--brand)/0.55)]"
              : "border-line bg-surface"
          }`}
        >
          {p.popular && (
            <span className="absolute -top-3 left-6 rounded-full bg-primary-600 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white">
              Most chosen
            </span>
          )}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{p.name} plan</p>
              <Heading className="mt-2 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-ink">
                {p.capacity}-napkin capacity
              </Heading>
            </div>
            <CapacityMeter capacity={p.capacity} />
          </div>

          <p className="mt-6 flex items-baseline gap-1.5">
            <span className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.03em] text-ink tabular">{rupees(p.price)}</span>
            <span className="text-sm font-medium text-muted">/ month</span>
          </p>
          <p className="mt-1.5 text-[12.5px] text-muted">
            + 18% GST · {rupees(rentWithGst(p.price))} per month with GST
          </p>

          <p className="mt-5 border-t border-line pt-5 text-[14px] leading-relaxed text-body">
            <span className="font-semibold text-ink">Ideal for:</span> {p.idealFor}
          </p>
          <ul className="mt-4 space-y-2 text-[13.5px] text-body">
            <li className="flex items-start gap-2.5">
              <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
              Holds {p.capacity} napkins per fill
            </li>
            <li className="flex items-start gap-2.5">
              <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
              Choice of {RENTAL_MODELS.map((m) => m.tech.replace("IoT · ", "IoT ")).join(", ").replace(/, ([^,]*)$/, " or $1")} machine
            </li>
            <li className="flex items-start gap-2.5">
              <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
              Installation, servicing and parts included
            </li>
            <li className="flex items-start gap-2.5">
              <IconCheck className="mt-0.5 h-4 w-4 flex-none text-brand" strokeWidth={2.2} />
              Live monitoring and alerts on the Lyra website
            </li>
          </ul>
          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            {RENTAL_MIN_YEARS}-year agreement · at signing: {rupees(RENTAL_DEPOSIT)} refundable deposit + 1st month, or {RENTAL_ADVANCE_MONTHS} months in advance (+ GST) · napkins bought from Lyra
          </p>

          <Link
            href={planHref(p)}
            className={`btn mt-7 h-12 w-full ${p.popular ? "btn-primary" : "btn-secondary"}`}
          >
            Book the {p.capacity}-napkin plan <IconArrowRight className="h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

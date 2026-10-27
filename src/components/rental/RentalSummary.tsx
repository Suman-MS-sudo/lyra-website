import Link from "next/link";
import { RENTAL_ANSWER, RENTAL_DEPOSIT, RENTAL_FROM, RENTAL_MIN_YEARS, rupees } from "@/lib/rental";
import { IconArrowRight, IconClock, IconLock, IconPackage, IconPin, IconReceipt, IconSparkle, IconWifi, IconWrench } from "@/components/store/icons";

const FACTS = [
  { icon: IconReceipt, label: "Rent from", value: `${rupees(RENTAL_FROM)}/month + GST` },
  { icon: IconPin, label: "Available", value: "Across India" },
  { icon: IconWifi, label: "Machines", value: "IoT WiFi, IoT Ethernet, RFID" },
  { icon: IconPackage, label: "Capacity", value: "25, 50 or 100 napkins" },
  { icon: IconWrench, label: "Included", value: "Install, service, repairs, parts, monitoring" },
  { icon: IconSparkle, label: "Your only job", value: "Refill napkins (supplied by Lyra)" },
  { icon: IconClock, label: "Minimum term", value: `${RENTAL_MIN_YEARS} years` },
  { icon: IconLock, label: "At signing", value: `${rupees(RENTAL_DEPOSIT)} deposit + month 1, + GST` },
];

/**
 * The rental in one quotable paragraph plus key facts. `#quick-answer` and `#key-facts` are the
 * speakable targets in the page's structured data, so keep those ids.
 */
export default function RentalSummary({ updated }: { updated: string }) {
  return (
    <section aria-labelledby="quick-answer-title" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="lyra-container">
        <div className="grid overflow-hidden rounded-[28px] border border-line shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] lg:grid-cols-[1.05fr_1fr]">
          {/* Answer */}
          <div className="dark relative overflow-hidden bg-canvas p-7 sm:p-10 lg:p-12">
            <div aria-hidden className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-600/35 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-primary-500/15 blur-3xl" />
            <div aria-hidden className="grain pointer-events-none absolute inset-0 overflow-hidden" />
            <div className="relative flex h-full flex-col">
              <h2 id="quick-answer-title" className="kicker">
                In short
              </h2>
              <p className="mt-5 font-display text-[1.6rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[1.9rem]">
                Rent the machine. <span className="text-gradient">We handle everything else.</span>
              </p>
              <p id="quick-answer" className="mt-5 text-[15.5px] leading-[1.75] text-body sm:text-base">
                {RENTAL_ANSWER}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <p className="text-xs text-muted">
                  Lyra Enterprises · Chennai · Updated {updated}
                </p>
                <Link href="#enquire" className="btn btn-primary h-10 px-4 text-sm">
                  Book online <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Key facts */}
          <dl id="key-facts" className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-surface p-5 sm:p-6">
                <dt className="flex items-start gap-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="pt-1">{label}</span>
                </dt>
                <dd className="-mt-[1.15rem] pl-[3.375rem] text-[14.5px] font-semibold leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

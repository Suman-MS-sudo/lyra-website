import Image from "next/image";
import Link from "next/link";
import RentalPlanCards from "@/components/rental/RentalPlanCards";
import RentalIncluded from "@/components/rental/RentalIncluded";
import { RENTAL_ADVANCE_MONTHS, RENTAL_DEPOSIT, RENTAL_FROM, RENTAL_MIN_YEARS, RENTAL_MODELS, RENTAL_PATH, rupees } from "@/lib/rental";
import { IconArrowRight, IconWhatsApp } from "@/components/store/icons";

const IMAGES: Record<string, string> = {
  "solo-wifi-vending-machine": "/images/products/solo-wifi.png",
  "solo-ethernet-vending-machine": "/images/products/solo-ethernet.png",
  "solo-rfid-vending-machine": "/images/products/solo-rfid.png",
};

const WHATSAPP = `https://wa.me/918122378860?text=${encodeURIComponent(
  "Hi! I'd like to rent a Lyra sanitary napkin vending machine. Please share the rental plan details."
)}`;

/**
 * The rental offer as a standout dark band: headline, plan cards and the three machines on rent.
 * Used on the homepage.
 */
export default function RentalShowcase({ id = "rent" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="dark relative scroll-mt-28 overflow-hidden border-y border-line bg-canvas py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="aurora opacity-70">
        <span />
        <span />
        <span />
      </div>
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent_75%)]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 overflow-hidden" />

      <div className="lyra-container relative z-[2]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-400" />
              </span>
              New · Special rental plans
            </p>
            <h2 id={`${id}-title`} className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.3rem]">
              Rent a smart napkin vending machine from <span className="text-gradient">{rupees(RENTAL_FROM)} a month</span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-body">
              Put an IoT WiFi, Ethernet or RFID vending machine in your washroom for a fixed monthly rent instead of buying one
              outright. Installation, regular servicing, parts replacement and live monitoring are all included. Pick the capacity
              that matches your footfall: 25, 50 or 100 napkins per fill.
            </p>
            <div className="mt-6">
              <RentalIncluded compact />
            </div>
          </div>

          {/* The three machines available on rent */}
          <ul className="grid grid-cols-3 gap-3">
            {RENTAL_MODELS.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/products/${m.slug}`}
                  className="group block rounded-[20px] border border-line bg-white/[0.03] p-3 text-center backdrop-blur-sm transition-colors hover:border-primary-500/50"
                >
                  <span className="relative mx-auto block aspect-[3/4] w-full">
                    <span aria-hidden className="absolute inset-x-[15%] bottom-[8%] top-[25%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.3),transparent)]" />
                    <Image
                      src={IMAGES[m.slug]}
                      alt={`Lyra ${m.name} vending machine available on rent`}
                      fill
                      sizes="(max-width: 1024px) 30vw, 140px"
                      className="product-shot object-contain p-2 transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  </span>
                  <span className="mt-2 block font-display text-sm font-semibold text-ink">{m.name}</span>
                  <span className="block text-[11px] uppercase tracking-[0.12em] text-muted">{m.tech}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <RentalPlanCards />
        </div>

        {(
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[22px] border border-line bg-white/[0.03] p-6 backdrop-blur-sm sm:flex-row sm:items-center">
            <p className="max-w-2xl text-[15px] leading-relaxed text-body">
              {RENTAL_MIN_YEARS}-year minimum agreement. Rent starts from month 1: at signing, pay a {rupees(RENTAL_DEPOSIT)} refundable deposit plus the
              first month&apos;s rent, or {RENTAL_ADVANCE_MONTHS} months&apos; rent in advance, plus GST. Rent is billed monthly plus 18% GST, and napkin refills are bought from Lyra. Renting for several washrooms
              or sites? Tell us how many machines you need.
            </p>
            <div className="flex flex-none flex-wrap gap-3">
              <Link href={`${RENTAL_PATH}#enquire`} className="btn btn-primary h-12 px-6">
                Book a rental online <IconArrowRight className="h-4 w-4" />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn h-12 border-white/15 bg-white/5 px-5 text-white hover:bg-white/10">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

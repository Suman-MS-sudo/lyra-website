import Image from "next/image";

const logos = [
  { src: "/images/customers/isro-logo.png", name: "ISRO" },
  { src: "/images/customers/lnt.png", name: "Larsen & Toubro" },
  { src: "/images/customers/tvs-motors-logo-png-0.png", name: "TVS Motor" },
  { src: "/images/customers/saint-gobain.png", name: "Saint-Gobain" },
  { src: "/images/customers/parker-hannifin-logo-png-transparent.png", name: "Parker Hannifin" },
  { src: "/images/customers/ashok-leyland.png", name: "Ashok Leyland" },
  { src: "/images/customers/stella-maris.png", name: "Stella Maris College" },
  { src: "/images/customers/vels-university.png", name: "Vels University" },
  { src: "/images/customers/integra.png", name: "Integra" },
  { src: "/images/customers/dg-vaishnav.png", name: "DG Vaishnav College" },
];

/** Infinite, pausable logo strip. CSS-only so it costs nothing on the main thread. */
export default function LogoMarquee() {
  return (
    <section aria-label="Organisations using Lyra machines" className="border-y border-line bg-subtle py-9">
      <p className="lyra-container text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        ISO 9001:2015 Certified Manufacturing · Trusted by 200+ institutions across India
      </p>
      <div className="marquee-mask mt-7 overflow-hidden">
        <ul className="marquee-track flex w-max animate-marquee items-center gap-14 pr-14 [--marquee-duration:45s]">
          {[...logos, ...logos].map((l, k) => (
            <li key={k} aria-hidden={k >= logos.length} className="relative h-9 w-28 flex-none sm:h-10 sm:w-32">
              <Image
                src={l.src}
                alt={k >= logos.length ? "" : l.name}
                fill
                sizes="128px"
                className="object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-70 dark:brightness-0 dark:invert"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

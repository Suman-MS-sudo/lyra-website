const SECTORS = ["Schools", "Colleges", "Hospitals", "Offices", "Hostels", "Factories", "IT parks", "Public restrooms"];
const TECH = ["Push button", "Coin", "UPI QR", "RFID card", "Touchless", "WiFi + cloud", "Ethernet", "Incinerators"];

function Row({ words, reverse = false, outline = false }: { words: string[]; reverse?: boolean; outline?: boolean }) {
  const items = [...words, ...words];
  return (
    <div className="marquee-mask overflow-hidden">
      <ul
        className="flex w-max animate-marquee items-center [--marquee-duration:60s]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((w, k) => (
          <li key={k} aria-hidden={k >= words.length} className="flex items-center">
            <span
              className={`whitespace-nowrap px-6 font-display font-semibold tracking-[-0.04em] sm:px-10 ${
                outline ? "text-outline text-[3.4rem] sm:text-[6rem]" : "text-[1.4rem] text-muted sm:text-[2rem]"
              }`}
            >
              {w}
            </span>
            <span className={`flex-none rounded-full bg-primary-600 ${outline ? "h-3 w-3 sm:h-4 sm:w-4" : "h-1.5 w-1.5"}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Oversized, slowly scrolling type: who Lyra equips and how its machines take payment. */
export default function WordBand() {
  return (
    <section aria-label="Sectors and technologies" className="overflow-hidden border-y border-line bg-canvas py-10 sm:py-14">
      <Row words={SECTORS} outline />
      <div className="mt-2 sm:mt-4">
        <Row words={TECH} reverse />
      </div>
    </section>
  );
}

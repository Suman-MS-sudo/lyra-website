import { IconHeadset, IconLock, IconReceipt, IconTruck } from "@/components/store/icons";

const items = [
  { icon: IconTruck, title: "Pan-India dispatch", body: "Ships from Chennai in 1–3 working days" },
  { icon: IconReceipt, title: "GST invoice", body: "Claim input credit on every machine" },
  { icon: IconLock, title: "Secure checkout", body: "UPI, cards and net banking via Razorpay" },
  { icon: IconHeadset, title: "1-year warranty", body: "Remote support pan-India, on-site in the South" },
];

export default function ServiceStrip() {
  return (
    <section aria-label="Why buy from Lyra" className="border-b border-line bg-canvas">
      <ul className="lyra-container grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }, k) => (
          <li
            key={title}
            className={`flex items-start gap-3.5 py-6 sm:items-center sm:py-7 ${k % 2 === 1 ? "pl-4 sm:pl-6" : "pr-4"} ${
              k > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""
            } ${k > 1 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Icon className="h-[22px] w-[22px]" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

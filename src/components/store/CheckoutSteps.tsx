import Link from "next/link";
import { IconCheck } from "@/components/store/icons";

const STEPS = [
  { label: "Cart", href: "/cart" },
  { label: "Details & payment", href: "/checkout" },
  { label: "Confirmed", href: null },
];

/** Progress indicator for the cart → checkout → confirmation flow. */
export default function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center gap-2 text-sm sm:gap-3">
        {STEPS.map((s, k) => {
          const done = k < current;
          const here = k === current;
          const dot = (
            <span
              className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                done ? "bg-primary-600 text-white" : here ? "bg-ink text-canvas" : "border border-line-strong text-muted"
              }`}
            >
              {done ? <IconCheck className="h-3.5 w-3.5" strokeWidth={2.4} /> : k + 1}
            </span>
          );
          return (
            <li key={s.label} className="flex items-center gap-2 sm:gap-3" aria-current={here ? "step" : undefined}>
              {done && s.href ? (
                <Link href={s.href} className="flex items-center gap-2 font-medium text-ink hover:text-brand">
                  {dot}
                  <span className="hidden sm:inline">{s.label}</span>
                </Link>
              ) : (
                <span className={`flex items-center gap-2 font-medium ${here ? "text-ink" : "text-muted"}`}>
                  {dot}
                  <span className={here ? "" : "hidden sm:inline"}>{s.label}</span>
                </span>
              )}
              {k < STEPS.length - 1 && <span aria-hidden className={`h-px w-6 sm:w-12 ${done ? "bg-primary-600" : "bg-line-strong"}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

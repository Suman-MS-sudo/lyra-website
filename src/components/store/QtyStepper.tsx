"use client";

import { IconMinus, IconPlus } from "@/components/store/icons";

type Props = {
  value: number;
  step?: number;
  min?: number;
  label: string;
  onChange: (n: number) => void;
  size?: "sm" | "md";
};

/** − qty + control. Typing a number works too; values snap to the step (100s for napkins). */
export default function QtyStepper({ value, step = 1, min = 0, label, onChange, size = "md" }: Props) {
  const h = size === "sm" ? "h-9" : "h-11";
  const btn = size === "sm" ? "w-9" : "w-11";
  return (
    <div role="group" aria-label={`${label} quantity`} className={`inline-flex ${h} items-center rounded-full border border-line-strong bg-surface`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        aria-label={`Decrease ${label} quantity`}
        className={`flex ${h} ${btn} items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle`}
      >
        <IconMinus className="h-4 w-4" />
      </button>
      <input
        inputMode="numeric"
        aria-label={`${label} quantity`}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        onBlur={() => {
          if (step > 1 && value % step !== 0) onChange(Math.max(step, Math.round(value / step) * step));
        }}
        className={`${step > 1 ? "w-14" : "w-9"} bg-transparent text-center text-sm font-semibold text-ink outline-none tabular`}
      />
      <button
        type="button"
        onClick={() => onChange(value + step)}
        aria-label={`Increase ${label} quantity`}
        className={`flex ${h} ${btn} items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle`}
      >
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackLead } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  method: "form" | "whatsapp" | "call" | "email";
  /** Where the click happened, e.g. "price-page". Shown as lead_detail in GA4. */
  detail?: string;
};

/** Link that fires the GA4 `generate_lead` event on click. Usable from server components. */
export default function TrackedLink({ method, detail, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackLead(method, detail);
        onClick?.(e);
      }}
    />
  );
}

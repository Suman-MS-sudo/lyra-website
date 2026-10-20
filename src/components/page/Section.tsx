import Link from "next/link";

type Props = {
  id?: string;
  kicker?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  action?: { href: string; label: string };
  tone?: "canvas" | "subtle";
  /** Narrow reading column instead of the full container. */
  narrow?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** Standard inner-page section with an optional kicker / heading / lead row. */
export default function Section({ id, kicker, title, lead, action, tone = "canvas", narrow, className = "", children }: Props) {
  return (
    <section id={id} className={`scroll-mt-36 py-16 sm:py-20 lg:py-24 ${tone === "subtle" ? "border-y border-line bg-subtle" : "bg-canvas"} ${className}`}>
      <div className={narrow ? "lyra-container max-w-4xl" : "lyra-container"}>
        {(kicker || title || lead) && (
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <div className="max-w-3xl">
              {kicker && <p className="kicker">{kicker}</p>}
              {title && <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">{title}</h2>}
              {lead && <p className="mt-4 text-[17px] leading-relaxed text-body">{lead}</p>}
            </div>
            {action && (
              <Link href={action.href} className="whitespace-nowrap text-sm font-semibold text-brand hover:underline">
                {action.label} →
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

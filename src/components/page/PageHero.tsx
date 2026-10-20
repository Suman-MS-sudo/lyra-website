import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { IconCheck } from "@/components/store/icons";

type Crumb = { label: string; href?: string };

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  tags?: string[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  points?: string[];
  /** Product cut-outs shown on a stage at the right (desktop) / below (mobile). */
  images?: { src: string; alt: string }[];
  /** Any custom right-hand content instead of images. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

/** Inner-page hero: breadcrumb, kicker, display headline, lead, actions, proof points and an optional product stage. */
export default function PageHero({ crumbs, eyebrow, tags, title, lead, actions, points, images, aside, children }: Props) {
  const hasSide = Boolean(images?.length || aside);
  return (
    // Always-dark cinematic header: the `dark` class switches every design token inside to the dark palette.
    <section className="dark relative -mt-[76px] overflow-hidden border-b border-line bg-canvas pt-[76px]">
      <div aria-hidden className="aurora opacity-80">
        <span />
        <span />
        <span />
      </div>
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_70%_at_75%_30%,#000_10%,transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 overflow-hidden" />
      <div className="lyra-container relative z-[2] pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-24">
        <Breadcrumb crumbs={crumbs} />
        <div className={`mt-8 grid gap-10 lg:mt-10 ${hasSide ? "lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-14" : ""}`}>
          <div className={hasSide ? "" : "max-w-4xl"}>
            {(eyebrow || tags?.length) && (
              <div className="flex flex-wrap items-center gap-2">
                {eyebrow && <p className="kicker mr-2">{eyebrow}</p>}
                {tags?.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.4rem]">{title}</h1>
            {lead && <div className="mt-6 max-w-2xl text-[17px] leading-relaxed text-body sm:text-lg">{lead}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {points && points.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-body">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <IconCheck className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {children}
          </div>

          {aside}
          {!aside && images && images.length > 0 && (
            <div className="relative mx-auto w-full max-w-md">
              <div className="spotlight relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <div aria-hidden className="absolute inset-x-[12%] bottom-[12%] top-[20%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.18),transparent)]" />
                <div aria-hidden className="absolute bottom-[9%] left-1/2 h-6 w-[60%] -translate-x-1/2 rounded-[100%] bg-ink/10 blur-xl dark:bg-black/60" />
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={360}
                  height={480}
                  priority
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="product-shot absolute bottom-[11%] left-1/2 h-[74%] w-auto -translate-x-1/2 object-contain"
                />
                <p className="absolute left-5 top-5 max-w-[60%] text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{images[0].alt}</p>
                {images[1] && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-line bg-surface/90 py-2 pl-2 pr-4 shadow-md backdrop-blur">
                    <span className="relative h-12 w-12 flex-none overflow-hidden rounded-xl bg-subtle">
                      <Image src={images[1].src} alt="" fill sizes="48px" className="object-contain p-1" />
                    </span>
                    <span className="max-w-[9rem] text-xs leading-snug">
                      <span className="block text-muted">Also recommended</span>
                      <span className="block font-semibold text-ink">{images[1].alt}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

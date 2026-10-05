"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Img = { src: string; width: number; height: number };

type Props = {
  fullName: string;
  code: string;
  image: string;
  /** Natural size of the main product photo (falls back to the usual 853x1280). */
  imageSize?: { width: number; height: number };
  gallery?: Img[];
};

/**
 * Marketplace-style gallery: thumbnails down the left on desktop (below the image on
 * mobile), a large image on white, hover/tap a thumbnail to switch, click the image to
 * open it full size. Slide 0 is the product photo; the rest are the feature posters.
 */
export default function ProductImageGallery({ fullName, code, image, imageSize, gallery = [] }: Props) {
  const slides: (Img & { alt: string; kind: "photo" | "poster" })[] = [
    {
      src: image,
      width: imageSize?.width ?? 853,
      height: imageSize?.height ?? 1280,
      alt: fullName,
      kind: "photo",
    },
    ...gallery.map((g) => ({
      ...g,
      alt: `${fullName} (${code}): features, specifications and ideal uses`,
      kind: "poster" as const,
    })),
  ];

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = slides[active];

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      {slides.length > 1 && (
        <div
          className="flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible"
          role="group"
          aria-label="Product images"
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              aria-pressed={active === i}
              className={`relative h-16 w-16 flex-none overflow-hidden rounded-lg border-2 bg-white transition sm:h-[4.5rem] sm:w-[4.5rem] ${
                active === i
                  ? "border-primary-600 shadow-md"
                  : "border-gray-200 hover:border-primary-400"
              }`}
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="72px"
                className={s.kind === "poster" ? "object-cover object-top" : "object-contain p-1"}
              />
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setZoom(true)}
        aria-label="View image full size"
        className="relative flex aspect-[4/5] w-full flex-1 cursor-zoom-in items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white sm:aspect-square lg:aspect-[4/5]"
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          priority={active === 0}
          sizes="(max-width: 1024px) 92vw, 520px"
          className="h-full w-full object-contain p-3"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
          Tap to enlarge
        </span>
      </button>

      {zoom && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-3"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            className="max-h-[92vh] w-auto max-w-full rounded-lg bg-white object-contain"
          />
        </div>
      )}
    </div>
  );
}

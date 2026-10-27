/** Kinds of product gallery image (see `Product.gallery` in lib/data.ts). Client-safe. */
export type GalleryKind = "photo" | "poster" | "size" | "callouts" | "steps" | "specs";

/** Info graphics with text: shown on the website, kept out of the Merchant Center feed. */
export const WEBSITE_ONLY_KINDS: ReadonlySet<GalleryKind> = new Set(["callouts", "steps", "specs"]);

/** Accessible description of a gallery image, used for alt text and structured-data names. */
export function galleryLabel(kind: GalleryKind | undefined, fullName: string, code?: string): string {
  const name = code ? `${fullName} (${code})` : fullName;
  switch (kind) {
    case "photo":
      return `${name}, studio view`;
    case "size":
      return `${name} size guide: drawn to scale beside a 160 cm person`;
    case "callouts":
      return `${name}: labelled features`;
    case "steps":
      return `${name}: how it works in three steps`;
    case "specs":
      return `${name}: specifications`;
    default:
      return `${name}: features, specifications and ideal uses`;
  }
}

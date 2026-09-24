import { SITE } from "@/lib/data";

/**
 * Rating summary linking back to the Google Business Profile. Google's terms
 * require reviews shown on a site to be attributed to Google and linked back.
 * Deliberately no AggregateRating schema: Google treats a business rating
 * about itself as self-serving, so it earns no rich result and risks a flag.
 */
export default function GoogleReviewBadge({ className = "" }: { className?: string }) {
  const { rating, count, url } = SITE.googleReviews;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${count} Google reviews. Read all reviews on Google`}
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors hover:border-primary-300 ${className}`}
    >
      <span className="text-amber-500" aria-hidden>
        ★★★★★
      </span>
      <strong className="text-slate-900">{rating.toFixed(1)}</strong>
      <span className="text-slate-600">{count} Google reviews</span>
      <span className="font-semibold text-primary-600">Read all on Google →</span>
    </a>
  );
}

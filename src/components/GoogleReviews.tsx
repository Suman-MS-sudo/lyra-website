import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import { testimonials } from "@/lib/data";

/** Reusable reviews block: heading, Google rating badge, real attributed quotes. */
export default function GoogleReviews({ limit = 4 }: { limit?: number }) {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 border-t border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">What Our Customers Say</h2>
        <GoogleReviewBadge />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {testimonials.slice(0, limit).map((t) => (
          <figure key={t.author} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 m-0">
            <blockquote className="text-sm text-gray-700 leading-relaxed">&ldquo;{t.content}&rdquo;</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold text-gray-900">{t.author}</span>
                <span className="block text-xs text-gray-500">{t.company}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

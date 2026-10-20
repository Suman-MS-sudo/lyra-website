import GoogleReviewBadge from "@/components/GoogleReviewBadge";
import { testimonials } from "@/lib/data";
import { IconStar } from "@/components/store/icons";

/** Reusable reviews block: heading, Google rating badge, real attributed quotes. */
export default function GoogleReviews({ limit = 4 }: { limit?: number }) {
  return (
    <section className="bg-canvas py-16 sm:py-20">
      <div className="lyra-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Reviews</p>
            <h2 className="mt-3 text-[1.85rem] font-semibold tracking-tight text-ink sm:text-4xl">What Our Customers Say</h2>
          </div>
          <GoogleReviewBadge />
        </div>
        <div className={`grid gap-4 sm:grid-cols-2 ${limit > 2 ? "lg:grid-cols-4" : ""}`}>
          {testimonials.slice(0, limit).map((t) => (
            <figure key={t.author} className="spotlight m-0 flex h-full flex-col rounded-[20px] border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-lift">
              <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((k) => (
                  <IconStar key={k} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-body">&ldquo;{t.content}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-canvas">{t.initials}</span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{t.author}</span>
                  <span className="block text-xs text-muted">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

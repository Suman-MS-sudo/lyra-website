# Lyra Enterprises — Website Deep Audit
**Site:** https://lyraenterprise.co.in/ | **Stack:** Next.js (App Router, `_next/image`) | **Audit date:** 18 Aug 2026

## Overall Scorecard

| Area | Score | Verdict |
|---|---|---|
| On-page content & product depth | 9/10 | Excellent — best-in-class for this niche |
| Conversion elements (CRO) | 8/10 | Strong — prices, forms, WhatsApp, GST, warranty all present |
| Technical SEO / crawlability | 4/10 | **Critical bug found** — see #1 below |
| Metadata hygiene (OG/Twitter) | 5/10 | Partial — Twitter Cards broken sitewide |
| Structured data (Schema.org) | Unverified | Needs manual check — see #6 |
| Performance / Core Web Vitals | Unverified | Needs manual check — see #7 |

The site is far more advanced than a typical manufacturer site — real pricing on PDPs, comparison tables, FAQs, a genuine blog with compliance content (SWM Rules 2016, GeM registration mentioned), WhatsApp deep-links, testimonials, client logos. The gaps are almost entirely technical/config-level, not content-level.

---

## PRIORITY 1 — Critical (fix this week)

### 1. All 5 state landing pages are dead — they silently serve /products content and canonicalize away from themselves

Checked: `/vending-machine-tamil-nadu`, `/vending-machine-karnataka` (same result expected for Kerala, AP, Telangana).

**What's happening:** Each state URL renders the generic "All Products" page's `<title>`, meta description, and — critically — a `<link rel="canonical" href="https://www.lyraenterprise.co.in/products">` tag. This isn't just thin content; the canonical tag is explicitly telling Google "don't index this URL, index /products instead." These pages are linked in the **footer of every single page on the site**, so Google is crawling them constantly and getting told to ignore them every time.

**Business impact:** This kills the exact local-SEO strategy in your Month-1 roadmap (city/state landing pages for "sanitary napkin vending machine Karnataka" etc.). Right now those 5 URLs have zero chance of ranking, no matter how much content or backlink work goes into them.

**Implementation fix (Next.js):**
- Confirm whether `/app/vending-machine-[state]/page.tsx` (or equivalent) exists as a real route, or whether it's currently falling through to a catch-all that renders the Products page component.
- Each state page needs: its own `generateMetadata()` (or `<Head>`) with a **self-referencing canonical**, unique H1 ("Sanitary Napkin Vending Machines & Incinerators in Karnataka"), 300–500 words of state-specific content (cities served, install examples, state compliance notes), and a state-filtered product grid — not a re-render of `/products`.
- Example fix for the metadata bug alone (minimum viable patch):
  ```tsx
  export async function generateMetadata({ params }) {
    const state = params.state; // e.g. "karnataka"
    return {
      title: `Sanitary Napkin Vending Machines & Incinerators in ${stateName} | Lyra Enterprises`,
      description: `Buy UPI/WiFi sanitary napkin vending machines and incinerators in ${stateName}. Pan-India delivery from our Chennai facility, on-site installation in ${majorCities}.`,
      alternates: { canonical: `https://lyraenterprise.co.in/vending-machine-${state}` },
    };
  }
  ```
- Verify all 5 state pages individually after the fix using [Google's URL Inspection tool](https://search.google.com/search-console) once Search Console is connected (see #4).

### 2. Domain canonicalization conflict (www vs non-www)

- The site is actually served on **`lyraenterprise.co.in`** (non-www) — that's what every internal link, the WhatsApp CTAs, Google Business listing pattern, and social profiles use.
- But **every page's canonical tag points to `https://www.lyraenterprise.co.in`** (www version), and Open Graph `og:url` also uses www.
- This is a mixed signal: you're telling Google "the real URL is the www one" while operating and linking entirely on the non-www one. At best this dilutes signals between two "versions" of the domain; at worst it causes indexing of the wrong domain variant in search results (which then mismatches your GBP/social links).

**Fix:**
1. Decide the canonical domain — recommend **non-www** (`lyraenterprise.co.in`) since that's what's actually used everywhere else (WhatsApp links, social bios, business cards, this proposal).
2. Set up a permanent **301 redirect from www → non-www** at the DNS/hosting level (Vercel/Cloudflare/whatever host is in use) so both resolve cleanly to one version.
3. Update the `metadataBase` / canonical config in the Next.js SEO setup (likely `next-seo.config.js` or per-page `generateMetadata`) so `canonical` and `og:url` both emit `https://lyraenterprise.co.in/...` sitewide.

### 3. Twitter Card metadata is broken on every non-homepage page

Confirmed on: product pages, blog listing, blog articles. `twitter:title` and `twitter:description` are hardcoded to the **homepage's** generic copy on every page, while `og:title`/`og:description` (used by WhatsApp, Facebook, LinkedIn) are correctly page-specific.

**Business impact:** Low for WhatsApp/Facebook shares (those use OG, which is correct), but any link shared/previewed via X/Twitter or any platform that falls back to Twitter Card tags will show the wrong title/description for every product and blog page — a real problem given you're running paid social and outreach that may generate link shares.

**Fix:** In the SEO/meta component, make `twitter:title` and `twitter:description` inherit from the same page-level variables as `og:title`/`og:description` instead of a hardcoded default object. One-line-per-page fix if using `next-seo` — just remove the separate hardcoded `twitter` object and let it fall back to `openGraph` values (next-seo does this automatically if you don't override `twitter` at all).

---

## PRIORITY 2 — High (fix within Month 1)

### 4. No visible Search Console / GA4 verification confirmed
I can't verify from the outside whether Google Search Console and GA4 are connected — this needs an internal check, but it's the #1 prerequisite for finding and fixing issues like #1 systematically (Search Console's Coverage report would have flagged the state-page canonical issue immediately). If not already live:
- Verify domain ownership in GSC (DNS TXT record — do this for the **non-www** property to match your canonical fix).
- Submit `sitemap.xml` in GSC once confirmed correct (see #5).
- Set up GA4 + Tag Manager with conversion events for: quote-form submit, WhatsApp click, call click, spec-sheet download (matches the tracking setup already planned in your Month-1 roadmap).

### 5. robots.txt and sitemap.xml could not be verified externally
These weren't reachable through the tools available in this audit — flagging as **unverified, needs manual/internal check**, not confirmed broken. When you check internally, confirm:
- `robots.txt` exists, isn't blocking `/products/*`, `/blog/*`, or the state pages, and references the sitemap.
- `sitemap.xml` lists all 6 vending machine PDPs, 3 incinerator PDPs, 2 napkin PDPs, the bundle page, all 5 state pages (once fixed), all 5 blog articles, and core pages — with correct `<lastmod>` and **no** URLs that carry a "canonicalize away" tag like the current state pages.
- Given the canonical bug in #1, if the state pages are in the sitemap right now, you're actively sending Google contradictory signals (sitemap says "index me," canonical says "don't"). Fix #1 before resubmitting the sitemap.

### 6. Structured data (Schema.org) — verify and expand
Couldn't confirm from outside whether JSON-LD is implemented (scripts aren't visible to this audit method). Given the site already has all the ingredients, this is a high-ROI addition if not already present:
- **Product schema** on every PDP — you already have price (₹9,000–₹24,500), model codes, and availability; this is a near-zero-effort win for rich results (price + review stars in SERPs).
- **FAQPage schema** on PDPs and the SWM blog article — the FAQ content already exists verbatim, just needs JSON-LD wrapping to earn FAQ rich snippets.
- **Organization + LocalBusiness schema** on the homepage/contact page with your NAP, geo-coordinates (already in meta tags: 13.0827, 80.2707), and `sameAs` links to your Facebook/Instagram/LinkedIn.
- **BreadcrumbList schema** — you already render visual breadcrumbs (Home / Products / Vending Machines / Solo WiFi); wrap them in schema too.
- **Article/BlogPosting schema** on blog posts (author, datePublished — you already show "1 March 2026" etc.).
- Validate everything with [Google's Rich Results Test](https://search.google.com/test/rich-results) once added — do this per template, not per page.

### 7. Core Web Vitals — run and share results
Couldn't run Lighthouse/PSI directly in this audit. Good sign already visible: images are served through Next.js's `_next/image` optimizer (auto WebP/AVIF, responsive sizing), which handles most of the "image optimization" checklist automatically. Still run and document:
- [PageSpeed Insights](https://pagespeed.web.dev/) on the homepage, one PDP, and one blog article (mobile + desktop).
- Watch specifically for: hero image LCP (the homepage hero image is requested at `w=3840` — check whether it's actually being served at a sensible size on mobile, or if the 3840px-wide source is inflating LCP on phones), and CLS from the testimonial/logo carousels if they're client-rendered.

---

## PRIORITY 3 — Medium (Month 2 polish)

### 8. Homepage "Contact for pricing" vs. PDP real pricing — inconsistent and a missed trust signal
The homepage product cards all say "Contact for pricing," but clicking through to any PDP shows a real price (₹9,000–₹24,500) instantly. This is a solvable inconsistency:
- **Recommendation:** show the price on the homepage cards too (you're already comfortable displaying it on PDPs — MRP/price transparency is a strong B2B trust signal here, and hiding it on the homepage just adds an unnecessary click before a buyer sees you're in their budget).
- If there's a business reason to gate price behind a click for ad-tracking purposes, at minimum show a starting price range ("From ₹9,000") on the homepage cards.

### 9. Nav dropdown crawlability check
On the homepage, "Vending Machines," "Incinerators," and "States" render as plain nav labels without a direct href (they're presumably JS-driven dropdown triggers revealing child links on hover/click). On inner pages, the same nav items render as real links to category pages. **Confirm** the dropdown child links (individual product/state URLs) exist as real `<a href>` elements in the homepage's rendered HTML/DOM — not purely JS-onClick-injected — so crawlers reliably discover them from the homepage without depending on the inner-page nav variant.

### 10. Blog cadence and internal linking
5 articles (Jan–Mar 2026), all genuinely useful (compliance, buying guides, comparisons). To compound this asset:
- Add 2–3 internal contextual links from each blog article to relevant PDPs beyond the CTA block (you already do this well in the SWM article — replicate across all 5).
- Add "Related Articles" block at the bottom of each post to increase pages-per-session and crawl depth.
- Maintain the monthly cadence — this is your strongest long-term organic channel per the earlier keyword map (CSR/compliance terms have real search intent and low competition).

---

## What NOT to touch — already strong

- Product pages: pricing, specs table, comparison-to-other-models table, FAQs, "ideal for" segment tags, 1-year warranty + GST invoice + Pan-India delivery trust badges — this is genuinely well-built B2B PDP structure. Don't rebuild it, just fix the metadata/schema layer around it.
- Blog content quality and compliance-angle SEO (SWM Rules 2016, CPCB, GeM vendor status) — directly matches the CSR/compliance buyer segment from the growth strategy. Keep publishing in this vein.
- WhatsApp-first CTA pattern throughout (tel:, wa.me links with pre-filled messages per product) — well suited to how Indian B2B buyers actually convert.

---

## Implementation Checklist (in order)

1. [ ] Fix state page routing + unique canonical/metadata (#1) — **highest impact**
2. [ ] Pick non-www as canonical domain, set 301 redirect, update canonical/OG tags sitewide (#2)
3. [ ] Fix Twitter Card fallback to inherit OG values (#3)
4. [ ] Confirm/connect GSC + GA4, verify non-www property (#4)
5. [ ] Audit and correct robots.txt + sitemap.xml, resubmit after #1 is live (#5)
6. [ ] Add Product, FAQPage, Organization/LocalBusiness, Breadcrumb, Article schema (#6)
7. [ ] Run PageSpeed Insights on 3 template types, document and fix LCP/CLS issues (#7)
8. [ ] Show pricing on homepage cards (#8)
9. [ ] Verify nav dropdown links are real crawlable anchors (#9)
10. [ ] Add related-article + deeper contextual linking across blog (#10)

---
*Prepared by Flashify Digital Marketing Services for Lyra Enterprises. Findings based on external analysis of publicly rendered pages; items marked "unverified" require internal/CMS-level or Search Console access to confirm.*

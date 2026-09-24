#!/usr/bin/env node
/**
 * IndexNow submission (Bing, Yandex and partners; Google does not use IndexNow).
 *
 * Reads the live sitemap and pings IndexNow with URLs that changed recently, so
 * new and edited pages are picked up in hours instead of weeks. ChatGPT search
 * draws on Bing's index, so this also helps AI-answer visibility.
 *
 * Usage:
 *   node scripts/indexnow.mjs              submit URLs with lastmod in the last 7 days (+ homepage)
 *   node scripts/indexnow.mjs --all        submit every sitemap URL
 *   node scripts/indexnow.mjs --dry-run    print what would be sent, send nothing
 *
 * The key below is public by design: IndexNow verifies it by fetching
 * https://lyraenterprise.co.in/<key>.txt (file lives in /public).
 */

const HOST = "lyraenterprise.co.in";
const SITE = `https://${HOST}`;
const KEY = "5d82390a571a0be24b668297955d7497";
const RECENT_DAYS = 7;

const args = new Set(process.argv.slice(2));
const all = args.has("--all");
const dryRun = args.has("--dry-run");

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) {
  console.error(`Could not fetch sitemap: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();

const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
const urls = [];
for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  if (!loc) continue;
  const recent = lastmod ? Date.parse(lastmod) >= cutoff : false;
  if (all || recent || loc === SITE) urls.push(loc);
}

if (urls.length === 0) {
  console.log("No URLs to submit.");
} else {
  console.log(`${dryRun ? "[dry run] Would submit" : "Submitting"} ${urls.length} URL(s):`);
  urls.forEach((u) => console.log(`  ${u}`));
  if (!dryRun) await submit(urls);
}

async function submit(list) {
  const resp = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: list }),
  });

  // 200 = accepted, 202 = accepted (key validation pending). 4xx = a real problem.
  console.log(`IndexNow responded: HTTP ${resp.status}`);
  if (resp.status !== 200 && resp.status !== 202) {
    console.error(await resp.text());
    process.exitCode = 1;
  }
}

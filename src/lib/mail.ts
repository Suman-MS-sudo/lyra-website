import nodemailer from "nodemailer";

/**
 * Shared outgoing mail for every form on the site (orders, quotes, contact, callbacks).
 *
 * - Every message is sent FROM the website mailbox (SMTP_USER).
 * - Notifications to the team go TO that same mailbox AND to NOTIFY_EXTRA, in one message.
 * - Customer confirmations go from the same mailbox to the customer.
 */

/** Second inbox that also receives every team notification. */
export const NOTIFY_EXTRA = "lyraenterprisessales@gmail.com";

/** Escape user-supplied text before it goes into email HTML. */
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trim, drop control characters and cap the length of a text field. */
export function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";
}

/** Best-effort per-IP rate limit, in memory, so it applies per server instance. */
const buckets = new Map<string, Map<string, { n: number; reset: number }>>();
export function rateLimited(bucket: string, ip: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const hits = buckets.get(bucket) ?? new Map();
  buckets.set(bucket, hits);
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + windowMs });
    return false;
  }
  h.n += 1;
  return h.n > max;
}

/** Names of required mail settings that are not set on this deployment. */
export function missingMailSettings(): string[] {
  return ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k]);
}

function transporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function fromAddress(): string {
  return `"Lyra Enterprises" <${process.env.SMTP_USER}>`;
}

/** The mailbox itself plus the extra inbox, without duplicates. */
export function teamRecipients(): string[] {
  const own = (process.env.SMTP_USER ?? "").trim();
  const all = [own, NOTIFY_EXTRA].filter(Boolean);
  return all.filter((a, i) => all.findIndex((b) => b.toLowerCase() === a.toLowerCase()) === i);
}

/** Notification to the team: from the website mailbox, to the mailbox and the extra inbox. */
export async function sendToTeam(opts: { subject: string; html: string; replyTo?: string }) {
  await transporter().sendMail({
    from: fromAddress(),
    to: teamRecipients(),
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}

/** Confirmation to a customer, from the website mailbox. */
export async function sendToCustomer(opts: { to: string; subject: string; html: string }) {
  await transporter().sendMail({ from: fromAddress(), to: opts.to, subject: opts.subject, html: opts.html });
}

/** Pulls the useful parts out of a mail error for the server logs. */
export function describeMailError(err: unknown): string {
  const e = err as { code?: string; command?: string; responseCode?: number; message?: string };
  return [e.code, e.responseCode, e.command, e.message ?? String(err)].filter(Boolean).join(" ");
}

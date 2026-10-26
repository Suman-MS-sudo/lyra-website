import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, degrees, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import {
  AGREEMENT_DATE,
  AGREEMENT_TITLE,
  AGREEMENT_VERSION,
  LESSOR,
  agreementSections,
  scheduleA,
  scheduleB,
  type AgreementParties,
} from "@/lib/rental-agreement";

/**
 * Renders the Equipment Rental Agreement as a PDF (server-only). With `parties` it is the
 * customer's executed copy (Schedule A filled, acceptance record, Lyra e-signature);
 * without, it is a specimen.
 */

const A4 = { w: 595.28, h: 841.89 };
const M = { x: 56, top: 64, bottom: 64 };
const INK = rgb(0.07, 0.09, 0.15);
const MUTED = rgb(0.42, 0.45, 0.5);
const BRAND = rgb(0.11, 0.31, 0.85);
const LINE = rgb(0.85, 0.87, 0.9);

/** Standard PDF fonts only cover WinAnsi: map or drop anything else (₹ becomes "Rs."). */
function safe(s: string): string {
  return s
    .replace(/₹\s?/g, "Rs. ")
    .replace(/×/g, "x")
    .replace(/[≥]/g, ">=")
    .replace(/[≤]/g, "<=")
    .replace(/[^\x20-\x7E -ÿ–—‘’“”•…]/g, "");
}

const istStamp = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "medium" }) + " IST";

class Writer {
  page!: PDFPage;
  y = 0;
  pages: PDFPage[] = [];
  constructor(
    private doc: PDFDocument,
    public f: { regular: PDFFont; bold: PDFFont; italic: PDFFont },
  ) {
    this.newPage();
  }
  newPage() {
    this.page = this.doc.addPage([A4.w, A4.h]);
    this.pages.push(this.page);
    this.y = A4.h - M.top;
  }
  ensure(h: number) {
    if (this.y - h < M.bottom) this.newPage();
  }
  wrap(text: string, font: PDFFont, size: number, width: number): string[] {
    const lines: string[] = [];
    for (const para of safe(text).split("\n")) {
      let line = "";
      for (const word of para.split(/\s+/).filter(Boolean)) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) <= width) line = next;
        else {
          if (line) lines.push(line);
          line = word;
        }
      }
      lines.push(line);
    }
    return lines;
  }
  text(t: string, o: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; indent?: number; gap?: number; lead?: number } = {}) {
    const size = o.size ?? 9.5;
    const font = o.font ?? this.f.regular;
    const indent = o.indent ?? 0;
    const lead = o.lead ?? size * 1.42;
    for (const line of this.wrap(t, font, size, A4.w - M.x * 2 - indent)) {
      this.ensure(lead);
      this.page.drawText(line, { x: M.x + indent, y: this.y - size, size, font, color: o.color ?? INK });
      this.y -= lead;
    }
    this.y -= o.gap ?? 0;
  }
  /** A numbered paragraph: the label hangs in the left gutter. */
  numbered(label: string, t: string, indent: number, gap = 4) {
    const size = 9.5;
    const startY = this.y;
    const startPage = this.page;
    this.text(t, { indent: indent + 26, gap });
    startPage.drawText(safe(label), { x: M.x + indent, y: startY - size, size, font: this.f.bold, color: INK });
  }
  rule(color = LINE) {
    this.ensure(10);
    this.page.drawLine({ start: { x: M.x, y: this.y }, end: { x: A4.w - M.x, y: this.y }, thickness: 0.6, color });
    this.y -= 10;
  }
}

export async function buildAgreementPdf(parties?: AgreementParties): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const f = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    italic: await doc.embedFont(StandardFonts.HelveticaOblique),
  };
  const w = new Writer(doc, f);
  const sections = agreementSections();
  const sb = scheduleB();
  const sa = scheduleA(parties);

  // Fingerprint of the exact wording + schedule, printed on every page footer.
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({ v: AGREEMENT_VERSION, sections, sb, sa }))
    .digest("hex")
    .slice(0, 16)
    .toUpperCase();

  doc.setTitle(`${LESSOR.name} ${AGREEMENT_TITLE}${parties ? ` – ${parties.ref}` : " (Specimen)"}`);
  doc.setAuthor(LESSOR.name);
  doc.setSubject(`${AGREEMENT_TITLE} ${AGREEMENT_VERSION}`);
  doc.setCreator("lyraenterprise.co.in");

  // ── Title block ──
  try {
    const logo = await doc.embedPng(fs.readFileSync(path.join(process.cwd(), "public", "images", "logo.png")));
    const h = 40;
    w.page.drawImage(logo, { x: M.x, y: w.y - h, width: (logo.width / logo.height) * h, height: h });
  } catch {
    /* logo optional */
  }
  w.page.drawText("LYRA ENTERPRISES", { x: M.x + 52, y: w.y - 18, size: 14, font: f.bold, color: INK });
  w.page.drawText(safe(LESSOR.address), { x: M.x + 52, y: w.y - 32, size: 8, font: f.regular, color: MUTED });
  w.y -= 62;
  w.rule(BRAND);
  w.text(AGREEMENT_TITLE.toUpperCase(), { size: 17, font: f.bold, gap: 2 });
  w.text(`${AGREEMENT_VERSION} · Terms dated ${AGREEMENT_DATE}${parties ? ` · Booking ${parties.ref}` : " · SPECIMEN (not executed)"}`, { size: 9, color: MUTED, gap: 10 });

  const effective = parties ? istStamp(parties.acceptedAt) : "the Effective Date";
  w.text(
    `This Equipment Rental Agreement is made on ${effective} between ${LESSOR.name}, having its principal place of business at ${LESSOR.address}${
      LESSOR.gstin ? `, GSTIN ${LESSOR.gstin}` : ""
    } ("Lyra", which expression includes its successors and permitted assigns), and the customer identified in Schedule A ("Customer", which expression includes its successors and permitted assigns). Lyra and the Customer are each a "party".`,
    { gap: 4 },
  );
  w.text(
    "Lyra manufactures sanitary napkin vending machines and offers them on rent with installation, maintenance and monitoring. The Customer wishes to rent such equipment for use at its premises. The parties therefore agree as follows:",
    { gap: 10 },
  );

  // ── Clauses ──
  for (const s of sections) {
    w.ensure(40);
    w.text(`${s.n}. ${s.title.toUpperCase()}`, { size: 10, font: f.bold, gap: 3 });
    s.clauses.forEach((c, k) => {
      const label = `${s.n}.${k + 1}`;
      if (typeof c === "string") w.numbered(label, c, 0);
      else {
        w.numbered(label, c.text, 0, 2);
        c.items.forEach((it, j) => w.numbered(`(${String.fromCharCode(97 + j)})`, it, 26, 2));
        w.y -= 2;
      }
    });
    w.y -= 6;
  }

  // ── Schedule A ──
  w.newPage();
  w.text("SCHEDULE A — RENTAL DETAILS", { size: 12, font: f.bold, gap: 6 });
  for (const [k, v] of sa) {
    const labelW = 150;
    const valueLines = w.wrap(v, f.regular, 9.5, A4.w - M.x * 2 - labelW);
    const h = valueLines.length * 13.5 + 8;
    w.ensure(h);
    w.page.drawText(safe(k), { x: M.x, y: w.y - 9.5, size: 9, font: f.bold, color: MUTED });
    valueLines.forEach((l, i) => w.page.drawText(l, { x: M.x + labelW, y: w.y - 9.5 - i * 13.5, size: 9.5, font: f.regular, color: INK }));
    w.y -= h;
    w.page.drawLine({ start: { x: M.x, y: w.y + 4 }, end: { x: A4.w - M.x, y: w.y + 4 }, thickness: 0.4, color: LINE });
  }

  // ── Schedule B ──
  w.y -= 14;
  w.ensure(60);
  w.text("SCHEDULE B — SERVICE SCOPE", { size: 12, font: f.bold, gap: 4 });
  w.text("Included in the Rent for the whole term:", { font: f.bold, gap: 2 });
  sb.included.forEach((i, k) => w.numbered(`B${k + 1}`, `${i.title}: ${i.body}`, 0, 2));
  w.y -= 4;
  w.text("Not included:", { font: f.bold, gap: 2 });
  sb.excluded.forEach((e, k) => w.numbered(`X${k + 1}`, e, 0, 2));

  // ── Execution ──
  w.y -= 16;
  w.ensure(210);
  w.text("EXECUTION", { size: 12, font: f.bold, gap: 4 });
  w.text("IN WITNESS WHEREOF the parties have executed this Agreement electronically on the dates recorded below.", { gap: 10 });
  const colW = (A4.w - M.x * 2 - 24) / 2;
  const top = w.y;
  const col = (x: number, lines: [string, PDFFont, number, ReturnType<typeof rgb>?][]) => {
    let y = top;
    for (const [t, font, size, color] of lines) {
      for (const l of w.wrap(t, font, size, colW - 16)) {
        w.page.drawText(l, { x: x + 8, y: y - size - 8, size, font, color: color ?? INK });
        y -= size * 1.45;
      }
    }
    return top - y + 20;
  };
  const lyraH = col(M.x, [
    ["For and on behalf of LYRA ENTERPRISES", f.bold, 9.5],
    [" ", f.regular, 6],
    [parties ? "Lyra Enterprises" : "[ electronic signature ]", f.italic, 16, BRAND],
    [`Electronically signed by ${LESSOR.signatory}`, f.regular, 8.5, MUTED],
    [parties ? `Date: ${istStamp(parties.acceptedAt)}` : "Date: on execution", f.regular, 8.5, MUTED],
    [`Agreement ${AGREEMENT_VERSION}`, f.regular, 8.5, MUTED],
  ]);
  const custH = col(M.x + colW + 24, [
    ["Accepted by the CUSTOMER", f.bold, 9.5],
    [" ", f.regular, 6],
    [parties ? parties.customerName : "[ name of authorised person ]", f.italic, 16, BRAND],
    [parties ? `${parties.organisation ? `${parties.organisation} · ` : ""}${parties.email}` : "Organisation / email", f.regular, 8.5, MUTED],
    [parties ? `Accepted electronically: ${istStamp(parties.acceptedAt)}` : "Accepted electronically at checkout", f.regular, 8.5, MUTED],
    [parties ? `IP address: ${parties.acceptedIp || "not recorded"} · Version ${parties.acceptedVersion}` : "IP address and version recorded", f.regular, 8.5, MUTED],
    [parties ? `Payment ${parties.paymentId || "—"} · Order ${parties.orderId}` : "Payment reference recorded", f.regular, 8.5, MUTED],
  ]);
  const boxH = Math.max(lyraH, custH);
  for (const x of [M.x, M.x + colW + 24]) w.page.drawRectangle({ x, y: top - boxH, width: colW, height: boxH, borderColor: LINE, borderWidth: 0.8 });
  w.y = top - boxH - 14;
  w.text(
    "This Agreement is executed electronically under the Information Technology Act, 2000. The Customer's acceptance (checkbox and payment of the Signing Amount) and the details above constitute the Customer's electronic signature. A physically signed counterpart may be requested from Lyra at any time.",
    { size: 8, color: MUTED },
  );

  // ── Header / footer on every page ──
  const total = w.pages.length;
  w.pages.forEach((p, i) => {
    p.drawText(safe(`${LESSOR.name} · ${AGREEMENT_TITLE} · ${AGREEMENT_VERSION}${parties ? ` · ${parties.ref}` : " · SPECIMEN"}`), {
      x: M.x,
      y: A4.h - 34,
      size: 7.5,
      font: f.regular,
      color: MUTED,
    });
    p.drawText(safe(`Page ${i + 1} of ${total} · Document fingerprint ${fingerprint}`), { x: M.x, y: 30, size: 7.5, font: f.regular, color: MUTED });
    if (!parties) {
      p.drawText("SPECIMEN", { x: A4.w / 2 - 150, y: A4.h / 2 - 40, size: 90, font: f.bold, color: rgb(0.85, 0.87, 0.9), rotate: degrees(35), opacity: 0.35 });
    }
  });

  return doc.save();
}

import { NextRequest, NextResponse } from "next/server";
import { clean, rateLimited } from "@/lib/mail";
import { findAgreements, quoteFor, supabaseConfigured } from "@/lib/rental-db";

export const runtime = "nodejs";

const normPhone = (v: unknown) => clean(v, 20).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");

/** Looks up a rental by code + registered mobile and returns its status and recharge prices. */
export async function POST(req: NextRequest) {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Online recharge is temporarily unavailable. Please call +91-81223 78860." }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  // Tight limit: this endpoint confirms whether a code/phone pair exists.
  if (rateLimited("rental-lookup", ip, 10)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a few minutes or call us." }, { status: 429 });
  }
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const code = clean(body.code, 40).toUpperCase();
    const phone = normPhone(body.phone);
    if (!/^LYR-R[0-9A-Z-]+$/.test(code) || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Enter your rental code (e.g. LYR-R261026-AB12-1) and registered mobile number." }, { status: 400 });
    }
    const found = await findAgreements(code, phone);
    if (found.length > 1) {
      // A booking reference covering several machines: each machine is recharged by its own code.
      return NextResponse.json(
        { error: `This booking has ${found.length} machines. Enter one rental code: ${found.map((x) => x.rental_code).join(", ")}.`, codes: found.map((x) => x.rental_code) },
        { status: 409 },
      );
    }
    const a = found[0];
    if (!a) return NextResponse.json({ error: "We couldn't find a rental with that code and mobile number." }, { status: 404 });
    if (a.status !== "open") return NextResponse.json({ error: "This rental has ended. Please call us if you need help." }, { status: 409 });
    return NextResponse.json({ quote: quoteFor(a) });
  } catch (err) {
    console.error("Rental lookup error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Something went wrong. Please try again or call us." }, { status: 500 });
  }
}

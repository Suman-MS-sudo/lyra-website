import { NextRequest, NextResponse } from "next/server";
import { agreementsNearDue, claimReminder, reminderFor, supabaseConfigured } from "@/lib/rental-db";
import { sendReminder } from "@/lib/rental-recharge-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily rental reminders (Vercel Cron, see vercel.json): 7 days and 1 day before rent runs out,
 * the day after it runs out (grace period starts) and the day the machine is paused.
 * Each reminder is recorded in rental_reminders first, so a retry never emails twice.
 * Vercel sends `Authorization: Bearer $CRON_SECRET`.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!supabaseConfigured()) return NextResponse.json({ ok: false, error: "Supabase not configured" }, { status: 503 });

  const sent: string[] = [];
  const failed: string[] = [];
  for (const a of await agreementsNearDue()) {
    const kind = reminderFor(a);
    if (!kind) continue;
    try {
      if (await claimReminder(a, kind)) {
        await sendReminder(a, kind);
        sent.push(`${a.rental_code}:${kind}`);
      }
    } catch (e) {
      failed.push(`${a.rental_code}:${kind}`);
      console.error(`Rental reminder ${a.rental_code} ${kind} failed:`, e instanceof Error ? e.message : e);
    }
  }
  return NextResponse.json({ ok: true, sent, failed });
}

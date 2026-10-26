import { NextResponse } from "next/server";
import { AGREEMENT_VERSION } from "@/lib/rental-agreement";
import { buildAgreementPdf } from "@/lib/rental-agreement-pdf";

export const runtime = "nodejs";

/** Specimen (unexecuted) copy of the current Equipment Rental Agreement as a PDF. */
export async function GET() {
  const pdf = await buildAgreementPdf();
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="Lyra-Rental-Agreement-${AGREEMENT_VERSION.replace(/\s+/g, "-")}-specimen.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

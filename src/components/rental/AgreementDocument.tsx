import { AGREEMENT_DATE, AGREEMENT_TITLE, AGREEMENT_VERSION, LESSOR, agreementSections, scheduleA, scheduleB } from "@/lib/rental-agreement";

/** The full Equipment Rental Agreement as readable HTML (public page and checkout dialog). */
export default function AgreementDocument({ compact = false }: { compact?: boolean }) {
  const sections = agreementSections();
  const sb = scheduleB();
  const h2 = compact ? "text-[13px]" : "text-[15px]";
  return (
    <div className={`text-body ${compact ? "text-[13px] leading-relaxed" : "text-[14.5px] leading-[1.75]"}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {AGREEMENT_VERSION} · Terms dated {AGREEMENT_DATE}
      </p>
      <p className="mt-4">
        This {AGREEMENT_TITLE} is made between <strong className="text-ink">{LESSOR.name}</strong>, having its principal place of business at {LESSOR.address}{" "}
        (&quot;Lyra&quot;), and the customer identified in Schedule A (&quot;Customer&quot;). Lyra manufactures sanitary napkin vending machines and offers them
        on rent with installation, maintenance and monitoring. The Customer wishes to rent such equipment for use at its premises. The parties agree as follows:
      </p>

      <ol className="mt-6 space-y-6">
        {sections.map((s) => (
          <li key={s.n} id={`clause-${s.n}`} className="scroll-mt-32">
            <h2 className={`font-display font-semibold uppercase tracking-wide text-ink ${h2}`}>
              {s.n}. {s.title}
            </h2>
            <ol className="mt-2 space-y-2">
              {s.clauses.map((c, k) => (
                <li key={k} className="grid grid-cols-[2.6rem_1fr] gap-1">
                  <span className="font-semibold text-ink tabular">
                    {s.n}.{k + 1}
                  </span>
                  {typeof c === "string" ? (
                    <span>{c}</span>
                  ) : (
                    <span>
                      {c.text}
                      <ol className="mt-1.5 space-y-1.5">
                        {c.items.map((it, j) => (
                          <li key={j} className="grid grid-cols-[1.8rem_1fr]">
                            <span className="text-muted">({String.fromCharCode(97 + j)})</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ol>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <section id="schedule-a" className="mt-10 scroll-mt-32">
        <h2 className={`font-display font-semibold uppercase tracking-wide text-ink ${h2}`}>Schedule A — Rental Details</h2>
        <p className="mt-1 text-muted">Completed with your booking details on the copy emailed to you after payment.</p>
        <dl className="mt-3 divide-y divide-line rounded-2xl border border-line">
          {scheduleA().map(([k, v]) => (
            <div key={k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[13rem_1fr]">
              <dt className="font-semibold text-ink">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="schedule-b" className="mt-10 scroll-mt-32">
        <h2 className={`font-display font-semibold uppercase tracking-wide text-ink ${h2}`}>Schedule B — Service Scope</h2>
        <p className="mt-2 font-semibold text-ink">Included in the Rent for the whole term:</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5">
          {sb.included.map((i) => (
            <li key={i.title}>
              <strong className="text-ink">{i.title}:</strong> {i.body}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold text-ink">Not included:</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5">
          {sb.excluded.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-subtle p-5">
        <h2 className={`font-display font-semibold uppercase tracking-wide text-ink ${h2}`}>Execution</h2>
        <p className="mt-2">
          Executed electronically under the Information Technology Act, 2000. Lyra signs through its {LESSOR.signatory} by electronic signature. The Customer
          accepts by ticking the acceptance box and paying the Signing Amount; the date, time, IP address, agreement version and payment reference are recorded and
          printed on the Customer&apos;s copy.
        </p>
      </section>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { INDIA_STATES, INDIA_VIEWBOX, HQ_POINT } from "@/lib/india-map";
import { cities, type StateLocation } from "@/lib/data";

const [, , VB_W, VB_H] = INDIA_VIEWBOX.split(" ").map(Number);

export default function IndiaServiceMap() {
  const bySlug = useMemo(() => {
    const m: Record<string, StateLocation> = {};
    for (const c of cities) m[c.slug] = c;
    return m;
  }, []);

  const [active, setActive] = useState<string | null>(null);

  const baseD = useMemo(
    () => INDIA_STATES.filter((s) => s.d).map((s) => s.d).join(" "),
    []
  );

  const activeState = active ? INDIA_STATES.find((s) => s.slug === active) : null;
  const activeInfo = active ? bySlug[active] : null;

  return (
    <figure className="not-prose my-2">
      <div className="relative mx-auto w-full max-w-[560px]">
        <svg
          viewBox={INDIA_VIEWBOX}
          className="lyra-map w-full h-auto drop-shadow-[0_20px_40px_rgba(190,26,104,0.12)]"
          role="group"
          aria-label="Interactive map of India — Lyra Enterprises delivers sanitary napkin vending machines and incinerators to every state and union territory. Select a state for local models, pricing and delivery time."
        >
          <defs>
            <linearGradient id="lyraIndiaFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fee2f1" />
              <stop offset="0.55" stopColor="#f7d6ef" />
              <stop offset="1" stopColor="#e7d6fb" />
            </linearGradient>
            <radialGradient id="lyraHqGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base silhouette — fills any hairline gaps between state polygons */}
          <path d={baseD} fill="url(#lyraIndiaFill)" stroke="#e9a8cf" strokeWidth={1.1} strokeLinejoin="round" />

          {/* Route line to the hovered state */}
          {activeState && activeState.pin && (
            <path
              className="lyra-route"
              d={`M ${HQ_POINT.x} ${HQ_POINT.y} Q ${(HQ_POINT.x + activeState.cx) / 2} ${
                Math.min(HQ_POINT.y, activeState.cy) - 70
              } ${activeState.cx} ${activeState.cy}`}
              fill="none"
              stroke="#be185d"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.5"
            />
          )}

          {/* States */}
          {INDIA_STATES.map((s) => {
            const info = bySlug[s.slug];
            const label = info ? info.state : s.name;
            const isActive = active === s.slug;
            return (
              <a
                key={s.id}
                href={`/${s.slug}`}
                aria-label={`Sanitary napkin vending machines and incinerators in ${label}`}
                onMouseEnter={() => setActive(s.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.slug)}
                onBlur={() => setActive(null)}
              >
                {s.d && (
                  <path
                    data-state={s.slug}
                    d={s.d}
                    fill={isActive ? "#f472b6" : "transparent"}
                    fillOpacity={isActive ? 0.55 : 1}
                    stroke="#ffffff"
                    strokeWidth={isActive ? 1.4 : 0.9}
                    strokeLinejoin="round"
                  />
                )}
                {s.pin && (
                  <>
                    <circle
                      className="lyra-pin-ring"
                      cx={s.cx}
                      cy={s.cy}
                      r={4}
                      fill="#ec4899"
                      style={{ animationDelay: `${(s.cx * 7 + s.cy) % 2600}ms` }}
                    />
                    <circle
                      cx={s.cx}
                      cy={s.cy}
                      r={isActive ? 6 : 4}
                      fill="#be185d"
                      stroke="#ffffff"
                      strokeWidth={isActive ? 1.8 : 1.3}
                      style={{ transition: "r 150ms ease" }}
                    />
                  </>
                )}
              </a>
            );
          })}

          {/* Chennai HQ origin */}
          <g aria-hidden="true">
            <circle cx={HQ_POINT.x} cy={HQ_POINT.y} r={18} fill="url(#lyraHqGlow)" />
            <rect
              x={HQ_POINT.x - 5.5}
              y={HQ_POINT.y - 5.5}
              width={11}
              height={11}
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth={1.8}
              transform={`rotate(45 ${HQ_POINT.x} ${HQ_POINT.y})`}
            />
            <text
              x={HQ_POINT.x + 15}
              y={HQ_POINT.y + 4}
              fontSize="14"
              fontWeight="700"
              fill="#7c2d12"
            >
              Chennai HQ
            </text>
          </g>
        </svg>

        {/* Tooltip */}
        {activeInfo && activeState && (
          <div
            className={`pointer-events-none absolute z-10 w-52 -translate-x-1/2 rounded-xl border border-primary-100 bg-white/95 p-3 shadow-xl backdrop-blur-sm ${
              activeState.cy < 130 ? "translate-y-3" : "-translate-y-[calc(100%+0.5rem)]"
            }`}
            style={{
              left: `${Math.min(88, Math.max(12, (activeState.cx / VB_W) * 100))}%`,
              top: `${(activeState.cy / VB_H) * 100}%`,
            }}
          >
            <p className="text-sm font-bold text-gray-900">{activeInfo.state}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">
              {activeInfo.capital} · ≈{activeInfo.districtsApprox} districts
            </p>
            <p className="mt-1 text-[11px] font-medium text-primary-600">
              Dispatch {activeInfo.dispatch}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-gray-900">
              View local models &amp; pricing →
            </p>
          </div>
        )}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#be185d]" />
          Delivery &amp; installation point
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-[#f59e0b]" />
          Chennai manufacturing HQ
        </span>
        <span className="hidden sm:inline">Tap a state for local models, pricing &amp; delivery time.</span>
      </figcaption>
    </figure>
  );
}

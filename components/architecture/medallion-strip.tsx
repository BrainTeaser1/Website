import { ArrowRight } from "lucide-react";

/**
 * The Databricks medallion warehouse that powers FinOps Hub — shown here
 * (under the agent flow) because it's part of FinOps, not a separate system.
 */
const LAYERS = [
  { tier: "Bronze", note: "raw cost & usage, ingested as-is", color: "#b08968" },
  { tier: "Silver", note: "conformed, deduped, typed", color: "#9aa7bd" },
  { tier: "Gold", note: "marts: agg_ / fact_ / dim_ · USD", color: "#e9c46a" },
];

export function MedallionStrip() {
  return (
    <div className="card rounded-3xl p-6">
      <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-cyan">
        Data foundation · Databricks medallion
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {LAYERS.map((l, i) => (
          <div key={l.tier} className="flex flex-1 items-center gap-3">
            <div className="flex-1 rounded-xl border border-line bg-surface2 p-4">
              <div className="flex items-center gap-2 font-bold">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                {l.tier}
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-sub">{l.note}</p>
            </div>
            {i < LAYERS.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-sub sm:block" />}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-sub">
        The agent only ever queries the <span className="text-ink">gold</span> marts — that&apos;s what keeps
        answers consistent and costs standardized to USD.
      </p>
    </div>
  );
}

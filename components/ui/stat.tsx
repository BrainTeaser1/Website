import type { Metric } from "@/content/types";

export function MetricStat({ label, value }: Metric) {
  return (
    <div className="card rounded-xl py-3 text-center">
      <div className="accent-gradient text-lg font-bold">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-sub">{label}</div>
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((m) => (
        <MetricStat key={m.label} {...m} />
      ))}
    </div>
  );
}

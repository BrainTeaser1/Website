import Link from "next/link";
import type { Blueprint } from "@/content/types";
import { Tag } from "@/components/ui/chip";

/** Large signature blueprint — multi-region topology with glowing connections. */
export function FeaturedBlueprint({ blueprint }: { blueprint: Blueprint }) {
  return (
    <Link
      href={`/architecture/${blueprint.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-cyan/20 bg-[#070a14] transition-colors hover:border-cyan/40"
    >
      <div className="blueprint absolute inset-0" />
      <div className="absolute left-6 top-5 z-10">
        <div className="font-mono text-xs text-cyan">FEATURED · LIVE BLUEPRINT</div>
        <div className="mt-1 text-lg font-bold">{blueprint.title}</div>
      </div>
      <div className="absolute right-6 top-5 z-10 flex items-center gap-2 font-mono text-[11px] text-sub">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> {blueprint.maturity}
      </div>

      <svg viewBox="0 0 760 440" className="relative mt-2 h-auto w-full" fontFamily="var(--font-mono), monospace" aria-hidden>
        <defs>
          <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c46e6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b6fff" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="#22d3ee" strokeOpacity=".25" strokeDasharray="3 5">
          <rect x="60" y="150" width="300" height="240" rx="14" />
          <rect x="410" y="150" width="290" height="240" rx="14" />
        </g>
        <text x="70" y="172" fontSize="9" fill="#22d3ee" opacity=".7">REGION · WEST EUROPE</text>
        <text x="420" y="172" fontSize="9" fill="#22d3ee" opacity=".7">REGION · NORTH EUROPE (DR)</text>

        <g fill="none" strokeWidth="1.5">
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#ag1)" d="M380 70 L200 200" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#ag2)" d="M380 70 L560 200" />
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#ag1)" d="M200 240 L200 300" />
          <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#ag1)" d="M200 240 L300 300" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#ag2)" d="M560 240 L560 300" />
          <path className="bp-line" style={{ color: "#3b6fff" }} stroke="url(#ag2)" strokeOpacity=".5" d="M200 330 L560 330" />
        </g>

        <g fontSize="9" fill="#cdd2e6">
          <g>
            <rect className="bp-node" x="320" y="50" width="120" height="40" rx="9" stroke="url(#ag1)" />
            <text x="380" y="68" textAnchor="middle" fontWeight="700">Front Door</text>
            <text x="380" y="80" textAnchor="middle" fontSize="7" fill="#8b93ad">global ingress · WAF</text>
          </g>
          <g>
            <rect className="bp-node" x="140" y="198" width="120" height="40" rx="9" stroke="url(#ag1)" />
            <text x="200" y="216" textAnchor="middle" fontWeight="700">AKS · primary</text>
            <text x="200" y="228" textAnchor="middle" fontSize="7" fill="#8b93ad">service mesh</text>
          </g>
          <g>
            <rect className="bp-node" x="500" y="198" width="120" height="40" rx="9" stroke="url(#ag2)" />
            <text x="560" y="216" textAnchor="middle" fontWeight="700">AKS · failover</text>
            <text x="560" y="228" textAnchor="middle" fontSize="7" fill="#8b93ad">warm standby</text>
          </g>
          <g>
            <rect className="bp-node" x="140" y="298" width="120" height="38" rx="9" stroke="url(#ag2)" />
            <text x="200" y="321" textAnchor="middle" fontWeight="700">Data · Postgres</text>
          </g>
          <g>
            <rect className="bp-node" x="240" y="298" width="120" height="38" rx="9" stroke="url(#ag1)" />
            <text x="300" y="321" textAnchor="middle" fontWeight="700">Vector DB</text>
          </g>
          <g>
            <rect className="bp-node" x="500" y="298" width="120" height="38" rx="9" stroke="url(#ag2)" />
            <text x="560" y="321" textAnchor="middle" fontWeight="700">Geo-replica</text>
          </g>
        </g>

        <circle r="3" fill="#22d3ee" className="data-dot" style={{ offsetPath: "path('M380 70 L200 200')" } as React.CSSProperties} />
        <circle r="3" fill="#a855f7" className="data-dot" style={{ offsetPath: "path('M380 70 L560 200')", animationDelay: "1s" } as React.CSSProperties} />
        <circle r="3" fill="#2c46e6" className="data-dot" style={{ offsetPath: "path('M200 240 L300 300')", animationDelay: "1.8s" } as React.CSSProperties} />
      </svg>

      <div className="relative flex flex-wrap gap-2 px-6 pb-6">
        {blueprint.techStack.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}

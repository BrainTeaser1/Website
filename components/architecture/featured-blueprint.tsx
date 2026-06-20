import Link from "next/link";
import type { Blueprint } from "@/content/types";
import { Tag } from "@/components/ui/chip";

/**
 * The real FinOps Hub system topology (not a placeholder): a Next.js frontend
 * over HTTPS+SSE to a FastAPI backend (JWT → route classifier → analytics
 * agent), which calls Azure OpenAI and a Databricks SQL warehouse, with a
 * response/SQL cache and optional LangSmith tracing.
 */
export function FeaturedBlueprint({ blueprint }: { blueprint: Blueprint }) {
  return (
    <Link
      href={`/architecture/${blueprint.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-cyan/20 bg-[#070a14] transition-colors hover:border-cyan/40"
    >
      <div className="blueprint absolute inset-0" />
      <div className="absolute left-6 top-5 z-10">
        <div className="font-mono text-xs text-cyan">FEATURED · SYSTEM TOPOLOGY</div>
        <div className="mt-1 text-lg font-bold">{blueprint.title}</div>
      </div>
      <div className="absolute right-6 top-5 z-10 flex items-center gap-2 font-mono text-[11px] text-sub">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> {blueprint.maturity}
      </div>

      <svg viewBox="0 0 760 460" className="relative mt-2 h-auto w-full" fontFamily="var(--font-mono), monospace" aria-hidden>
        <defs>
          <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c46e6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b6fff" />
          </linearGradient>
          <marker id="aga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#7b8bd0" />
          </marker>
        </defs>

        {/* backend boundary */}
        <rect x="250" y="92" width="380" height="150" rx="14" fill="none" stroke="#22d3ee" strokeOpacity=".22" strokeDasharray="3 5" />
        <text x="266" y="86" fontSize="9" fill="#22d3ee" opacity=".7">BACKEND · FastAPI (:8000)</text>
        <text x="40" y="86" fontSize="9" fill="#8b93ad">FRONTEND · Next.js (:3000)</text>

        {/* edges */}
        <g fill="none" strokeWidth="1.6" markerEnd="url(#aga)">
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#ag2)" d="M170 150 L268 150" />
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#ag1)" d="M360 150 L408 150" />
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#ag1)" d="M500 150 L548 150" />
          {/* agent -> OpenAI / warehouse / cache */}
          <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#ag1)" d="M610 135 L660 95" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#ag2)" d="M610 165 L660 300" />
          <path className="bp-line" style={{ color: "#3b6fff" }} stroke="url(#ag2)" d="M660 360 L660 405" strokeOpacity=".6" />
        </g>

        <g fontSize="9" fill="#cdd2e6">
          {/* frontend */}
          <g>
            <rect className="bp-node" x="40" y="128" width="130" height="44" rx="9" stroke="url(#ag2)" />
            <text x="105" y="146" textAnchor="middle" fontWeight="700">Dashboard · Assistant</text>
            <text x="105" y="160" textAnchor="middle" fontSize="7" fill="#8b93ad">HTTPS + SSE</text>
          </g>
          {/* backend chain */}
          <g>
            <rect className="bp-node" x="268" y="132" width="92" height="36" rx="8" stroke="url(#ag1)" />
            <text x="314" y="154" textAnchor="middle" fontWeight="700">JWT Auth</text>
          </g>
          <g>
            <rect className="bp-node" x="408" y="132" width="92" height="36" rx="8" stroke="url(#ag1)" />
            <text x="454" y="150" textAnchor="middle" fontWeight="700">Route</text>
            <text x="454" y="161" textAnchor="middle" fontSize="7" fill="#8b93ad">classifier</text>
          </g>
          <g>
            <rect className="bp-node" x="548" y="130" width="74" height="40" rx="8" stroke="url(#ag1)" />
            <text x="585" y="148" textAnchor="middle" fontWeight="700">Agent</text>
            <text x="585" y="159" textAnchor="middle" fontSize="7" fill="#8b93ad">tools/</text>
          </g>
          {/* external services */}
          <g>
            <rect className="bp-node" x="660" y="62" width="92" height="40" rx="9" stroke="url(#ag1)" />
            <text x="706" y="80" textAnchor="middle" fontWeight="700">Azure OpenAI</text>
            <text x="706" y="91" textAnchor="middle" fontSize="7" fill="#8b93ad">gpt-5-mini</text>
          </g>
          <g>
            <rect className="bp-node" x="652" y="300" width="108" height="44" rx="9" stroke="url(#ag2)" />
            <text x="706" y="318" textAnchor="middle" fontWeight="700">Databricks SQL</text>
            <text x="706" y="330" textAnchor="middle" fontSize="7" fill="#8b93ad">gold: agg_/fact_/dim_</text>
          </g>
          <g>
            <rect className="bp-node" x="430" y="300" width="108" height="40" rx="9" stroke="url(#ag2)" />
            <text x="484" y="324" textAnchor="middle" fontWeight="700">Response + cache</text>
          </g>
          <g>
            <rect className="bp-node" x="652" y="405" width="108" height="36" rx="8" stroke="url(#ag2)" strokeOpacity=".7" />
            <text x="706" y="427" textAnchor="middle" fontSize="8" fill="#8b93ad">LangSmith (optional)</text>
          </g>
        </g>

        {/* agent <-> cache link */}
        <path className="bp-line" style={{ color: "#3b6fff" }} stroke="url(#ag2)" strokeWidth="1.4" fill="none" strokeOpacity=".5" d="M585 170 L484 300" />

        {/* traveling pulses */}
        <circle r="3" fill="#22d3ee" className="data-dot" style={{ offsetPath: "path('M170 150 L268 150')" } as React.CSSProperties} />
        <circle r="3" fill="#a855f7" className="data-dot" style={{ offsetPath: "path('M610 135 L660 95')", animationDelay: "1s" } as React.CSSProperties} />
        <circle r="3" fill="#22d3ee" className="data-dot" style={{ offsetPath: "path('M610 165 L660 300')", animationDelay: "1.7s" } as React.CSSProperties} />
      </svg>

      <div className="relative flex flex-wrap gap-2 px-6 pb-6">
        {blueprint.techStack.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}

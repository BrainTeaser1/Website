/**
 * FinOps Hub agent decision flow — the real pipeline: route → cached? → plan →
 * parallel intents → template-vs-LLM SQL → validate → execute (+retry) →
 * synthesize → answer. Nodes are color-coded by role (see legend).
 */
const C = { dec: "#22d3ee", llm: "#a855f7", sql: "#3b6fff" };
const F = {
  dec: "rgba(34,211,238,0.12)",
  llm: "rgba(168,85,247,0.13)",
  sql: "rgba(59,111,255,0.12)",
  end: "rgba(123,108,255,0.16)",
};

export function FinopsFlow() {
  return (
    <div className="blueprint relative overflow-hidden rounded-3xl border border-cyan/20">
      {/* header row (in-flow, no overlap) */}
      <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-4">
        <div>
          <div className="font-mono text-[11px] text-cyan">AGENT FLOW · request lifecycle</div>
          <div className="mt-1 text-sm font-semibold text-ink">Question → governed SQL → answer</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 font-mono text-[10px] text-sub">
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px]" style={{ background: C.dec }} /> decision</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: C.llm }} /> LLM step</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: C.sql }} /> deterministic SQL</span>
        </div>
      </div>

      <svg viewBox="0 0 680 1240" className="w-full" fontFamily="var(--font-mono), monospace" role="img" aria-label="FinOps Hub agent decision flow from user question to final answer">
        <defs>
          <linearGradient id="fg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c46e6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#8b96cf" />
          </marker>
        </defs>

        {/* connectors */}
        <g fill="none" strokeWidth="1.7" markerEnd="url(#fa)">
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M340 64 L340 96" />
          <path className="bp-line" style={{ color: C.llm }} stroke={C.llm} d="M285 150 L150 150 L150 196" />
          <path className="bp-line" style={{ color: C.dec }} stroke={C.dec} d="M340 200 L340 246" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M340 350 L340 396" />
          <path className="bp-line" style={{ color: C.dec }} stroke={C.dec} d="M415 300 L630 300 L630 1150 L470 1150" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M340 452 L340 498" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M340 554 L340 600" />
          <path className="bp-line" style={{ color: C.llm }} stroke={C.llm} d="M285 700 L170 700 L170 746" />
          <path className="bp-line" style={{ color: C.dec }} stroke={C.dec} d="M395 700 L510 700 L510 746" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M170 802 L170 840 L340 840 L340 866" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M510 802 L510 840 L340 840" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M340 922 L340 968" />
          <path className="bp-line" style={{ color: C.llm }} stroke={C.llm} d="M285 1000 L140 1000 L140 1052" />
          <path className="bp-line" style={{ color: C.llm }} stroke={C.llm} strokeOpacity=".5" d="M140 1108 L140 1130 L300 1130 L300 1024" />
          <path className="bp-line" style={{ color: C.llm }} stroke={C.llm} d="M395 1000 L400 1000 L400 1052" />
          <path className="bp-line" style={{ color: C.sql }} stroke={C.sql} d="M400 1108 L400 1130" />
        </g>

        {/* edge labels */}
        <g fontSize="8" fill="#9aa6c4">
          <rect x="120" y="138" width="86" height="13" rx="2" fill="#0b1120" /><text x="124" y="148">general / greeting</text>
          <rect x="346" y="216" width="48" height="13" rx="2" fill="#0b1120" /><text x="350" y="226">analytics</text>
          <rect x="318" y="368" width="22" height="13" rx="2" fill="#0b1120" /><text x="322" y="378">no</text>
          <rect x="636" y="290" width="22" height="13" rx="2" fill="#0b1120" /><text x="640" y="300">yes</text>
          <rect x="150" y="718" width="20" height="13" rx="2" fill="#0b1120" /><text x="153" y="728">no</text>
          <rect x="494" y="718" width="24" height="13" rx="2" fill="#0b1120" /><text x="497" y="728">yes</text>
          <rect x="112" y="1018" width="28" height="13" rx="2" fill="#0b1120" /><text x="115" y="1028">error</text>
        </g>

        {/* nodes (role-colored) */}
        <g fontSize="10" fill="#e7eaf3" textAnchor="middle">
          <g><rect className="bp-node" x="252" y="24" width="176" height="40" rx="9" stroke="url(#fg1)" style={{ fill: F.end }} /><text x="340" y="48">User question</text></g>

          <polygon className="bp-node" points="340,108 410,150 340,192 270,150" stroke={C.dec} style={{ fill: F.dec }} />
          <text x="340" y="154">Route?</text>

          <g><rect className="bp-node" x="60" y="196" width="180" height="48" rx="9" stroke={C.llm} style={{ fill: F.llm }} /><text x="150" y="216">LLM reply with</text><text x="150" y="230">FinOps persona</text></g>

          <polygon className="bp-node" points="340,250 415,298 340,346 265,298" stroke={C.dec} style={{ fill: F.dec }} />
          <text x="340" y="302">Cached?</text>

          <g><rect className="bp-node" x="248" y="398" width="184" height="54" rx="9" stroke={C.sql} style={{ fill: F.sql }} /><text x="340" y="420">Plan: decompose</text><text x="340" y="434">into intents</text></g>
          <g><rect className="bp-node" x="252" y="500" width="176" height="54" rx="9" stroke={C.sql} style={{ fill: F.sql }} /><text x="340" y="522">Run intents</text><text x="340" y="536">in parallel</text></g>

          <polygon className="bp-node" points="340,602 450,652 340,702 230,652" stroke={C.dec} style={{ fill: F.dec }} />
          <text x="340" y="650">Template route</text>
          <text x="340" y="663">exists?</text>

          <g><rect className="bp-node" x="80" y="748" width="180" height="54" rx="9" stroke={C.llm} style={{ fill: F.llm }} /><text x="170" y="772">LLM-generated</text><text x="170" y="786">SQL</text></g>
          <g><rect className="bp-node" x="420" y="748" width="180" height="54" rx="9" stroke={C.sql} style={{ fill: F.sql }} /><text x="510" y="772">Deterministic</text><text x="510" y="786">template SQL</text></g>

          <g><rect className="bp-node" x="240" y="868" width="200" height="54" rx="9" stroke={C.sql} style={{ fill: F.sql }} /><text x="340" y="890">Validate: read-only,</text><text x="340" y="904">guards, LIMIT</text></g>
          <g><rect className="bp-node" x="240" y="970" width="200" height="54" rx="9" stroke={C.sql} style={{ fill: F.sql }} /><text x="340" y="992">Execute on warehouse</text><text x="340" y="1006">+ cache rows</text></g>

          <g><rect className="bp-node" x="50" y="1054" width="180" height="54" rx="9" stroke={C.llm} style={{ fill: F.llm }} /><text x="140" y="1076">LLM auto-correct</text><text x="140" y="1090">&amp; retry once</text></g>
          <g><rect className="bp-node" x="310" y="1054" width="180" height="54" rx="9" stroke={C.llm} style={{ fill: F.llm }} /><text x="400" y="1076">Synthesize</text><text x="400" y="1090">executive summary</text></g>

          <g><rect className="bp-node" x="290" y="1132" width="220" height="54" rx="9" stroke="url(#fg1)" style={{ fill: F.end }} /><text x="400" y="1154">Answer + KPIs + charts</text><text x="400" y="1168">+ reasoning trace</text></g>
        </g>

        {/* life */}
        <circle r="3" fill={C.dec} className="data-dot" style={{ offsetPath: "path('M340 200 L340 246')" } as React.CSSProperties} />
        <circle r="3" fill={C.sql} className="data-dot" style={{ offsetPath: "path('M340 452 L340 498')", animationDelay: "1.2s" } as React.CSSProperties} />
      </svg>
    </div>
  );
}

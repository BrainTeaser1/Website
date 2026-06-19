/** Animated cloud-topology centerpiece — CSS-only motion, zero JS. */
export function CloudTopology() {
  return (
    <div className="relative h-[440px] overflow-hidden rounded-3xl border border-line/70 bg-gradient-to-br from-[#0a0f1e] to-[#070a14] sm:h-[480px]">
      <div className="blueprint absolute inset-0 opacity-70" />
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[70px]" />
      <div className="absolute bottom-0 -left-10 h-56 w-56 rounded-full bg-cyan/15 blur-[70px]" />

      <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" fontFamily="var(--font-mono), monospace" role="img" aria-label="Cloud system topology connecting Cloud Infrastructure, DevOps, AI Systems, and Architecture to a central system-design core">
        <defs>
          <linearGradient id="tg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c46e6" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="tg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#3b6fff" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0" stopColor="#a855f7" />
            <stop offset="1" stopColor="#2c46e6" />
          </radialGradient>
        </defs>

        <g fill="none" strokeWidth="1.5">
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#tg1)" d="M240 240 L110 90" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#tg2)" d="M240 240 L370 90" />
          <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#tg1)" d="M240 240 L110 390" />
          <path className="bp-line" style={{ color: "#3b6fff" }} stroke="url(#tg2)" d="M240 240 L370 390" />
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#tg1)" d="M110 90 L370 90" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#tg2)" d="M110 390 L370 390" />
          <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#tg1)" d="M110 90 L110 390" />
          <path className="bp-line" style={{ color: "#3b6fff" }} stroke="url(#tg2)" d="M370 90 L370 390" />
        </g>

        <circle cx="240" cy="240" r="38" fill="url(#core)" opacity=".18" />
        <circle cx="240" cy="240" r="26" fill="#0b1120" stroke="url(#tg1)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 10px rgb(168 85 247 / 0.7))" }} />
        <text x="240" y="237" textAnchor="middle" fontSize="9" fill="#e7eaf3" fontWeight="700">SYSTEM</text>
        <text x="240" y="248" textAnchor="middle" fontSize="7" fill="#8b93ad">DESIGN</text>

        {[
          { x: 52, y: 68, t: "Agentic AI", s: "LangChain · MCP", g: "url(#tg1)", tx: 110 },
          { x: 312, y: 68, t: "Cloud", s: "Azure · AWS", g: "url(#tg2)", tx: 370 },
          { x: 52, y: 368, t: "Data", s: "Databricks · ADF", g: "url(#tg1)", tx: 110 },
          { x: 312, y: 368, t: "Delivery", s: "Terraform · CI/CD", g: "url(#tg2)", tx: 370 },
        ].map((n) => (
          <g key={n.t}>
            <rect className="bp-node" x={n.x} y={n.y} width="116" height="44" rx="10" stroke={n.g} />
            <text x={n.tx} y={n.y + 20} textAnchor="middle" fontSize="9" fill="#cdd2e6" fontWeight="700">{n.t}</text>
            <text x={n.tx} y={n.y + 33} textAnchor="middle" fontSize="7" fill="#8b93ad">{n.s}</text>
          </g>
        ))}

        <circle r="2.6" fill="#22d3ee" className="data-dot" style={{ offsetPath: "path('M240 240 L110 90')" } as React.CSSProperties} />
        <circle r="2.6" fill="#a855f7" className="data-dot" style={{ offsetPath: "path('M240 240 L370 90')", animationDelay: ".8s" } as React.CSSProperties} />
        <circle r="2.6" fill="#2c46e6" className="data-dot" style={{ offsetPath: "path('M240 240 L370 390')", animationDelay: "1.6s" } as React.CSSProperties} />
        <circle r="2.6" fill="#3b6fff" className="data-dot" style={{ offsetPath: "path('M240 240 L110 390')", animationDelay: "2.4s" } as React.CSSProperties} />
      </svg>

      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] text-sub">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> system-map · live
      </div>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-sub/70">topology.v3</div>
    </div>
  );
}

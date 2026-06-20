/**
 * Real Azure hub-spoke landing zone (from the Terraform project, generic names):
 * a Firewall + Private-DNS hub peered to Spoke (workloads), BrowserAuth, and
 * Sandbox VNets; spoke services reachable only via private endpoints.
 */
export function AzureTopology() {
  return (
    <div className="blueprint relative overflow-hidden rounded-3xl border border-cyan/20">
      <div className="absolute left-5 top-4 z-10 font-mono text-[11px] text-cyan">NETWORK TOPOLOGY · hub-spoke · Central US</div>
      <svg viewBox="0 0 780 600" className="relative mt-2 h-auto w-full" fontFamily="var(--font-mono), monospace" role="img" aria-label="Azure hub-spoke landing zone: a firewall and private DNS hub peered to spoke, browser-auth, and sandbox VNets, with services behind private endpoints">
        <defs>
          <linearGradient id="az1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c46e6" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
          <linearGradient id="az2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#3b6fff" /></linearGradient>
          <marker id="aza" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#7b8bd0" />
          </marker>
        </defs>

        {/* peering edges */}
        <g fill="none" strokeWidth="1.6" markerEnd="url(#aza)">
          <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#az1)" d="M390 96 L300 150" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#az2)" d="M470 70 L600 150" />
          <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#az2)" d="M470 78 L600 300" />
        </g>
        <g fontSize="8" fill="#8b93ad">
          <rect x="318" y="116" width="46" height="12" rx="2" fill="#0b1120" /><text x="322" y="125">peering</text>
          <rect x="520" y="104" width="46" height="12" rx="2" fill="#0b1120" /><text x="524" y="113">peering</text>
          <rect x="520" y="210" width="46" height="12" rx="2" fill="#0b1120" /><text x="524" y="219">peering</text>
        </g>

        {/* HUB */}
        <text x="310" y="26" fontSize="9" fill="#22d3ee" opacity=".75">HUB VNet · 10.0.0.0/16</text>
        <g fontSize="10" fill="#e7eaf3" textAnchor="middle">
          <rect className="bp-node" x="310" y="32" width="170" height="58" rx="10" stroke="url(#az1)" />
          <text x="395" y="56" fontWeight="700">Azure Firewall</text>
          <text x="395" y="74" fontSize="8" fill="#8b93ad">+ Private DNS zones</text>
        </g>

        {/* SPOKE (workloads) */}
        <rect x="70" y="150" width="450" height="300" rx="14" fill="none" stroke="#22d3ee" strokeOpacity=".25" strokeDasharray="3 5" />
        <text x="84" y="168" fontSize="9" fill="#22d3ee" opacity=".75">SPOKE VNet · 10.1.0.0/16 · workloads</text>
        <g fontSize="9" fill="#cdd2e6" textAnchor="middle">
          {[
            { x: 92, y: 190, t: "Databricks", s: "+ access connector" },
            { x: 232, y: 190, t: "Azure OpenAI", s: "cognitive" },
            { x: 372, y: 190, t: "Data Factory", s: "+ SHIR" },
            { x: 92, y: 286, t: "Functions", s: "app / plan" },
            { x: 232, y: 286, t: "Key Vault", s: "secrets" },
            { x: 372, y: 286, t: "Storage", s: "ADLS" },
          ].map((n) => (
            <g key={n.t}>
              <rect className="bp-node" x={n.x} y={n.y} width="116" height="56" rx="9" stroke="url(#az2)" />
              <text x={n.x + 58} y={n.y + 26} fontWeight="700">{n.t}</text>
              <text x={n.x + 58} y={n.y + 40} fontSize="7" fill="#8b93ad">{n.s}</text>
            </g>
          ))}
          <text x="295" y="412" fontSize="9" fill="#a855f7">↳ every service reachable only via a private endpoint</text>
        </g>

        {/* BrowserAuth + Sandbox */}
        <g fontSize="9" fill="#cdd2e6" textAnchor="middle">
          <rect className="bp-node" x="600" y="150" width="160" height="64" rx="10" stroke="url(#az2)" />
          <text x="680" y="174" fontWeight="700">BrowserAuth VNet</text>
          <text x="680" y="190" fontSize="7" fill="#8b93ad">10.2.0.0/16 · Databricks</text>
          <text x="680" y="202" fontSize="7" fill="#8b93ad">browser-auth workspace</text>

          <rect className="bp-node" x="600" y="270" width="160" height="58" rx="10" stroke="url(#az2)" strokeOpacity=".7" />
          <text x="680" y="294" fontWeight="700">Sandbox VNet</text>
          <text x="680" y="310" fontSize="7" fill="#8b93ad">10.3.0.0/16 · testing</text>
        </g>

        {/* governance footnote */}
        <text x="84" y="476" fontSize="8" fill="#8b93ad">NSGs + route tables force all egress through the hub firewall · ~21 Terraform modules</text>

        {/* life */}
        <circle r="3" fill="#22d3ee" className="data-dot" style={{ offsetPath: "path('M390 96 L300 150')" } as React.CSSProperties} />
        <circle r="3" fill="#3b6fff" className="data-dot" style={{ offsetPath: "path('M470 70 L600 150')", animationDelay: "1.3s" } as React.CSSProperties} />
      </svg>
    </div>
  );
}

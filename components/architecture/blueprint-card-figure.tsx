import { BlueprintFigure } from "@/components/architecture/blueprint-figure";

/**
 * Card-strip figures for the architecture index/preview. Known systems get a real,
 * compact diagram so the topology reads at a glance (before opening the detail page);
 * everything else falls back to the stylized BlueprintFigure.
 */
export function BlueprintCardFigure({ slug, variant = 0 }: { slug: string; variant?: number }) {
  if (slug === "azure-hub-spoke-landing-zone") return <AzureTopologyMini />;
  if (slug === "mcp-observability-gateway") return <McpGatewayMini />;
  return <BlueprintFigure variant={variant} />;
}

/** Compact hub-spoke: Hub VNet (Firewall + DNS) peered to Workload / BrowserAuth / Sandbox. */
function AzureTopologyMini() {
  const spokes = [
    { y: 20, t: "Workload Spoke", s: "10.1.0.0/16" },
    { y: 53, t: "BrowserAuth VNet", s: "10.2.0.0/16" },
    { y: 86, t: "Sandbox VNet", s: "10.3.0.0/16" },
  ];
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" role="img" aria-label="Azure hub-spoke landing zone: a firewall and private DNS hub peered to workload, browser-auth, and sandbox VNets">
      <defs>
        <linearGradient id="azc1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c46e6" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
        <linearGradient id="azc2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#3b6fff" /></linearGradient>
        <marker id="azcArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#7b8bd0" />
        </marker>
      </defs>

      <text x="150" y="9" fontSize="7" fill="#7b8bd0" textAnchor="middle" fontFamily="var(--font-mono), monospace">hub-spoke · VNet peering · private endpoints</text>

      {/* peering edges */}
      <g fill="none" strokeWidth="1.4" markerEnd="url(#azcArrow)">
        <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#azc1)" d="M114 60 C150 60, 158 33, 194 33" />
        <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#azc2)" d="M114 68 C150 68, 160 66, 194 66" />
        <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#azc1)" d="M114 76 C150 76, 158 99, 194 99" />
      </g>

      {/* hub */}
      <g textAnchor="middle">
        <rect className="bp-node" x="18" y="50" width="96" height="36" rx="9" stroke="url(#azc1)" />
        <text x="66" y="66" fontSize="10" fontWeight="700" fill="#e7eaf3">Hub VNet</text>
        <text x="66" y="78" fontSize="7" fill="#8b93ad">Firewall · Private DNS</text>
      </g>

      {/* spokes */}
      <g textAnchor="middle">
        {spokes.map((n) => (
          <g key={n.t}>
            <rect className="bp-node" x="196" y={n.y} width="94" height="26" rx="7" stroke="url(#azc2)" />
            <text x="243" y={n.y + 12} fontSize="7.5" fontWeight="700" fill="#cdd2e6">{n.t}</text>
            <text x="243" y={n.y + 21} fontSize="6" fill="#8b93ad">{n.s}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Compact MCP gateway: Client/agent → MCP Gateway (auth · audit) → scoped tools + metrics. */
function McpGatewayMini() {
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" role="img" aria-label="MCP observability gateway: a client reaching scoped tools through an authenticated, audited MCP gateway">
      <defs>
        <linearGradient id="mcpc1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c46e6" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
        <linearGradient id="mcpc2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22d3ee" /><stop offset="1" stopColor="#3b6fff" /></linearGradient>
        <marker id="mcpcArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#7b8bd0" />
        </marker>
      </defs>

      <text x="150" y="9" fontSize="7" fill="#7b8bd0" textAnchor="middle" fontFamily="var(--font-mono), monospace">scoped tools · auth · audit trail</text>

      {/* edges */}
      <g fill="none" strokeWidth="1.4" markerEnd="url(#mcpcArrow)">
        <path className="bp-line" style={{ color: "#22d3ee" }} stroke="url(#mcpc2)" d="M88 63 H112" />
        <path className="bp-line" style={{ color: "#2c46e6" }} stroke="url(#mcpc1)" d="M198 56 C212 44, 216 40, 226 40" />
        <path className="bp-line" style={{ color: "#a855f7" }} stroke="url(#mcpc1)" d="M198 70 C212 82, 216 86, 226 86" />
      </g>

      {/* client */}
      <g textAnchor="middle">
        <rect className="bp-node" x="16" y="48" width="72" height="30" rx="7" stroke="url(#mcpc2)" />
        <text x="52" y="62" fontSize="8.5" fontWeight="700" fill="#cdd2e6">Client</text>
        <text x="52" y="72" fontSize="6.5" fill="#8b93ad">AI agent</text>
      </g>

      {/* gateway */}
      <g textAnchor="middle">
        <rect className="bp-node" x="112" y="44" width="86" height="38" rx="9" stroke="url(#mcpc1)" />
        <text x="155" y="60" fontSize="9" fontWeight="700" fill="#e7eaf3">MCP Gateway</text>
        <text x="155" y="72" fontSize="6.5" fill="#8b93ad">auth · audit</text>
      </g>

      {/* tools + metrics */}
      <g textAnchor="middle">
        <rect className="bp-node" x="226" y="28" width="62" height="24" rx="7" stroke="url(#mcpc2)" />
        <text x="257" y="43" fontSize="7.5" fontWeight="700" fill="#cdd2e6">Scoped tools</text>
        <rect className="bp-node" x="226" y="74" width="62" height="24" rx="7" stroke="url(#mcpc2)" />
        <text x="257" y="89" fontSize="7.5" fontWeight="700" fill="#cdd2e6">Metrics</text>
      </g>
    </svg>
  );
}

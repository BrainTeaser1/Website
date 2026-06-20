export type ChangeType = "shipped" | "wrote" | "designed" | "joined";

export interface ChangeEntry {
  date: string;
  type: ChangeType;
  title: string;
  href?: string;
}

export const changelog: ChangeEntry[] = [
  { date: "2026-01-20", type: "wrote", title: "Metadata-Driven Text-to-SQL That Doesn't Lie", href: "/writing/metadata-driven-text-to-sql" },
  { date: "2026-01-15", type: "shipped", title: "FinOps Hub — streaming assistant + KPI dashboard", href: "/work/finops-hub" },
  { date: "2025-12-20", type: "designed", title: "Databricks medallion warehouse for FinOps Hub", href: "/work/finops-hub" },
  { date: "2025-12-10", type: "shipped", title: "AWS Observability MCP Server", href: "/work/aws-observability-mcp-server" },
  { date: "2025-11-20", type: "designed", title: "FinOps Hub hybrid SQL engine", href: "/architecture/finops-orchestration-engine" },
  { date: "2025-11-01", type: "joined", title: "Joined Celebal Technologies as Junior Associate" },
  { date: "2025-07-01", type: "joined", title: "Software Engineer at Encodency Pvt Ltd" },
];

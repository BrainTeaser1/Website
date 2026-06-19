export interface NowStage {
  phase: string;
  when: string;
  title: string;
  body: string;
  accent: "cyan" | "accent" | "violet";
}

export const nowUpdated = "2026-06";

export const nowStages: NowStage[] = [
  {
    phase: "NOW",
    when: "Celebal Technologies",
    title: "FinOps Hub & Cloud AI",
    body: "Building FinOps Hub on Azure and Databricks. It runs a hybrid template and LLM Text-to-SQL engine over a medallion warehouse, streams its work over SSE, and uses an MCP server to give agents observability.",
    accent: "cyan",
  },
  {
    phase: "NEXT",
    when: "H2 2026",
    title: "Production agentic systems",
    body: "Going deeper on multi-agent orchestration with LangGraph and MCP tool ecosystems, and on the evaluation that keeps them reliable once they're in production.",
    accent: "accent",
  },
  {
    phase: "HORIZON",
    when: "Next few years",
    title: "Cloud & AI architecture",
    body: "Owning the architecture for intelligent platforms, where AI, cloud, and data meet, and weighing cost, reliability, and security as part of the design.",
    accent: "violet",
  },
];

export const nowFocus = [
  "Shipping FinOps Hub on Azure and Databricks",
  "Building an evaluation habit for every LLM feature before it ships",
  "Writing secure MCP servers that give agents scoped tools",
];

export const nowLearning = [
  "Multi-agent orchestration with LangGraph",
  "Cost and reliability trade-offs for production LLM systems",
  "Lakehouse governance for FinOps data",
];

export const availability =
  "Open to AI and cloud engineering roles, and to architecture-scale problems where AI, cloud, and data meet.";

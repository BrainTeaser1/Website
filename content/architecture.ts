import type { Blueprint } from "./types";

export const blueprints: Blueprint[] = [
  {
    slug: "finops-orchestration-engine",
    title: "FinOps Hub — Hybrid SQL Engine",
    summary:
      "The staged pipeline behind FinOps Hub: route, plan, generate SQL (template or LLM), validate, execute, and summarize, with guardrails and a deterministic cache.",
    domain: ["ai", "architecture", "data"],
    tags: ["text-to-sql", "azure-openai", "databricks", "semantic-routing"],
    status: "published",
    featured: true,
    publishedAt: "2026-01-15",
    maturity: "production",
    layers: ["Route", "Plan", "SQL · template/LLM", "Validate", "Execute", "Summarize"],
    techStack: ["Azure OpenAI (gpt-5-mini)", "Databricks SQL", "FastAPI", "LangSmith"],
    relatedWork: ["finops-hub"],
    relatedWriting: ["metadata-driven-text-to-sql"],
    sections: [
      {
        heading: "What it does",
        body: "It turns a plain-English cost question into governed SQL. Every stage is observable, and the engine runs free deterministic SQL wherever a metadata route exists, using the LLM only where one doesn't.",
      },
      {
        heading: "Flow",
        body: "Route the question (analytics or chat), plan it into parallel intents, pick template SQL or fall back to LLM SQL per intent, validate with read-only guards and a row limit, execute with a result cache and one auto-correcting retry, then summarize. A full-response cache keyed on the question keeps answers identical.",
      },
      {
        heading: "Guardrails",
        body: "No DML or DDL, no SELECT *, no multi-statements, no raw bronze or silver scans, and always a row limit. Every answer exposes the SQL and the steps it ran.",
      },
    ],
  },
  {
    slug: "azure-hub-spoke-landing-zone",
    title: "Azure Hub-Spoke Landing Zone",
    summary:
      "A Terraform hub-spoke topology for Azure: a central firewall and private DNS hub, workload spokes, and private endpoints for the data and AI services.",
    domain: ["cloud", "platform", "devops"],
    tags: ["terraform", "azure", "hub-spoke", "private-endpoint", "networking"],
    status: "published",
    featured: true,
    publishedAt: "2025-10-05",
    maturity: "reviewed",
    layers: ["Hub · firewall + DNS", "Spokes · workloads", "Private endpoints", "Governance · NSG/routes"],
    techStack: ["Terraform", "Azure Firewall", "Private DNS", "VNet Peering"],
    relatedWork: ["azure-landing-zone"],
    sections: [
      {
        heading: "What it does",
        body: "It builds a segmented Azure network from code. A hub VNet holds Azure Firewall and Private DNS zones, spoke VNets hold the workloads and peer back to the hub, and every data and AI service connects over a private endpoint.",
      },
    ],
  },
  {
    slug: "databricks-medallion-finops-warehouse",
    title: "Databricks Medallion FinOps Warehouse",
    summary:
      "A bronze, silver, and gold lakehouse whose gold marts drive workload attribution, anomaly detection, trend analysis, and FinOps reporting, all in USD.",
    domain: ["data", "platform", "cloud"],
    tags: ["databricks", "delta-lake", "medallion", "finops"],
    status: "published",
    featured: true,
    publishedAt: "2025-12-20",
    maturity: "production",
    layers: ["Bronze ingest", "Silver conform", "Gold marts", "Metric definitions"],
    techStack: ["Databricks SQL", "Delta Lake", "Azure Data Factory", "Power BI"],
    relatedWork: ["finops-hub"],
    sections: [
      {
        heading: "What it does",
        body: "Each medallion layer enforces structure and quality. Gold marts like the monthly summary are the source for attribution and reporting, metric formulas live in the warehouse, and costs are standardized to USD.",
      },
    ],
  },
  {
    slug: "mcp-observability-gateway",
    title: "MCP Observability Gateway",
    summary:
      "An authenticated Model Context Protocol surface that lets AI agents query AWS CloudWatch safely, tied to an identity and logged.",
    domain: ["ai", "platform", "cloud"],
    tags: ["mcp", "fastmcp", "cognito", "cloudwatch"],
    status: "published",
    featured: true,
    publishedAt: "2025-12-10",
    maturity: "reviewed",
    layers: ["Agent", "MCP server", "OAuth / JWT", "CloudWatch"],
    techStack: ["FastMCP", "Amazon Cognito", "JWT", "CloudWatch"],
    relatedWork: ["aws-observability-mcp-server"],
    sections: [
      {
        heading: "What it does",
        body: "Agents get observability without the keys. Cognito issues OAuth 2.0 tokens, and the server validates the JWT on every call before it runs a query.",
      },
    ],
  },
];

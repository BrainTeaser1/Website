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
    techStack: ["Next.js", "FastAPI", "Azure OpenAI · gpt-5-mini", "Databricks SQL", "JWT · SSE", "LangSmith"],
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
      "A Terraform hub-spoke topology for Azure: a firewall + private-DNS hub peered to four VNets, with every data and AI service reachable only through private endpoints.",
    domain: ["cloud", "platform", "devops"],
    tags: ["terraform", "azure", "hub-spoke", "private-endpoint", "networking"],
    status: "published",
    featured: true,
    publishedAt: "2025-10-05",
    maturity: "production",
    layers: ["Hub · Firewall + DNS", "Spoke · workloads", "BrowserAuth · Databricks", "Sandbox", "Private endpoints"],
    techStack: ["Terraform", "Azure Firewall", "Private DNS", "VNet Peering", "Databricks", "Azure OpenAI", "Data Factory"],
    relatedWork: ["azure-landing-zone"],
    sections: [
      {
        heading: "What it does",
        body: "Builds a segmented Azure network from code (Central US). A hub VNet (10.0.0.0/16) runs Azure Firewall and Private DNS; three spokes peer back to it — workloads (10.1), Databricks browser-auth (10.2), and sandbox (10.3). Every service connects over a private endpoint, and route tables push egress through the firewall.",
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

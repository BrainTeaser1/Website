import type { CaseStudy } from "./types";

export const work: CaseStudy[] = [
  {
    slug: "finops-hub",
    title: "FinOps Hub — Autonomous FinOps Analyst",
    summary:
      "Ask your cloud-cost data a question in plain English. FinOps Hub turns it into validated SQL over a Databricks warehouse and returns a summary, charts, and the exact steps it ran.",
    domain: ["ai", "cloud", "data"],
    tags: ["fastapi", "databricks", "azure-openai", "nextjs", "text-to-sql", "finops", "sse"],
    role: "Design + implementation · Celebal Technologies",
    timeframe: "2025 — Present",
    status: "published",
    publishedAt: "2026-01-15",
    featured: true,
    order: 1,
    problem:
      "Cloud and AI spend grows faster than anyone can track, and the people who own the budgets usually can't write SQL. Answering “what's driving our spend and what looks wrong” took an analyst hours, or it showed up as a surprise bill nobody caught in time.",
    solution:
      "A hybrid agent that turns plain-English questions into read-only SQL. It runs deterministic template SQL when a metadata route exists and generates SQL with an LLM when one doesn't. The LLM only handles understanding the question and writing the summary.",
    outcome:
      "Non-technical stakeholders answer their own cost questions in seconds. Every answer ships with a summary, interactive charts, and a reasoning trace that shows the SQL it ran, and a live dashboard flags anomalies.",
    techStack: ["Python / FastAPI", "Azure OpenAI (gpt-5-mini)", "Databricks SQL", "Next.js", "LangChain / LangSmith", "JWT · SSE"],
    metrics: [
      { label: "Interface", value: "plain English" },
      { label: "SQL", value: "read-only" },
      { label: "Answers", value: "deterministic" },
    ],
    architectureRef: "finops-orchestration-engine",
    links: { writeup: "agentic-finops-architecture" },
    sections: [
      {
        heading: "Hybrid SQL engine",
        body: "The agent prefers free, deterministic SQL and only calls the LLM when it has to. A question runs through staged steps, and every step is observable and can be corrected on its own.",
        bullets: [
          "Route the question: analytics or general chat, with an LLM fallback",
          "Plan: break it into one or more intents that run in parallel",
          "Generate: template SQL when a metadata route exists, otherwise LLM SQL",
          "Validate: apply read-only guards and a row limit before anything runs",
          "Execute: fresh connection, cached results, one auto-correcting retry",
          "Summarize: turn the rows into a short executive answer",
        ],
      },
      {
        heading: "Safety and determinism",
        body: "SQL is read-only and guarded: no DML or DDL, no SELECT *, no multi-statements, no raw bronze or silver scans, and always a row limit. A full-response cache keyed on the question returns the same answer for the same question, instantly. Every answer shows the SQL and the steps behind it.",
      },
      {
        heading: "The product",
        body: "A Next.js app with a streaming assistant that shows the engine plan, query, and summarize live over SSE. It keeps multi-chat history, an animated KPI dashboard (monthly trend, spend by environment and platform, top cost drivers, and anomalies you can click to open in the assistant), CSV upload preview, and JWT auth that can swap to Microsoft Entra ID SSO.",
      },
      {
        heading: "Data foundation",
        body: "A Databricks bronze, silver, and gold warehouse sits underneath. Gold marts drive workload attribution, anomaly detection, trend analysis, and reporting. Metric formulas live in the warehouse, and all costs are in USD.",
      },
      {
        heading: "Where it's going",
        body: "The architecture is decoupled, so each next step is a new endpoint and view rather than a rewrite: CSV and file Q&A, then RAG that grounds answers in FinOps policy and docs, then ML for forecasting and anomaly scoring, then multi-tenant SaaS.",
      },
    ],
  },
  {
    slug: "azure-landing-zone",
    title: "Azure Hub-Spoke Landing Zone",
    summary:
      "A modular Terraform landing zone for Azure: a hub-spoke network with a central firewall, private DNS, and four peered VNets where every data and AI service sits behind a private endpoint.",
    domain: ["cloud", "platform", "devops"],
    tags: ["terraform", "azure", "hub-spoke", "private-endpoint", "networking", "iac"],
    role: "Design + implementation",
    timeframe: "2025",
    status: "published",
    publishedAt: "2025-10-05",
    featured: true,
    order: 2,
    problem:
      "Standing up Azure for AI and analytics by hand tends to produce flat networks, public endpoints, and config that drifts between environments. It's hard to repeat and harder to secure.",
    solution:
      "~21 reusable Terraform modules that deploy a hub-spoke topology across four VNets. The hub runs Azure Firewall and Private DNS; spokes hold the workloads; everything talks over private endpoints, with NSGs and route tables forcing egress through the firewall.",
    outcome:
      "A repeatable, segmented Azure foundation (Central US) where Databricks, Azure OpenAI, Data Factory, Functions, Key Vault, and storage all sit behind private endpoints. A new environment is a config change, not a rebuild.",
    techStack: ["Terraform", "Azure Firewall", "Private DNS", "VNet Peering", "Databricks", "Azure OpenAI", "Data Factory"],
    metrics: [
      { label: "Modules", value: "~21" },
      { label: "VNets", value: "4 · peered" },
      { label: "Endpoints", value: "private" },
    ],
    architectureRef: "azure-hub-spoke-landing-zone",
    links: { repo: "https://github.com/Brainteaser1/azure-infra-terraform" },
    sections: [
      {
        heading: "Four VNets, one hub",
        body: "A hub VNet (10.0.0.0/16) centralizes Azure Firewall and Private DNS. Three spokes peer back to it: workloads (10.1.0.0/16), an isolated Databricks browser-auth network (10.2.0.0/16), and a sandbox (10.3.0.0/16). Peering is hub-to-each-spoke, so spokes never talk directly.",
      },
      {
        heading: "Private by default",
        body: "Databricks (with its access connector to ADLS), Azure OpenAI, Data Factory and its self-hosted integration runtime, Functions, Key Vault, and storage all connect through private endpoints with matching Private DNS zones. NSGs and route tables push egress through the hub firewall — nothing is exposed publicly by default.",
      },
      {
        heading: "Modular IaC",
        body: "~21 single-purpose modules — vnet, subnets, peering, firewall, nsg, route tables, private endpoints, private DNS zones, Databricks workspaces, access connector, Data Factory, SHIR, Functions, Key Vault, storage — composed in one root. Standing up a new environment is wiring modules, not copy-paste.",
      },
    ],
  },
  {
    slug: "aws-observability-mcp-server",
    title: "AWS Observability MCP Server",
    summary:
      "A Model Context Protocol server that gives AI agents safe access to AWS CloudWatch, secured with Cognito OAuth 2.0 and JWT validation.",
    domain: ["ai", "cloud", "platform"],
    tags: ["mcp", "fastmcp", "aws", "cognito", "jwt", "cloudwatch"],
    role: "Design + implementation · Celebal Technologies",
    timeframe: "2025",
    status: "published",
    publishedAt: "2025-12-10",
    featured: true,
    order: 3,
    problem:
      "AI agents needed access to AWS observability data. Exposing CloudWatch to an LLM without identity and scoping is a security risk.",
    solution:
      "An MCP server built with FastMCP that puts CloudWatch tooling behind Amazon Cognito OAuth 2.0 and JWT validation, so agents get scoped, auditable access.",
    outcome:
      "A reusable observability surface for agents that is authenticated, scoped, and safe to put in front of an autonomous system.",
    techStack: ["FastMCP", "Amazon Cognito", "JWT", "CloudWatch", "Python"],
    metrics: [
      { label: "Auth", value: "OAuth 2.0" },
      { label: "Protocol", value: "MCP" },
      { label: "Tokens", value: "JWT-verified" },
    ],
    architectureRef: "mcp-observability-gateway",
    links: { repo: "https://github.com/Brainteaser1/AIOps-AWS" },
    sections: [
      {
        heading: "Why MCP",
        body: "The Model Context Protocol gives agents a standard way to call tools. Wrapping CloudWatch as an MCP server makes observability a swappable capability instead of custom glue.",
      },
      {
        heading: "Security model",
        body: "Cognito issues OAuth 2.0 tokens, and the server validates the JWT on every call before it runs a CloudWatch query. Access is tied to an identity and logged.",
      },
    ],
  },
];

import type { Article } from "./types";

export const writing: Article[] = [
  {
    slug: "metadata-driven-text-to-sql",
    title: "Metadata-Driven Text-to-SQL That Doesn't Lie",
    summary:
      "How FinOps Hub keeps natural-language SQL trustworthy: route to template SQL when a metadata route exists, fall back to LLM SQL when it doesn't, then validate, retry, and cache.",
    type: "ai-experiment",
    domain: ["ai", "data"],
    tags: ["text-to-sql", "azure-openai", "databricks"],
    status: "published",
    publishedAt: "2026-01-20",
    readingTime: 10,
    relatedArchitecture: ["finops-orchestration-engine"],
    sections: [
      {
        heading: "The failure mode",
        body: "Ask one LLM call to write SQL across several schemas and it will confidently invent joins. A better prompt doesn't fix it. Structure does: route to deterministic template SQL where a metadata route exists, fall back to LLM SQL only where it must, then validate and auto-correct.",
      },
      {
        heading: "Guardrails that hold",
        body: "The SQL is read-only: no DML or DDL, no SELECT *, no multi-statements, no raw-layer scans, and always a row limit. A full-response cache keyed on the question makes answers identical and instant, and every answer shows the SQL it ran.",
      },
    ],
  },
  {
    slug: "llm-agent-runtime-from-scratch",
    title: "Building an LLM Agent Runtime From Scratch",
    summary:
      "I built the tool-calling loop by hand instead of reaching for a framework abstraction, to see exactly how an agent requests tools, runs them, and reasons over the results.",
    type: "open-source",
    domain: ["ai"],
    tags: ["langchain", "azure-openai", "tool-calling", "streamlit"],
    status: "published",
    publishedAt: "2025-11-05",
    readingTime: 9,
    links: { repo: "https://github.com/Brainteaser1/llm-agent-systems" },
    sections: [
      {
        heading: "Why from scratch",
        body: "Frameworks hide the agent loop. Writing it by hand makes the mechanics obvious: the model asks for a tool, the runtime executes it, and the result goes back for another round until the model has an answer.",
      },
      {
        heading: "What's in it",
        body: "A manual tool-calling agent over Azure OpenAI with Wikipedia and Tavily search tools, dynamic routing, error handling, and full message tracing, plus a streaming Streamlit chatbot with model selection and conversation history.",
      },
    ],
  },
  {
    slug: "building-secure-mcp-servers",
    title: "Building Secure MCP Servers for AI Agents",
    summary:
      "Giving agents real infrastructure through the Model Context Protocol, with OAuth 2.0, JWT validation, and scoped, auditable tools.",
    type: "deep-dive",
    domain: ["ai", "platform"],
    tags: ["mcp", "fastmcp", "cognito", "security"],
    status: "published",
    publishedAt: "2025-12-14",
    readingTime: 9,
    relatedArchitecture: ["mcp-observability-gateway"],
    sections: [
      {
        heading: "Identity first",
        body: "An agent calling cloud APIs is just another client. It needs an identity, scopes, and an audit trail. MCP gives the interface, and Cognito plus JWT give the trust.",
      },
    ],
  },
  {
    slug: "agentic-finops-architecture",
    title: "Architecting FinOps Hub, End to End",
    summary:
      "A decoupled FastAPI agent and Next.js app: the route, plan, SQL, validate, execute, summarize engine, a medallion warehouse, SSE streaming, JWT auth, and a roadmap to RAG and ML.",
    type: "infra-blueprint",
    domain: ["ai", "cloud", "data"],
    tags: ["finops", "databricks", "fastapi", "nextjs", "sse"],
    status: "published",
    publishedAt: "2025-11-28",
    readingTime: 12,
    relatedArchitecture: ["finops-orchestration-engine"],
  },
  {
    slug: "azure-hub-spoke-with-terraform",
    title: "A Hub-Spoke Azure Network in Terraform",
    summary:
      "Building a segmented Azure landing zone from reusable modules: a firewall and DNS hub, workload spokes, and private endpoints for every service.",
    type: "infra-blueprint",
    domain: ["cloud", "devops", "platform"],
    tags: ["terraform", "azure", "hub-spoke", "private-endpoint"],
    status: "published",
    publishedAt: "2025-10-08",
    readingTime: 8,
    relatedArchitecture: ["azure-hub-spoke-landing-zone"],
    links: { repo: "https://github.com/Brainteaser1/azure-infra-terraform" },
  },
  {
    slug: "medallion-architecture-for-finops",
    title: "Medallion Architecture for FinOps Data",
    summary:
      "Using bronze, silver, and gold layering so cloud-cost attribution and anomaly detection run on data you can trust.",
    type: "mlops-experiment",
    domain: ["data", "platform"],
    tags: ["databricks", "delta-lake", "medallion"],
    status: "published",
    publishedAt: "2025-11-10",
    readingTime: 8,
    relatedArchitecture: ["databricks-medallion-finops-warehouse"],
  },
];

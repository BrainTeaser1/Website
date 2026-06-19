export type StageStatus = "done" | "ongoing" | "next" | "goal";

export interface StageCard {
  title: string;
  body: string;
}

export interface Stage {
  key: string;
  label: string;
  status: StageStatus;
  statusLabel: string;
  cards: StageCard[];
}

export const trajectory: Stage[] = [
  {
    key: "software-eng",
    label: "Software Eng",
    status: "done",
    statusLabel: "FOUNDATION",
    cards: [
      {
        title: "CS fundamentals",
        body: "A B.Tech in Computer Science (SRM, 8.8 CGPA) — data structures, systems, and the basics everything else builds on.",
      },
      {
        title: "Backend engineering",
        body: "Built backend services and software at Encodency, working across teams from development through deployment.",
      },
      {
        title: "Shipping discipline",
        body: "Version control, debugging, testing, and delivery as default habits, not afterthoughts.",
      },
    ],
  },
  {
    key: "ai-cloud-eng",
    label: "AI & Cloud Eng",
    status: "ongoing",
    statusLabel: "ONGOING",
    cards: [
      {
        title: "FinOps Hub",
        body: "Building an agent that turns plain-English cloud-cost questions into validated SQL over Databricks, with a streaming UI.",
      },
      {
        title: "Cloud infrastructure",
        body: "Provisioning Azure and AWS from Terraform — hub-spoke networks, private endpoints, and CI/CD with Azure DevOps.",
      },
      {
        title: "Data platforms",
        body: "A bronze–silver–gold Databricks warehouse feeding cost attribution, anomaly detection, and reporting.",
      },
    ],
  },
  {
    key: "agentic-systems",
    label: "Agentic Systems",
    status: "next",
    statusLabel: "NEXT",
    cards: [
      {
        title: "Multi-agent orchestration",
        body: "Moving from single prompts to graphs of agents with LangGraph — stateful, debuggable, and testable.",
      },
      {
        title: "MCP tool servers",
        body: "Giving agents real, scoped tools through the Model Context Protocol, with auth and an audit trail built in.",
      },
      {
        title: "Evaluation-gated reliability",
        body: "Treating evals as a release gate so agentic systems stay trustworthy in production, not just in demos.",
      },
    ],
  },
  {
    key: "platform-data",
    label: "Platform & Data",
    status: "next",
    statusLabel: "NEXT",
    cards: [
      {
        title: "Self-serve platforms",
        body: "Internal platforms that let teams ship safely on golden paths instead of reinventing infrastructure each time.",
      },
      {
        title: "Lakehouse governance",
        body: "Trustworthy data by construction — schema, lineage, and access enforced at every layer.",
      },
      {
        title: "Observability & SLOs",
        body: "Making reliability measurable with SLOs, error budgets, and signals that catch problems before users do.",
      },
    ],
  },
  {
    key: "architect",
    label: "Cloud & AI Architect",
    status: "goal",
    statusLabel: "THE GOAL",
    cards: [
      {
        title: "End-to-end ownership",
        body: "Owning the architecture of intelligent platforms, from the network up to the model-serving layer.",
      },
      {
        title: "Trade-off calls",
        body: "Balancing cost, resilience, security, and developer experience as first-class design decisions.",
      },
      {
        title: "Leading design",
        body: "Setting technical direction and helping teams build systems that scale with the organization.",
      },
    ],
  },
];

export const defaultStageKey = trajectory.find((s) => s.status === "ongoing")?.key ?? trajectory[0].key;

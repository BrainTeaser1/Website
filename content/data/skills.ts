export interface SkillDomain {
  key: string;
  label: string;
  caption: string;
  color: string;
  items: string[];
}

export const skillDomains: SkillDomain[] = [
  {
    key: "ai",
    label: "AI & GenAI",
    caption: "INTELLIGENCE",
    color: "#a855f7",
    items: ["LangChain", "LangGraph", "Azure OpenAI", "MCP", "Prompt Engineering"],
  },
  {
    key: "cloud",
    label: "Cloud",
    caption: "PLATFORMS",
    color: "#3b6fff",
    items: ["Microsoft Azure", "AWS"],
  },
  {
    key: "devops",
    label: "DevOps & IaC",
    caption: "DELIVERY",
    color: "#2c46e6",
    items: ["Terraform", "Azure DevOps", "CI/CD", "Docker", "Kubernetes"],
  },
  {
    key: "data",
    label: "Data",
    caption: "PIPELINES",
    color: "#22d3ee",
    items: ["Azure Data Factory", "Databricks SQL", "Pandas", "Power BI"],
  },
];

export const principles = [
  {
    title: "How does this actually work?",
    body: "I want to know how a system behaves underneath before I trust it, so I dig until the black boxes aren't black anymore. Most of my projects start as that one question.",
  },
  {
    title: "Build it, break it, fix it",
    body: "I learn a thing by building it, breaking it, and fixing it. Implementation over theory, every time — tutorials never taught me as much as a system falling over did.",
  },
  {
    title: "Infrastructure is a product",
    body: "I provision with Terraform, ship through CI/CD, and keep it observable, so the next person can read it and build on it instead of guessing how it runs.",
  },
];

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
    items: ["Microsoft Azure", "AWS", "Azure Databricks"],
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
    title: "Reliability comes from structure",
    body: "I build AI systems as a set of checkable steps, so the pipeline decides whether an answer is correct. That way I'm not betting on one prompt to get it right.",
  },
  {
    title: "Treat infrastructure as a product",
    body: "I provision things with Terraform, ship them through CI/CD, and make them observable. The next engineer can read it and rebuild it, not just run it on my machine.",
  },
  {
    title: "I learn by shipping",
    body: "Real systems teach more than tutorials do. I deploy something, watch how it behaves, and fix what breaks. That loop is how the projects here got built.",
  },
];

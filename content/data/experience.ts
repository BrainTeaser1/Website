export interface Role {
  title: string;
  org: string;
  period: string;
  body: string;
  current?: boolean;
}

export const experience: Role[] = [
  {
    title: "Junior Associate — AI & Cloud Engineer",
    org: "Celebal Technologies",
    period: "Nov 2025 — Present",
    current: true,
    body: "Building FinOps Hub, a natural-language FinOps analyst on Azure and Databricks. It includes a hybrid template and LLM SQL engine, a FastAPI and Next.js streaming interface, a bronze-silver-gold warehouse, and an AWS observability MCP server, provisioned with Terraform and Azure DevOps.",
  },
  {
    title: "Software Engineer",
    org: "Encodency Pvt Ltd",
    period: "Jul 2025 — Oct 2025",
    body: "Built backend services and software, working across teams on application development and deployment, with version control, debugging, testing, and delivery as part of the routine.",
  },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science Engineering",
    school: "SRM University",
    period: "2021 — 2025",
    detail: "CGPA 8.8 / 10",
  },
];

export type CertStatus = "certified" | "in-progress" | "planned";

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  status: CertStatus;
  issuedAt?: string;
  credentialUrl?: string;
  domain: string[];
}

/**
 * Roadmap targets aligned to current work (Azure OpenAI, Databricks, AWS).
 * Marked honestly as "planned" — the real, earned credential is the degree
 * (see `education` in experience.ts). Update status as exams are completed.
 */
export const certifications: Certification[] = [
  {
    name: "Azure AI Engineer Associate",
    code: "AI-102",
    issuer: "Microsoft",
    status: "planned",
    domain: ["ai", "cloud"],
  },
  {
    name: "Databricks Data Engineer Associate",
    code: "DBX-DE",
    issuer: "Databricks",
    status: "planned",
    domain: ["data", "platform"],
  },
  {
    name: "Azure Solutions Architect Expert",
    code: "AZ-305",
    issuer: "Microsoft",
    status: "planned",
    domain: ["cloud", "architecture"],
  },
];

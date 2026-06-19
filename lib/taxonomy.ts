export const DOMAINS = [
  "cloud",
  "devops",
  "data",
  "ai",
  "mlops",
  "architecture",
  "platform",
] as const;
export type Domain = (typeof DOMAINS)[number];

export const WRITING_TYPES = [
  "deep-dive",
  "infra-blueprint",
  "cloud-lab",
  "devops-lab",
  "ai-experiment",
  "mlops-experiment",
  "open-source",
  "guide",
] as const;
export type WritingType = (typeof WRITING_TYPES)[number];

export type Status = "draft" | "published" | "archived";

export const DOMAIN_LABEL: Record<Domain, string> = {
  cloud: "Cloud",
  devops: "DevOps",
  data: "Data",
  ai: "AI",
  mlops: "MLOps",
  architecture: "Architecture",
  platform: "Platform",
};

export const TYPE_LABEL: Record<WritingType, string> = {
  "deep-dive": "Deep Dive",
  "infra-blueprint": "Infra Blueprint",
  "cloud-lab": "Cloud Lab",
  "devops-lab": "DevOps Lab",
  "ai-experiment": "AI Experiment",
  "mlops-experiment": "MLOps Experiment",
  "open-source": "Open Source",
  guide: "Guide",
};

/** Accent color per domain — drives the ecosystem + tag chips. */
export const DOMAIN_COLOR: Record<Domain, string> = {
  cloud: "#3b6fff",
  devops: "#2c46e6",
  data: "#22d3ee",
  ai: "#a855f7",
  mlops: "#8b5cf6",
  architecture: "#6d5bff",
  platform: "#3b6fff",
};

import type { Domain, WritingType, Status } from "@/lib/taxonomy";

/** A labelled metric shown on cards / case-study headers. */
export interface Metric {
  label: string;
  value: string;
}

/** A structured body block — keeps placeholder content rich without MDX. */
export interface Section {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  domain: Domain[];
  tags: string[];
  role: string;
  timeframe: string;
  status: Status;
  publishedAt: string;
  featured?: boolean;
  order?: number;
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  metrics: Metric[];
  architectureRef?: string; // -> Blueprint.slug
  links?: { repo?: string; writeup?: string; live?: string };
  /** optional long-form, structured (placeholder-friendly, MDX later). */
  sections?: Section[];
}

export type DiagramKind = "svg" | "image";

export interface Blueprint {
  slug: string;
  title: string;
  summary: string;
  domain: Domain[];
  tags: string[];
  status: Status;
  featured?: boolean;
  publishedAt: string;
  maturity: "concept" | "reviewed" | "production";
  layers: string[];
  techStack: string[];
  relatedWork?: string[];
  relatedWriting?: string[];
  sections?: Section[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  type: WritingType;
  domain: Domain[];
  tags: string[];
  status: Status;
  publishedAt: string;
  readingTime: number;
  series?: string;
  relatedArchitecture?: string[];
  links?: { repo?: string };
  sections?: Section[];
}

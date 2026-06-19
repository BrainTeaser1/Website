/**
 * Single content-access surface. Pages MUST read through these helpers,
 * never the raw data modules — so swapping the typed placeholder data for
 * Velite/MDX or a backend later is a one-file change.
 */
import { work as allWork } from "@/content/work";
import { blueprints as allBlueprints } from "@/content/architecture";
import { writing as allWriting } from "@/content/writing";
import type { CaseStudy, Blueprint, Article } from "@/content/types";
import type { Domain, WritingType } from "@/lib/taxonomy";

const isPublic = <T extends { status: string }>(x: T) => x.status !== "draft";
const byDate = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  b.publishedAt.localeCompare(a.publishedAt);

/* ---- Work / case studies ---- */
export function getWork(): CaseStudy[] {
  return allWork
    .filter(isPublic)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || byDate(a, b));
}
export function getWorkBySlug(slug: string): CaseStudy | undefined {
  return allWork.find((w) => w.slug === slug && isPublic(w));
}
export function getFeaturedWork(limit = 3): CaseStudy[] {
  return getWork().filter((w) => w.featured).slice(0, limit);
}

/* ---- Architecture / blueprints ---- */
export function getBlueprints(): Blueprint[] {
  return allBlueprints.filter(isPublic).sort(byDate);
}
export function getBlueprintBySlug(slug: string): Blueprint | undefined {
  return allBlueprints.find((b) => b.slug === slug && isPublic(b));
}
export function getFeaturedBlueprints(limit = 3): Blueprint[] {
  return getBlueprints().filter((b) => b.featured).slice(0, limit);
}

/* ---- Writing ---- */
export function getWriting(): Article[] {
  return allWriting.filter(isPublic).sort(byDate);
}
export function getArticleBySlug(slug: string): Article | undefined {
  return allWriting.find((a) => a.slug === slug && isPublic(a));
}
export function getWritingByFacet(opts: { type?: WritingType; domain?: Domain } = {}): Article[] {
  return getWriting().filter(
    (a) =>
      (!opts.type || a.type === opts.type) &&
      (!opts.domain || a.domain.includes(opts.domain)),
  );
}

/* ---- Static params helpers ---- */
export const workSlugs = () => allWork.filter(isPublic).map((w) => ({ slug: w.slug }));
export const blueprintSlugs = () => allBlueprints.filter(isPublic).map((b) => ({ slug: b.slug }));
export const articleSlugs = () => allWriting.filter(isPublic).map((a) => ({ slug: a.slug }));

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getWorkBySlug, workSlugs, getBlueprintBySlug } from "@/lib/content";
import { DOMAIN_LABEL } from "@/lib/taxonomy";
import { Chip, Tag } from "@/components/ui/chip";
import { MetricStat } from "@/components/ui/stat";
import { Prose } from "@/components/content/prose";

export function generateStaticParams() {
  return workSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getWorkBySlug(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

const facts = ["problem", "solution", "outcome"] as const;
const factLabel: Record<(typeof facts)[number], string> = {
  problem: "Problem",
  solution: "Solution",
  outcome: "Outcome",
};

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getWorkBySlug(params.slug);
  if (!project) notFound();
  const arch = project.architectureRef ? getBlueprintBySlug(project.architectureRef) : undefined;

  return (
    <article className="relative pb-28 pt-36">
      <div className="glow absolute -top-24 left-1/3 h-[320px] w-[560px] rounded-full bg-accent/20" />
      <div className="absolute inset-0 grid-bg grid-fade" />

      <div className="container-page relative max-w-3xl">
        <Link href="/work" className="mb-8 inline-flex items-center gap-1.5 text-sm text-sub transition hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.domain.map((d) => (
            <Chip key={d}>{DOMAIN_LABEL[d]}</Chip>
          ))}
          <span className="font-mono text-xs text-sub">{project.role} · {project.timeframe}</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-sub">{project.summary}</p>

        {/* problem / solution / outcome */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f} className="card rounded-2xl p-5">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">{factLabel[f]}</div>
              <p className="text-sm leading-relaxed text-sub">{project[f]}</p>
            </div>
          ))}
        </div>

        {/* metrics */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {project.metrics.map((m) => (
            <MetricStat key={m.label} {...m} />
          ))}
        </div>

        {/* tech */}
        <div className="mt-8">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-sub">Tech stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <hr className="my-12 border-line/60" />

        <Prose sections={project.sections} />

        {/* related architecture */}
        {arch && (
          <Link
            href={`/architecture/${arch.slug}`}
            className="card card-hover mt-12 flex items-center justify-between rounded-2xl p-6"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-cyan">Related blueprint</div>
              <div className="mt-1 font-bold">{arch.title}</div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-sub" />
          </Link>
        )}

        {project.links && (
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noreferrer" className="font-semibold text-accent hover:underline">
                Repository ↗
              </a>
            )}
            {project.links.writeup && (
              <Link href={`/writing/${project.links.writeup}`} className="font-semibold text-accent hover:underline">
                Read the deep-dive →
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

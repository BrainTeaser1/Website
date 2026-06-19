import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { DOMAIN_LABEL } from "@/lib/taxonomy";
import { Tag } from "@/components/ui/chip";

export function ProjectCard({ project, index }: { project: CaseStudy; index?: number }) {
  return (
    <article className="card card-hover group relative flex flex-col overflow-hidden rounded-3xl">
      {/* full-card overlay link (siblings stay clickable via z-10) */}
      <Link href={`/work/${project.slug}`} className="absolute inset-0 z-0" aria-label={project.title} />

      {/* preview header */}
      <div className="relative h-40 overflow-hidden border-b border-line/60 bg-surface2">
        <div className="blueprint absolute inset-0 opacity-50" />
        <div className="glow absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/30" />
        <div className="relative flex h-full flex-col justify-between p-5 font-mono text-[11px] text-sub">
          <div className="flex items-center justify-between">
            <span className="text-cyan">{project.domain.map((d) => DOMAIN_LABEL[d]).join(" · ")}</span>
            {index != null && <span className="text-sub/70">{String(index + 1).padStart(2, "0")}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <span key={m.label} className="rounded bg-base/60 px-2 py-1">
                <span className="text-ink">{m.value}</span> {m.label.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sub">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
            Read case study <ArrowUpRight className="h-4 w-4" />
          </span>
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="relative z-10 text-sub transition hover:text-ink"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

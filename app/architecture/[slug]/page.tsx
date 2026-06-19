import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getBlueprintBySlug, blueprintSlugs, getWorkBySlug, getArticleBySlug } from "@/lib/content";
import { DOMAIN_LABEL } from "@/lib/taxonomy";
import { StatusBadge } from "@/components/ui/badge";
import { Chip, Tag } from "@/components/ui/chip";
import { BlueprintFigure } from "@/components/architecture/blueprint-figure";
import { Prose } from "@/components/content/prose";

export function generateStaticParams() {
  return blueprintSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBlueprintBySlug(params.slug);
  if (!b) return {};
  return { title: b.title, description: b.summary };
}

export default function BlueprintPage({ params }: { params: { slug: string } }) {
  const b = getBlueprintBySlug(params.slug);
  if (!b) notFound();
  const related = [
    ...(b.relatedWork ?? []).map((s) => ({ kind: "work" as const, item: getWorkBySlug(s) })),
    ...(b.relatedWriting ?? []).map((s) => ({ kind: "writing" as const, item: getArticleBySlug(s) })),
  ].filter((r) => r.item);

  return (
    <article className="relative pb-28 pt-36">
      <div className="absolute inset-0 grid-bg grid-fade" />
      <div className="container-page relative max-w-3xl">
        <Link href="/architecture" className="mb-8 inline-flex items-center gap-1.5 text-sm text-sub transition hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Architecture gallery
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {b.domain.map((d) => (
            <Chip key={d}>{DOMAIN_LABEL[d]}</Chip>
          ))}
          <StatusBadge status={b.maturity} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{b.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-sub">{b.summary}</p>

        {/* blueprint panel */}
        <div className="blueprint relative mt-10 h-56 overflow-hidden rounded-3xl border border-cyan/20">
          <div className="absolute left-5 top-4 z-10 font-mono text-[11px] text-cyan">topology · {b.maturity}</div>
          <div className="flex h-full items-center px-6">
            <BlueprintFigure variant={1} />
          </div>
        </div>

        {/* layers */}
        <div className="mt-8 flex flex-wrap gap-2">
          {b.layers.map((l, i) => (
            <span key={l} className="chip rounded-full px-3 py-1 font-mono text-xs text-sub">
              {String(i + 1).padStart(2, "0")} · {l}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-sub">Tech stack</div>
          <div className="flex flex-wrap gap-2">
            {b.techStack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <hr className="my-12 border-line/60" />
        <Prose sections={b.sections} />

        {related.length > 0 && (
          <div className="mt-12 space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-sub">Related</div>
            {related.map((r) => (
              <Link
                key={r.item!.slug}
                href={`/${r.kind}/${r.item!.slug}`}
                className="card card-hover flex items-center justify-between rounded-2xl p-5"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-cyan">{r.kind === "work" ? "Case study" : "Writing"}</div>
                  <div className="mt-1 font-semibold">{r.item!.title}</div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-sub" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

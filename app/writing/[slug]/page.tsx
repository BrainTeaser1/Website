import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { getArticleBySlug, articleSlugs, getBlueprintBySlug } from "@/lib/content";
import { TYPE_LABEL, DOMAIN_LABEL } from "@/lib/taxonomy";
import { Chip, Tag } from "@/components/ui/chip";
import { Prose } from "@/components/content/prose";

export function generateStaticParams() {
  return articleSlugs();
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticleBySlug(params.slug);
  if (!a) return {};
  return { title: a.title, description: a.summary };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticleBySlug(params.slug);
  if (!a) notFound();
  const arch = a.relatedArchitecture?.[0] ? getBlueprintBySlug(a.relatedArchitecture[0]) : undefined;

  return (
    <article className="relative pb-28 pt-36">
      <div className="glow absolute -top-24 left-1/3 h-[320px] w-[520px] rounded-full bg-violet/15" />
      <div className="absolute inset-0 grid-bg grid-fade" />
      <div className="container-page relative max-w-2xl">
        <Link href="/writing" className="mb-8 inline-flex items-center gap-1.5 text-sm text-sub transition hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-sub">
          <span className="text-accent">{TYPE_LABEL[a.type]}</span>
          <span className="text-line">·</span>
          <span>{formatDate(a.publishedAt)}</span>
          <span className="text-line">·</span>
          <span>{a.readingTime} min read</span>
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{a.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-sub">{a.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {a.domain.map((d) => (
            <Chip key={d}>{DOMAIN_LABEL[d]}</Chip>
          ))}
          {a.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {a.links?.repo && (
          <a
            href={a.links.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <Github className="h-4 w-4" /> View the repo on GitHub
          </a>
        )}

        <hr className="my-12 border-line/60" />
        <Prose sections={a.sections} />

        {!a.sections?.length && (
          <p className="text-[15px] leading-relaxed text-sub">
            The full write-up is still in progress. The summary above is the short version for now.
          </p>
        )}

        {arch && (
          <Link href={`/architecture/${arch.slug}`} className="card card-hover mt-12 block rounded-2xl p-6">
            <div className="font-mono text-[11px] uppercase tracking-wider text-cyan">Referenced architecture</div>
            <div className="mt-1 font-bold">{arch.title}</div>
            <p className="mt-1 text-sm text-sub">{arch.summary}</p>
          </Link>
        )}
      </div>
    </article>
  );
}

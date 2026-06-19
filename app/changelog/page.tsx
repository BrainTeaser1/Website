import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { changelog, type ChangeType } from "@/content/data/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "A dated, build-in-public record of what Krishna Shukla has shipped, written, designed, and earned.",
};

const tone: Record<ChangeType, string> = {
  shipped: "text-cyan",
  wrote: "text-accent",
  designed: "text-violet",
  joined: "text-sky",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="// CHANGELOG"
        title="Building in public"
        description="A dated log of what I've shipped, written, and designed."
      />
      <section className="container-page relative max-w-3xl pb-28">
        <ol className="relative border-l border-line pl-8">
          {changelog.map((c, i) => {
            const inner = (
              <>
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-surface2 ring-2 ring-accent/50" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-sub">{formatDate(c.date)}</span>
                  <span className={`font-mono text-[11px] uppercase tracking-wider ${tone[c.type]}`}>{c.type}</span>
                </div>
                <div className="mt-1 font-medium">{c.title}</div>
              </>
            );
            return (
              <Reveal as="li" key={c.date + c.title} index={i} className="relative mb-8 last:mb-0">
                {c.href ? (
                  <Link href={c.href} className="block transition hover:opacity-90">{inner}</Link>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </ol>
      </section>
    </>
  );
}

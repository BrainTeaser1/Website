import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { ArticleCard } from "@/components/writing/article-card";
import { getWriting } from "@/lib/content";

export function WritingPreview() {
  const posts = getWriting().slice(0, 3);
  return (
    <Section id="writing">
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="mb-0"
            eyebrow="// TECHNICAL WRITING"
            title="Notes from the build"
            description="Deep dives and labs on the systems I build, written as I go."
          />
          <Reveal>
            <Link
              href="/writing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
            >
              All writing <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((a, i) => (
            <Reveal key={a.slug} index={i}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

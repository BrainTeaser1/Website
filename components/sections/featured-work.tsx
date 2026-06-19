import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { getFeaturedWork } from "@/lib/content";

export function FeaturedWork() {
  const work = getFeaturedWork(3);
  return (
    <Section id="work">
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="mb-0"
            eyebrow="// SELECTED WORK"
            title="Selected work"
            description="A few projects I've built. Each write-up covers the problem, how it was built, and the result."
          />
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
            >
              All work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {work.map((p, i) => (
            <Reveal key={p.slug} index={i}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

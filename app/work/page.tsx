import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Engineering case studies covering the problem, the build, and the result for projects I've shipped.",
};

export default function WorkPage() {
  const work = getWork();
  return (
    <>
      <PageHeader
        eyebrow="// SELECTED WORK"
        title="Case studies"
        description="Projects I've shipped. Each one covers the problem, how it was built, and the result."
      />
      <section className="container-page relative pb-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {work.map((p, i) => (
            <Reveal key={p.slug} index={i}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

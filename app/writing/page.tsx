import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { WritingExplorer } from "@/components/writing/writing-explorer";
import { getWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Deep dives, labs, and decision records on cloud, DevOps, MLOps, and AI engineering.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="// TECHNICAL WRITING"
        title="Notes from the build"
        description="Deep dives and labs on what I build. Filter by type or domain."
      />
      <section className="container-page relative pb-28">
        <WritingExplorer articles={getWriting()} />
      </section>
    </>
  );
}

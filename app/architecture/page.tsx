import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { FeaturedBlueprint } from "@/components/architecture/featured-blueprint";
import { BlueprintCard } from "@/components/architecture/blueprint-card";
import { getBlueprints, getFeaturedBlueprints } from "@/lib/content";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Reference architectures I've designed: a hub-spoke Azure landing zone, a FinOps SQL engine, a medallion warehouse, and an MCP gateway.",
};

export default function ArchitecturePage() {
  const featured = getFeaturedBlueprints(1)[0];
  const rest = getBlueprints().filter((b) => b.slug !== featured?.slug);

  return (
    <>
      <PageHeader
        eyebrow="// ARCHITECTURE GALLERY"
        title="Architecture"
        description="The systems behind my projects, drawn out: networks, data platforms, and the AI serving layer."
      />
      <section className="container-page relative pb-28">
        {featured && (
          <Reveal className="mb-5">
            <FeaturedBlueprint blueprint={featured} />
          </Reveal>
        )}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((b, i) => (
            <Reveal key={b.slug} index={i}>
              <BlueprintCard blueprint={b} variant={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { FeaturedBlueprint } from "@/components/architecture/featured-blueprint";
import { BlueprintCard } from "@/components/architecture/blueprint-card";
import { ScrollTilt } from "@/components/effects/scroll-tilt";
import { getFeaturedBlueprints } from "@/lib/content";

export function ArchitecturePreview() {
  const [featured, ...rest] = getFeaturedBlueprints(3);
  if (!featured) return null;

  return (
    <Section id="architecture" flow="both">
      <div className="blueprint absolute inset-0 opacity-[0.55]" />
      <div className="sec-glow" style={{ top: "10%", left: "-6%", width: 420, height: 420, background: "rgb(34 211 238 / 0.10)" }} />
      <div className="sec-glow" style={{ bottom: 0, right: "-6%", width: 480, height: 420, background: "rgb(44 70 230 / 0.12)" }} />

      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="mb-0"
            eyebrow="// ARCHITECTURE"
            title="The systems behind the work"
            description="How my projects are designed underneath, from the network up to the model serving layer."
          />
          <Reveal>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-all hover:gap-2.5"
            >
              Full gallery <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ScrollTilt>
              <FeaturedBlueprint blueprint={featured} />
            </ScrollTilt>
          </Reveal>
          <div className="flex flex-col gap-5 lg:col-span-4">
            {rest.map((b, i) => (
              <Reveal key={b.slug} index={i} className="flex-1">
                <BlueprintCard blueprint={b} variant={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

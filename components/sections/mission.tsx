import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { TrajectoryStepper } from "@/components/sections/trajectory-stepper";

export function Mission() {
  return (
    <Section id="mission">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="// TRAJECTORY"
          title="Where I'm headed"
          description="From software engineering to AI & cloud architecture. Click any stage to see what it means."
        />
        <Reveal>
          <TrajectoryStepper />
        </Reveal>
      </div>
    </Section>
  );
}

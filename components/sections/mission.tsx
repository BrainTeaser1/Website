import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { TrajectoryStepper } from "@/components/sections/trajectory-stepper";

export function Mission() {
  return (
    <Section id="mission">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="// HOW I'M GROWING"
          title="Engineering Trajectory"
          description="Where I started, what I'm building now, what I'm deliberately learning next, and where this is going — a progression through harder systems, not a five-year plan. Click any stage."
        />
        <Reveal>
          <TrajectoryStepper />
        </Reveal>
      </div>
    </Section>
  );
}

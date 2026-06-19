import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { experience } from "@/content/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-page relative max-w-4xl">
        <SectionHeading eyebrow="// EXPERIENCE" title="Where I've built" />

        <div className="relative border-l border-line pl-8">
          {experience.map((role, i) => (
            <Reveal key={role.title} index={i} className="relative mb-12 last:mb-0">
              <span
                className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full ${
                  role.current
                    ? "timeline-dot bg-gradient-to-br from-accent to-violet"
                    : i === 1
                      ? "timeline-dot border-2 border-accent bg-surface2"
                      : "border-2 border-line bg-surface2"
                }`}
              />
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold">{role.title}</h3>
                <span className="font-mono text-xs text-sub">{role.period.toUpperCase()}</span>
              </div>
              <p className="mb-3 text-sm font-medium text-accent">{role.org}</p>
              <p className="text-[15px] leading-relaxed text-sub">{role.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

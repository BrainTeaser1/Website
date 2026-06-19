import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { skillDomains } from "@/content/data/skills";

export function Ecosystem() {
  return (
    <Section id="expertise">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="// STACK"
          title="The stack I work in"
          description="Four areas I work across. Cloud carries delivery, delivery moves data, and data feeds the AI on top of it."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillDomains.map((d, i) => (
            <Reveal key={d.key} index={i}>
              <div
                className="eco card card-hover h-full rounded-2xl p-6"
                style={{ ["--dot" as string]: d.color }}
              >
                <div className="mb-5 flex items-center gap-3 border-b border-line/60 pb-5">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl text-sm font-black"
                    style={{ background: `${d.color}22`, color: d.color }}
                  >
                    {d.label[0]}
                  </span>
                  <div>
                    <div className="font-bold">{d.label}</div>
                    <div className="font-mono text-[11px]" style={{ color: d.color }}>
                      {d.caption}
                    </div>
                  </div>
                </div>
                <ul className="eco-list space-y-2.5 text-sm">
                  {d.items.map((item, idx) => (
                    <li key={item} className={idx === 0 ? "font-semibold text-ink" : ""}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-sub">
          <span className="text-sky">Cloud</span>
          <span className="text-line">→</span>
          <span className="text-accent">DevOps</span>
          <span className="text-line">→</span>
          <span className="text-cyan">Data</span>
          <span className="text-line">→</span>
          <span className="text-violet">AI</span>
        </Reveal>
      </div>
    </Section>
  );
}

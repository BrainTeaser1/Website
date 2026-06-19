import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { principles } from "@/content/data/skills";

const stats = [
  { value: "8.8", label: "B.Tech CGPA" },
  { value: "3", label: "Clouds" },
  { value: "Agentic", label: "AI Focus" },
];

export function About() {
  return (
    <Section id="about">
      <div className="container-page relative grid items-start gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="mb-3">// HOW I WORK</Eyebrow>
          <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            How I approach engineering
          </h2>
          <div className="card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet text-2xl font-black">
                K
              </div>
              <div>
                <div className="font-semibold">Krishna Shukla</div>
                <div className="font-mono text-sm text-sub">AI &amp; Cloud Engineer</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="accent-gradient text-2xl font-bold">{s.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-sub">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-5 lg:col-span-7 lg:pt-16">
          {principles.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <div className="card card-hover rounded-2xl p-6">
                <h3 className="mb-2 text-lg font-bold">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-sub">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

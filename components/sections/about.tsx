import { Section, Eyebrow } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { principles } from "@/content/data/skills";
import { currentlyExploring, exploringAsOf } from "@/content/data/exploring";

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
            <div className="mt-6 border-t border-line/60 pt-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Currently exploring
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-sub/70">
                  {exploringAsOf}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {currentlyExploring.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/90">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-br from-accent to-violet" />
                    {item}
                  </li>
                ))}
              </ul>
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

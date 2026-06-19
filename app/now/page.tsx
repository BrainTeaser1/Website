import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { nowStages, nowFocus, nowLearning, availability, nowUpdated } from "@/content/data/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What Krishna Shukla is focused on, learning, and building right now.",
};

const accentText: Record<string, string> = { cyan: "text-cyan", accent: "text-accent", violet: "text-violet" };

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card rounded-2xl p-6">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-accent">{title}</h3>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-sub">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="// NOW"
        title="What I'm focused on"
        description={`What I'm working on and learning right now. Last updated ${nowUpdated}.`}
      />
      <section className="container-page relative space-y-10 pb-28">
        <div className="grid gap-5 md:grid-cols-3">
          {nowStages.map((s, i) => (
            <Reveal key={s.title} index={i}>
              <div className="card card-hover h-full rounded-2xl p-7">
                <div className={`mb-4 font-mono text-xs ${accentText[s.accent]}`}>{s.phase} · {s.when}</div>
                <h3 className="mb-3 text-xl font-bold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-sub">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal><List title="Focused on" items={nowFocus} /></Reveal>
          <Reveal index={1}><List title="Learning" items={nowLearning} /></Reveal>
        </div>
        <Reveal>
          <div className="card rounded-2xl p-6">
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-cyan">Availability</h3>
            <p className="text-[15px] leading-relaxed text-sub">{availability}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}

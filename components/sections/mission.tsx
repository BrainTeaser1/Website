import { GitBranch, Cloud, Workflow, Sparkles, Compass } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { nowStages } from "@/content/data/now";

const stages = [
  { label: "Software Eng", note: "FOUNDATION ✓", Icon: GitBranch, state: "done" },
  { label: "AI & Cloud Eng", note: "● CURRENT", Icon: Cloud, state: "current" },
  { label: "Agentic Systems", note: "NEXT", Icon: Sparkles, state: "next" },
  { label: "Platform & Data", note: "NEXT", Icon: Workflow, state: "next" },
  { label: "Cloud & AI Architect", note: "THE GOAL", Icon: Compass, state: "goal" },
] as const;

const accentText: Record<string, string> = { cyan: "text-cyan", accent: "text-accent", violet: "text-violet" };

export function Mission() {
  return (
    <Section id="mission">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="// TRAJECTORY"
          title="Where I'm headed"
          description="I'm an AI and cloud engineer now, and I'm building toward an architect role. Here's the path and what I'm working on at each step."
        />

        {/* progression rail */}
        <Reveal className="relative mb-16">
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5">
            <div className="prog-line absolute left-[10%] right-[10%] top-6 hidden h-px md:block" />
            {stages.map((s) => {
              const goal = s.state === "goal";
              const current = s.state === "current";
              return (
                <div key={s.label} className="relative text-center last:col-span-2 md:last:col-span-1">
                  <div
                    className={`relative z-10 mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full ${
                      current
                        ? "timeline-dot bg-gradient-to-br from-accent to-violet text-white"
                        : goal
                          ? "border border-violet/40 bg-surface2 text-violet"
                          : s.state === "done"
                            ? "timeline-dot border border-cyan/40 bg-surface2 text-cyan"
                            : "border border-line bg-surface2 text-sub"
                    }`}
                  >
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <div className={`text-[15px] font-bold ${goal ? "accent-gradient" : ""}`}>{s.label}</div>
                  <div className="mt-1 font-mono text-[11px] text-sub">{s.note}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* now / next / horizon */}
        <div className="grid gap-5 md:grid-cols-3">
          {nowStages.map((stage, i) => (
            <Reveal key={stage.title} index={i}>
              <div className="card card-hover h-full rounded-2xl p-7">
                <div className={`mb-4 font-mono text-xs ${accentText[stage.accent]}`}>
                  {stage.phase} · {stage.when}
                </div>
                <h3 className="mb-3 text-xl font-bold">{stage.title}</h3>
                <p className="text-[15px] leading-relaxed text-sub">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { GitBranch, Cloud, Sparkles, Workflow, Compass, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trajectory, defaultStageKey, type StageStatus } from "@/content/data/trajectory";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "software-eng": GitBranch,
  "ai-cloud-eng": Cloud,
  "agentic-systems": Sparkles,
  "platform-data": Workflow,
  architect: Compass,
};

function nodeClasses(status: StageStatus, selected: boolean) {
  const base =
    status === "ongoing"
      ? "bg-gradient-to-br from-accent to-violet text-white timeline-dot"
      : status === "done"
        ? "border border-cyan/40 bg-surface2 text-cyan timeline-dot"
        : status === "goal"
          ? "border border-violet/40 bg-surface2 text-violet"
          : "border border-line bg-surface2 text-sub";
  return cn(base, selected && "ring-2 ring-accent/70 ring-offset-2 ring-offset-base scale-110");
}

export function TrajectoryStepper() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(defaultStageKey);
  const stage = trajectory.find((s) => s.key === active) ?? trajectory[0];

  return (
    <div>
      {/* clickable rail */}
      <div className="relative mb-12">
        <div className="prog-line absolute left-[10%] right-[10%] top-6 hidden h-px md:block" />
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5">
          {trajectory.map((s) => {
            const Icon = ICONS[s.key];
            const selected = s.key === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                aria-pressed={selected}
                className="group relative text-center last:col-span-2 md:last:col-span-1"
              >
                <span
                  className={cn(
                    "relative z-10 mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full transition-all duration-300",
                    nodeClasses(s.status, selected),
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "block text-[15px] font-bold transition-colors",
                    s.status === "goal" && "accent-gradient",
                    selected ? "text-ink" : "text-ink/90 group-hover:text-ink",
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "mt-1 block font-mono text-[11px]",
                    selected ? "text-accent" : "text-sub",
                  )}
                >
                  {s.status === "ongoing" ? "● " : s.status === "done" ? "✓ " : ""}
                  {s.statusLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* stage cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.key}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid gap-5 md:grid-cols-3"
        >
          {stage.cards.map((c) => (
            <div key={c.title} className="card card-hover flex h-full flex-col rounded-2xl p-7">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent">
                {stage.statusLabel}
              </div>
              <h3 className="mb-2 text-lg font-bold">{c.title}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-sub">{c.body}</p>
              {c.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span key={t} className="chip rounded px-2 py-0.5 font-mono text-[10px] text-sub">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

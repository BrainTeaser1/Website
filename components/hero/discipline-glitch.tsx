"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * DisciplineGlitch — the hero accent line. Cycles the disciplines Krishna builds
 * across with a controlled chromatic *burst* on each word swap, then sits still.
 * Intent: "disciplines shifting and evolving" — not a hacker/cyberpunk glitch.
 *
 * Perf: the burst happens only on a swap (every ~2.5s); between swaps there is
 * zero per-frame work. No mix-blend / no perpetual idle tween (those forced a
 * constant blended recomposite over the live hero backdrop). Cycling pauses when
 * the hero scrolls out of view. Reduced motion → plain opacity crossfade.
 */

const DISCIPLINES = ["Cloud Platforms", "Data Systems", "Agentic Systems", "Machine Learning"];
const INTERVAL = 2500;
const SIZE = "text-3xl font-bold tracking-tight sm:text-4xl";

export function DisciplineGlitch({
  words = DISCIPLINES,
  className,
}: {
  words?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(true);

  // Only cycle while visible — costs nothing once scrolled past the hero.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), INTERVAL);
    return () => clearInterval(id);
  }, [inView, words.length]);

  const word = words[i];

  if (reduce) {
    return (
      <div
        ref={ref}
        className={cn("relative flex h-12 items-center justify-center sm:h-14", className)}
        aria-label={words.join(", ")}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            className={cn(SIZE, "accent-gradient")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative flex h-12 select-none items-center justify-center sm:h-14", className)}
      aria-label={words.join(", ")}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={word}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <span className="relative inline-flex items-center justify-center">
            {/* chromatic ghosts: separate on entry, then settle and hold (no perpetual motion) */}
            <Ghost color="#3b6fff" burst={-4}>
              {word}
            </Ghost>
            <Ghost color="#a855f7" burst={4}>
              {word}
            </Ghost>
            {/* main readable layer (painted last = on top) — static between swaps */}
            <span className={cn(SIZE, "accent-gradient relative")}>{word}</span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Ghost({ color, burst, children }: { color: string; burst: number; children: React.ReactNode }) {
  return (
    <motion.span
      aria-hidden
      className={cn(SIZE, "absolute inset-0 flex items-center justify-center")}
      style={{ color }}
      initial={{ x: burst, opacity: 0 }}
      animate={{ x: 0, opacity: 0.28 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

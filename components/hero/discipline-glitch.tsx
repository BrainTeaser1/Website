"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * DisciplineGlitch — the hero accent line. Cycles the disciplines Krishna builds
 * across, with a *controlled* glitch: a faint continuous idle shimmer plus a brief,
 * subtle chromatic burst on each word swap. Text stays fully readable at all times.
 * Intent: "disciplines shifting and evolving" — not a hacker/cyberpunk glitch.
 * Reduced motion → plain opacity crossfade, no transforms, no chromatic layers.
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
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), INTERVAL);
    return () => clearInterval(id);
  }, [words.length]);

  const word = words[i];

  if (reduce) {
    return (
      <div
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
            {/* royal-blue ghost — settles in from the left, then drifts ≤1px */}
            <Ghost color="#3b6fff" burst={-4} idleX={[-1, 0.4, -0.7, -1]} idleY={[0, 0.4, -0.3, 0]}>
              {word}
            </Ghost>
            {/* violet ghost — mirror of the blue */}
            <Ghost color="#a855f7" burst={4} idleX={[1, -0.4, 0.7, 1]} idleY={[0, -0.4, 0.3, 0]}>
              {word}
            </Ghost>
            {/* main readable layer (painted last = on top) with its own faint idle drift */}
            <motion.span
              className={cn(SIZE, "accent-gradient relative")}
              animate={{ x: [0, 0.4, -0.3, 0], y: [0, -0.2, 0.2, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {word}
            </motion.span>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Ghost({
  color,
  burst,
  idleX,
  idleY,
  children,
}: {
  color: string;
  burst: number;
  idleX: number[];
  idleY: number[];
  children: React.ReactNode;
}) {
  return (
    <motion.span
      aria-hidden
      className="absolute inset-0 flex items-center justify-center mix-blend-screen"
      style={{ color }}
      initial={{ x: burst, opacity: 0 }}
      animate={{ x: 0, opacity: 0.3 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <motion.span
        className={SIZE}
        animate={{ x: idleX, y: idleY }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

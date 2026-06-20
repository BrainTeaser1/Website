"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-navigation transition. Next re-mounts this on every route change, so each
 * page settles in with a soft fade + lift instead of a hard swap. No-op under
 * reduced-motion. Also doubles as a gentle first-load reveal.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

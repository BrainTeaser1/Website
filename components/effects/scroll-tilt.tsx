"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ContainerScroll-style reveal: the child starts tilted back in 3D and flattens
 * (rotateX → 0, scales up, fades in) as it scrolls into view. No-op under
 * reduced-motion. On phones, the per-scroll-frame 3D recompute is replaced by a
 * one-shot depth settle-in (preserves the depth cue without the scroll cost).
 */
export function ScrollTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.5, 0.9, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  // Mobile: depth-preserving settle-in, no continuous scroll-linked transforms.
  if (!desktop) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0.6, scale: 0.96, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, scale, opacity, transformOrigin: "center top", willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

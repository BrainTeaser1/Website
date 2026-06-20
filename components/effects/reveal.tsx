"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealTag = "div" | "section" | "article" | "li" | "span";
type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** stagger position — multiplies the delay */
  index?: number;
  as?: RevealTag;
  direction?: Direction;
}

const OFFSET = 26;
const offsetFor = (d: Direction) => ({
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
}[d]);

/**
 * Unified scroll-reveal: spring-based, directional, staggered via `index`.
 * Animates once when it enters view. No-op (content visible) under reduced-motion.
 * API matches the previous IntersectionObserver version.
 */
export function Reveal({ children, className, index = 0, as = "div", direction = "up" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
        delay: Math.min(index % 6, 5) * 0.08,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

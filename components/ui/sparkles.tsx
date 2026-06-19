"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  colors?: string[];
  /** lower divisor = denser */
  divisor?: number;
  cap?: number;
  maxR?: number;
  /** size to the parent element instead of the viewport */
  parent?: boolean;
}

const DEFAULT_COLORS = ["#2c46e6", "#3b6fff", "#22d3ee", "#7c5cff", "#a855f7"];

/** Native theme-colored particle field (SparklesCore equivalent). */
export function Sparkles({
  className,
  colors = DEFAULT_COLORS,
  divisor = 5200,
  cap = 380,
  maxR = 1.3,
  parent = false,
}: SparklesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0,
      h = 0,
      dpr = 1;
    let particles: {
      x: number;
      y: number;
      r: number;
      c: string;
      a: number;
      tw: number;
      dir: number;
      vy: number;
    }[] = [];

    const dims = (): [number, number] => {
      if (parent && canvas.parentElement) {
        const r = canvas.parentElement.getBoundingClientRect();
        return [r.width, r.height];
      }
      return [window.innerWidth, window.innerHeight];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const [cw, ch] = dims();
      w = canvas.width = Math.floor(cw * dpr);
      h = canvas.height = Math.floor(ch * dpr);
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      const count = Math.min(cap, Math.floor((cw * ch) / divisor));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * maxR + 0.3) * dpr,
        c: colors[(Math.random() * colors.length) | 0],
        a: Math.random(),
        tw: Math.random() * 0.025 + 0.004,
        dir: Math.random() > 0.5 ? 1 : -1,
        vy: (Math.random() * 0.12 + 0.02) * dpr,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.a += p.tw * p.dir;
        if (p.a > 1) {
          p.a = 1;
          p.dir = -1;
        }
        if (p.a < 0.05) {
          p.a = 0.05;
          p.dir = 1;
        }
        p.y -= p.vy;
        if (p.y < -2) {
          p.y = h + 2;
          p.x = Math.random() * w;
        }
        ctx.globalAlpha = p.a * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 6 * dpr;
        ctx.shadowColor = p.c;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) frame();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors, divisor, cap, maxR, parent]);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none", className)} />;
}

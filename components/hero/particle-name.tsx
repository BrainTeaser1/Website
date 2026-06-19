"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Vec {
  x: number;
  y: number;
}

const PALETTE = ["#3b6fff", "#6d5bff", "#a855f7", "#22d3ee", "#8b5cf6"];

class Particle {
  pos: Vec = { x: 0, y: 0 };
  vel: Vec = { x: 0, y: 0 };
  target: Vec = { x: 0, y: 0 };
  closeEnough = 110;
  maxSpeed = 7;
  maxForce = 1.4;
  isKilled = false;
  color = "#3b6fff";

  move() {
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    const dist = Math.hypot(dx, dy);
    const prox = dist < this.closeEnough ? dist / this.closeEnough : 1;
    let tx = dx,
      ty = dy;
    const m = Math.hypot(tx, ty);
    if (m > 0) {
      tx = (tx / m) * this.maxSpeed * prox;
      ty = (ty / m) * this.maxSpeed * prox;
    }
    let sx = tx - this.vel.x;
    let sy = ty - this.vel.y;
    const sm = Math.hypot(sx, sy);
    if (sm > this.maxForce) {
      sx = (sx / sm) * this.maxForce;
      sy = (sy / sm) * this.maxForce;
    }
    this.vel.x += sx;
    this.vel.y += sy;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, 2.6, 2.6);
  }

  kill(w: number, h: number) {
    if (this.isKilled) return;
    this.target = { x: Math.random() * w, y: h + 30 + Math.random() * 50 };
    this.isKilled = true;
  }
}

/**
 * Particle word-cycler — the immersive hero accent. Decorative only (the real
 * <h1> name lives in the hero). Short words form crisply and read big.
 * Reduced-motion / narrow screens get a clean static text fallback.
 */
export function ParticleWords({
  words = ["CLOUD", "AI", "AGENTIC", "FINOPS", "DATA"],
  className,
}: {
  words?: string[];
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.innerWidth >= 640) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let frame = 0;
    let wordIndex = 0;
    let raf = 0;
    const pixelSteps = 4;

    const size = () => {
      canvas.width = canvas.clientWidth || 520;
      canvas.height = canvas.clientHeight || 140;
    };

    const setWord = (word: string) => {
      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const octx = off.getContext("2d")!;
      let fontSize = Math.min(canvas.height * 0.92, (canvas.width * 1.5) / Math.max(word.length, 2));
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${fontSize}px Arial`;
      while (octx.measureText(word).width > canvas.width * 0.9 && fontSize > 12) {
        fontSize -= 2;
        octx.font = `900 ${fontSize}px Arial`;
      }
      octx.fillText(word, canvas.width / 2, canvas.height / 2);
      const data = octx.getImageData(0, 0, canvas.width, canvas.height).data;

      const base = PALETTE[(Math.random() * PALETTE.length) | 0];
      const coords: number[] = [];
      for (let i = 0; i < data.length; i += pixelSteps * 4) coords.push(i);
      for (let i = coords.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [coords[i], coords[j]] = [coords[j], coords[i]];
      }

      let pi = 0;
      for (const idx of coords) {
        if (data[idx + 3] < 10) continue;
        const x = (idx / 4) % canvas.width;
        const y = Math.floor(idx / 4 / canvas.width);
        let p: Particle;
        if (pi < particles.length) {
          p = particles[pi];
          p.isKilled = false;
        } else {
          p = new Particle();
          p.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
          p.maxSpeed = Math.random() * 3 + 6;
          p.maxForce = Math.random() * 0.8 + 1.0;
          particles.push(p);
        }
        p.color = base;
        p.target = { x, y };
        pi++;
      }
      for (let i = pi; i < particles.length; i++) particles[i].kill(canvas.width, canvas.height);
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.move();
        p.draw(ctx);
        if (p.isKilled && p.pos.y > canvas.height + 20) particles.splice(i, 1);
      }
      frame++;
      if (frame % 200 === 0) {
        wordIndex = (wordIndex + 1) % words.length;
        setWord(words[wordIndex]);
      }
      raf = requestAnimationFrame(tick);
    };

    size();
    setWord(words[0]);
    raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onResize = () => {
      size();
      particles = [];
      frame = 0;
      setWord(words[wordIndex]);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [enabled, words]);

  if (!enabled) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-x-3 text-4xl font-extrabold sm:text-5xl", className)}>
        {words.slice(0, 3).map((w) => (
          <span key={w} className="accent-gradient">
            {w}.
          </span>
        ))}
      </div>
    );
  }

  return <canvas ref={canvasRef} aria-hidden className={cn("h-[110px] w-full sm:h-[130px]", className)} />;
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * Animated 3D dotted wave (three.js), themed royal-blue → violet.
 * Performance-first: DPR capped, paused when the tab is hidden, and rendered
 * as a single static frame under prefers-reduced-motion.
 */
type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones: keep the effect, but lighten it — fewer points, DPR 1, no MSAA,
    // ~30fps. Desktop is unchanged.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const SEPARATION = 150;
    const AMOUNTX = isMobile ? 24 : 40;
    const AMOUNTY = isMobile ? 30 : 50;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 355, 1220);

    // WebGL may be unavailable (some browsers/devices, headless). Degrade
    // gracefully — the grid/orbs/sparkles still provide the backdrop — and
    // never let a failed context crash the page.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // geometry — color each point on a blue→violet ramp across the grid
    const positions: number[] = [];
    const colors: number[] = [];
    const c1 = new THREE.Color("#2c46e6"); // royal blue
    const c2 = new THREE.Color("#a855f7"); // violet
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
        );
        const t = (ix / AMOUNTX + iy / AMOUNTY) / 2;
        const col = c1.clone().lerp(c2, t);
        colors.push(col.r, col.g, col.b);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 9 : 7, // sparser grid → slightly larger dots keep the visual density
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    let count = 0;
    let animationId = 0;

    const renderFrame = () => {
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          arr[i * 3 + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // ~30fps cap on mobile (skip alternate frames); count steps faster so the
    // wave travels at the same visual speed despite fewer frames.
    const minDelta = isMobile ? 1000 / 30 : 0;
    const step = isMobile ? 0.2 : 0.1;
    let lastT = 0;
    const animate = (t = 0) => {
      animationId = requestAnimationFrame(animate);
      if (t - lastT < minDelta) return;
      lastT = t;
      renderFrame();
      count += step;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // pause animation when the tab is hidden (saves CPU/GPU + battery)
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else if (!reduce) {
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) renderFrame();
    else animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} aria-hidden className={cn("pointer-events-none fixed inset-0", className)} {...props} />;
}

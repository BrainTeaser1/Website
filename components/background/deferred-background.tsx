"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mounts its (expensive) children only AFTER the first paint + an idle tick, so
 * heavy WebGL/canvas init never competes with hydration and the entrance
 * animations — that contention is what made the page jitter for the first few
 * seconds. Children then fade in (CSS .bg-fade-in). Renders nothing on the
 * server and on the initial client render → no hydration mismatch; the layers
 * are decorative (aria-hidden) so there's nothing to see until they're ready.
 */
function useAfterPaintIdle(): boolean {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let idleId = 0;
    let timer = 0;
    let raf1 = 0;
    let raf2 = 0;
    const reveal = () => setShow(true);
    const schedule = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (typeof ric === "function") idleId = ric(reveal, { timeout: 1200 });
      else timer = window.setTimeout(reveal, 600);
    };
    // two rAFs ≈ wait for the first real paint before scheduling the heavy work
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(schedule);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timer) clearTimeout(timer);
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId && typeof cic === "function") cic(idleId);
    };
  }, []);
  return show;
}

export function DeferredLayer({ children }: { children: ReactNode }) {
  const show = useAfterPaintIdle();
  if (!show) return null;
  return <div className="bg-fade-in">{children}</div>;
}

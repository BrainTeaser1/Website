---
name: perf-audit
description: Measured performance & mobile-smoothness pass for the kr1shna.xyz Next.js site. Use when the site feels laggy/janky, before shipping effect-heavy changes, or for a mobile/responsiveness review. Profiles with Puppeteer, optimizes (doesn't remove) effects in tiers, and verifies no horizontal overflow.
---

# Performance & Mobile Audit

A disciplined, **measured, optimize-don't-remove** pass for this site. Read `@rules/performance.md`
first — it lists the specific traps already fixed; do not reintroduce them.

## 1. Build & serve a production build
`npm run build` then `npx next start -p <port>`. Always measure prod, never dev. The `.xyz` domain
is firewall-blocked on the work network — measure `localhost`.

## 2. Profile with Puppeteer (it's a devDependency)
Run scripts with `NODE_PATH` pointed at the project `node_modules`. Build small one-off scripts in
the scratchpad for:
- **Load jank** — `PerformanceObserver('longtask')` for ~4s after load (no scroll): count, total ms,
  settle time. Desktop (no throttle) + mobile (Pixel-5 viewport, 4× CPU throttle).
- **Idle-at-top FPS** — load, don't scroll, sample `requestAnimationFrame` intervals ~4s → avg FPS, p95 frame ms.
- **Idle main-thread cost** — CDP `Performance.getMetrics` delta over a 5s idle window (ScriptDuration/Task/Layout/Recalc per second).
- **Horizontal overflow sweep** — every route × {360, 393}px: assert `documentElement.scrollWidth <= clientWidth`; report the widest offending element.

**Critical caveat:** this sandbox has **no GPU** → headless WebGL is software-rendered and CDP
doesn't capture canvas raster/compositing. So headless reliably measures **main-thread/load** work
but **cannot** quantify GPU/compositing-bound effects (blurs, blend modes, WebGL fill). For those,
reason from first principles + confirm on a **real device** (the user's laptop/phone on mobile data).

## 3. Optimize in tiers (preserve visual identity)
For each expensive effect: **current → proposed → expected benefit → visual delta → confidence.**
1. Reduce density / resolution (DPR) / frame-rate / blur radius / draw calls; pause off-screen.
2. Simplified mobile variant that visually matches (gate via `matchMedia("(max-width:767px)")`).
3. Disable an individual feature only if measurement proves it's the sole option.
Keep a lever only if it meaningfully helps; revert it if the gain is marginal and the look degrades.
Isolate a region's cost by what exists *only* there (e.g. hero-only layers vs. the global background).

## 4. Verify & ship
- `npm run build` clean; re-run the overflow sweep (must PASS); reduced-motion still disables animation.
- Commit in small logical groups with the measured deltas in the message; `git push` (auto-deploys to Vercel).
- Ask the user to confirm on their real device; iterate one lever at a time if needed.

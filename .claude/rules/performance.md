# Performance Rules

Performance is a first-class requirement. The site is visually rich (WebGL background, particles,
glows, motion) so the budget is tight — every effect must earn its keep. Hard-won lessons:

## Principles
* **Optimize before removing.** Reduce density / resolution / frame-rate / blur radius / draw calls
  and pause off-screen work first. Only drop a feature if it's both expensive *and* low-value.
* **Measure, but know the tool's limits.** Headless Chromium here has **no GPU** (software WebGL), so
  it can't quantify GPU/compositing-bound effects — only main-thread (longtasks, CDM `ScriptDuration`).
  Use it for load/main-thread work; confirm GPU-bound smoothness on a real device. Reusable Puppeteer
  scripts live in the session scratchpad (load-jank, idle-FPS, idle main-thread, horizontal-overflow).
* **Mobile gets a lighter branch**, desktop keeps full quality — gate via `matchMedia("(max-width:767px)")`
  inside client effects (SSR renders the desktop-safe path → no hydration mismatch).

## Specific traps that have bitten this site (do not reintroduce)
* **No `mix-blend-mode` over an animating backdrop** (e.g. the WebGL canvas). It forces an
  uncacheable per-frame recomposite. (Killed the DisciplineGlitch lag.)
* **Never animate `transform: scale()` on a `filter: blur()` layer** — scaling re-rasterizes the blur
  every frame. Drift blurred layers with `translate` only. (Killed the Aurora lag.)
* **Don't stack many blurred, semi-transparent layers over the live WebGL** in one region. The compositor
  re-blends them every frame and can't cache. The hero became smooth only after removing its extra
  Aurora blobs (the global background orbs already supply ambient glow).
* **No perpetual per-frame JS animation for a barely-visible effect.** The glitch idle-drift ran forever
  for almost no payoff — keep discrete bursts (on word swap) instead of continuous tweens.
* **Defer heavy init past first paint.** WebGL/canvas init colliding with hydration caused multi-second
  load jitter. `DeferredLayer` (`components/background/deferred-background.tsx`) mounts the heavy layers
  after first paint + idle, fading them in. Keep new heavy effects behind it.
* **Avoid animating `background-position`** on full-viewport layers (repaints the whole layer every
  frame) — prefer a static layer or a transform-based pan.
* **Throttle the WebGL wave** (30fps mobile / 40fps desktop via a timestamp gate; advance the wave
  counter faster to keep visual speed) — full 60fps left no compositor headroom for periodic events.
* **Canvas `shadowBlur` per particle per frame is expensive** — keep it small and cap particle count.

## Always
* Honor `prefers-reduced-motion` (static fallback, no transforms) for every animation.
* No layout shift (CLS 0): use `svh`/`dvh` not `vh` for full-height heroes; `next/font` for fallback metrics.
* No horizontal overflow: `overflow-x-clip` on `main` clips decorative/absolute glows; wrap long
  strings (`break-words`) and large diagrams (`overflow-x-auto` + `min-w`).
* Verify with the Puppeteer overflow sweep (all routes × 360/393) before shipping layout changes.

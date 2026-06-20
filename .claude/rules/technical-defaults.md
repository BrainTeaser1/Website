# Technical Defaults

The site is a **built, deployed product** — not a single HTML file anymore. Match the existing stack:

* **Next.js 14 (App Router) + TypeScript** — `app/` routes, server components by default, `"use client"` only where needed.
* **Tailwind CSS v3 (config-based)** — design tokens live in `app/globals.css` (`:root` RGB triplets) + `tailwind.config.ts`; use `rgb(var(--x) / <alpha-value>)` utilities. No CDN.
* **framer-motion** for motion, **three.js** for the WebGL background, **lucide-react** icons, **cmdk** command menu, **class-variance-authority** + radix Slot for buttons.
* **Content lives in TypeScript** under `content/` behind a single access seam (`lib/content.ts`); site config in `lib/site.ts`. Add/edit content there, not in components. The "currently exploring" list (`content/data/exploring.ts`) is the easiest-to-update living snapshot.
* **Mobile-first**, semantic HTML, accessibility-conscious (real `<button>`/`<a>`, `aria-label`s, `prefers-reduced-motion` honored everywhere, ≥40px touch targets, 16px inputs to avoid iOS zoom, `viewport-fit=cover` + safe-area insets).
* **Deployment:** auto-deploys on `git push` to GitHub `BrainTeaser1/Website` → Vercel → `kr1shna.xyz`. Verify on mobile data (the work network firewall blocks the `.xyz`).
* **Placeholder assets** only where genuinely needed; prefer real content and SVG diagrams over stock images (the site has no raster `<img>` — keeps CLS at 0).

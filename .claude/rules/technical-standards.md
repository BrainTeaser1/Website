# Technical Standards

Use:

* TailwindCSS (config-based tokens)
* Responsive, mobile-first design
* Smooth scrolling + scroll-triggered reveals (framer-motion `whileInView` via the `Reveal` primitive)
* Hover/touch interactions (with `active:` feedback on touch)
* Modern, purposeful motion — **never scroll-jacking**, always `prefers-reduced-motion`-safe
* SVG architecture diagrams (the blueprint aesthetic) over generic cards

The final result should resemble a premium SaaS website adapted into a personal engineering brand.

**Performance is a hard requirement, not a nice-to-have** — see `@rules/performance.md`. Every new
effect must justify its continuous cost. The site targets 95+ Lighthouse and must stay smooth on a
mid-range laptop and phone. When motion and performance conflict, performance wins (tune it down, or
cut it) — but optimize before removing.

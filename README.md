# Krishna Shukla — Engineering Platform

A personal engineering platform (not a portfolio template) for **Krishna Shukla**, AI & Cloud Engineer.
Built as a premium, product-grade site with a royal-blue / violet identity, animated cloud-topology
visuals, and a Git-based content system.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens as CSS variables)
- Typed, Git-based content (no CMS/DB) behind a single access seam
- `cmdk` command menu, `lucide-react` icons, `class-variance-authority`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Project structure

```
app/            # routes: /, work, architecture, writing, about, now,
                # changelog, certifications, resume, contact (+ sitemap/robots/rss)
components/     # ui, layout, hero, sections, effects, background, content cards
content/        # typed content + data
  work.ts · architecture.ts · writing.ts
  data/         # certifications, now, changelog, experience, skills
lib/
  content.ts    # SINGLE content-access seam (swap to MDX/DB here later)
  site.ts       # name, role, socials, nav
  taxonomy.ts   # domains, writing types, labels
public/resume.pdf
tailwind.config.ts · app/globals.css   # design tokens + ported styles
```

## Adding content

All content is typed data — edit a file and it flows to the home page, index, detail
route, sitemap, and RSS automatically. No build config to touch.

- **Case study** → add a `CaseStudy` to [`content/work.ts`](content/work.ts)
- **Architecture blueprint** → add a `Blueprint` to [`content/architecture.ts`](content/architecture.ts)
- **Article** → add an `Article` to [`content/writing.ts`](content/writing.ts)
- **Certs / now / changelog / experience / skills** → [`content/data/`](content/data/)

Pages read only through [`lib/content.ts`](lib/content.ts), so migrating to Velite/MDX or a
backend later is a one-file change. Set `status: "draft"` to hide an entry from the build.

## Notes

- Content is realistic and sourced from the résumé; certifications are a **planned roadmap**,
  not claimed credentials.
- Effects respect `prefers-reduced-motion`; most of the page is server-rendered with a few
  small client islands (background, nav, reveal, command menu).
- `index.html` at the root is the original static design, kept for reference.

## Deploy

Optimized for **Vercel** (zero config). Update `url`, `email`, and `socials` in
[`lib/site.ts`](lib/site.ts) before going live.

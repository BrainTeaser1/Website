# Deploying the platform

The site is **already live at [kr1shna.xyz](https://kr1shna.xyz)** (Next.js 14 App Router on
**Vercel**). It's wired to GitHub `BrainTeaser1/Website`, so **every `git push` to `main`
auto-deploys** — day-to-day updates are just commits. The one-time setup below is done; it's kept
as reference.

## Day-to-day: ship an update

```bash
# edit content in content/ (typed data) or components, then:
git add -A
git commit -m "update: <what changed>"
git push
```

Vercel builds and ships automatically (~1 min). Branches/PRs get their own preview URLs.

> ⚠️ The `kr1shna.xyz` domain is **blocked on the Celebal work network** (corporate web filter flags
> the new `.xyz`). It's fine everywhere else — verify deploys on **mobile data** or a personal network,
> not the office Wi-Fi.

## Reference — one-time setup (already completed)

**GitHub + Vercel:** repo `BrainTeaser1/Website` is imported into Vercel (auto-detected Next.js,
default settings). Production = `main`.

**Custom domain (`kr1shna.xyz`, via Namecheap):** added in Vercel → Settings → Domains, with these
DNS records in Namecheap → Advanced DNS:

- `A` record, host `@` → `216.198.79.1`
- `CNAME` record, host `www` → `06ef5425f6ff6089.vercel-dns-017.com`

Apex `kr1shna.xyz` is primary; `www` redirects to it. SSL is auto-provisioned by Vercel.
`url` in [`lib/site.ts`](lib/site.ts) is set to `https://kr1shna.xyz` (drives canonical URLs, OG,
sitemap, RSS).

## Notes

- `public/resume.pdf` is the **full résumé** (restored from the original on request). If you ever
  want a privacy-scrubbed public version again, swap that file — it's the only thing served at `/resume.pdf`.
- The newsletter form is a local no-op until a provider is wired (see
  [`components/ui/newsletter-form.tsx`](components/ui/newsletter-form.tsx) — pass a Buttondown `endpoint`).
- Local dev: `npm run dev` → http://localhost:3000 · Production check: `npm run build && npm run start`.
- Performance is a hard requirement — see [`.claude/rules/performance.md`](.claude/rules/performance.md).

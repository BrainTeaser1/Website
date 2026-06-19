# Deploying the platform

The site is a standard Next.js 14 (App Router) app. It deploys to **Vercel** with zero config, and every `git push` redeploys it — so weekly updates are just commits.

## 1. Push to GitHub (one time)

A git repo + initial commit are already set up locally. Create an empty repo on GitHub (no README), then:

```bash
git remote add origin https://github.com/Brainteaser1/<repo-name>.git
git push -u origin main
```

## 2. Deploy on Vercel (one time)

1. Go to **vercel.com** and sign in with GitHub.
2. **Add New… → Project** → import the repo you just pushed.
3. Vercel auto-detects Next.js. Leave defaults. Click **Deploy**.
4. You're live at `https://<project>.vercel.app` — public, with free SSL.

## 3. Weekly updates

```bash
# edit content in content/ (typed data) or components, then:
git add -A
git commit -m "update: <what changed>"
git push
```

Vercel builds and ships it automatically. Pull requests/branches get their own preview URLs.

## 4. Custom domain (when you want one)

**Free now:** the `*.vercel.app` URL already works for everyone.

**Cheap real domain:** Porkbun / Cloudflare Registrar / Namecheap. A `.xyz` or `.site` is ~$1–3 the first year; `.dev` ~$12/yr; Cloudflare sells at cost. Possibly **free** via the GitHub Student Developer Pack (a `.me` for a year, or `.tech`).

**Attach it:**
1. Vercel → Project → **Settings → Domains** → add your domain.
2. At your registrar, set the DNS records Vercel shows:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`
3. SSL provisions automatically in a few minutes.
4. Update `url` in [`lib/site.ts`](lib/site.ts) to the final domain (drives canonical URLs, OG images, sitemap, RSS), then `git push`.

## Notes

- `public/resume.pdf` is a **scrubbed** résumé (email + links only, no phone/location). The full `My_Resume.pdf` is gitignored and never published.
- The newsletter form is a local no-op until a provider is wired (see `components/ui/newsletter-form.tsx` — pass a Buttondown `endpoint`).
- Local: `npm run dev` → http://localhost:3000 · Production check: `npm run build && npm run start`.

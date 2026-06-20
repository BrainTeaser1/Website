import Link from "next/link";
import { site, footerNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line/60">
      <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-violet text-sm font-black">
            K
          </span>
          <span className="text-sm text-sub">
            © {new Date().getFullYear()} {site.name} — AI · Cloud · Data
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-sub" aria-label="Footer">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
          <a href="#top" className="transition hover:text-ink">
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { nav, site } from "@/lib/site";
import { LiquidButton } from "@/components/ui/liquid-button";
import { CommandMenu } from "@/components/layout/command-menu";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [hl, setHl] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const activeHref = nav.find((n) => isActive(n.href))?.href;

  const moveTo = (href?: string) => {
    const el = href ? linkRefs.current[href] : null;
    if (!el) {
      setHl((h) => ({ ...h, opacity: 0 }));
      return;
    }
    setHl({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  // snap to active link on route change + resize
  useEffect(() => {
    moveTo(activeHref);
    const onResize = () => moveTo(activeHref);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 nav-blur",
          scrolled && "nav-scrolled",
        )}
      >
        <nav className="container-page flex h-[68px] items-center justify-between gap-4" aria-label="Primary">
          {/* logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet text-sm font-black shadow-[0_0_22px_rgb(44_70_230_/_0.55)] transition-transform duration-300 group-hover:scale-105">
              K
              <span className="absolute -inset-1 -z-10 rounded-xl bg-accent/30 blur-md" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight">{site.name}</span>
              <span className="mt-1 font-mono text-[10px] tracking-[0.18em] text-sub">
                AI · CLOUD · DATA
              </span>
            </span>
          </Link>

          {/* center pill */}
          <div
            ref={pillRef}
            className="nav-pill relative hidden items-center text-sm lg:flex"
            onMouseLeave={() => moveTo(activeHref)}
          >
            <span
              className="nav-hl"
              style={{ left: hl.left, width: hl.width, opacity: hl.opacity }}
              aria-hidden
            />
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[item.href] = el;
                }}
                data-active={isActive(item.href)}
                onMouseEnter={() => moveTo(item.href)}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* right cluster */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCmdOpen(true)}
              aria-label="Open command menu"
              className="chip hidden h-9 items-center gap-2 rounded-lg px-3 text-xs text-sub transition hover:text-ink sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="font-mono">⌘K</span>
            </button>
            <LiquidButton asChild size="md" className="hidden sm:inline-flex">
              <Link href="/contact">Get in touch</Link>
            </LiquidButton>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="chip grid h-10 w-10 place-items-center rounded-lg text-sub transition hover:text-ink lg:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        <span className="nav-seam" style={{ opacity: scrolled ? 1 : 0 }} aria-hidden />

        {/* mobile menu */}
        {mobileOpen && (
          <div className="border-t border-line/60 bg-base/95 backdrop-blur-xl lg:hidden">
            <div className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition",
                    isActive(item.href) ? "bg-accent/15 text-ink" : "text-sub hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-lg bg-gradient-to-r from-accent to-violet px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get in touch
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* backdrop for the mobile drawer (below the header z-50, above the page) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}

      <CommandMenu open={cmdOpen} setOpen={setCmdOpen} />
    </>
  );
}

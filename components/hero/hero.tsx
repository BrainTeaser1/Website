import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Socials } from "@/components/ui/socials";
import { DisciplineGlitch } from "@/components/hero/discipline-glitch";

export function Hero() {
  return (
    <header className="relative flex min-h-[88svh] items-center justify-center overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28">
      {/* ambient glow comes from the global background orbs; no extra hero-only
          blurred layers here — three blurred blobs re-composited over the live
          WebGL canvas every frame were the hero's lag source. */}
      <div className="absolute inset-0 grid-bg grid-fade" />

      <div className="container-page relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal index={1}>
            <h1 className="text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="text-gradient">Krishna Shukla</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <DisciplineGlitch className="mx-auto mt-4 max-w-xl" />
          </Reveal>

          <Reveal index={3}>
            <p className="mx-auto mt-5 max-w-2xl text-xl font-medium leading-snug text-ink/90 sm:text-2xl">
              Building <span className="shimmer-text font-semibold">cloud, AI, and data systems</span> while
              figuring out how they actually work.
            </p>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <LiquidButton asChild>
                <Link href="/work">See what I&apos;ve built</Link>
              </LiquidButton>
              <LiquidButton asChild variant="ghost">
                <Link href="/architecture">How I design it</Link>
              </LiquidButton>
            </div>
          </Reveal>

          <Reveal index={5}>
            <div className="mt-9 flex justify-center">
              <Socials />
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#mission"
        aria-label="Scroll to trajectory"
        className="absolute bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-sub/70 transition hover:text-ink"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </header>
  );
}

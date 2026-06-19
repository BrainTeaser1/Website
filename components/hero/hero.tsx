import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/effects/reveal";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Socials } from "@/components/ui/socials";
import { ParticleWords } from "@/components/hero/particle-name";

export function Hero() {
  return (
    <header className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-20 pt-28">
      {/* centered spotlight + glows behind the name */}
      <div className="glow absolute left-1/2 top-1/3 h-[460px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 animate-pulseGlow" />
      <div className="glow absolute left-[38%] top-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-violet/20" />
      <div className="glow absolute left-[62%] top-[42%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan/12" />
      <div className="absolute inset-0 grid-bg grid-fade" />

      <div className="container-page relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <div className="chip mb-8 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-sub">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              <span className="font-mono tracking-wider">AI &amp; CLOUD ENGINEER</span>
            </div>
          </Reveal>

          <Reveal index={1}>
            <h1 className="text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="text-gradient">Krishna Shukla</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <ParticleWords className="mx-auto mt-4 max-w-xl" />
          </Reveal>

          <Reveal index={3}>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-snug text-sub sm:text-2xl">
              <span className="font-semibold text-accent">Learning</span>,{" "}
              <span className="font-semibold text-accent">building</span>, and{" "}
              <span className="font-semibold text-accent">documenting</span> the journey to{" "}
              <span className="accent-gradient font-semibold">Cloud &amp; AI Architecture</span>.
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

      {/* scroll cue */}
      <Link
        href="#mission"
        aria-label="Scroll to trajectory"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-sub/70 transition hover:text-ink"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </Link>
    </header>
  );
}

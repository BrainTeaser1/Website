import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Socials } from "@/components/ui/socials";
import { MetricStat } from "@/components/ui/stat";
import { CloudTopology } from "@/components/hero/cloud-topology";
import { ParticleWords } from "@/components/hero/particle-name";
import { Parallax } from "@/components/effects/parallax";

const heroMetrics = [
  { label: "Clouds", value: "3" },
  { label: "AI Systems", value: "Agentic" },
  { label: "Analytics", value: "FinOps" },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden pb-24 pt-32 sm:pt-36">
      {/* hero-local glows */}
      <div className="glow absolute -top-24 left-1/2 h-[440px] w-[740px] -translate-x-1/2 rounded-full bg-accent/30 animate-pulseGlow" />
      <div className="glow absolute -left-24 top-32 h-[360px] w-[360px] rounded-full bg-violet/25" />
      <div className="glow absolute -right-24 top-24 h-[360px] w-[360px] rounded-full bg-accent2/20" />
      <div className="absolute inset-0 grid-bg grid-fade" />
      {/* ambient shapes */}
      <div className="eshape in" style={{ ["--r" as string]: "12deg", left: "-6%", top: "18%", width: 480, height: 120, transform: "rotate(12deg)", background: "linear-gradient(90deg, rgb(44 70 230 / 0.12), transparent)" }} />
      <div className="eshape in" style={{ ["--r" as string]: "-15deg", right: "-4%", top: "60%", width: 380, height: 100, transform: "rotate(-15deg)", background: "linear-gradient(90deg, rgb(168 85 247 / 0.12), transparent)", animationDuration: "18s" }} />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* left copy */}
          <div>
            <Reveal>
              <div className="chip mb-7 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-sub">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                <span className="font-mono">Engineering toward Cloud &amp; AI Architect</span>
              </div>
            </Reveal>

            <Reveal index={1}>
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="text-gradient">Krishna Shukla</span>
              </h1>
            </Reveal>

            <Reveal index={2}>
              <ParticleWords className="mb-5 mt-3" />
            </Reveal>

            <Reveal index={4}>
              <p className="mb-9 max-w-md text-lg leading-relaxed text-sub">
                I build AI systems, cloud infrastructure, and data platforms on Azure, AWS, and
                Databricks. This is where I write about how I build them.
              </p>
            </Reveal>

            <Reveal index={5}>
              <div className="mb-10 flex flex-wrap items-center gap-4">
                <LiquidButton asChild>
                  <Link href="/work">View my work</Link>
                </LiquidButton>
                <LiquidButton asChild variant="ghost">
                  <Link href="/architecture">Explore the architecture</Link>
                </LiquidButton>
              </div>
            </Reveal>

            <Reveal index={6}>
              <Socials />
            </Reveal>
          </div>

          {/* right centerpiece */}
          <Reveal className="relative">
            <Parallax speed={28}>
              <CloudTopology />
            </Parallax>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {heroMetrics.map((m) => (
                <MetricStat key={m.label} {...m} />
              ))}
            </div>
            <div className="glow absolute -inset-6 -z-10 rounded-full bg-accent/15" />
          </Reveal>
        </div>
      </div>
    </header>
  );
}

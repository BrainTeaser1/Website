import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Sparkles } from "@/components/ui/sparkles";
import { site } from "@/lib/site";

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-36 flow-top">
      <div className="absolute inset-0 grid-bg grid-fade" />
      <Sparkles className="absolute inset-0 h-full w-full opacity-80" parent divisor={6500} cap={120} maxR={1.1} />
      <div className="glow absolute left-1/2 top-1/2 h-[380px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 animate-pulseGlow" />
      <div className="glow absolute bottom-0 left-1/4 h-[260px] w-[360px] rounded-full bg-cyan/10" />
      <div className="glow absolute right-1/4 top-10 h-[260px] w-[360px] rounded-full bg-violet/15" />

      <div className="container-page relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-5 font-mono text-xs tracking-widest text-accent">// CONTACT</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Get in touch
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mx-auto mb-10 max-w-xl text-lg text-sub">
            I'm open to AI and cloud engineering roles, and to interesting systems work. Email is the
            fastest way to reach me.
          </p>
        </Reveal>
        <Reveal index={3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LiquidButton asChild size="xl">
              <a href={`mailto:${site.email}`}>Start a conversation</a>
            </LiquidButton>
            <LiquidButton asChild variant="ghost" size="xl">
              <Link href="/resume">View résumé</Link>
            </LiquidButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/primitives/section";
import { Reveal } from "@/components/effects/reveal";
import { StatusBadge } from "@/components/ui/badge";
import { certifications } from "@/content/data/certifications";
import { education } from "@/content/data/experience";

export function CertificationsStrip() {
  const edu = education[0];
  return (
    <Section id="certs" className="py-20 sm:py-24">
      <div className="container-page relative">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-widest text-accent">// CREDENTIALS</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Foundation &amp; roadmap</h2>
          </div>
          <p className="max-w-xs text-sm text-sub">
            A computer science degree, and the certifications I'm working toward as the cloud and AI work grows.
          </p>
        </Reveal>

        <Reveal className="card flex flex-col divide-y divide-line/60 overflow-hidden rounded-2xl md:flex-row md:divide-x md:divide-y-0">
          {/* education first — the earned credential */}
          <Link href="/certifications" className="flex flex-1 items-center gap-4 p-6 transition hover:bg-white/[0.02]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-bold leading-snug">{edu.degree}</div>
              <div className="mt-1 font-mono text-[11px] text-sub">{edu.school.split(" · ")[0]} · {edu.detail}</div>
            </div>
          </Link>
          {certifications.map((c) => (
            <Link
              key={c.code}
              href="/certifications"
              className="flex flex-1 items-center gap-4 p-6 transition hover:bg-white/[0.02]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface2 font-mono text-xs font-bold text-sub">
                {c.code.split("-")[0].slice(0, 3)}
              </span>
              <div>
                <div className="text-sm font-bold leading-snug">{c.name}</div>
                <div className="mt-1 font-mono text-[11px] text-sub">
                  {c.code} · <StatusBadge status={c.status} />
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

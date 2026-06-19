import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Tag } from "@/components/ui/chip";
import { StatusBadge } from "@/components/ui/badge";
import { experience, education } from "@/content/data/experience";
import { certifications } from "@/content/data/certifications";
import { skillDomains } from "@/content/data/skills";

export const metadata: Metadata = {
  title: "Resume",
  description: "Krishna Shukla, AI & Cloud Engineer. Experience, education, and core stack.",
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line/60 py-8">
      <h2 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-accent">{title}</h2>
      {children}
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <PageHeader eyebrow="// RESUME" title="Krishna Shukla" description="AI & Cloud Engineer. The short version is below; the PDF has the full detail.">
        <div className="mt-7">
          <LiquidButton asChild>
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </LiquidButton>
        </div>
      </PageHeader>

      <div className="container-page relative max-w-3xl pb-28">
        <Reveal>
          <Block title="Experience">
            <div className="space-y-8">
              {experience.map((r) => (
                <div key={r.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold">{r.title}</h3>
                    <span className="font-mono text-xs text-sub">{r.period.toUpperCase()}</span>
                  </div>
                  <div className="text-sm font-medium text-accent">{r.org}</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-sub">{r.body}</p>
                </div>
              ))}
            </div>
          </Block>
        </Reveal>

        <Reveal>
          <Block title="Education">
            {education.map((e) => (
              <div key={e.school} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[15px]">
                  <span className="font-semibold">{e.degree}</span>{" "}
                  <span className="font-mono text-xs text-sub">· {e.school} · {e.detail}</span>
                </span>
                <span className="font-mono text-xs text-sub">{e.period}</span>
              </div>
            ))}
          </Block>
        </Reveal>

        <Reveal>
          <Block title="Certification roadmap">
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.code} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[15px]">
                    <span className="font-semibold">{c.name}</span>{" "}
                    <span className="font-mono text-xs text-sub">({c.code} · {c.issuer})</span>
                  </span>
                  <StatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        <Reveal>
          <Block title="Core stack">
            <div className="space-y-4">
              {skillDomains.map((d) => (
                <div key={d.key} className="flex flex-wrap items-center gap-2">
                  <span className="w-20 shrink-0 font-mono text-xs" style={{ color: d.color }}>{d.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {d.items.map((it) => (
                      <Tag key={it}>{it}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Reveal>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { StatusBadge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { DOMAIN_LABEL, type Domain } from "@/lib/taxonomy";
import { certifications } from "@/content/data/certifications";
import { education } from "@/content/data/experience";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Education and the certification roadmap across Azure, Databricks, and AI engineering.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="// CREDENTIALS"
        title="Education & roadmap"
        description="My degree, and the certifications I'm working toward as the cloud and AI work grows."
      />
      <section className="container-page relative space-y-12 pb-28">
        {/* education — the earned credential */}
        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-accent">Education</h2>
          <div className="grid gap-5">
            {education.map((e, i) => (
              <Reveal key={e.school} index={i}>
                <div className="card rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold">{e.degree}</h3>
                    <span className="font-mono text-xs text-sub">{e.period}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-accent">{e.school}</div>
                  <div className="mt-2 font-mono text-xs text-sub">{e.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-widest text-accent">
            Certification roadmap
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.code} index={i}>
              <div className="card card-hover flex h-full items-start gap-5 rounded-2xl p-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent/15 font-mono text-sm font-bold text-accent">
                  {c.code.split("-")[0].slice(0, 3)}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold leading-snug">{c.name}</h3>
                  <p className="mt-1 font-mono text-xs text-sub">
                    {c.code} · {c.issuer}
                    {c.issuedAt ? ` · ${c.issuedAt}` : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={c.status} />
                    {c.domain.map((d) => (
                      <Chip key={d}>{DOMAIN_LABEL[d as Domain] ?? d}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}

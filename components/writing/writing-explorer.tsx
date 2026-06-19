"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/content/types";
import { TYPE_LABEL, DOMAIN_LABEL, type WritingType, type Domain } from "@/lib/taxonomy";
import { ArticleCard } from "@/components/writing/article-card";
import { cn } from "@/lib/utils";

export function WritingExplorer({ articles }: { articles: Article[] }) {
  const [type, setType] = useState<WritingType | "all">("all");
  const [domain, setDomain] = useState<Domain | "all">("all");

  const types = useMemo(
    () => Array.from(new Set(articles.map((a) => a.type))),
    [articles],
  );
  const domains = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.domain))),
    [articles],
  );

  const filtered = articles.filter(
    (a) => (type === "all" || a.type === type) && (domain === "all" || a.domain.includes(domain)),
  );

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 font-mono text-xs transition",
      active ? "bg-accent/20 text-ink ring-1 ring-accent/40" : "chip text-sub hover:text-ink",
    );

  return (
    <div>
      <div className="mb-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-sub">Type</span>
          <button onClick={() => setType("all")} className={pill(type === "all")}>All</button>
          {types.map((t) => (
            <button key={t} onClick={() => setType(t)} className={pill(type === t)}>
              {TYPE_LABEL[t]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-sub">Domain</span>
          <button onClick={() => setDomain("all")} className={pill(domain === "all")}>All</button>
          {domains.map((d) => (
            <button key={d} onClick={() => setDomain(d)} className={pill(domain === d)}>
              {DOMAIN_LABEL[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}

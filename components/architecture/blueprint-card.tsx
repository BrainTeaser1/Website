import Link from "next/link";
import type { Blueprint } from "@/content/types";
import { StatusBadge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/chip";
import { BlueprintFigure } from "@/components/architecture/blueprint-figure";

export function BlueprintCard({ blueprint, variant = 0 }: { blueprint: Blueprint; variant?: number }) {
  return (
    <Link
      href={`/architecture/${blueprint.slug}`}
      className="card card-hover group flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="blueprint relative h-32 overflow-hidden border-b border-line/60">
        <BlueprintFigure variant={variant} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <StatusBadge status={blueprint.maturity} />
          <span className="font-mono text-[10px] text-sub/70">blueprint</span>
        </div>
        <h3 className="text-lg font-bold leading-snug">{blueprint.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sub">{blueprint.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blueprint.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

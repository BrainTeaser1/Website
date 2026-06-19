import Link from "next/link";
import type { Article } from "@/content/types";
import { TYPE_LABEL } from "@/lib/taxonomy";
import { Tag } from "@/components/ui/chip";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/writing/${article.slug}`} className="card card-hover group block rounded-2xl p-7">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs text-sub">
        <span className="text-accent">{TYPE_LABEL[article.type]}</span>
        <span className="text-line">·</span>
        <span>{formatDate(article.publishedAt)}</span>
        <span className="text-line">·</span>
        <span>{article.readingTime} min</span>
      </div>
      <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-accent">
        {article.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-sub">{article.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}

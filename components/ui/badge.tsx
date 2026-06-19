import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  certified: "text-cyan",
  "in-progress": "text-violet",
  planned: "text-sub",
  reviewed: "text-cyan",
  production: "text-cyan",
  concept: "text-violet",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-wider", tones[status] ?? "text-sub")}>
      {status === "certified" || status === "production" ? "● " : ""}
      {status.replace("-", " ")}
    </span>
  );
}

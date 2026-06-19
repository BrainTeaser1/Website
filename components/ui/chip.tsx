import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
  mono = true,
}: {
  children: ReactNode;
  className?: string;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "chip inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-sub",
        mono && "font-mono",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="chip rounded px-2 py-0.5 font-mono text-[10px] text-sub">{children}</span>
  );
}

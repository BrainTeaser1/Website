import { cn } from "@/lib/utils";

/**
 * Aurora light field — soft, slowly drifting gradient blobs behind the hero.
 * Pure CSS (no JS), masked + low-opacity so it reads as ambient light, not a
 * graphic. Frozen under reduced-motion (see globals).
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{
        maskImage: "radial-gradient(ellipse 75% 60% at 50% 45%, #000 35%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 45%, #000 35%, transparent 80%)",
      }}
    >
      <div
        className="aurora-blob absolute left-[18%] top-[22%] h-[300px] w-[300px] rounded-full opacity-50 sm:h-[460px] sm:w-[460px]"
        style={{ background: "radial-gradient(circle, rgb(44 70 230 / 0.55), transparent 60%)", filter: "blur(70px)" }}
      />
      <div
        className="aurora-blob absolute right-[16%] top-[16%] h-[280px] w-[280px] rounded-full opacity-45 sm:h-[420px] sm:w-[420px]"
        style={{ background: "radial-gradient(circle, rgb(168 85 247 / 0.5), transparent 60%)", filter: "blur(70px)", animationDelay: "-7s", animationDuration: "26s" }}
      />
      <div
        className="aurora-blob absolute left-1/2 top-[42%] h-[260px] w-[340px] -translate-x-1/2 rounded-full opacity-35 sm:h-[380px] sm:w-[520px]"
        style={{ background: "radial-gradient(circle, rgb(34 211 238 / 0.42), transparent 60%)", filter: "blur(80px)", animationDelay: "-14s", animationDuration: "30s" }}
      />
    </div>
  );
}

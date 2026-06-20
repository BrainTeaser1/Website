import { Sparkles } from "@/components/ui/sparkles";
import { DottedSurface } from "@/components/background/dotted-surface";
import { DeferredLayer } from "@/components/background/deferred-background";

/**
 * Fixed, full-page ambient layer mounted ONCE in the root layout (outside
 * {children}). Layering, back to front: 3D dotted wave → grid → orbs → sparkles.
 * Sparkles are kept light so the WebGL surface reads as the primary depth cue.
 */
export function GlobalBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* 3D depth layer — deferred past first paint so its WebGL init doesn't
          jank the initial load; fades in once the page is settled */}
      <DeferredLayer>
        <DottedSurface className="-z-10 opacity-[0.55]" />
      </DeferredLayer>
      {/* faint architectural grid — static (animating background-position repainted
          the whole full-viewport layer every frame for a barely-visible 40s pan) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(120 130 180 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(120 130 180 / 0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, #000 50%, transparent 100%)",
        }}
      />
      {/* ambient orbs */}
      <div className="glow absolute -top-[8%] left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/20" />
      <div className="glow absolute top-[50%] -left-[12%] h-[460px] w-[480px] rounded-full bg-violet/15" />
      <div className="glow absolute top-[120%] -right-[8%] h-[420px] w-[480px] rounded-full bg-cyan/10" />
      <div className="glow absolute top-[185%] left-[38%] h-[460px] w-[560px] rounded-full bg-accent2/12" />
      {/* sparkles — lightened so it complements rather than competes with the 3D layer */}
      <DeferredLayer>
        <Sparkles className="absolute inset-0 h-full w-full" divisor={11000} cap={140} maxR={1.2} />
      </DeferredLayer>
    </div>
  );
}

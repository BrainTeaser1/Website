/**
 * Polished, abstract brand visual for the hero — a glowing monogram core with
 * slow-rotating rings and orbiting accent dots. CSS-only; rings freeze under
 * reduced-motion (see globals). Replaces the old abstract "system map".
 */
export function BrandOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* ambient halo */}
      <div className="glow absolute inset-6 rounded-full bg-accent/25 animate-pulseGlow" />
      <div className="glow absolute inset-16 rounded-full bg-violet/20" />

      {/* outer ring + orbiting dot */}
      <div className="orb-ring absolute inset-2 rounded-full border border-line/70 [border-style:dashed]">
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_14px_rgb(34_211_238_/_0.8)]" />
      </div>

      {/* mid ring (reverse) + orbiting dot */}
      <div className="orb-ring-rev absolute inset-[18%] rounded-full border border-accent/30">
        <span className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_12px_rgb(168_85_247_/_0.85)]" />
      </div>

      {/* inner ring */}
      <div className="orb-ring absolute inset-[32%] rounded-full border border-violet/25 [border-style:dotted]" />

      {/* core */}
      <div className="absolute inset-[40%] grid place-items-center rounded-full bg-gradient-to-br from-accent via-sky to-violet shadow-[0_0_60px_-8px_rgb(44_70_230_/_0.7)]">
        <span className="text-4xl font-black text-white drop-shadow sm:text-5xl">K</span>
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
      </div>

      {/* the things it's built from — understated, not a diagram */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wider text-sub">
        Azure · AWS · Databricks · Agents
      </div>
    </div>
  );
}

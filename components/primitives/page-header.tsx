import { type ReactNode } from "react";
import { Reveal } from "@/components/effects/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden pb-12 pt-36">
      <div className="glow absolute -top-24 left-1/3 h-[320px] w-[560px] rounded-full bg-accent/20" />
      <div className="absolute inset-0 grid-bg grid-fade" />
      <div className="container-page relative">
        <Reveal className="max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-widest text-accent">{eyebrow}</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sub">{description}</p>}
          {children}
        </Reveal>
      </div>
    </header>
  );
}

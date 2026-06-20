import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/effects/reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
  flow,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  flow?: "top" | "bottom" | "both";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-24 lg:py-28",
        flow === "top" && "flow-top overflow-hidden",
        flow === "bottom" && "flow-bottom overflow-hidden",
        flow === "both" && "flow-top flow-bottom overflow-hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-widest text-accent", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-8 max-w-2xl sm:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-sub">{description}</p>
      )}
    </Reveal>
  );
}

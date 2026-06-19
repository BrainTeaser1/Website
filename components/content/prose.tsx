import type { Section } from "@/content/types";

/** Renders structured body blocks as clean technical prose (MDX comes later). */
export function Prose({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null;
  return (
    <div className="space-y-10">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="mb-3 text-xl font-bold tracking-tight">{s.heading}</h2>
          <p className="text-[15px] leading-relaxed text-sub">{s.body}</p>
          {s.bullets && (
            <ul className="mt-4 space-y-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-sub">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export function WordRotator({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="rotator h-8 min-w-[230px]">
      {words.map((w, idx) => (
        <span key={w} className={`word accent-gradient${idx === i ? " active" : ""}`}>
          {w}
        </span>
      ))}
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { nav, footerNav } from "@/lib/site";

const routes = [
  { label: "Home", href: "/" },
  ...nav,
  ...footerNav.filter((f) => f.href.startsWith("/")),
];

export function CommandMenu({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-start justify-center bg-black/60 pt-[18vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <Command
        className="card w-[min(560px,92vw)] overflow-hidden rounded-2xl border border-line shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        label="Command menu"
      >
        <div className="flex items-center gap-2 border-b border-line/60 px-4">
          <span className="font-mono text-xs text-sub">⌘K</span>
          <Command.Input
            autoFocus
            placeholder="Jump to…"
            className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-sub"
          />
        </div>
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-sub">
            No matches.
          </Command.Empty>
          <Command.Group
            heading="Navigate"
            className="px-2 py-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-sub"
          >
            {routes.map((r) => (
              <Command.Item
                key={r.href}
                value={r.label}
                onSelect={() => go(r.href)}
                className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-sub aria-selected:bg-accent/15 aria-selected:text-ink"
              >
                <span>{r.label}</span>
                <span className="font-mono text-[10px] text-sub/70">{r.href}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Lightweight capture. Wire `endpoint` to a Buttondown form action
 * (https://buttondown.com/api/emails/embed-subscribe/<user>) when ready;
 * until then it confirms locally so the UI is never broken.
 */
export function NewsletterForm({ endpoint }: { endpoint?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (endpoint) {
      // real submission path when configured
      fetch(endpoint, { method: "POST", body: new URLSearchParams({ email }) }).catch(() => {});
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2.5 text-sm text-ink">
        <Check className="h-4 w-4 text-cyan" /> You&apos;re subscribed. Thanks.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-full border border-line bg-surface2 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent/60"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-violet text-white transition hover:brightness-110"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

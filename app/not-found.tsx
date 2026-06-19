import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-40 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">404 · NOT FOUND</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">
        <span className="accent-gradient">Page not found</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-sub">
        That page doesn&apos;t exist. Head back to the home page.
      </p>
      <div className="mt-8">
        <LiquidButton asChild>
          <Link href="/">Back to home</Link>
        </LiquidButton>
      </div>
    </div>
  );
}

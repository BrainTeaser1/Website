import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { GlobalBackground } from "@/components/background/global-background";
import { LiquidGlassFilter } from "@/components/background/liquid-glass-filter";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/effects/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // extend under iOS notch / Dynamic Island; enables env(safe-area-inset-*)
  themeColor: "#050a16", // matches --base so the mobile browser chrome blends with the page
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="overflow-x-hidden font-sans text-ink antialiased">
        <GlobalBackground />
        <LiquidGlassFilter />
        <ScrollProgress />
        <SiteNav />
        <main id="top" className="relative overflow-x-clip">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

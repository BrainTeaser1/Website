import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getWork, getBlueprints, getWriting } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/work",
    "/architecture",
    "/writing",
    "/about",
    "/certifications",
    "/now",
    "/changelog",
    "/resume",
    "/contact",
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  const dynamic = [
    ...getWork().map((w) => `/work/${w.slug}`),
    ...getBlueprints().map((b) => `/architecture/${b.slug}`),
    ...getWriting().map((a) => `/writing/${a.slug}`),
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  return [...staticRoutes, ...dynamic];
}

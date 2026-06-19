import { site } from "@/lib/site";
import { getWriting } from "@/lib/content";

export const dynamic = "force-static";

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const items = getWriting()
    .map(
      (a) => `    <item>
      <title>${escape(a.title)}</title>
      <link>${site.url}/writing/${a.slug}</link>
      <guid>${site.url}/writing/${a.slug}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <description>${escape(a.summary)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)} — Writing</title>
    <link>${site.url}/writing</link>
    <description>${escape(site.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}

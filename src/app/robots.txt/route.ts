import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const rawValue = process.env.ALLOW_INDEXING;
  const isIndexingAllowed = rawValue === "true";

  const debugHeaders: Record<string, string> = {
    "Content-Type": "text/plain",
    "X-Debug-Allow-Indexing": String(rawValue ?? "undefined"),
    "X-Debug-Result": String(isIndexingAllowed),
  };

  if (!isIndexingAllowed) {
    const body = `User-Agent: *\nDisallow: /\n`;
    return new NextResponse(body, { headers: debugHeaders });
  }

  const body = `User-Agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://ai.wojtek-gorecki.de/sitemap.xml\n`;
  return new NextResponse(body, { headers: debugHeaders });
}

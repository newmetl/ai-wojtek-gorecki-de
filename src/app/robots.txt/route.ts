import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const isIndexingAllowed = process.env.ALLOW_INDEXING === "true";

  if (!isIndexingAllowed) {
    const body = `User-Agent: *\nDisallow: /\n`;
    return new NextResponse(body, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  const body = `User-Agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://ai.wojtek-gorecki.de/sitemap.xml\n`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" },
  });
}

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { runFullScrape } from "@/lib/scraping";

function unauthorized() {
  return Response.json(
    { success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } },
    { status: 401 }
  );
}

/**
 * GET /api/admin/scraping/trigger
 * Gibt den letzten ScrapingLog-Eintrag zurück.
 */
export async function GET(request: NextRequest) {
  void request;
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  const lastLog = await db.scrapingLog.findFirst({
    orderBy: { runAt: "desc" },
  });

  return Response.json({
    success: true,
    data: lastLog
      ? {
          status: lastLog.status,
          runAt: lastLog.runAt,
          itemsFound: lastLog.itemsFound,
          itemsNew: lastLog.itemsNew,
          itemsUpdated: lastLog.itemsUpdated,
          durationMs: lastLog.durationMs,
          errorMessage: lastLog.errorMessage,
          source: lastLog.source,
        }
      : null,
  });
}

/**
 * POST /api/admin/scraping/trigger
 * Startet das Scraping im Hintergrund (fire-and-forget).
 * Gibt sofort { status: "started" } zurück.
 */
export async function POST(request: NextRequest) {
  void request;
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  // Prüfen ob bereits ein Scraping läuft
  const runningLog = await db.scrapingLog.findFirst({
    where: { status: "running" },
    orderBy: { runAt: "desc" },
  });

  if (runningLog) {
    return Response.json({
      success: false,
      error: { code: "ALREADY_RUNNING", message: "Scraping läuft bereits" },
    });
  }

  // Fire-and-forget: Im Hintergrund starten, nicht awaiten
  // (Funktioniert auf VPS/Docker da Next.js als dauerhafter Prozess läuft)
  runFullScrape().catch((err) => {
    console.error("[trigger] Scraping-Fehler:", err);
  });

  return Response.json({ success: true, data: { status: "started" } });
}

// Admin API: Scraping auslösen — Wird in Schritt 5 implementiert
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  void request;
  return Response.json({ success: true, data: { status: "idle", lastRun: null } });
}

export async function POST(request: NextRequest) {
  void request;
  return Response.json({ success: true, data: { status: "started" } });
}

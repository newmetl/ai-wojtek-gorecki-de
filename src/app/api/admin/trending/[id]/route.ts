// Admin API: Trending Eintrag (PUT/DELETE) — Wird in Schritt 4 implementiert
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void request;
  void params;
  return Response.json({ success: true, data: null });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void request;
  void params;
  return Response.json({ success: true, data: null });
}

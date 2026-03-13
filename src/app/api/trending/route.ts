// Öffentliche API: Trending-Daten — Wird in Schritt 6 implementiert
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  void request;
  return Response.json({
    success: true,
    data: [],
    meta: { total: 0, page: 1, pageSize: 20 },
  });
}

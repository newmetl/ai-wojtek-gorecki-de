// Admin API: Prompts CRUD — Phase 3
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  void request;
  return Response.json({ success: true, data: [] });
}

export async function POST(request: NextRequest) {
  void request;
  return Response.json({ success: true, data: null });
}

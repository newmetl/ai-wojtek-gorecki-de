import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { id } = await params;
  const data = await db.trendingTech.findUnique({ where: { id }, include: { category: true } });
  if (!data) return Response.json({ success: false, error: { code: "NOT_FOUND", message: "Nicht gefunden" } }, { status: 404 });

  return Response.json({ success: true, data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { name, description, emoji, categoryId, trendStatus, reviewStatus, sourceUrl, sourceName, trendScore, featuredIndex } = body;

  const data = await db.trendingTech.update({
    where: { id },
    data: { name, description, emoji, categoryId, trendStatus, reviewStatus, sourceUrl, sourceName, trendScore, featuredIndex: featuredIndex ?? null },
    include: { category: true },
  });

  return Response.json({ success: true, data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { id } = await params;
  await db.trendingTech.delete({ where: { id } });

  return Response.json({ success: true, data: null });
}

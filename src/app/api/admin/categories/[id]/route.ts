import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { name, emoji, sortOrder } = body;

  const data = await db.category.update({
    where: { id },
    data: { name, emoji, sortOrder },
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
  await db.category.delete({ where: { id } });

  return Response.json({ success: true, data: null });
}

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const data = await db.category.findMany({
    where: type ? { type } : undefined,
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  return Response.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const body = await request.json();
  const { name, type, emoji, sortOrder } = body;

  if (!name || !type) {
    return Response.json({ success: false, error: { code: "VALIDATION", message: "Name und Typ erforderlich" } }, { status: 400 });
  }

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;
  while (await db.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const data = await db.category.create({
    data: { name, slug, type, emoji, sortOrder: sortOrder ?? 0 },
  });

  return Response.json({ success: true, data }, { status: 201 });
}

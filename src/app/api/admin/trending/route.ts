import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.reviewStatus = status;
  if (category) where.categoryId = category;
  if (search) where.name = { contains: search };

  const data = await db.trendingTech.findMany({
    where,
    include: { category: true },
    orderBy: [{ trendScore: "desc" }, { createdAt: "desc" }],
  });

  return Response.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } }, { status: 401 });

  const body = await request.json();
  const { name, description, emoji, categoryId, trendStatus, reviewStatus, sourceUrl, sourceName, trendScore } = body;

  if (!name || !categoryId) {
    return Response.json({ success: false, error: { code: "VALIDATION", message: "Name und Kategorie erforderlich" } }, { status: 400 });
  }

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let counter = 1;
  while (await db.trendingTech.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const data = await db.trendingTech.create({
    data: { name, slug, description: description ?? "", emoji, categoryId, trendStatus: trendStatus ?? "new", reviewStatus: reviewStatus ?? "pending", sourceUrl, sourceName, trendScore: trendScore ?? 50 },
    include: { category: true },
  });

  return Response.json({ success: true, data }, { status: 201 });
}

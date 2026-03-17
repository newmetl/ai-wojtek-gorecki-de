import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Nicht angemeldet" } },
      { status: 401 }
    );
  }

  const result = await db.trendingTech.updateMany({
    where: { reviewStatus: "pending" },
    data: { reviewStatus: "approved" },
  });

  return Response.json({ success: true, data: { count: result.count } });
}

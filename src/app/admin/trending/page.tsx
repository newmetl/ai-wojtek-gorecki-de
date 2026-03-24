import { db } from "@/lib/db";
import TrendingTable from "@/components/admin/TrendingTable";
import ScrapingStatus from "@/components/admin/ScrapingStatus";
import { TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Trending verwalten" };

export default async function AdminTrendingPage() {
  const [entries, categories] = await Promise.all([
    db.trendingTech.findMany({
      include: { category: true },
      orderBy: [{ trendScore: "desc" }, { createdAt: "desc" }],
    }),
    db.category.findMany({
      where: { type: "trending" },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-on-surface">Trending AI Tech</h1>
          <span className="text-on-surface-variant text-sm ml-2">({entries.length} Einträge)</span>
        </div>
        <Link
          href="/admin/trending/new"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          <Plus className="h-4 w-4" />
          Neuer Eintrag
        </Link>
      </div>

      <ScrapingStatus />
      <TrendingTable initialEntries={entries} categories={categories} />
    </div>
  );
}

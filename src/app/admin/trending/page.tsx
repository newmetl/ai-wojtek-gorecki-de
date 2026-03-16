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
          <h1 className="text-2xl font-semibold text-foreground">Trending AI Tech</h1>
          <span className="text-muted text-sm ml-2">({entries.length} Einträge)</span>
        </div>
        <Link
          href="/admin/trending/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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

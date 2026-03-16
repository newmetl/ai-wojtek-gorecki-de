import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import TrendingEditForm from "@/components/admin/TrendingEditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Trending bearbeiten" };

export default async function AdminTrendingEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  const [entry, categories] = await Promise.all([
    isNew
      ? null
      : db.trendingTech.findUnique({ where: { id }, include: { category: true } }),
    db.category.findMany({ where: { type: "trending" }, orderBy: { sortOrder: "asc" } }),
  ]);

  if (!isNew && !entry) notFound();

  const formEntry = isNew
    ? { name: "", description: "", emoji: "", categoryId: "", trendStatus: "new", reviewStatus: "pending", sourceUrl: "", sourceName: "", trendScore: 50 }
    : { id: entry!.id, name: entry!.name, description: entry!.description, emoji: entry!.emoji ?? "", categoryId: entry!.categoryId, trendStatus: entry!.trendStatus, reviewStatus: entry!.reviewStatus, sourceUrl: entry!.sourceUrl ?? "", sourceName: entry!.sourceName ?? "", trendScore: entry!.trendScore };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/trending" className="flex items-center gap-2 text-muted hover:text-foreground text-sm transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">
          {isNew ? "Neuer Eintrag" : `Bearbeiten: ${entry!.name}`}
        </h1>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <TrendingEditForm entry={formEntry} categories={categories} />
      </div>
    </div>
  );
}

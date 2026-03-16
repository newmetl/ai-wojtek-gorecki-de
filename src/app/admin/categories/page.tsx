import { db } from "@/lib/db";
import CategoryManager from "@/components/admin/CategoryManager";
import { Tag } from "lucide-react";

export const metadata = { title: "Kategorien verwalten" };

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Tag className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">Kategorien</h1>
        <span className="text-muted text-sm ml-2">({categories.length} gesamt)</span>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}

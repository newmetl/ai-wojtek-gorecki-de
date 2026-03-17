"use client";

import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter, { type CategoryOption } from "./CategoryFilter";
import TrendingCard, { type TrendingCardData } from "./TrendingCard";
import { SlidersHorizontal } from "lucide-react";

interface TrendingGridProps {
  items: TrendingCardData[];
  categories: CategoryOption[];
}

const STATUS_ORDER: Record<string, number> = { new: 0, rising: 1, stable: 2 };

export default function TrendingGrid({ items, categories }: TrendingGridProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name" | "status">("score");

  const filtered = useMemo(() => {
    let result = items;

    // Kategorie-Filter
    if (activeCategory) {
      result = result.filter((item) => item.category.name === activeCategory ||
        categories.find((c) => c.slug === activeCategory)?.name === item.category.name);
    }

    // Suche
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.name.toLowerCase().includes(q)
      );
    }

    // Sortierung
    return [...result].sort((a, b) => {
      if (sortBy === "score") return b.trendScore - a.trendScore;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status")
        return (STATUS_ORDER[a.trendStatus] ?? 9) - (STATUS_ORDER[b.trendStatus] ?? 9);
      return 0;
    });
  }, [items, categories, search, activeCategory, sortBy]);

  // Kategorien mit Anzahl berechnen (nach Category-Filter ohne Search-Filter)
  const categoriesWithCount = useMemo(() =>
    categories.map((cat) => ({
      ...cat,
      count: items.filter((item) =>
        categories.find((c) => c.slug === cat.slug)?.name === item.category.name
      ).length,
    })),
    [items, categories]
  );

  return (
    <div className="space-y-6">
      {/* Suche + Sortierung */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Name, Beschreibung oder Kategorie suchen…"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="h-4 w-4 text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-white/10 bg-surface px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
          >
            <option value="score">Nach Relevanz</option>
            <option value="status">Nach Status</option>
            <option value="name">Nach Name</option>
          </select>
        </div>
      </div>

      {/* Kategorie-Filter */}
      <CategoryFilter
        categories={categoriesWithCount}
        activeSlug={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Ergebnis-Info */}
      <p className="text-sm text-muted">
        {filtered.length === items.length
          ? `${items.length} Einträge`
          : `${filtered.length} von ${items.length} Einträgen`}
        {search && ` für „${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <TrendingCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-foreground font-medium">Keine Einträge gefunden</p>
          <p className="text-muted text-sm mt-1">Versuche einen anderen Suchbegriff oder eine andere Kategorie.</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory(""); }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}

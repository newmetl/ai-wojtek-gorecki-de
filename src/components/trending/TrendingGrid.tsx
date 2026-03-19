"use client";

import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter, { type CategoryOption } from "./CategoryFilter";
import TrendingCard, { type TrendingCardData } from "./TrendingCard";
import FeaturedCard, { type FeaturedCardData } from "./FeaturedCard";
import { SlidersHorizontal, Star } from "lucide-react";

interface TrendingGridProps {
  items: TrendingCardData[];
  categories: CategoryOption[];
  featuredItems: FeaturedCardData[];
}

const STATUS_ORDER: Record<string, number> = { new: 0, rising: 1, stable: 2 };

export default function TrendingGrid({ items, categories, featuredItems }: TrendingGridProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name" | "status">("score");

  // Featured IDs — im Haupt-Grid ausblenden (solange kein Filter aktiv)
  const featuredIds = useMemo(() => new Set(featuredItems.map((f) => f.id)), [featuredItems]);

  const isFiltering = search.trim() !== "" || activeCategory !== "";

  const filtered = useMemo(() => {
    // Ohne Filter: Featured Items nicht doppelt zeigen
    let result = isFiltering ? items : items.filter((item) => !featuredIds.has(item.id));

    // Kategorie-Filter
    if (activeCategory) {
      result = result.filter((item) =>
        categories.find((c) => c.slug === activeCategory)?.name === item.category.name
      );
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
  }, [items, categories, search, activeCategory, sortBy, featuredIds, isFiltering]);

  // Kategorien mit Anzahl berechnen (immer über alle items)
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
    <div className="space-y-8">
      {/* ── Featured Section ── */}
      {featuredItems.length > 0 && !isFiltering && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
              Featured AI Tech
            </h2>
            <div className="flex-1 h-px bg-amber-500/20" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ── Suche + Sortierung ── */}
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

      {/* ── Kategorie-Filter ── */}
      <CategoryFilter
        categories={categoriesWithCount}
        activeSlug={activeCategory}
        onChange={setActiveCategory}
      />

      {/* ── Ergebnis-Info ── */}
      <p className="text-sm text-muted">
        {isFiltering
          ? `${filtered.length} von ${items.length} Einträgen`
          : `${filtered.length} Einträge`}
        {search && ` für „${search}"`}
      </p>

      {/* ── Haupt-Grid ── */}
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
          <p className="text-muted text-sm mt-1">
            Versuche einen anderen Suchbegriff oder eine andere Kategorie.
          </p>
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

"use client";

export interface CategoryOption {
  slug: string;
  name: string;
  emoji: string | null;
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  activeSlug: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ categories, activeSlug, onChange }: CategoryFilterProps) {
  const all = [
    { slug: "", name: "Alle", emoji: null, count: categories.reduce((s, c) => s + c.count, 0) },
    ...categories,
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => {
        const isActive = cat.slug === activeSlug;
        return (
          <button
            key={cat.slug}
            onClick={() => onChange(cat.slug)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-surface border border-white/10 text-muted hover:border-white/20 hover:text-foreground"
            }`}
          >
            {cat.emoji && <span>{cat.emoji}</span>}
            {cat.name}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${isActive ? "bg-white/20" : "bg-white/5"}`}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

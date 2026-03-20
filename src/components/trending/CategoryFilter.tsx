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
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary/15 border border-primary/60 text-primary"
                : "bg-[#121a25] border border-[#424853]/30 text-[#a5abb8] hover:border-[#424853]/60 hover:text-[#e8eefc]"
            }`}
          >
            {cat.emoji && <span>{cat.emoji}</span>}
            {cat.name}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${isActive ? "bg-primary/20 text-primary" : "bg-[#1d2634] text-[#6f7682]"}`}>
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

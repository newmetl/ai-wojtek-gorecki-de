"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Star } from "lucide-react";

type Category = { id: string; name: string; emoji: string | null };
type TrendingEntry = {
  id?: string;
  name: string;
  description: string;
  emoji: string;
  categoryId: string;
  trendStatus: string;
  reviewStatus: string;
  sourceUrl: string;
  sourceName: string;
  trendScore: number;
  featuredIndex: number | null;
};

const TREND_STATUS_OPTIONS = [
  { value: "new", label: "Neu" },
  { value: "rising", label: "Steigend" },
  { value: "stable", label: "Stabil" },
];

const REVIEW_STATUS_OPTIONS = [
  { value: "pending", label: "Ausstehend" },
  { value: "approved", label: "Freigegeben" },
  { value: "hidden", label: "Ausgeblendet" },
];

const SOURCE_OPTIONS = [
  { value: "github", label: "GitHub" },
  { value: "producthunt", label: "Product Hunt" },
  { value: "hackernews", label: "Hacker News" },
  { value: "arxiv", label: "arXiv" },
  { value: "blog", label: "Blog" },
];

export default function TrendingEditForm({
  entry,
  categories,
}: {
  entry: TrendingEntry;
  categories: Category[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(entry);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof TrendingEntry, value: string | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const url = entry.id ? `/api/admin/trending/${entry.id}` : "/api/admin/trending";
    const method = entry.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin/trending");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error?.message ?? "Fehler beim Speichern.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground mb-2">Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground mb-2">Emoji</label>
          <input
            value={form.emoji}
            onChange={(e) => update("emoji", e.target.value)}
            placeholder="z.B. 🤖"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-foreground mb-2">Beschreibung</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground mb-2">Kategorie *</label>
          <div className="relative">
            <select
              required
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className="appearance-none w-full px-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Kategorie wählen…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-foreground mb-2">Trend-Score (1–100)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={form.trendScore}
            onChange={(e) => update("trendScore", parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm text-foreground mb-2">Trend-Status</label>
          <div className="relative">
            <select
              value={form.trendStatus}
              onChange={(e) => update("trendStatus", e.target.value)}
              className="appearance-none w-full px-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {TREND_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-foreground mb-2">Review-Status</label>
          <div className="relative">
            <select
              value={form.reviewStatus}
              onChange={(e) => update("reviewStatus", e.target.value)}
              className="appearance-none w-full px-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {REVIEW_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Featured-Bereich */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-300">Featured AI Tech</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-xs text-muted mb-1.5">
              Position (leer = nicht featured)
            </label>
            <input
              type="number"
              min={1}
              value={form.featuredIndex ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                update("featuredIndex", val === "" ? null : parseInt(val));
              }}
              placeholder="z.B. 1, 2, 3 …"
              className="w-full px-3 py-2 bg-background border border-amber-500/30 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/40 placeholder:text-muted/50"
            />
          </div>
          <p className="flex-1 text-xs text-muted leading-relaxed">
            Einträge mit einem Positions-Index werden prominent über dem Suchfeld in einem
            3er-Grid hervorgehoben. Niedrigere Zahlen erscheinen zuerst.
          </p>
        </div>
        {form.featuredIndex !== null && (
          <button
            type="button"
            onClick={() => update("featuredIndex", null)}
            className="mt-3 text-xs text-muted hover:text-amber-300 transition-colors"
          >
            ✕ Featured entfernen
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground mb-2">Quell-URL</label>
          <input
            type="url"
            value={form.sourceUrl}
            onChange={(e) => update("sourceUrl", e.target.value)}
            placeholder="https://…"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground mb-2">Quelle</label>
          <div className="relative">
            <select
              value={form.sourceName}
              onChange={(e) => update("sourceName", e.target.value)}
              className="appearance-none w-full px-3 pr-8 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Keine</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {saving ? "Speichern…" : "Speichern"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/trending")}
          className="text-muted hover:text-foreground px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

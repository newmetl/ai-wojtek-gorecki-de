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

// Shared class strings
const inputCls = "w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-3 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none";
const selectCls = "appearance-none w-full bg-[#1d2634]/40 border-0 border-b-2 border-[#6f7682]/20 focus:border-primary focus:ring-0 text-[#e8eefc] text-sm py-3 pr-6 transition-all duration-300 outline-none";
const labelCls = "block font-headline text-[10px] text-[#6f7682] uppercase tracking-[0.2em] mb-2";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Emoji</label>
          <input
            value={form.emoji}
            onChange={(e) => update("emoji", e.target.value)}
            placeholder="z.B. 🤖"
            className={inputCls}
          />
        </div>
      </div>

      <div className="relative group">
        <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Beschreibung</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Kategorie *</label>
          <div className="relative">
            <select
              required
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className={selectCls}
            >
              <option value="">Kategorie wählen…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 bottom-3 h-3.5 w-3.5 text-[#6f7682] pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Trend-Score (1–100)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={form.trendScore}
            onChange={(e) => update("trendScore", parseInt(e.target.value))}
            className={inputCls}
          />
        </div>

        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Trend-Status</label>
          <div className="relative">
            <select
              value={form.trendStatus}
              onChange={(e) => update("trendStatus", e.target.value)}
              className={selectCls}
            >
              {TREND_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 bottom-3 h-3.5 w-3.5 text-[#6f7682] pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Review-Status</label>
          <div className="relative">
            <select
              value={form.reviewStatus}
              onChange={(e) => update("reviewStatus", e.target.value)}
              className={selectCls}
            >
              {REVIEW_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 bottom-3 h-3.5 w-3.5 text-[#6f7682] pointer-events-none" />
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
          <div className="flex-1 relative group">
            <label className={`${labelCls} group-focus-within:text-amber-400 transition-colors`}>
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
              className="w-full bg-[#1d2634]/40 border-0 border-b-2 border-amber-500/30 focus:border-amber-400 focus:ring-0 text-[#e8eefc] text-sm py-3 transition-all duration-300 placeholder:text-[#6f7682]/40 outline-none"
            />
          </div>
          <p className="flex-1 text-xs text-[#6f7682] leading-relaxed">
            Einträge mit einem Positions-Index werden prominent über dem Suchfeld in einem
            3er-Grid hervorgehoben. Niedrigere Zahlen erscheinen zuerst.
          </p>
        </div>
        {form.featuredIndex !== null && (
          <button
            type="button"
            onClick={() => update("featuredIndex", null)}
            className="mt-3 text-xs text-[#6f7682] hover:text-amber-300 transition-colors"
          >
            ✕ Featured entfernen
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Quell-URL</label>
          <input
            type="url"
            value={form.sourceUrl}
            onChange={(e) => update("sourceUrl", e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
        </div>
        <div className="relative group">
          <label className={`${labelCls} group-focus-within:text-primary transition-colors`}>Quelle</label>
          <div className="relative">
            <select
              value={form.sourceName}
              onChange={(e) => update("sourceName", e.target.value)}
              className={selectCls}
            >
              <option value="">Keine</option>
              {SOURCE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 bottom-3 h-3.5 w-3.5 text-[#6f7682] pointer-events-none" />
          </div>
        </div>
      </div>

      {error && <p className="text-[#ff716c] text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-[#003f43] font-headline font-bold text-sm tracking-widest px-8 py-3 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 uppercase disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {saving ? "Speichern…" : "Speichern"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/trending")}
          className="text-[#6f7682] hover:text-[#e8eefc] px-4 py-3 text-sm font-headline tracking-wide transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

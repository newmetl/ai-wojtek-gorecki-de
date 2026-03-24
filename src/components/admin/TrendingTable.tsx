"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, EyeOff, Clock, Pencil, Trash2, ExternalLink, ChevronDown, CheckCheck } from "lucide-react";

type Category = { id: string; name: string; slug: string; emoji: string | null };
type TrendingEntry = {
  id: string;
  name: string;
  emoji: string | null;
  description: string;
  trendStatus: string;
  reviewStatus: string;
  trendScore: number;
  sourceUrl: string | null;
  createdAt: string | Date;
  category: Category;
};

const REVIEW_LABELS: Record<string, { label: string; color: string }> = {
  approved: { label: "Freigegeben", color: "text-green-400" },
  pending: { label: "Ausstehend", color: "text-yellow-400" },
  hidden: { label: "Ausgeblendet", color: "text-on-surface-variant" },
};

const TREND_LABELS: Record<string, { label: string; color: string }> = {
  new: { label: "Neu", color: "text-primary" },
  rising: { label: "Steigend", color: "text-accent" },
  stable: { label: "Stabil", color: "text-on-surface-variant" },
};

type FilterStatus = "all" | "pending" | "approved" | "hidden";

export default function TrendingTable({
  initialEntries,
  categories,
}: {
  initialEntries: TrendingEntry[];
  categories: Category[];
}) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [bulkApproving, setBulkApproving] = useState(false);

  const filtered = entries.filter((e) => {
    if (filterStatus !== "all" && e.reviewStatus !== filterStatus) return false;
    if (filterCategory !== "all" && e.category.id !== filterCategory) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function updateStatus(id: string, reviewStatus: string) {
    const res = await fetch(`/api/admin/trending/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewStatus }),
    });
    if (res.ok) {
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, reviewStatus } : e)));
    }
  }

  async function deleteEntry(id: string) {
    if (!confirm("Eintrag wirklich löschen?")) return;
    setDeleting(id);
    await fetch(`/api/admin/trending/${id}`, { method: "DELETE" });
    setEntries((prev) => prev.filter((e) => e.id !== id));
    setDeleting(null);
    router.refresh();
  }

  const pendingCount = entries.filter((e) => e.reviewStatus === "pending").length;

  async function bulkApprove() {
    if (pendingCount === 0) return;
    if (!confirm(`Alle ${pendingCount} ausstehenden Einträge freigeben?`)) return;
    setBulkApproving(true);
    const res = await fetch("/api/admin/trending/bulk-approve", { method: "POST" });
    if (res.ok) {
      setEntries((prev) =>
        prev.map((e) => (e.reviewStatus === "pending" ? { ...e, reviewStatus: "approved" } : e))
      );
    }
    setBulkApproving(false);
  }

  return (
    <div className="space-y-4">
      {/* Filter-Leiste */}
      <div className="flex flex-wrap gap-3">
        <div className="flex rounded-lg bg-surface-container-low overflow-hidden text-sm">
          {(["all", "pending", "approved", "hidden"] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 transition-all duration-300 ${
                filterStatus === s ? "bg-primary text-primary-foreground font-medium" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              {s === "all" ? "Alle" : REVIEW_LABELS[s]?.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 bg-surface-container-low rounded-lg text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            <option value="all">Alle Kategorien</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-on-surface-variant pointer-events-none" />
        </div>

        <input
          type="text"
          placeholder="Suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 bg-surface-container-low rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary/50"
        />

        <span className="text-on-surface-variant text-sm self-center ml-auto">{filtered.length} Einträge</span>

        {pendingCount > 0 && (
          <button
            onClick={bulkApprove}
            disabled={bulkApproving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50"
          >
            <CheckCheck className="h-4 w-4" />
            {bulkApproving ? "Wird freigegeben…" : `Alle ${pendingCount} freigeben`}
          </button>
        )}
      </div>

      {/* Tabelle */}
      <div className="bg-surface-container-low rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20 text-left">
                <th className="px-4 py-3 text-on-surface-variant font-medium">Eintrag</th>
                <th className="px-4 py-3 text-on-surface-variant font-medium">Kategorie</th>
                <th className="px-4 py-3 text-on-surface-variant font-medium">Trend</th>
                <th className="px-4 py-3 text-on-surface-variant font-medium">Score</th>
                <th className="px-4 py-3 text-on-surface-variant font-medium">Status</th>
                <th className="px-4 py-3 text-on-surface-variant font-medium">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => {
                const reviewStyle = REVIEW_LABELS[entry.reviewStatus] ?? REVIEW_LABELS.pending;
                const trendStyle = TREND_LABELS[entry.trendStatus] ?? TREND_LABELS.stable;
                return (
                  <tr key={entry.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container transition-all duration-300">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.emoji ?? "📌"}</span>
                        <div className="min-w-0">
                          <div className="text-on-surface font-medium">{entry.name}</div>
                          <div className="text-on-surface-variant text-xs truncate max-w-48">{entry.description}</div>
                        </div>
                        {entry.sourceUrl && (
                          <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary ml-1 shrink-0 transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant whitespace-nowrap">
                      {entry.category.emoji} {entry.category.name}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap ${trendStyle.color}`}>
                      {trendStyle.label}
                    </td>
                    <td className="px-4 py-3 text-on-surface font-mono">{entry.trendScore}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`${reviewStyle.color} text-xs font-medium`}>{reviewStyle.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {entry.reviewStatus !== "approved" && (
                          <button onClick={() => updateStatus(entry.id, "approved")} title="Freigeben"
                            className="p-1.5 rounded hover:bg-green-400/10 text-on-surface-variant hover:text-green-400 transition-all duration-300">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        {entry.reviewStatus !== "hidden" && (
                          <button onClick={() => updateStatus(entry.id, "hidden")} title="Ausblenden"
                            className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-all duration-300">
                            <EyeOff className="h-4 w-4" />
                          </button>
                        )}
                        {entry.reviewStatus !== "pending" && (
                          <button onClick={() => updateStatus(entry.id, "pending")} title="Ausstehend"
                            className="p-1.5 rounded hover:bg-yellow-400/10 text-on-surface-variant hover:text-yellow-400 transition-all duration-300">
                            <Clock className="h-4 w-4" />
                          </button>
                        )}
                        <Link href={`/admin/trending/${entry.id}`} title="Bearbeiten"
                          className="p-1.5 rounded hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all duration-300">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => deleteEntry(entry.id)} disabled={deleting === entry.id} title="Löschen"
                          className="p-1.5 rounded hover:bg-red-400/10 text-on-surface-variant hover:text-red-400 transition-all duration-300 disabled:opacity-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-on-surface-variant">
                    Keine Einträge gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

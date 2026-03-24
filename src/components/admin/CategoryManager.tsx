"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X, Plus } from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
  type: string;
  emoji: string | null;
  sortOrder: number;
};

const TYPE_LABELS: Record<string, string> = {
  trending: "Trending AI Tech",
  usecase: "Use Cases",
  prompt: "Prompts",
};

export default function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [activeType, setActiveType] = useState("trending");
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; emoji: string; sortOrder: number }>({ name: "", emoji: "", sortOrder: 0 });
  const [newForm, setNewForm] = useState({ name: "", emoji: "", sortOrder: 0 });
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const filtered = categories.filter((c) => c.type === activeType);

  function startEdit(cat: Category) {
    setEditing(cat.id);
    setEditValues({ name: cat.name, emoji: cat.emoji ?? "", sortOrder: cat.sortOrder });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editValues),
    });
    setSaving(false);
    if (res.ok) {
      const { data } = await res.json();
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
      setEditing(null);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Kategorie löschen? Einträge dieser Kategorie werden ebenfalls beeinflusst!")) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  }

  async function createCategory() {
    if (!newForm.name.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newForm, type: activeType }),
    });
    setSaving(false);
    if (res.ok) {
      const { data } = await res.json();
      setCategories((prev) => [...prev, data]);
      setNewForm({ name: "", emoji: "", sortOrder: 0 });
      setShowNew(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab-Filter */}
      <div className="flex rounded-lg bg-surface-container-low overflow-hidden text-sm w-fit">
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <button
            key={type}
            onClick={() => { setActiveType(type); setEditing(null); setShowNew(false); }}
            className={`px-4 py-2 transition-all duration-300 ${
              activeType === type ? "bg-primary text-primary-foreground font-medium" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Kategorien-Liste */}
      <div className="bg-surface-container-low rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/20 text-left">
              <th className="px-4 py-3 text-on-surface-variant font-medium">Emoji</th>
              <th className="px-4 py-3 text-on-surface-variant font-medium">Name</th>
              <th className="px-4 py-3 text-on-surface-variant font-medium">Slug</th>
              <th className="px-4 py-3 text-on-surface-variant font-medium">Sortierung</th>
              <th className="px-4 py-3 text-on-surface-variant font-medium">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cat) => (
              <tr key={cat.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container transition-all duration-300">
                <td className="px-4 py-3">
                  {editing === cat.id ? (
                    <input
                      value={editValues.emoji}
                      onChange={(e) => setEditValues((p) => ({ ...p, emoji: e.target.value }))}
                      className="w-14 px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                    />
                  ) : (
                    <span className="text-xl">{cat.emoji ?? "—"}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing === cat.id ? (
                    <input
                      value={editValues.name}
                      onChange={(e) => setEditValues((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                    />
                  ) : (
                    <span className="text-on-surface">{cat.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-on-surface-variant font-mono text-xs">{cat.slug}</td>
                <td className="px-4 py-3">
                  {editing === cat.id ? (
                    <input
                      type="number"
                      value={editValues.sortOrder}
                      onChange={(e) => setEditValues((p) => ({ ...p, sortOrder: parseInt(e.target.value) }))}
                      className="w-20 px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                    />
                  ) : (
                    <span className="text-on-surface-variant">{cat.sortOrder}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {editing === cat.id ? (
                      <>
                        <button onClick={() => saveEdit(cat.id)} disabled={saving}
                          className="p-1.5 rounded hover:bg-green-400/10 text-on-surface-variant hover:text-green-400 transition-all duration-300">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => setEditing(null)}
                          className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-all duration-300">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(cat)}
                          className="p-1.5 rounded hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-all duration-300">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteCategory(cat.id)}
                          className="p-1.5 rounded hover:bg-red-400/10 text-on-surface-variant hover:text-red-400 transition-all duration-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {/* Neue Kategorie Zeile */}
            {showNew && (
              <tr className="border-t border-outline-variant/20 bg-surface-container/50">
                <td className="px-4 py-3">
                  <input
                    value={newForm.emoji}
                    onChange={(e) => setNewForm((p) => ({ ...p, emoji: e.target.value }))}
                    placeholder="🏷️"
                    className="w-14 px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    value={newForm.name}
                    onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Kategoriename"
                    className="w-full px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                  />
                </td>
                <td className="px-4 py-3 text-on-surface-variant text-xs italic">wird generiert</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={newForm.sortOrder}
                    onChange={(e) => setNewForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) }))}
                    className="w-20 px-2 py-1 bg-surface-container-highest/40 border-0 border-b border-outline/30 focus:border-primary text-on-surface text-sm outline-none transition-colors"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={createCategory} disabled={saving}
                      className="p-1.5 rounded hover:bg-green-400/10 text-on-surface-variant hover:text-green-400 transition-all duration-300">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setShowNew(false)}
                      className="p-1.5 rounded hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-all duration-300">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {filtered.length === 0 && !showNew && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-on-surface-variant">
                  Keine Kategorien vorhanden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!showNew && (
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-sm transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          Neue Kategorie hinzufügen
        </button>
      )}
    </div>
  );
}

import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { LayoutDashboard, TrendingUp, CheckCircle, Clock, EyeOff, Layers } from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

async function getStats() {
  const [total, pending, approved, hidden, categories, lastLog] = await Promise.all([
    db.trendingTech.count(),
    db.trendingTech.count({ where: { reviewStatus: "pending" } }),
    db.trendingTech.count({ where: { reviewStatus: "approved" } }),
    db.trendingTech.count({ where: { reviewStatus: "hidden" } }),
    db.category.count({ where: { type: "trending" } }),
    db.scrapingLog.findFirst({ orderBy: { runAt: "desc" } }),
  ]);
  return { total, pending, approved, hidden, categories, lastLog };
}

export default async function AdminDashboardPage() {
  const { total, pending, approved, hidden, categories, lastLog } = await getStats();

  const stats = [
    { label: "Gesamt Trending", value: total, icon: TrendingUp, color: "text-primary" },
    { label: "Freigegeben", value: approved, icon: CheckCircle, color: "text-green-400" },
    { label: "Ausstehend", value: pending, icon: Clock, color: "text-yellow-400" },
    { label: "Ausgeblendet", value: hidden, icon: EyeOff, color: "text-muted" },
    { label: "Kategorien", value: categories, icon: Layers, color: "text-secondary" },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold text-on-surface">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-surface-container-low rounded-xl p-4">
              <Icon className={`h-5 w-5 mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-on-surface">{stat.value}</div>
              <div className="text-xs text-on-surface-variant mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-surface-container-low rounded-xl p-6">
        <h2 className="text-sm font-medium text-on-surface mb-4">Scraping-Status</h2>
        {lastLog ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Letzter Lauf</span>
              <span className="text-on-surface">{formatDate(lastLog.runAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Status</span>
              <span className={lastLog.status === "success" ? "text-green-400" : lastLog.status === "error" ? "text-red-400" : "text-yellow-400"}>
                {lastLog.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Neue Einträge</span>
              <span className="text-on-surface">{lastLog.itemsNew}</span>
            </div>
          </div>
        ) : (
          <p className="text-on-surface-variant text-sm">Noch kein Scraping durchgeführt.</p>
        )}
        <p className="text-xs text-on-surface-variant mt-4">Scraping: Wird in Schritt 5 implementiert.</p>
      </div>
    </div>
  );
}

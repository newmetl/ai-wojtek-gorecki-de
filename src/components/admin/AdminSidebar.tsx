"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, TrendingUp, Tag, LogOut, FlaskConical, BookOpen } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/trending", label: "Trending AI Tech", icon: TrendingUp },
  { href: "/admin/categories", label: "Kategorien", icon: Tag },
];

const comingSoon = [
  { label: "Use Cases", icon: FlaskConical },
  { label: "Prompts", icon: BookOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  // Auf der Login-Seite keine Sidebar anzeigen
  if (pathname === "/admin/login") return null;

  function isActive(href: string, exact = false) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col shrink-0">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="text-foreground font-semibold text-lg block">
          🤖 Admin
        </Link>
        <p className="text-muted text-xs mt-1">ai.wojtek-gorecki.de</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted hover:text-foreground hover:bg-surface-hover"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="text-xs text-muted px-3 uppercase tracking-wider font-medium">
            Phase 2 &amp; 3
          </p>
        </div>
        {comingSoon.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted opacity-40 cursor-not-allowed select-none"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-hover w-full transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}

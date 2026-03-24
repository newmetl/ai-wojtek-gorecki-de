"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, TrendingUp, Tag, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/trending", label: "Trending AI Tech", icon: TrendingUp },
  { href: "/admin/categories", label: "Kategorien", icon: Tag },
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
    <aside className="w-64 min-h-screen bg-surface-container-low flex flex-col shrink-0">
      <div className="p-6 pb-5">
        <Link href="/admin" className="text-on-surface font-headline font-semibold text-lg block tracking-tight">
          🤖 Admin
        </Link>
        <p className="text-on-surface-variant text-xs mt-1">ai.wojtek-gorecki.de</p>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

      </nav>

      <div className="p-3 pt-4">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest w-full transition-all duration-300"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}

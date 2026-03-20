"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Trending AI Tech", href: "/trending-ai" },
  { label: "Blog", href: "/blog" },
  { label: "About Me", href: "/cv" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "bg-[#1E293B]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-mono font-bold text-lg text-primary tracking-tight group-hover:text-primary/80 transition-colors">
              ai.
            </span>
            <span className="font-semibold text-base text-foreground tracking-tight">
              wojtek&#8209;gorecki.de
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      )}
    >
      {children}
    </Link>
  );
}

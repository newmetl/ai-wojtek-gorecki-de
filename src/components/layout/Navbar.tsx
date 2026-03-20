"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Trending AI", href: "/trending-ai" },
  { label: "Blog", href: "/blog" },
  { label: "About Me", href: "/cv" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#080f18]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(143,245,255,0.04)]">
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-xl font-bold tracking-tighter hover:opacity-80 transition-all duration-200 active:scale-95"
        >
          <span className="text-primary">ai.</span>
          <span className="text-foreground">wojtek&#8209;gorecki.de</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 font-headline tracking-tight text-xs uppercase">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-all duration-300 pb-0.5",
                  isActive
                    ? "text-primary border-b border-primary"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <MobileNav pathname={pathname} />
      </nav>
      {/* Subtle neon bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
}

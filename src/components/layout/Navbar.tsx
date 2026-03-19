"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

export const tools = [
  { label: "Trending AI Tech", href: "/tools/trending-ai", status: "live" as const },
  { label: "AI Use Cases", href: "/tools/ai-use-cases", status: "soon" as const },
  { label: "Prompt Library", href: "/tools/prompt-library", status: "soon" as const },
  { label: "User Story Generator", href: "/tools/user-story-generator", status: "soon" as const },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About this Page", href: "/about" },
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
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                id="nav-tools-trigger"
                render={
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer outline-none",
                      pathname.startsWith("/tools")
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  />
                }
              >
                Tools
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-56 bg-[#1E293B] border-white/10"
              >
                {tools.map((tool) => (
                  <DropdownMenuItem
                    key={tool.href}
                    render={<Link href={tool.href} />}
                    className={cn(
                      "flex items-center justify-between w-full cursor-pointer",
                      pathname === tool.href && "text-primary"
                    )}
                  >
                    <span>{tool.label}</span>
                    {tool.status === "live" ? (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                        Soon
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <NavLink key={link.href} href={link.href} active={pathname === link.href}>
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

"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "./Navbar";

interface MobileNavProps {
  pathname: string;
}

export default function MobileNav({ pathname }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          id="mobile-menu-trigger"
          render={
            <button
              className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              aria-label="Menü öffnen"
            />
          }
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 bg-[#080f18] border-l border-[#424853]/20 p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="font-headline text-lg font-bold tracking-tighter text-primary">
              ai.wojtek&#8209;gorecki.de
            </SheetTitle>
          </SheetHeader>

          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MobileNavLink({
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
        "flex items-center px-3 py-3 font-headline text-xs uppercase tracking-widest transition-colors",
        active
          ? "text-primary"
          : "text-foreground/50 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

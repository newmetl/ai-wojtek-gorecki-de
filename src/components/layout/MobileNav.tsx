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
import { navLinks, tools } from "./Navbar";

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
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Menü öffnen"
            />
          }
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-72 bg-[#1E293B] border-white/10 p-0"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/10">
            <SheetTitle className="flex items-center gap-1">
              <span className="font-mono font-bold text-primary">ai.</span>
              <span className="font-semibold text-foreground text-sm">
                wojtek&#8209;gorecki.de
              </span>
            </SheetTitle>
          </SheetHeader>

          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
              >
                {link.label}
              </MobileNavLink>
            ))}

            {/* Tools Section */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tools
              </p>
              {tools.map((tool) => (
                <MobileNavLink
                  key={tool.href}
                  href={tool.href}
                  active={pathname === tool.href}
                >
                  <span className="flex items-center justify-between w-full">
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
                  </span>
                </MobileNavLink>
              ))}
            </div>
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
        "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      )}
    >
      {children}
    </Link>
  );
}

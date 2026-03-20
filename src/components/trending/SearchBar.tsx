"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Suchen…" }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7682] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#424853]/40 bg-[#121a25] py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-[#6f7682] focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f7682] hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

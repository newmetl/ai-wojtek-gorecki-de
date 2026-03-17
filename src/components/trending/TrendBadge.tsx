interface TrendBadgeProps {
  status: "new" | "rising" | "stable" | string;
  size?: "sm" | "md";
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  new:    { label: "Neu",      className: "bg-primary/15 text-primary border border-primary/20" },
  rising: { label: "Steigend", className: "bg-accent/15 text-accent border border-accent/20" },
  stable: { label: "Stabil",   className: "bg-muted/20 text-muted border border-muted/20" },
};

export default function TrendBadge({ status, size = "sm" }: TrendBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.stable;
  const sizeClass = size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[10px]";

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  );
}

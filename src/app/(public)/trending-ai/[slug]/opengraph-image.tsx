import { ImageResponse } from "next/og";
import { db } from "@/lib/db";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

const TREND_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "Neu", color: "#22C55E", bg: "rgba(34,197,94,0.15)" },
  rising: { label: "Steigend", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  stable: { label: "Stabil", color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const item = await db.trendingTech.findUnique({
    where: { slug },
    include: { category: true },
  });

  const name = item?.name ?? "Trending AI Tech";
  const description = item?.description ?? "";
  const emoji = item?.emoji ?? item?.category?.emoji ?? "🤖";
  const categoryName = item?.category?.name ?? "";
  const trendStatus = item?.trendStatus ?? "new";

  const truncatedDesc =
    description.length > 120 ? description.slice(0, 118) + "…" : description;

  const trend = TREND_LABELS[trendStatus] ?? TREND_LABELS.new;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0F172A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.09) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -120,
            width: 650,
            height: 650,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 55%)",
            borderRadius: "50%",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -80,
            width: 480,
            height: 480,
            background:
              "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "linear-gradient(to bottom, #3B82F6, #06B6D4)",
          }}
        />

        {/* Bottom divider line */}
        <div
          style={{
            position: "absolute",
            bottom: 88,
            left: 80,
            right: 80,
            height: 1,
            background:
              "linear-gradient(to right, rgba(59,130,246,0.3), transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 80px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Top: breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#3B82F6",
              }}
            />
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 20,
                color: "#475569",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ai.wojtek-gorecki.de · Trending AI Tech
            </span>
          </div>

          {/* Center: emoji + name + badges + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* Emoji + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <span style={{ fontSize: 72, lineHeight: 1 }}>{emoji}</span>
              <h1
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 58,
                  fontWeight: 700,
                  color: "#F8FAFC",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                {name}
              </h1>
            </div>

            {/* Category + trend badges */}
            <div style={{ display: "flex", gap: 12 }}>
              {categoryName && (
                <div
                  style={{
                    display: "flex",
                    padding: "7px 18px",
                    borderRadius: 100,
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.3)",
                    fontFamily: "sans-serif",
                    fontSize: 16,
                    color: "#3B82F6",
                    letterSpacing: "0.03em",
                  }}
                >
                  {categoryName}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  padding: "7px 18px",
                  borderRadius: 100,
                  background: trend.bg,
                  border: `1px solid ${trend.color}40`,
                  fontFamily: "sans-serif",
                  fontSize: 16,
                  color: trend.color,
                  letterSpacing: "0.03em",
                }}
              >
                {trend.label}
              </div>
            </div>

            {/* Description */}
            {truncatedDesc && (
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  color: "#94A3B8",
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: 920,
                }}
              >
                {truncatedDesc}
              </p>
            )}
          </div>

          {/* Bottom: site label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 18,
                color: "#475569",
              }}
            >
              Wöchentlich kuratiert von Wojtek Gorecki
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 18,
                color: "#475569",
                letterSpacing: "0.05em",
              }}
            >
              wojtek-gorecki.de
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAV_ITEMS = ["Trending AI Tech", "Blog", "About Me"];

export default function Image() {
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
            top: -250,
            left: -150,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 55%)",
            borderRadius: "50%",
          }}
        />

        {/* Bottom-right glow (cyan) */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
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

        {/* Decorative large "W" — right side */}
        <div
          style={{
            position: "absolute",
            right: -40,
            top: 20,
            fontSize: 520,
            fontWeight: 900,
            color: "rgba(30,41,59,0.55)",
            fontFamily: "sans-serif",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          W
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Top: domain label */}
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
              ai.wojtek-gorecki.de
            </span>
          </div>

          {/* Center: name + tagline + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h1
              style={{
                fontFamily: "sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: "#F8FAFC",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Wojtek Gorecki
            </h1>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 30,
                fontWeight: 600,
                color: "#3B82F6",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              KI & Gesellschaftlicher Wandel
            </p>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: 22,
                color: "#94A3B8",
                margin: 0,
                lineHeight: 1.55,
                maxWidth: 680,
              }}
            >
              Gedanken zu Künstlicher Intelligenz, Technologie und ihrer
              Bedeutung für Gesellschaft und Alltag.
            </p>
          </div>

          {/* Bottom: nav pills */}
          <div style={{ display: "flex", gap: 12 }}>
            {NAV_ITEMS.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "9px 22px",
                  borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "sans-serif",
                  fontSize: 16,
                  color: "#94A3B8",
                  letterSpacing: "0.04em",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

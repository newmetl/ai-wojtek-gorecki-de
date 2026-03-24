import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#080f18",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,240,255,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Cyan glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Purple glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -80,
            width: 550,
            height: 550,
            background:
              "radial-gradient(circle, rgba(213,117,255,0.10) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Neon line — top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(to right, transparent 5%, #00F0FF 30%, #d575ff 70%, transparent 95%)",
            opacity: 0.6,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "70px 90px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 24,
                fontWeight: 700,
                color: "#00F0FF",
                letterSpacing: "-0.03em",
              }}
            >
              ai.
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 24,
                fontWeight: 700,
                color: "#e8eefc",
                letterSpacing: "-0.03em",
              }}
            >
              wojtek‑gorecki.de
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "sans-serif",
              fontSize: 80,
              fontWeight: 700,
              color: "#e8eefc",
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Wojtek Gorecki
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 32,
              fontWeight: 500,
              margin: 0,
              marginTop: 20,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "#00F0FF",
            }}
          >
            KI & Gesellschaftlicher Wandel
          </p>

          {/* Subtle description */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 20,
              color: "#a5abb8",
              margin: 0,
              marginTop: 18,
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            Gedanken zu Künstlicher Intelligenz, Technologie
            und ihrer Bedeutung für Gesellschaft und Alltag.
          </p>
        </div>
      </div>
    ),
    size,
  );
}

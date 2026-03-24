import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Blog";
  const description = post?.description ?? "";
  const tags = post?.tags?.slice(0, 3) ?? [];
  const readingTime = post?.readingTimeMinutes ?? null;
  const author = post?.author ?? "Wojtek Gorecki";

  const truncatedTitle = title.length > 70 ? title.slice(0, 68) + "…" : title;
  const truncatedDesc =
    description.length > 110 ? description.slice(0, 108) + "…" : description;

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
            top: -200,
            left: -150,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 55%)",
            borderRadius: "50%",
          }}
        />

        {/* Bottom-right glow (cyan) */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 450,
            height: 450,
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
              ai.wojtek-gorecki.de · Blog
            </span>
          </div>

          {/* Center: tags + title + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Tags */}
            {tags.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      display: "flex",
                      padding: "6px 18px",
                      borderRadius: 100,
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      fontFamily: "sans-serif",
                      fontSize: 16,
                      color: "#3B82F6",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontFamily: "sans-serif",
                fontSize: 52,
                fontWeight: 700,
                color: "#F8FAFC",
                margin: 0,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: 950,
              }}
            >
              {truncatedTitle}
            </h1>

            {/* Description */}
            {truncatedDesc && (
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  color: "#94A3B8",
                  margin: 0,
                  lineHeight: 1.5,
                  maxWidth: 860,
                }}
              >
                {truncatedDesc}
              </p>
            )}
          </div>

          {/* Bottom: author + reading time */}
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
              {author}
              {readingTime != null ? ` · ${readingTime} Min. Lesezeit` : ""}
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

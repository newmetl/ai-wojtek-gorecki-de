import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Wrench,
  Mail,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const ogTitle = `${post.title} — Wojtek Gorecki`;
  const siteUrl = "https://ai.wojtek-gorecki.de";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Wojtek Gorecki`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: ogTitle,
      description: post.description,
      type: "article",
      url: postUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/images/og/blog-default.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: post.description,
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://ai.wojtek-gorecki.de/cv",
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    publisher: {
      "@type": "Person",
      name: post.author,
      url: "https://ai.wojtek-gorecki.de",
    },
    url: `https://ai.wojtek-gorecki.de/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "de",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle Beiträge
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-foreground sm:text-4xl leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted border-t border-b border-white/10 py-4">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>
                  <span className="text-foreground font-medium">{post.author}</span>
                  {post.authorTitle && (
                    <span className="text-muted"> · {post.authorTitle}</span>
                  )}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTimeMinutes} Min. Lesezeit
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Block */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-card p-8">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              Nächste Schritte
            </p>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Tools direkt ausprobieren
            </h2>
            <p className="text-muted text-sm mb-6">
              Die im Artikel erwähnten Tools — Trending AI Tech, Prompt Library und User Story
              Generator — findest du direkt auf dieser Seite.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Primary CTA */}
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                <Wrench className="h-4 w-4" />
                Zu den Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

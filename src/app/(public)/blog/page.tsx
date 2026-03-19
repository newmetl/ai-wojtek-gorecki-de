import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { BookOpen, ArrowRight, Calendar, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — KI für Product Owner | Wojtek Gorecki",
  description:
    "Artikel über KI-Tools, Methoden und Praxis für Product Owner. Praktisches Wissen aus dem Alltag eines KI-affinen POs.",
  openGraph: {
    title: "Blog — KI für Product Owner",
    description:
      "Artikel über KI-Tools, Methoden und Praxis für Product Owner.",
    type: "website",
    url: "https://ai.wojtek-gorecki.de/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Blog
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            KI für Product Owner
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Praktische Artikel über KI-Tools, Methoden und echte Anwendungsfälle —
            aus der Perspektive eines Product Owners.
          </p>
        </div>

        {/* Post List */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-4">✍️</p>
            <p className="text-xl font-semibold text-foreground">
              Noch keine Beiträge
            </p>
            <p className="text-muted mt-2 max-w-sm">
              Die ersten Artikel erscheinen bald. Schau bald wieder vorbei!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-2xl border border-white/10 bg-card p-6 transition-all hover:border-primary/40 hover:bg-card/80"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`} className="stretched-link">
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {post.description}
                </p>

                {/* Meta + CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTimeMinutes} Min. Lesezeit
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Artikel lesen
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function LatestBlogPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Aus dem Blog
            </h2>
            <p className="mt-2 text-muted">
              KI-Tools, Methoden und Praxis für Product Owner.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Alle Artikel
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-card p-5 transition-all hover:border-primary/40 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-xs leading-relaxed text-muted line-clamp-3">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-[11px] text-muted border-t border-white/10 pt-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTimeMinutes} Min.
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

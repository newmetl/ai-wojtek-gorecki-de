import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — KI und gesellschaftlicher Wandel | Wojtek Gorecki",
  description:
    "Gedanken und Perspektiven zu KI, technologischem Wandel und den Fragen, die mich dabei beschäftigen.",
  openGraph: {
    title: "Blog — Wojtek Gorecki",
    description:
      "Gedanken und Perspektiven zu KI, technologischem Wandel und den Fragen, die mich dabei beschäftigen.",
    type: "website",
    url: "https://ai.wojtek-gorecki.de/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 pt-32 pb-20 relative">
      <div className="absolute inset-0 bg-grid-pattern -z-10" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full -translate-x-1/2 -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[#1d2634]/50 rounded-full border border-[#424853]/10">
            <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
            <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-secondary">
              Artikel & Perspektiven
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Gedanken und Perspektiven
          </h1>
          <p className="text-[#a5abb8] max-w-2xl text-lg leading-relaxed">
            Artikel über KI, technologischen Wandel und die Fragen, die mich dabei beschäftigen.
          </p>
        </div>

        {/* Post List */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-5xl mb-6">✍️</p>
            <p className="font-headline text-2xl font-bold text-foreground mb-3">Noch keine Beiträge</p>
            <p className="text-[#a5abb8] max-w-sm">
              Die ersten Artikel erscheinen bald. Schau bald wieder vorbei!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative p-8 rounded-xl bg-[#121a25] border border-[#424853]/5 group-hover:bg-[#17202c] transition-colors"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-headline text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="font-headline text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  <Link href={`/blog/${post.slug}`} className="stretched-link">
                    {post.title}
                  </Link>
                </h2>

                {/* Description */}
                <p className="text-[#a5abb8] text-sm leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-[#424853]/20" />
                  <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                    {formatDate(post.publishedAt)} · {post.readingTimeMinutes} Min. Lesezeit
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

import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function LatestBlogPosts() {
  const posts = getAllPosts().slice(0, 5);

  if (posts.length === 0) return null;

  const [post1, post2, ...rest] = posts;

  return (
    <section className="py-28 px-6 md:px-12 bg-[#0c141e]/30">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-headline text-4xl font-bold mb-4 tracking-tight">
              Aus dem Blog
            </h2>
            <p className="text-[#a5abb8] max-w-md">
              Gedanken über KI, Technologie und den gesellschaftlichen Wandel.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex font-headline text-xs tracking-widest uppercase text-[#a5abb8] hover:text-secondary transition-colors border-b border-transparent hover:border-secondary pb-1"
          >
            Alle Artikel
          </Link>
        </div>

        {/* Bento Grid: 3 Spalten, 3 Reihen à 220px auf Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:[grid-auto-rows:220px]">

          {/* Post 1: 2×2 mit Bild */}
          <Link
            href={`/blog/${post1.slug}`}
            className="relative md:col-span-2 md:row-span-2 min-h-[300px] group rounded-xl overflow-hidden bg-[#0c141e] cursor-pointer block"
          >
            {post1.image ? (
              <img
                src={post1.image}
                alt={post1.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:opacity-70 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c141e] via-[#121a25] to-[#080f18]" />
                <div className="absolute inset-0 bg-grid-pattern" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080f18] via-[#080f18]/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {post1.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-headline text-[10px] tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-headline text-xl md:text-3xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                {post1.title}
              </h3>
              <p className="text-[#a5abb8] text-sm leading-relaxed line-clamp-2 mb-3">
                {post1.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="font-headline text-[10px] text-[#a5abb8]/50 tracking-widest uppercase">
                  {formatDate(post1.publishedAt)} · {post1.readingTimeMinutes} Min.
                </span>
                <div className="h-px flex-1 bg-[#424853]/20" />
                <span className="font-headline text-[10px] text-primary/0 group-hover:text-primary/80 tracking-widest uppercase transition-colors duration-300">
                  Lesen →
                </span>
              </div>
            </div>
          </Link>

          {/* Post 2: 1×2 ohne Bild */}
          {post2 && (
            <Link
              href={`/blog/${post2.slug}`}
              className="md:col-span-1 md:row-span-2 min-h-[200px] group flex flex-col p-6 md:p-8 rounded-xl bg-[#17202c]/40 border border-[#424853]/10 hover:border-primary/30 backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              <span className="font-headline text-[10px] tracking-[0.2em] text-primary uppercase mb-4 block">
                {post2.tags[0]}
              </span>
              <h4 className="font-headline text-lg md:text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                {post2.title}
              </h4>
              <p className="text-[#a5abb8] text-sm leading-relaxed line-clamp-3 mb-6">
                {post2.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                  {post2.readingTimeMinutes} Min.
                </span>
                <span className="font-headline text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                  →
                </span>
              </div>
            </Link>
          )}

          {/* Posts 3–5: 1×1 */}
          {rest.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-5 rounded-xl bg-[#121a25] border border-[#424853]/5 hover:bg-[#17202c] transition-colors cursor-pointer"
            >
              <span className="font-headline text-[10px] tracking-[0.2em] text-primary uppercase mb-3 block">
                {post.tags[0]}
              </span>
              <h4 className="font-headline text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-[#a5abb8] text-xs leading-relaxed line-clamp-2 mt-2 flex-1">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-[#424853]/20" />
                <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                  {post.readingTimeMinutes} Min.
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="font-headline text-xs tracking-widest uppercase text-[#a5abb8] hover:text-secondary transition-colors"
          >
            Alle Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function LatestBlogPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

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

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col p-8 rounded-xl bg-[#121a25] border border-[#424853]/5 group-hover:bg-[#17202c] transition-colors"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-headline text-[10px] tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-secondary transition-colors leading-tight">
                {post.title}
              </h3>

              {/* Description */}
              <p className="flex-1 text-sm leading-relaxed text-[#a5abb8] mb-6 line-clamp-3">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-[#424853]/20" />
                <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                  {formatDate(post.publishedAt)}
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

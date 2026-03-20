import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";

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

      <main className="flex-1 pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid-pattern -z-10" />

        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-headline text-xs tracking-widest uppercase text-[#a5abb8] hover:text-primary transition-colors mb-12"
          >
            ← Alle Beiträge
          </Link>

          {/* Hero Image */}
          {post.image && (
            <div className="relative w-full rounded-xl overflow-hidden mb-12 bg-[#0c141e]" style={{ aspectRatio: "21/9" }}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover opacity-60 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080f18] via-transparent to-transparent" />
            </div>
          )}

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-headline text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-[#a5abb8] text-xl leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-[#424853]/20" />
              <span className="font-headline text-[10px] text-[#a5abb8]/40 tracking-widest uppercase">
                {post.author} · {formatDate(post.publishedAt)} · {post.readingTimeMinutes} Min. Lesezeit
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Block */}
          <div className="mt-16 p-8 rounded-xl bg-[#17202c] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-primary mb-4 block">
              Nächste Schritte
            </span>
            <h2 className="font-headline text-2xl font-bold mb-3">Mehr entdecken</h2>
            <p className="text-[#a5abb8] text-sm mb-8">
              Trending AI Tech — wöchentlich kuratierte KI-Technologien.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/trending-ai"
                className="group flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md font-headline font-bold text-sm hover:bg-primary transition-colors duration-300"
              >
                Trending AI Tech
              </Link>
              <Link
                href="/kontakt"
                className="font-headline text-sm tracking-widest text-[#a5abb8] hover:text-secondary transition-colors uppercase border-b border-transparent hover:border-secondary pb-1 self-center"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

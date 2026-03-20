import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background: Grid Pattern + Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-40 w-full">
        <div className="max-w-4xl">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-[#1d2634]/50 rounded-full border border-[#424853]/10">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-primary">
              Persönliche Perspektiven zu KI & Wandel
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-10 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            KI verändert alles.
          </h1>

          {/* Subline */}
          <p className="font-sans text-xl md:text-2xl text-[#a5abb8] leading-relaxed max-w-2xl mb-12">
            Nicht nur die Tech-Branche. Hier schreibe ich über KI, technologischen
            Wandel und was das für uns als Gesellschaft bedeutet.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-8">
            <Link
              href="/trending-ai"
              className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-md font-headline font-bold text-base hover:bg-primary transition-colors duration-300"
            >
              Trending AI Tech
              <svg
                className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="font-headline text-sm tracking-widest text-[#a5abb8] hover:text-secondary transition-colors uppercase border-b border-transparent hover:border-secondary pb-1"
            >
              Zum Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

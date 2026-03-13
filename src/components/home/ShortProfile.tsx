import Image from "next/image";
import Link from "next/link";

export default function ShortProfile() {
  return (
    <section className="py-20 bg-[#1E293B]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12 max-w-3xl mx-auto">
          {/* Foto */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 to-secondary/20 blur-sm" />
            <Image
              src="/images/profile.jpg"
              alt="Wojtek Gorecki"
              width={120}
              height={120}
              className="relative rounded-full object-cover ring-2 ring-primary/30"
              priority
            />
          </div>

          {/* Text + Links */}
          <div>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ich bin{" "}
              <span className="font-semibold text-foreground">Wojtek Gorecki</span>
              {" "}— Product Owner mit Leidenschaft für KI und digitale Transformation.
              Über 15 Jahre Erfahrung in der Entwicklung digitaler Produkte, an der
              Schnittstelle von Strategie, Technologie und Führung.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/cv"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10 hover:border-white/20"
              >
                Mehr über mich
              </Link>
              <a
                href="https://www.linkedin.com/in/wojtek-gorecki/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

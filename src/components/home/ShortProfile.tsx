import Image from "next/image";
import Link from "next/link";

export default function ShortProfile() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#0c141e]/30 relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-5xl">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square max-w-xs mx-auto relative rounded-xl overflow-hidden border border-[#424853]/20">
              <Image
                src="/images/profile.jpg"
                alt="Wojtek Gorecki"
                fill
                className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            {/* Decorative corner lines */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-primary/20" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-secondary/20" />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-[#a5abb8]/60 mb-6 block">
              Der Autor
            </span>
            <h2 className="font-headline text-4xl font-bold mb-8 tracking-tight">
              KI beobachten, verstehen, einordnen.
            </h2>
            <p className="font-sans text-[#a5abb8] leading-relaxed mb-8">
              Ich bin <span className="text-foreground font-semibold">Wojtek Gorecki</span> — ich beschäftige
              mich mit KI und dem Wandel, den sie in Technologie und Gesellschaft auslöst. Hier teile
              ich meine Perspektiven, kuratiere wöchentlich die wichtigsten KI-Trends und schreibe
              über die Fragen, die mich dabei bewegen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/cv"
                className="px-5 py-2 rounded-full border border-[#424853]/20 text-xs font-headline uppercase tracking-widest hover:bg-[#17202c] transition-colors"
              >
                Mehr über mich
              </Link>
              <a
                href="https://www.linkedin.com/in/wojtek-gorecki/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-[#424853]/20 text-xs font-headline uppercase tracking-widest hover:bg-[#17202c] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

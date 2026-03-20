import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";

export const metadata: Metadata = {
  title: "Kontakt — Schreib mir",
  description:
    "Kontaktiere Wojtek Gorecki per E-Mail, LinkedIn oder buche direkt ein 60-Minuten-Gespräch auf Calendly.",
};

export default function KontaktPage() {
  return (
    <main className="relative flex-1 pt-16 min-h-screen overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-12 py-20 sm:py-28">

        {/* Headline */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-12 bg-primary" />
            <span className="font-headline text-primary tracking-[0.3em] text-[10px] uppercase">
              Direkte Verbindung
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter text-[#e8eefc] uppercase mb-5">
            Lass uns sprechen.
          </h1>
          <p className="text-[#a5abb8] max-w-xl text-lg leading-relaxed">
            Ob Projektidee, Fachfrage oder einfach ein kurzer Austausch — ich freue
            mich über Nachrichten. Der einfachste Weg ist ein direktes Gespräch über Calendly.
          </p>
        </div>

        {/* 12-col grid: Form (7) + Links (5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-headline text-sm font-bold text-[#e8eefc] tracking-widest uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              Direkt erreichbar
            </h2>
            <ContactLinks />
          </div>
        </div>

      </div>
    </main>
  );
}

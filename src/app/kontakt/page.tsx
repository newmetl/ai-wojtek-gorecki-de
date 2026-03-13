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
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Kontakt
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Lass uns sprechen.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ob Projektidee, Fachfrage oder einfach ein kurzer Austausch — ich freue
            mich über Nachrichten. Der einfachste Weg ist ein direktes Gespräch über
            Calendly.
          </p>
        </div>

        {/* Zwei-Spalten-Layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Linke Spalte: Direkte Links */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-5">
              Direkt erreichbar
            </h2>
            <ContactLinks />
          </div>

          {/* Rechte Spalte: Formular */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-5">
              Oder schreib mir
            </h2>
            <ContactForm />
          </div>
        </div>

      </div>
    </main>
  );
}

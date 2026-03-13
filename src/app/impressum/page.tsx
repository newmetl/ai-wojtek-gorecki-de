import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl font-bold text-foreground mb-10">Impressum</h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Wojtek Gorecki
              {/* TODO: Straße und Hausnummer ergänzen */}
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ] [Stadt]
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Kontakt</h2>
            <p>
              {/* TODO: Telefonnummer und E-Mail-Adresse ergänzen */}
              E-Mail:{" "}
              <a href="mailto:wojtek@gorecki.io" className="text-primary hover:underline">
                wojtek@gorecki.io
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Umsatzsteuer-ID
            </h2>
            <p>
              {/* TODO: USt-IdNr. ergänzen falls vorhanden */}
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              [USt-IdNr. falls vorhanden, sonst diesen Abschnitt entfernen]
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Wojtek Gorecki
              <br />
              [Adresse wie oben]
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Haftungsausschluss</h2>
            <h3 className="font-medium text-foreground mb-1">Haftung für Inhalte</h3>
            <p className="mb-4">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
              keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG
              für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich.
            </p>
            <h3 className="font-medium text-foreground mb-1">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
              wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
              keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
              jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
              bzw. Erstellers.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

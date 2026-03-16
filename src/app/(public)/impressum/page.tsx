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
              Adalbert Gorecki
              <br />
              Holtroper Straße 3f
              <br />
              50129 Bergheim
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Kontakt</h2>
            <p>
              Telefon:{" "}
              <a href="tel:+491632787167" className="text-primary hover:underline">
                +49 163 2787167
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:hallo@wojtek-gorecki.de" className="text-primary hover:underline">
                hallo@wojtek-gorecki.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
              (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">Haftungsausschluss</h2>
            <h3 className="font-medium text-foreground mb-1">Haftung für Inhalte</h3>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
              forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
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

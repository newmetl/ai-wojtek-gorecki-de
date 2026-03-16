import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="flex-1 pt-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl font-bold text-foreground mb-10">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
              werden können.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">2. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der DSGVO ist:
              <br /><br />
              Adalbert Gorecki
              <br />
              Holtroper Straße 3f
              <br />
              50129 Bergheim
              <br />
              E-Mail:{" "}
              <a href="mailto:hallo@wojtek-gorecki.de" className="text-primary hover:underline">
                hallo@wojtek-gorecki.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">3. Hosting</h2>
            <p>
              Diese Website wird bei Hostinger gehostet. Beim Besuch der Website werden
              automatisch technische Verbindungsdaten erhoben. Dies ist für den Betrieb
              technisch erforderlich (Art. 6 Abs. 1 lit. f DSGVO). Der Server befindet sich
              in der EU.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">4. Kontaktformular</h2>
            <p>
              Ihre Angaben im Kontaktformular (Name, E-Mail, Nachricht) werden zur
              Bearbeitung der Anfrage über{" "}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Formspree
              </a>{" "}
              übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden
              nicht für andere Zwecke verwendet und nach Abschluss der Anfrage gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">5. Cookies</h2>
            <p>
              Diese Website verwendet <strong className="text-foreground">keine Cookies</strong>{" "}
              für Tracking oder Marketing. Das eingesetzte Analytics-Tool (Umami) arbeitet
              komplett cookiefrei und speichert keine personenbezogenen Daten.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">6. Analytics (Umami)</h2>
            <p>
              Diese Website nutzt Umami, ein datenschutzfreundliches Web-Analytics-Tool.
              Umami setzt keine Cookies, speichert keine personenbezogenen Daten und ist
              vollständig DSGVO-konform. Die Daten werden auf einem selbstgehosteten Server
              verarbeitet und nicht an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">7. Externe Links</h2>
            <p>
              Diese Website enthält Links zu externen Diensten (LinkedIn, Calendly, WhatsApp,
              Telegram). Beim Klick auf diese Links gelten die jeweiligen
              Datenschutzbestimmungen der Anbieter.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">8. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen
              die Verarbeitung Ihrer gespeicherten personenbezogenen Daten.
            </p>
            <p>
              Für Anfragen zu Ihren Datenschutzrechten wenden Sie sich an:{" "}
              <a href="mailto:hallo@wojtek-gorecki.de" className="text-primary hover:underline">
                hallo@wojtek-gorecki.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              9. Aktualität dieser Datenschutzerklärung
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

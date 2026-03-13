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
            <h2 className="text-base font-semibold text-foreground mb-3">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              <br /><br />
              Wojtek Gorecki
              <br />
              {/* TODO: Adresse ergänzen */}
              [Adresse]
              <br />
              E-Mail:{" "}
              <a href="mailto:wojtek@gorecki.io" className="text-primary hover:underline">
                wojtek@gorecki.io
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <h3 className="font-medium text-foreground mb-1">Server-Logfiles</h3>
            <p className="mb-4">
              Beim Aufruf dieser Website werden automatisch Informationen an den Server
              übermittelt, die Ihr Browser mitsendet. Dies sind: Browsertyp/-version,
              verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
              Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind nicht bestimmten
              Personen zuordenbar und werden nach 7 Tagen gelöscht.
            </p>
            <h3 className="font-medium text-foreground mb-1">Kontaktformular</h3>
            <p>
              Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben (Name, E-Mail,
              Nachricht) zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen
              gespeichert. Diese Daten werden an{" "}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Formspree
              </a>{" "}
              (USA) übermittelt und nach Abschluss der Anfrage gelöscht. Rechtsgrundlage:
              Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">3. Cookies</h2>
            <p>
              Diese Website verwendet <strong className="text-foreground">keine Cookies</strong> für
              Tracking oder Marketing. Das eingesetzte Analytics-Tool (Umami) arbeitet
              komplett ohne Cookies und speichert keine personenbezogenen Daten.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">4. Analytics (Umami)</h2>
            <p>
              Diese Website nutzt Umami, ein datenschutzfreundliches, cookiefreies
              Web-Analytics-Tool. Umami speichert keine personenbezogenen Daten und setzt
              keine Cookies. Die Daten werden auf einem selbstgehosteten Server in
              Deutschland verarbeitet und nicht an Dritte weitergegeben. Es werden
              ausschließlich anonymisierte Seitenaufrufe und Interaktionen erfasst.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">5. Hosting</h2>
            <p>
              Diese Website wird auf einem VPS von{" "}
              <a
                href="https://hostinger.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hostinger
              </a>{" "}
              gehostet. Der Server befindet sich in der EU. Beim Aufruf der Website werden
              automatisch Verbindungsdaten an den Hosting-Server übermittelt
              (vgl. Server-Logfiles).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">6. Ihre Rechte</h2>
            <p className="mb-4">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
              Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenn Sie der Ansicht sind,
              dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können
              Sie sich bei der zuständigen Aufsichtsbehörde beschweren.
            </p>
            <p>
              Für Anfragen zu Ihren Datenschutzrechten wenden Sie sich bitte an:{" "}
              <a href="mailto:wojtek@gorecki.io" className="text-primary hover:underline">
                wojtek@gorecki.io
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">
              7. Aktualität dieser Datenschutzerklärung
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026.
              {/* TODO: Datum bei Änderungen aktualisieren */}
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

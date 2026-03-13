// Datenschutz — Wird in Schritt 3 implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">Datenschutz — Schritt 3</p>
    </main>
  );
}

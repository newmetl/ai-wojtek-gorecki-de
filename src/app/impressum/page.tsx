// Impressum — Wird in Schritt 3 implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">Impressum — Schritt 3</p>
    </main>
  );
}

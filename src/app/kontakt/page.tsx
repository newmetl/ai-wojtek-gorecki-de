// Kontakt — Wird in Schritt 3 implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Schreib mir",
};

export default function KontaktPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">Kontakt — Schritt 3</p>
    </main>
  );
}

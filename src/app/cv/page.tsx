// About Me / CV — Wird in Schritt 3 implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me — Wojtek Gorecki, Product Owner",
  description:
    "Lebenslauf und Profil von Wojtek Gorecki — Product Owner und Digitalexperte mit Fokus auf KI-Integration.",
};

export default function CVPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">About Me / CV — Schritt 3</p>
    </main>
  );
}

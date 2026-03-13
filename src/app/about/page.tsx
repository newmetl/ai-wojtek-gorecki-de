// About this Page — Wird in Schritt 3 implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About this Page — Wie diese Seite entstanden ist",
};

export default function AboutPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">About this Page — Schritt 3</p>
    </main>
  );
}

// Tools-Übersicht — Wird in Schritt 3 (Statische Seiten) implementiert
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — Meine KI-Tools für Product Owner",
};

export default function ToolsPage() {
  return (
    <main className="flex-1 p-8">
      <p className="text-foreground">Tools-Übersicht — Schritt 3</p>
    </main>
  );
}

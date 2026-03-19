export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  publishedAt: string; // ISO date string (YYYY-MM-DD)
  updatedAt?: string;
  readingTimeMinutes: number;
  tags: string[];
  content: string; // HTML string
}

// ─── Blog Posts ───
// Format: HTML-String als Inhalt.
// Neue Posts einfach zum Array hinzufügen — sortiert nach Datum (neueste zuerst).

export const blogPosts: BlogPost[] = [
  {
    slug: "warum-product-owner-ki-verstehen-muessen",
    title: "Warum jeder Product Owner KI verstehen muss — und wie man damit anfängt",
    description:
      "KI verändert die Arbeit von Product Ownern grundlegend. Dieser Beitrag zeigt, welche Bereiche betroffen sind, welche Tools wirklich helfen und wie du als PO den Einstieg findest — ohne Informatikstudium.",
    author: "Wojtek Gorecki",
    authorTitle: "Product Owner & KI-Enthusiast",
    publishedAt: "2026-03-19",
    readingTimeMinutes: 7,
    tags: ["Product Owner", "KI", "Tools", "Backlog", "User Stories"],
    content: `
<p class="lead">
  KI ist längst kein Hype mehr — sie ist Werkzeug. Und wie jedes gute Werkzeug entscheidet die Frage
  nicht ob man es nutzt, sondern wie gut. Für Product Owner bedeutet das: Wer KI versteht,
  arbeitet schneller, trifft bessere Entscheidungen und kann sein Team fundiert beraten. Wer es nicht tut,
  gibt diesen Vorsprung an andere ab.
</p>

<p>
  Dieser Beitrag ist kein technisches Deep-Dive. Er ist ein praktischer Einstieg — aus der Perspektive
  eines POs für POs.
</p>

<h2>1. Backlog Refinement: Der größte Zeithebel</h2>

<p>
  Schätz mal, wie viele Stunden du pro Woche mit dem Formulieren, Verfeinern und Diskutieren von
  User Stories verbringst. Für die meisten POs sind es zwischen vier und acht Stunden. Viel davon
  ist repetitiv: Akzeptanzkriterien strukturieren, Scope abgrenzen, Formulierungen kalibrieren.
</p>

<p>
  Genau hier greift KI am wirkungsvollsten an. Ein guter Prompt — zum Beispiel "Erstelle User Stories
  im Format 'Als … möchte ich … damit …' für das Feature XY mit diesen Rahmenbedingungen: …" —
  liefert in Sekunden einen strukturierten Entwurf. Den kannst du dann reviewen, korrigieren, mit
  dem Team diskutieren. Du startest nicht mehr bei Null.
</p>

<p>
  Der entscheidende Punkt: KI ersetzt nicht die fachliche Einschätzung. Sie übernimmt die Mechanik,
  damit du dich auf das Wesentliche konzentrieren kannst.
</p>

<h2>2. Markt- und Wettbewerbsanalyse auf Knopfdruck</h2>

<p>
  Als PO triffst du Priorisierungsentscheidungen — und die brauchen Kontext. Was machen Wettbewerber?
  Was erwarten Nutzer? Was ist der Markttrend? Früher bedeutete das: stundenlanges Googeln,
  Artikel lesen, Zusammenfassen. Heute kannst du Rechercheergebnisse in strukturierte Übersichten
  verwandeln lassen, Bewertungen aus App Stores analysieren oder Wettbewerbsvergleiche generieren.
</p>

<p>
  Wichtig dabei: KI-generierte Zusammenfassungen sind ein Ausgangspunkt, kein Ergebnis. Quellen prüfen,
  kritisch lesen — das bleibt deine Aufgabe. Aber der erste Draft entsteht in Minuten statt Stunden.
</p>

<h2>3. Sprint Planning: Kommunikation verbessern</h2>

<p>
  Sprint Goals, Stakeholder-Updates, Release Notes — das sind Texte, die POs regelmäßig schreiben
  und die oft mehr Zeit kosten als sie sollten. KI ist ein hervorragender Ghostwriter: Du lieferst
  die Fakten, sie liefert die Form.
</p>

<p>
  Ein Beispiel: "Schreibe eine knappe Zusammenfassung für Stakeholder, was wir in Sprint 42
  erreicht haben. Fertiggestellt wurden: [Liste]. Nicht fertig wurde: [Liste]. Geplant für Sprint 43: [Liste]."
  Das Ergebnis ist kein Copy-Paste, aber ein solider erster Entwurf, den du in fünf Minuten
  finalisierst statt in dreißig schreibst.
</p>

<h2>4. KI-Literacy als Kernkompetenz</h2>

<p>
  Es reicht nicht, KI-Tools zu nutzen. Als PO, der über Features und Roadmaps entscheidet,
  musst du verstehen, was KI kann — und was nicht. Welche Probleme lassen sich mit LLMs lösen?
  Wo braucht man Computer Vision? Was kostet Inference, und warum ist das für die Make-or-Buy-Entscheidung
  relevant?
</p>

<p>
  Das klingt nach viel — ist es aber nicht. Es geht nicht darum, Modelle zu trainieren.
  Es geht darum, die richtigen Fragen stellen zu können, wenn dein Entwicklungsteam über
  KI-Features spricht. Diese Grundlage kannst du dir in wenigen Wochen erarbeiten.
</p>

<h2>5. Wo anfangen?</h2>

<p>
  Die ehrliche Antwort: Einfach ausprobieren. Öffne ein KI-Tool deiner Wahl und nutze es
  für die nächste User Story, die nächste Zusammenfassung, die nächste Recherche. Du wirst
  schnell ein Gefühl dafür bekommen, wo KI hilft — und wo du lieber selbst formulierst.
</p>

<p>
  Konkrete Einstiegspunkte:
</p>

<ul>
  <li>
    <strong>Trending AI Tech</strong> — diese Seite aggregiert und kategorisiert wöchentlich
    die relevantesten KI-Entwicklungen. Ein guter Überblick, ohne stundenlang zu recherchieren.
  </li>
  <li>
    <strong>Prompt Library</strong> (coming soon) — kuratierte Prompts speziell für POs:
    User Stories, Sprint Goals, Stakeholder-Kommunikation.
  </li>
  <li>
    <strong>User Story Generator</strong> (coming soon) — strukturierte User Stories aus
    einer kurzen Feature-Beschreibung, inklusive Akzeptanzkriterien.
  </li>
</ul>

<h2>Fazit</h2>

<p>
  KI-Kompetenz ist für Product Owner keine Kür mehr — sie ist Pflicht. Nicht weil man
  alles selbst bauen muss, sondern weil man bessere Entscheidungen trifft, effizienter
  arbeitet und fundierter kommuniziert. Der Einstieg ist niedrigschwelliger als du denkst.
</p>

<p>
  Start small, iterate fast — das gilt für Features und für den eigenen KI-Einstieg gleichermaßen.
</p>
    `.trim(),
  },
];

// ─── Helper Functions ───

export type BlogPostPreview = Omit<BlogPost, "content">;

export function getAllPosts(): BlogPostPreview[] {
  return blogPosts
    .map(({ content: _content, ...rest }) => rest)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

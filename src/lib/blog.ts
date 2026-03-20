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
  image?: string; // Optionales Titelbild (URL oder /images/blog/... Pfad)
  content: string; // HTML string
}

// ─── Blog Posts ───
// Format: HTML-String als Inhalt.
// Neue Posts einfach zum Array hinzufügen — sortiert nach Datum (neueste zuerst).

export const blogPosts: BlogPost[] = [
  {
    slug: "wenn-algorithmen-entscheiden",
    title: "Wenn Algorithmen entscheiden: Wer trägt die Verantwortung?",
    description:
      "KI-Systeme treffen täglich Millionen von Entscheidungen — über Kredite, Jobbewerbungen, medizinische Diagnosen. Die technische Frage ist längst beantwortet. Die gesellschaftliche noch nicht.",
    author: "Wojtek Gorecki",
    authorTitle: "KI & Gesellschaft",
    publishedAt: "2026-03-15",
    readingTimeMinutes: 9,
    tags: ["Gesellschaft", "KI-Ethik", "Regulierung"],
    image: "https://picsum.photos/seed/algorithmen/1400/788",
    content: `
<p class="lead">
  Ein Algorithmus lehnt deinen Kreditantrag ab. Ein anderer sortiert deinen Lebenslauf aus, bevor ihn ein Mensch gesehen hat.
  Ein drittes System empfiehlt dem Arzt, welche Behandlung er einleiten soll. Wer ist verantwortlich, wenn diese Entscheidungen falsch sind?
</p>

<p>
  Diese Frage ist nicht neu — aber sie wird dringender. Denn die Systeme werden besser, schneller und
  schwerer durchschaubar. Gleichzeitig wächst ihr Einfluss auf Lebensbereiche, in denen Fehler echte Konsequenzen haben.
</p>

<h2>Das Verantwortungs-Vakuum</h2>

<p>
  Das klassische Recht kennt klare Verantwortungsträger: Hersteller, Betreiber, Nutzer. Bei KI-Systemen
  verschwimmt das. Ein Modell wird von Unternehmen A trainiert, von Unternehmen B angepasst, von
  Unternehmen C eingesetzt — und trifft Entscheidungen, die Unternehmen D betreffen.
</p>

<p>
  Der EU AI Act versucht, dieses Vakuum zu schließen. Er unterscheidet nach Risikostufen und
  schreibt vor, wer bei Hochrisikoanwendungen wie Kreditvergabe oder Strafverfolgung dokumentieren,
  prüfen und haften muss. Das ist ein Anfang. Aber kein Abschluss.
</p>

<h2>Transparenz als Grundbedingung</h2>

<p>
  Verantwortung setzt Nachvollziehbarkeit voraus. Ein System, das keine Erklärung für seine Entscheidung
  liefert, entzieht sich jeder sinnvollen Kontrolle. "Explainable AI" ist deshalb kein technisches
  Nice-to-have — es ist eine gesellschaftliche Notwendigkeit.
</p>

<p>
  Das Problem: Die leistungsfähigsten Modelle sind oft die intransparentesten. Large Language Models
  können erklären, warum sie etwas sagen — aber diese Erklärung ist selbst eine Generierung, keine
  echte Einblick in den Entscheidungsprozess.
</p>

<h2>Was das für uns bedeutet</h2>

<p>
  Wir müssen aufhören, KI-Systeme als neutrale Werkzeuge zu betrachten. Sie sind das Ergebnis von
  Entscheidungen: Welche Daten? Welches Ziel? Welcher Trade-off? Diese Entscheidungen treffen Menschen —
  und Menschen können dafür zur Verantwortung gezogen werden.
</p>

<p>
  Die gesellschaftliche Aufgabe ist, diese Rechenschaftspflicht strukturell zu verankern: in Gesetzen,
  in Unternehmensstrukturen, in der Ausbildung derjenigen, die solche Systeme bauen und einsetzen.
</p>
    `.trim(),
  },
  {
    slug: "ki-und-arbeit-was-wirklich-passiert",
    title: "KI und Arbeit: Was wirklich passiert — und was nicht",
    description:
      "Werden Roboter alle Jobs übernehmen? Die Realität ist komplizierter als Apokalypse oder Euphorie. Ein nüchterner Blick auf das, was KI tatsächlich mit Arbeit macht.",
    author: "Wojtek Gorecki",
    authorTitle: "KI & Gesellschaft",
    publishedAt: "2026-03-08",
    readingTimeMinutes: 6,
    tags: ["Arbeit", "Automatisierung", "Gesellschaft"],
    image: "https://picsum.photos/seed/arbeit/1400/788",
    content: `
<p class="lead">
  Seit Jahren begleiten uns zwei Narrative: das apokalyptische ("KI nimmt uns alle Jobs weg")
  und das euphemistische ("KI schafft nur neue, bessere Jobs"). Beide sind zu simpel.
</p>

<p>
  Was wirklich passiert, ist differenzierter — und deshalb schwerer zu kommunizieren. Es lohnt sich trotzdem.
</p>

<h2>Was KI wirklich automatisiert</h2>

<p>
  KI automatisiert keine Jobs, sondern Aufgaben. Das ist ein wichtiger Unterschied. Fast jeder Beruf
  besteht aus einer Mischung von Tätigkeiten — einige davon sind gut automatisierbar, andere nicht.
</p>

<p>
  Automatisierbar sind vor allem repetitive kognitive Aufgaben: Dokumente klassifizieren, Muster
  in Daten erkennen, Standardtexte erstellen. Schwer automatisierbar bleiben: komplexes Urteilsvermögen,
  Empathie, physische Geschicklichkeit in unstrukturierten Umgebungen.
</p>

<h2>Die Verteilungsfrage</h2>

<p>
  Wenn Produktivität steigt, stellt sich immer die Frage: Wer profitiert? Historisch war die
  Antwort auf die Industrialisierung: langfristig viele, kurzfristig einige. Ob das diesmal
  wieder so ist, hängt von politischen Entscheidungen ab — nicht von technischen.
</p>

<p>
  Ein Beispiel: Wenn ein KI-System die Arbeit eines Sachbearbeiters auf ein Drittel reduziert,
  kann das Unternehmen drei Mal so viele Kunden betreuen — oder zwei Drittel der Stellen streichen.
  Beides ist möglich. Was passiert, entscheidet nicht die KI.
</p>

<h2>Worauf es ankommt</h2>

<p>
  Die nüchterne Einschätzung: Es wird Berufe geben, die wegfallen. Es wird neue geben.
  Der Übergang wird für einige Menschen hart sein — besonders für diejenigen, deren Tätigkeiten
  stark automatisierbar sind und die keine einfachen Alternativen haben.
</p>

<p>
  Darauf müssen wir uns vorbereiten: mit Weiterbildungssystemen, sozialen Sicherungsnetzen
  und einer ehrlichen Debatte darüber, wie wir Produktivitätsgewinne verteilen wollen.
</p>
    `.trim(),
  },
  {
    slug: "das-tempo-problem",
    title: "Das Tempo-Problem: Wenn Technologie schneller ist als Gesellschaft",
    description:
      "KI entwickelt sich rasant. Unsere gesellschaftlichen, rechtlichen und ethischen Strukturen nicht. Warum diese Lücke gefährlich ist — und wie wir sie schließen könnten.",
    author: "Wojtek Gorecki",
    authorTitle: "KI & Gesellschaft",
    publishedAt: "2026-02-28",
    readingTimeMinutes: 8,
    tags: ["Gesellschaft", "Regulierung", "Zukunft"],
    content: `
<p class="lead">
  Es gibt eine Grundspannung im technologischen Wandel: Neue Technologien entstehen in Monaten.
  Gesetze, Normen, Institutionen — sie brauchen Jahre. Diese Lücke ist keine Kleinigkeit. Sie ist
  der Raum, in dem unregulierte Macht entsteht.
</p>

<h2>Das konkrete Problem</h2>

<p>
  Nehmen wir Deepfakes. Die Technologie, überzeugende gefälschte Videos zu erstellen, wurde
  innerhalb weniger Jahre von einem Forschungsprojekt zum Massenphänomen. Gesetze, die
  Deepfakes in bestimmten Kontexten verbieten, kamen — wenn überhaupt — Jahre später.
  In dieser Zwischenzeit entstand echter Schaden.
</p>

<p>
  Dasselbe Muster sehen wir bei sozialen Medien, bei algorithmischen Empfehlungssystemen,
  bei automatisierten Handelssystemen. Die Technologie ist da, bevor wir verstehen, was sie
  mit uns macht.
</p>

<h2>Warum das so ist</h2>

<p>
  Technologische Entwicklung hat starke Anreize: Wettbewerbsdruck, Risikokapital, der
  Reiz des Neuen. Regulierung hat schwache: Sie ist langsam, komplex, und ihre Wirkung
  ist oft erst im Nachhinein sichtbar.
</p>

<p>
  Hinzu kommt das Expertise-Problem. Um KI-Systeme regulieren zu können, muss man sie
  einigermaßen verstehen. Dieses Verständnis ist in Parlamenten und Behörden selten —
  in Unternehmen dagegen konzentriert.
</p>

<h2>Was hilft</h2>

<p>
  Es gibt keine einfache Antwort. Aber einige Ansätze, die in die richtige Richtung zeigen:
  Regulierung, die auf Prinzipien statt auf spezifische Technologien setzt. Aufsichtsbehörden
  mit echtem technischen Know-how. Und eine breitere gesellschaftliche Debatte — die nicht
  Experten überlassen werden kann.
</p>

<p>
  Das letzte Argument ist das wichtigste: KI ist zu bedeutsam, um sie nur Ingenieuren und
  Investoren zu überlassen. Sie formt unsere Gesellschaft. Deshalb müssen wir alle mitreden —
  informiert, kritisch und ohne falsche Bescheidenheit.
</p>
    `.trim(),
  },
  {
    slug: "kuratieren-als-kompetenz",
    title: "Kuratieren als Kompetenz: Wie ich mit KI-Informationsflut umgehe",
    description:
      "Jeden Tag erscheinen hunderte neue KI-Meldungen. Die meisten sind Lärm. Wie ich entscheide, was relevant ist — und warum Kuratieren eine der wichtigsten Fähigkeiten der nächsten Jahre wird.",
    author: "Wojtek Gorecki",
    authorTitle: "KI & Gesellschaft",
    publishedAt: "2026-02-14",
    readingTimeMinutes: 5,
    tags: ["KI", "Medien", "Orientierung"],
    content: `
<p class="lead">
  GPT-5 ist da. Nein, GPT-5.4. Nein, eigentlich Gemini Ultra 3. Und Claude Opus übertrifft
  alles. Jeden Tag eine neue Meldung, jede mit Superlativ. Wie soll man da noch den Überblick behalten?
</p>

<p>
  Ich beschäftige mich beruflich mit KI — und auch mir fällt es schwer. Der Informationsfluss
  ist enorm, die Qualität ungleichmäßig, und die Halbwertszeit mancher "Durchbrüche" beträgt
  wenige Wochen. Trotzdem versuche ich, Orientierung zu bieten. Hier ist mein Ansatz.
</p>

<h2>Filter 1: Wer sagt es?</h2>

<p>
  Die Quelle zählt. Unternehmen kommunizieren über ihre eigenen Modelle mit Eigeninteresse.
  Journalisten mit unterschiedlichem technischen Verständnis. Forscher mit akademischen Anreizen.
  Das bedeutet nicht, dass alles unzuverlässig ist — aber es bedeutet, dass ich bei jeder
  Meldung frage: Wer hat ein Interesse daran, dass ich das glaube?
</p>

<h2>Filter 2: Was ändert sich wirklich?</h2>

<p>
  Nicht jede Modellverbesserung ist ein Paradigmenwechsel. Ich versuche zu unterscheiden:
  Ist das eine inkrementelle Verbesserung? Eine neue Anwendung einer bekannten Technologie?
  Oder ein echter Sprung? Die meisten Meldungen fallen in die erste Kategorie.
</p>

<h2>Filter 3: Was bedeutet das für echte Anwendungen?</h2>

<p>
  Benchmark-Ergebnisse sind eine Sache. Was ein Modell in der Praxis kann, eine andere.
  Ich interessiere mich weniger für abstrakte Leistungsvergleiche als für die Frage:
  Was kann ich damit jetzt tun, was ich vorher nicht konnte? Oder: Was verändert das
  für Menschen, die dieses Tool nutzen?
</p>

<h2>Warum das wichtig ist</h2>

<p>
  Kuratieren ist keine passive Tätigkeit. Es ist eine Entscheidung: Was bekommt Aufmerksamkeit,
  was nicht. Wer kuratiert, prägt, was andere für relevant halten. Diese Verantwortung
  nehme ich ernst — deshalb versuche ich, auf dieser Seite nicht alles weiterzugeben,
  sondern das, was wirklich zählt.
</p>
    `.trim(),
  },
  {
    slug: "warum-product-owner-ki-verstehen-muessen",
    image: "https://picsum.photos/seed/productowner/1400/788",
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

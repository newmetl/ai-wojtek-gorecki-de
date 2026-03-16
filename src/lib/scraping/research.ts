/**
 * Claude Research — Trending AI Tech
 *
 * Nutzt den Anthropic web_search-Tool (web_search_20260209) um aktuelle
 * KI-Technologien zu recherchieren — dieselbe Technologie wie Claude Research.
 *
 * Streaming wird verwendet, damit die Verbindung bei langen Recherchen
 * (mehrere Minuten, viele Web-Suchen) nicht abbricht.
 */

import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "@/lib/claude";
import type { RawScrapedItem } from "./types";

// Maximale Wiederholungen bei pause_turn (Server-Tool-Limit erreicht)
const MAX_CONTINUATIONS = 5;

// Modell: Opus 4.6 für beste Recherche-Qualität
const RESEARCH_MODEL = "claude-opus-4-6";

const SYSTEM_PROMPT = `Du bist ein KI-Experte und Content-Kurator für eine Plattform für Product Owner und Digital-Fachleute.

Deine Aufgabe: Recherchiere die wichtigsten und aktuellsten KI-Technologien, Tools und Entwicklungen der letzten 2–3 Wochen.

Fokus:
- Neue oder signifikant aktualisierte LLMs und Foundation Models
- Coding-Assistenten und Developer-Tools mit KI-Bezug
- Bild-, Video- und Audio-Generierung
- KI-Agenten und Automatisierungs-Frameworks
- Relevante Forschungsdurchbrüche (besonders anwendungsnah)
- Infrastruktur, MLOps und Deployment-Tools

Qualitätskriterien:
- Nur echte Neuigkeiten oder signifikante Updates (kein Evergreen-Content)
- Praktische Relevanz für Product Owner und Tech-Entscheider
- Quellen: Offizielle Ankündigungen, Tech-Blogs, GitHub, arXiv, ProductHunt

Antworte AUSSCHLIESSLICH mit einem JSON-Array. Kein Text davor oder danach.`;

const USER_PROMPT = `Recherchiere bitte 20–30 der wichtigsten KI-Trends und Technologien der letzten 2–3 Wochen.

Durchsuche mehrere Quellen (Tech-News, GitHub, offizielle Blogs, arXiv) und gib die Ergebnisse in diesem Format zurück:

[
  {
    "name": "Exakter Name der Technologie/Tool/Paper",
    "description": "Kurze englische Beschreibung (1-2 Sätze, sachlich, was es ist und warum es relevant ist)",
    "url": "Direkter Link zur offiziellen Seite, GitHub-Repo oder Ankündigung",
    "sourceName": "github" | "blog" | "arxiv" | "producthunt" | "web"
  }
]

Wichtig: Nur JSON, kein erklärender Text.`;

type WebSearchTool = { type: "web_search_20260209"; name: "web_search" };
type WebFetchTool = { type: "web_fetch_20260209"; name: "web_fetch" };

const TOOLS: (WebSearchTool | WebFetchTool)[] = [
  { type: "web_search_20260209", name: "web_search" },
  { type: "web_fetch_20260209", name: "web_fetch" },
];

/**
 * Führt eine einzelne Recherche-Runde aus und gibt die finale Message zurück.
 * Nutzt Streaming damit die Verbindung bei langen Recherchen (mehrere Minuten)
 * nicht abbricht — hält die TCP-Verbindung mit kontinuierlichen Events am Leben.
 */
async function runResearchRound(
  messages: Anthropic.MessageParam[]
): Promise<Anthropic.Message> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = (anthropic.messages as any).stream({
    model: RESEARCH_MODEL,
    max_tokens: 8096,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    messages,
  });

  // Fortschritt loggen während Claude recherchiert
  stream.on("text", (text: string) => {
    if (text.trim()) {
      process.stdout.write(".");
    }
  });

  // finalMessage() wartet auf den vollständigen Response via Streaming
  const finalMessage = await stream.finalMessage();
  process.stdout.write("\n");
  return finalMessage;
}

/**
 * Recherchiert aktuelle Trending-AI-Tech mit Claude + web_search.
 * Gibt RawScrapedItems zurück, die dann durch dedup + categorize laufen.
 */
export async function researchTrendingAI(): Promise<RawScrapedItem[]> {
  console.log("[research] Starte Claude Research für Trending AI Tech...");

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: USER_PROMPT },
  ];

  let response = await runResearchRound(messages);

  // pause_turn-Handling: Wenn der Server-Tool-Loop das Limit (10 Iterationen)
  // erreicht, gibt die API pause_turn zurück → weitermachen
  let continuations = 0;
  while ((response.stop_reason as string) === "pause_turn" && continuations < MAX_CONTINUATIONS) {
    console.log(`[research] pause_turn — setze fort (${continuations + 1}/${MAX_CONTINUATIONS})`);
    messages.push({ role: "assistant", content: response.content });
    response = await runResearchRound(messages);
    continuations++;
  }

  // JSON aus der Antwort extrahieren
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("[research] Keine Text-Antwort von Claude erhalten");
  }

  const rawText = textBlock.text;
  console.log(`[research] Antwort (erste 300 Zeichen): ${rawText.slice(0, 300)}`);

  // Robustes JSON-Parsing: mehrere Muster probieren
  // 1. Markdown-Codeblock: ```json [...] ``` oder ``` [...] ```
  // 2. Direktes Array: [...]
  // 3. Objekt mit items-Key: {"items": [...]}
  let jsonStr: string | null = null;

  const codeBlockMatch = rawText.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1];
  } else {
    // Letztes vollständiges Array-Fragment suchen (greedy, von hinten)
    const arrayMatch = rawText.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      jsonStr = arrayMatch[0];
    } else {
      // Objekt mit items-Array
      const objMatch = rawText.match(/"items"\s*:\s*(\[[\s\S]*?\])/);
      if (objMatch) jsonStr = objMatch[1];
    }
  }

  if (!jsonStr) {
    console.error("[research] Vollständige Antwort:", rawText);
    throw new Error("[research] Kein JSON-Array in Claude-Antwort gefunden");
  }

  const parsed = JSON.parse(jsonStr) as Array<{
    name: string;
    description: string;
    url: string;
    sourceName: string;
  }>;

  const items: RawScrapedItem[] = parsed
    .filter((item) => item.name && item.description && item.url)
    .map((item) => ({
      name: item.name.trim(),
      description: item.description.trim(),
      url: item.url.trim(),
      sourceName: item.sourceName || "web",
    }));

  console.log(`[research] ${items.length} Items recherchiert (${continuations} Fortsetzungen)`);
  return items;
}

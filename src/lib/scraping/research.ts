/**
 * Claude Research — Trending AI Tech
 *
 * Zwei-Schritt-Ansatz für maximale Zuverlässigkeit:
 *
 * Schritt 1 (Research): Claude + web_search recherchiert frei als Markdown-Text.
 *   Kein JSON-Zwang — lässt Claude natürlich arbeiten. Streaming gegen Timeouts.
 *
 * Schritt 2 (Strukturierung): Claude ohne Tools wandelt den Markdown-Text
 *   in sauberes JSON um. Strukturierte Outputs (JSON-Schema) garantieren valides JSON.
 *
 * Für Phase 2/3: researchUseCases() / researchPrompts() nach demselben Muster.
 */

import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "@/lib/claude";
import type { RawScrapedItem } from "./types";

const MAX_CONTINUATIONS = 5;
const RESEARCH_MODEL = "claude-opus-4-6";

// ─── Schritt 1: Research-Prompts ──────────────────────────────────────────

const RESEARCH_SYSTEM = `Du bist ein KI-Experte und Content-Kurator für eine Plattform für Product Owner und Digital-Fachleute.

Recherchiere die wichtigsten und aktuellsten KI-Technologien, Tools und Entwicklungen der letzten 2–3 Wochen.

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
- Quellen: Offizielle Ankündigungen, Tech-Blogs, GitHub, arXiv, ProductHunt`;

const RESEARCH_USER = `Recherchiere die 20–30 wichtigsten KI-Trends und Technologien der letzten 2–3 Wochen.

Schreibe für jedes Item:
- Name der Technologie/Tool/Paper
- Kurze Beschreibung (was es ist und warum es relevant ist)
- URL (offizielle Seite, GitHub, Ankündigung)
- Quelle (github / blog / arxiv / producthunt / web)

Durchsuche mehrere Quellen und sei präzise bei URLs.`;

// ─── Schritt 2: Strukturierungs-Prompts ──────────────────────────────────

const STRUCTURE_SYSTEM = `Du bist ein Datenextraktor. Du erhältst einen Recherche-Text über KI-Technologien
und extrahierst daraus ein strukturiertes JSON-Array. Halte dich exakt an das vorgegebene Schema.`;

type WebSearchTool = { type: "web_search_20260209"; name: "web_search" };
type WebFetchTool = { type: "web_fetch_20260209"; name: "web_fetch" };

const SEARCH_TOOLS: (WebSearchTool | WebFetchTool)[] = [
  { type: "web_search_20260209", name: "web_search" },
  { type: "web_fetch_20260209", name: "web_fetch" },
];

// ─── Schritt 1: Freitext-Recherche mit web_search ────────────────────────

/**
 * Führt die Web-Recherche mit Streaming aus.
 * Gibt den vollständigen Freitext-Response zurück (Markdown).
 */
async function runResearchRound(
  messages: Anthropic.MessageParam[]
): Promise<Anthropic.Message> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = (anthropic.messages as any).stream({
    model: RESEARCH_MODEL,
    max_tokens: 8096,
    system: RESEARCH_SYSTEM,
    tools: SEARCH_TOOLS,
    messages,
  });

  stream.on("text", (text: string) => {
    if (text.trim()) process.stdout.write(".");
  });

  const finalMessage = await stream.finalMessage();
  process.stdout.write("\n");
  return finalMessage;
}

async function runResearch(): Promise<string> {
  console.log("[research] Schritt 1: Web-Recherche mit Claude + web_search...");

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: RESEARCH_USER },
  ];

  let response = await runResearchRound(messages);

  let continuations = 0;
  while ((response.stop_reason as string) === "pause_turn" && continuations < MAX_CONTINUATIONS) {
    console.log(`[research] pause_turn — Fortsetzung ${continuations + 1}/${MAX_CONTINUATIONS}`);
    messages.push({ role: "assistant", content: response.content });
    response = await runResearchRound(messages);
    continuations++;
  }

  // Den gesamten Text aller Textblöcke zusammenfassen
  const textParts = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n\n");

  if (!textParts.trim()) {
    throw new Error("[research] Keine Textantwort nach der Recherche erhalten");
  }

  console.log(`[research] Recherche abgeschlossen (${textParts.length} Zeichen, ${continuations} Fortsetzungen)`);
  return textParts;
}

// ─── Schritt 2: Strukturierung per JSON-Schema ───────────────────────────

/**
 * Wandelt den Freitext-Research in strukturiertes JSON um.
 * Nutzt Claude ohne Tools + JSON-Schema für garantiert valide Ausgabe.
 */
async function structureResearch(researchText: string): Promise<RawScrapedItem[]> {
  console.log("[research] Schritt 2: Strukturierung in JSON...");

  const response = await anthropic.messages.create({
    model: RESEARCH_MODEL,
    max_tokens: 8096,
    system: STRUCTURE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Extrahiere alle KI-Technologien aus diesem Recherche-Text.

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt in exakt diesem Format — kein Text davor oder danach:
{"items":[{"name":"...","description":"...","url":"...","sourceName":"..."}]}

sourceName muss einer dieser Werte sein: github, blog, arxiv, producthunt, web
description: englisch, 1-2 Sätze, was es ist und warum es relevant ist.

Recherche-Text:
${researchText}`,
      },
    ],
  });

  const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
  if (!textBlock) throw new Error("[research] Keine JSON-Antwort bei Strukturierung");

  // JSON-Objekt extrahieren (mit oder ohne Markdown-Codeblock)
  const raw = textBlock.text;
  const jsonMatch = raw.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ||
                    raw.match(/(\{[\s\S]*\})/);
  if (!jsonMatch) throw new Error("[research] Kein JSON-Objekt in Strukturierungsantwort");

  const parsed = JSON.parse(jsonMatch[1]) as { items: Array<{
    name: string;
    description: string;
    url: string;
    sourceName: string;
  }> };

  const items: RawScrapedItem[] = parsed.items
    .filter((item) => item.name && item.description && item.url)
    .map((item) => ({
      name: item.name.trim(),
      description: item.description.trim(),
      url: item.url.trim(),
      sourceName: item.sourceName || "web",
    }));

  console.log(`[research] ${items.length} Items strukturiert`);
  return items;
}

// ─── Hauptfunktion ────────────────────────────────────────────────────────

/**
 * Recherchiert aktuelle Trending-AI-Tech mit Claude + web_search.
 * Zwei-Schritt-Prozess: Freitext-Recherche → JSON-Strukturierung.
 */
export async function researchTrendingAI(): Promise<RawScrapedItem[]> {
  const researchText = await runResearch();
  return structureResearch(researchText);
}

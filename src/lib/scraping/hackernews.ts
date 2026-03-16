import type { RawScrapedItem } from "./types";

const HN_BASE = "https://hacker-news.firebaseio.com/v0";
const FETCH_TOP_N = 100;
const BATCH_SIZE = 10;

const AI_KEYWORDS = [
  "ai", "llm", "gpt", "transformer", "neural", "machine learning",
  "deep learning", "nlp", "computer vision", "diffusion", "agent",
  "rag", "embedding", "fine-tuning", "language model", "chatgpt",
  "claude", "gemini", "mistral", "llama", "openai", "anthropic",
  "generative", "multimodal", "inference",
];

interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  descendants?: number;
  time: number;
}

function isAIRelated(title: string, url?: string): boolean {
  const text = `${title} ${url ?? ""}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => text.includes(kw));
}

/**
 * Scrapt Hacker News Top Stories und filtert KI-relevante Beiträge.
 * Nutzt die offizielle Firebase REST API (keine Auth erforderlich).
 */
export async function scrapeHackerNews(): Promise<RawScrapedItem[]> {
  // Top Story IDs abrufen
  const idsResponse = await fetch(`${HN_BASE}/topstories.json`);
  if (!idsResponse.ok) throw new Error(`HN API HTTP ${idsResponse.status}`);

  const allIds: number[] = await idsResponse.json();
  const ids = allIds.slice(0, FETCH_TOP_N);

  // Items in Batches parallel abrufen
  const stories: HNStory[] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const fetched = await Promise.allSettled(
      batch.map((id) =>
        fetch(`${HN_BASE}/item/${id}.json`).then((r) => r.json() as Promise<HNStory>)
      )
    );
    for (const result of fetched) {
      if (result.status === "fulfilled" && result.value) {
        stories.push(result.value);
      }
    }
  }

  // KI-relevante Stories filtern + als RawScrapedItem formatieren
  const items: RawScrapedItem[] = stories
    .filter((s) => s.title && isAIRelated(s.title, s.url))
    .map((s) => ({
      name: s.title,
      description: `Hacker News — Score: ${s.score}, Kommentare: ${s.descendants ?? 0}`,
      url: s.url ?? `https://news.ycombinator.com/item?id=${s.id}`,
      sourceName: "hackernews",
    }));

  console.log(`[hackernews] ${items.length} KI-relevante Stories gefunden`);
  return items;
}

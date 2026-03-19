import * as cheerio from "cheerio";
import type { RawScrapedItem } from "./types";

const HF_PAPERS_URL = "https://huggingface.co/papers";
const HF_MODELS_API = "https://huggingface.co/api/models?sort=trending&limit=30&full=false";

const RELEVANT_TAGS = [
  "text-generation",
  "image-generation",
  "text-to-image",
  "image-to-text",
  "video-generation",
  "text-to-speech",
  "automatic-speech-recognition",
  "text-classification",
  "token-classification",
  "question-answering",
  "translation",
  "summarization",
  "conversational",
  "reinforcement-learning",
  "multimodal",
  "object-detection",
  "image-classification",
];

type HFModelEntry = {
  modelId?: string;
  id?: string;
  tags?: string[];
  pipeline_tag?: string;
};

/**
 * Scrapt HuggingFace Daily Papers (HTML) und Trending Models (Hub API).
 */
export async function scrapeHuggingFace(): Promise<RawScrapedItem[]> {
  const [papers, models] = await Promise.allSettled([
    scrapeHFPapers(),
    scrapeHFTrendingModels(),
  ]);

  const items: RawScrapedItem[] = [];

  if (papers.status === "fulfilled") {
    items.push(...papers.value);
    console.log(`[huggingface] ${papers.value.length} Daily Papers`);
  } else {
    console.error("[huggingface] Daily Papers Fehler:", papers.reason);
  }

  if (models.status === "fulfilled") {
    items.push(...models.value);
    console.log(`[huggingface] ${models.value.length} Trending Models`);
  } else {
    console.error("[huggingface] Trending Models Fehler:", models.reason);
  }

  return items;
}

async function scrapeHFPapers(): Promise<RawScrapedItem[]> {
  const res = await fetch(HF_PAPERS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AI-Trend-Bot/1.0)" },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`HF Papers HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const items: RawScrapedItem[] = [];

  // HuggingFace Papers Seite: Paper-Karten mit h3/a Titeln
  $("article, [class*='paper']").each((_, el) => {
    const titleEl = $(el).find("h3 a, h2 a").first();
    const title = titleEl.text().trim();
    const href = titleEl.attr("href");
    if (!title || !href) return;

    const description =
      $(el).find("p").first().text().trim().slice(0, 300) || "";
    const url = href.startsWith("http")
      ? href
      : `https://huggingface.co${href}`;

    items.push({ name: title, description, url, sourceName: "huggingface" });
  });

  // Fallback: direkte Link-Selektoren
  if (items.length === 0) {
    $("a[href*='/papers/']").each((_, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href");
      if (!title || !href || title.length < 10) return;

      const url = href.startsWith("http")
        ? href
        : `https://huggingface.co${href}`;

      items.push({ name: title, description: "", url, sourceName: "huggingface" });
    });
  }

  return items.slice(0, 20);
}

async function scrapeHFTrendingModels(): Promise<RawScrapedItem[]> {
  const res = await fetch(HF_MODELS_API, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AI-Trend-Bot/1.0)",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`HF Models API HTTP ${res.status}`);

  const data = (await res.json()) as HFModelEntry[];
  const items: RawScrapedItem[] = [];

  for (const model of data) {
    const modelId = model.modelId ?? model.id;
    if (!modelId) continue;

    const tags = model.tags ?? [];
    const pipelineTag = model.pipeline_tag ?? "";

    // Nur AI-relevante Modelle
    const isRelevant =
      RELEVANT_TAGS.some((t) => tags.includes(t)) ||
      RELEVANT_TAGS.some((t) => pipelineTag.includes(t));

    if (!isRelevant) continue;

    const name = modelId.includes("/") ? modelId.split("/").pop()! : modelId;
    const description = pipelineTag
      ? `${pipelineTag} Model von ${modelId.split("/")[0] ?? modelId}`
      : `Trending Model auf HuggingFace: ${modelId}`;

    items.push({
      name,
      description,
      url: `https://huggingface.co/${modelId}`,
      sourceName: "huggingface",
    });
  }

  return items.slice(0, 15);
}

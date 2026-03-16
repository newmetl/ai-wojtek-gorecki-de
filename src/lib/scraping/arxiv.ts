import { XMLParser } from "fast-xml-parser";
import type { RawScrapedItem } from "./types";

const ARXIV_URL =
  "https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=30";

interface ArXivEntry {
  title: string | { "#text": string };
  summary: string | { "#text": string };
  id: string;
  link: { "@_href": string; "@_type"?: string } | Array<{ "@_href": string; "@_type"?: string }>;
}

function extractText(val: string | { "#text": string } | undefined): string {
  if (!val) return "";
  if (typeof val === "string") return val.trim();
  return val["#text"]?.trim() ?? "";
}

function extractLink(
  link: ArXivEntry["link"]
): string {
  if (Array.isArray(link)) {
    // HTML-Link bevorzugen
    const html = link.find((l) => l["@_type"] === "text/html");
    return html?.["@_href"] ?? link[0]?.["@_href"] ?? "";
  }
  return link?.["@_href"] ?? "";
}

/**
 * Ruft neueste Papers von arXiv ab (cs.AI, cs.LG, cs.CL).
 * Parst das Atom-XML-Format via fast-xml-parser.
 */
export async function scrapeArXiv(): Promise<RawScrapedItem[]> {
  const response = await fetch(ARXIV_URL, {
    headers: { "User-Agent": "ai-wojtek-gorecki-de/1.0 (research aggregator)" },
  });

  if (!response.ok) throw new Error(`arXiv API HTTP ${response.status}`);

  const xml = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => name === "entry" || name === "link",
  });

  const parsed = parser.parse(xml);
  const entries: ArXivEntry[] = parsed?.feed?.entry ?? [];

  const items: RawScrapedItem[] = entries.map((entry) => {
    const title = extractText(entry.title).replace(/\n/g, " ");
    const abstract = extractText(entry.summary)
      .replace(/\n/g, " ")
      .slice(0, 300);
    const link = extractLink(entry.link);

    return {
      name: title,
      description: abstract,
      url: link || entry.id,
      sourceName: "arxiv",
    };
  });

  console.log(`[arxiv] ${items.length} Papers gefunden`);
  return items;
}

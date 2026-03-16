import * as cheerio from "cheerio";
import type { RawScrapedItem } from "./types";

const AI_KEYWORDS = [
  "ai", "llm", "gpt", "transformer", "neural", "machine-learning",
  "deep-learning", "nlp", "computer-vision", "diffusion", "agent",
  "rag", "embedding", "fine-tune", "model", "inference", "multimodal",
  "generative", "claude", "gemini", "mistral", "llama",
];

function isAIRelated(name: string, description: string): boolean {
  const text = `${name} ${description}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => text.includes(kw));
}

/**
 * Scrapt GitHub Trending (wöchentlich) und filtert KI-relevante Repositories.
 * Nutzt Cheerio für HTML-Parsing.
 */
export async function scrapeGitHub(): Promise<RawScrapedItem[]> {
  const url = "https://github.com/trending?since=weekly";

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub Trending HTTP ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const items: RawScrapedItem[] = [];

  $("article.Box-row").each((_, el) => {
    const $el = $(el);

    // Repository-Name (author/repo)
    const repoLink = $el.find("h2 a").first();
    const repoPath = repoLink.attr("href")?.replace(/^\//, "") ?? "";
    const [author, repoName] = repoPath.split("/");
    if (!author || !repoName) return;

    const fullName = `${author}/${repoName}`;
    const repoUrl = `https://github.com/${repoPath}`;

    // Beschreibung
    const description = $el.find("p").first().text().trim();

    // Nur KI-relevante Repos
    if (!isAIRelated(fullName, description)) return;

    items.push({
      name: repoName.replace(/-/g, " ").replace(/_/g, " "),
      description: description || `GitHub Repository: ${fullName}`,
      url: repoUrl,
      sourceName: "github",
    });
  });

  console.log(`[github] ${items.length} KI-relevante Repos gefunden`);
  return items;
}

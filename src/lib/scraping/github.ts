// GitHub Trending Scraper — Wird in Schritt 5 implementiert
export interface GitHubTrendingItem {
  name: string;
  author: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  starsThisWeek: number;
  forks: number;
}

const AI_KEYWORDS = [
  "ai", "llm", "gpt", "transformer", "neural", "machine-learning",
  "deep-learning", "nlp", "computer-vision", "diffusion", "agent",
  "rag", "embedding", "fine-tune", "model", "inference",
];

function isAIRelated(name: string, description: string): boolean {
  const text = `${name} ${description}`.toLowerCase();
  return AI_KEYWORDS.some((kw) => text.includes(kw));
}

export async function scrapeGitHub(): Promise<GitHubTrendingItem[]> {
  // TODO Schritt 5: HTML-Scraping von github.com/trending mit Cheerio
  // Fallback auf Community-API falls Scraping blockiert wird
  void isAIRelated;
  return [];
}

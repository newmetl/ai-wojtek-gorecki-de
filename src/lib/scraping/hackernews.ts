// Hacker News API Client — Wird in Schritt 5 implementiert
export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  descendants: number;
  time: number;
}

export async function scrapeHackerNews(): Promise<HNStory[]> {
  // TODO Schritt 5: Firebase API https://hacker-news.firebaseio.com/v0/
  // Top 100 Stories -> Filter nach AI-Keywords
  return [];
}

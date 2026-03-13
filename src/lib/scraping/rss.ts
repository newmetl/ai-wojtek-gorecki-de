// RSS/Blog Scraper — Wird in Schritt 5 implementiert
export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  source: string;
}

const FEEDS = [
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://venturebeat.com/category/ai/feed/",
];

export async function scrapeRSS(): Promise<RSSItem[]> {
  // TODO Schritt 5: RSS-Feeds parsen mit rss-parser npm-Paket
  // Artikel der letzten 7 Tage filtern
  void FEEDS;
  return [];
}

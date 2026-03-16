import Parser from "rss-parser";
import type { RawScrapedItem } from "./types";

const FEEDS = [
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", source: "TechCrunch AI" },
  { url: "https://venturebeat.com/category/ai/feed/", source: "VentureBeat AI" },
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type FeedItem = {
  title?: string;
  contentSnippet?: string;
  content?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
};

/**
 * Scrapt RSS-Feeds von Tech-Blogs und filtert Artikel der letzten 7 Tage.
 */
export async function scrapeRSS(): Promise<RawScrapedItem[]> {
  const parser = new Parser({ timeout: 10000 });
  const cutoff = Date.now() - SEVEN_DAYS_MS;
  const items: RawScrapedItem[] = [];

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const recent = (parsed.items as FeedItem[]).filter((item) => {
        const date = item.isoDate ?? item.pubDate;
        if (!date) return true; // kein Datum → einschließen
        return new Date(date).getTime() >= cutoff;
      });

      for (const item of recent) {
        if (!item.title || !item.link) continue;
        const description =
          item.contentSnippet?.slice(0, 300) ||
          item.content?.replace(/<[^>]+>/g, "").slice(0, 300) ||
          "";
        items.push({
          name: item.title,
          description,
          url: item.link,
          sourceName: "blog",
        });
      }

      console.log(`[rss] ${recent.length} Artikel von ${feed.source}`);
    } catch (error) {
      console.error(`[rss] Fehler bei Feed ${feed.source}:`, error);
    }
  }

  return items;
}

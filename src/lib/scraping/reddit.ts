import type { RawScrapedItem } from "./types";

const SUBREDDITS = [
  { name: "r/MachineLearning", url: "https://www.reddit.com/r/MachineLearning/hot.json?limit=25" },
  { name: "r/LocalLLaMA",      url: "https://www.reddit.com/r/LocalLLaMA/hot.json?limit=25" },
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_UPVOTES = 50;

type RedditPost = {
  data: {
    title: string;
    url: string;
    selftext: string;
    score: number;
    created_utc: number;
    is_self: boolean;
    permalink: string;
  };
};

type RedditResponse = {
  data: {
    children: RedditPost[];
  };
};

/**
 * Scrapt Reddit r/MachineLearning und r/LocalLLaMA.
 * Nutzt öffentlichen JSON-Endpunkt (kein API-Key nötig).
 */
export async function scrapeReddit(): Promise<RawScrapedItem[]> {
  const cutoff = Date.now() - SEVEN_DAYS_MS;
  const items: RawScrapedItem[] = [];

  for (const subreddit of SUBREDDITS) {
    try {
      const res = await fetch(subreddit.url, {
        headers: {
          // Reddit verlangt einen User-Agent (keine leere Zeichenkette)
          "User-Agent": "AI-Trend-Bot/1.0 (compatible; trends tracker)",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        console.error(`[reddit] ${subreddit.name} HTTP ${res.status}`);
        continue;
      }

      const data = (await res.json()) as RedditResponse;
      const posts = data?.data?.children ?? [];
      let count = 0;

      for (const post of posts) {
        const { title, url, selftext, score, created_utc, is_self, permalink } =
          post.data;

        // Filter: zu alt oder zu wenig Upvotes
        if (created_utc * 1000 < cutoff) continue;
        if (score < MIN_UPVOTES) continue;
        if (!title) continue;

        // Link-Post → externe URL; Self-Post → Reddit-URL
        const targetUrl = is_self
          ? `https://www.reddit.com${permalink}`
          : url;

        const description =
          selftext?.slice(0, 300).replace(/\n+/g, " ").trim() || "";

        items.push({
          name: title,
          description,
          url: targetUrl,
          sourceName: "reddit",
        });
        count++;
      }

      console.log(`[reddit] ${count} Posts von ${subreddit.name}`);
    } catch (error) {
      console.error(`[reddit] Fehler bei ${subreddit.name}:`, error);
    }
  }

  return items;
}

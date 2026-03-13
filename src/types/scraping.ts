export type ScrapingSource = "github" | "producthunt" | "hackernews" | "arxiv" | "blogs" | "all";
export type ScrapingStatus = "running" | "success" | "error";

export interface ScrapingLog {
  id: string;
  source: ScrapingSource;
  runAt: Date;
  itemsFound: number;
  itemsNew: number;
  itemsUpdated: number;
  status: ScrapingStatus;
  errorMessage: string | null;
  durationMs: number | null;
}

export interface ScrapingResult {
  itemsFound: number;
  itemsNew: number;
  itemsUpdated: number;
}

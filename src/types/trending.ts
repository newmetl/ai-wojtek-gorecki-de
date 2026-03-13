export type TrendStatus = "new" | "rising" | "stable";
export type ReviewStatus = "pending" | "approved" | "hidden";
export type SourceName = "github" | "producthunt" | "hackernews" | "arxiv" | "blog";

export interface TrendingTech {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    emoji: string | null;
  };
  description: string;
  emoji: string | null;
  sourceUrl: string | null;
  sourceName: SourceName | null;
  trendStatus: TrendStatus;
  reviewStatus: ReviewStatus;
  trendScore: number;
  lastScrapedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrendingFilters {
  category?: string;
  search?: string;
  status?: TrendStatus;
}

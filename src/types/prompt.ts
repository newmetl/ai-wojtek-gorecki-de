export interface Prompt {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    emoji: string | null;
  };
  promptText: string;
  usageHints: string | null;
  exampleOutput: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

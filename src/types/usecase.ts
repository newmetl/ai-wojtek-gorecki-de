export type Complexity = "simple" | "medium" | "complex";

export interface UseCase {
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
  description: string;
  exampleCompany: string | null;
  complexity: Complexity;
  aiTechnology: string | null;
  createdAt: Date;
  updatedAt: Date;
}

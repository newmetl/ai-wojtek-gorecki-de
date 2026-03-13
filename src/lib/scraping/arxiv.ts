// arXiv API Client — Wird in Schritt 5 implementiert
export interface ArXivItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  link: string;
  categories: string[];
  publishedAt: Date;
}

export async function scrapeArXiv(): Promise<ArXivItem[]> {
  // TODO Schritt 5: REST API https://export.arxiv.org/api/query
  // Kategorien: cs.AI, cs.LG, cs.CL
  // XML-Parsing mit fast-xml-parser
  return [];
}

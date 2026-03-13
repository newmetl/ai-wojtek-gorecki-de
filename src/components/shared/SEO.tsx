// SEO-Komponente für JSON-LD structured data
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wojtek Gorecki — KI-gestützter Product Owner",
  url: "https://ai.wojtek-gorecki.de",
  description: "Tools und Ressourcen für Product Owner und Digitalexperten.",
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wojtek Gorecki",
  jobTitle: "Product Owner",
  url: "https://ai.wojtek-gorecki.de/cv",
  sameAs: ["https://www.linkedin.com/in/wojtek-gorecki/"],
};

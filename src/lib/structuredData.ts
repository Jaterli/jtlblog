// Datos estructurados (JSON-LD) de posts y proyectos.
// Si el Markdown trae su propio jsonLd se respeta, pero se corrigen las URLs que apuntan a este sitio
// para que coincidan siempre con la URL real de la página. Si no trae, se genera uno a partir del frontmatter.

const PERSON_ID = "https://jaterli.com/about/";

interface PageData {
  title: string;
  description: string;
  pubDate?: Date | string;
  updatedDate?: Date | string;
  image?: string;
  tags?: string[];
  url: URL;
}

type Node = Record<string, unknown>;

function fixUrls(node: Node, url: string, updatedDate?: Date | string): Node {
  const fixed: Node = { ...node };
  if (typeof fixed.url === "string" && fixed.url.includes("jaterli.com")) fixed.url = url;
  // La fecha de actualización del frontmatter manda: así no hay que repetirla en el jsonLd del Markdown
  if (updatedDate && fixed.datePublished) fixed.dateModified = new Date(updatedDate).toISOString();
  return fixed;
}

export function buildJsonLd(jsonLd: Node | undefined, page: PageData): Node {
  const url = page.url.href;

  if (jsonLd) {
    const graph = jsonLd["@graph"];
    if (Array.isArray(graph)) {
      return { ...jsonLd, "@graph": graph.map((node) => fixUrls(node as Node, url, page.updatedDate)) };
    }
    return fixUrls(jsonLd, url, page.updatedDate);
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: page.title,
    description: page.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "es",
    ...(page.pubDate && { datePublished: new Date(page.pubDate).toISOString() }),
    ...(page.updatedDate && { dateModified: new Date(page.updatedDate).toISOString() }),
    ...(page.image && { image: new URL(page.image, page.url).href }),
    ...(page.tags?.length && { keywords: page.tags.join(", ") }),
    author: { "@id": PERSON_ID, "@type": "Person", name: "Jaime TL" },
  };
}

// Utilidades compartidas para generar y guardar los tips diarios de desarrollo web.
import Anthropic from '@anthropic-ai/sdk'
import { getStore } from '@netlify/blobs'

export const TIPS_STORE = 'dev-tips'
export const LATEST_KEY = 'latest'

// Fuentes RSS/Atom fiables del mundo del desarrollo web
const FEEDS = [
  { source: 'web.dev', url: 'https://web.dev/feed.xml' },
  { source: 'MDN Blog', url: 'https://developer.mozilla.org/en-US/blog/rss.xml' },
  { source: 'Chrome for Developers', url: 'https://developer.chrome.com/static/blog/feed.xml' },
  { source: 'CSS-Tricks', url: 'https://css-tricks.com/feed/' },
  { source: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/' },
  { source: 'GitHub Blog', url: 'https://github.blog/feed/' },
]

const ITEMS_PER_FEED = 6
const CATEGORIES = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Frameworks', 'Rendimiento', 'Accesibilidad', 'Seguridad', 'Herramientas', 'IA']

export interface FeedItem {
  source: string
  title: string
  url: string
  date?: string
  description?: string
}

export interface DevTip {
  title: string
  summary: string
  category: string
  source: string
  url: string
}

export interface DevTipsDocument {
  date: string
  generatedAt: string
  tips: DevTip[]
}

const decode = (text: string) =>
  text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

const tag = (block: string, name: string) => {
  const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
  return match ? decode(match[1]) : ''
}

// Parser mínimo de RSS 2.0 y Atom, suficiente para extraer título, enlace, fecha y resumen
const parseFeed = (xml: string, source: string): FeedItem[] => {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? []
  return blocks.slice(0, ITEMS_PER_FEED).map((block) => {
    const atomLink = block.match(/<link[^>]*href="([^"]+)"/i)?.[1]
    return {
      source,
      title: tag(block, 'title'),
      url: tag(block, 'link') || atomLink || '',
      date: tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated'),
      description: (tag(block, 'description') || tag(block, 'summary')).slice(0, 300),
    }
  }).filter((item) => item.title && item.url.startsWith('http'))
}

export const fetchFeedItems = async (): Promise<FeedItem[]> => {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ source, url }) => {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) })
      if (!res.ok) throw new Error(`${source}: HTTP ${res.status}`)
      return parseFeed(await res.text(), source)
    }),
  )
  results.forEach((r) => r.status === 'rejected' && console.warn('Feed no disponible:', r.reason))
  return results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
}

export const generateTips = async (items: FeedItem[]): Promise<DevTip[]> => {
  const anthropic = new Anthropic()
  const validUrls = new Set(items.map((i) => i.url))

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 3000,
    system:
      'Eres un editor técnico experto en desarrollo web. Seleccionas las novedades más relevantes para desarrolladores web ' +
      'y las conviertes en tips prácticos, concisos y en español. Usa solo la información de los artículos proporcionados; no inventes datos.',
    messages: [
      {
        role: 'user',
        content:
          `Artículos recientes:\n${JSON.stringify(items)}\n\n` +
          'Elige entre 5 y 8 artículos de mayor relevancia práctica, priorizando los más recientes (evita duplicados y notas corporativas sin interés técnico) ' +
          'y devuelve SOLO un array JSON, sin texto adicional, con objetos de la forma ' +
          '{"title": string (título del tip en español), "summary": string (2-3 frases con el consejo accionable), "category": string, "source": string, "url": string}. ' +
          `"category" debe ser una de: ${CATEGORIES.join(', ')}. "url" y "source" deben copiarse exactamente del artículo elegido.`,
      },
    ],
  })

  const text = response.content.map((block) => (block.type === 'text' ? block.text : '')).join('')
  const json = text.slice(text.indexOf('['), text.lastIndexOf(']') + 1)
  const tips = JSON.parse(json) as DevTip[]

  // Descartamos cualquier tip cuya URL no provenga de las fuentes
  return tips.filter((tip) => tip.title && tip.summary && validUrls.has(tip.url))
}

export const saveTips = async (tips: DevTip[]): Promise<DevTipsDocument> => {
  const now = new Date()
  const doc: DevTipsDocument = {
    date: now.toISOString().slice(0, 10),
    generatedAt: now.toISOString(),
    tips,
  }
  const store = getStore(TIPS_STORE)
  await Promise.all([store.setJSON(LATEST_KEY, doc), store.setJSON(`history/${doc.date}`, doc)])
  return doc
}

// Endpoint público que sirve el JSON de tips diarios (o el de una fecha concreta con ?date=AAAA-MM-DD)
import type { Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import { LATEST_KEY, TIPS_STORE } from '../lib/devTips.ts'

export default async (req: Request) => {
  const date = new URL(req.url).searchParams.get('date')
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: 'Formato de fecha no válido (AAAA-MM-DD)' }, { status: 400 })
  }

  const doc = await getStore(TIPS_STORE).get(date ? `history/${date}` : LATEST_KEY, { type: 'json' })
  if (!doc) {
    return Response.json({ error: 'Todavía no hay tips disponibles' }, { status: 404 })
  }

  return Response.json(doc, {
    headers: { 'Cache-Control': 'public, max-age=0, must-revalidate', 'Netlify-CDN-Cache-Control': 'public, max-age=3600' },
  })
}

export const config: Config = {
  path: '/api/dev-tips.json',
  method: 'GET',
}

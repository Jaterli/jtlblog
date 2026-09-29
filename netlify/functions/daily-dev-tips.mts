// Función programada: genera cada día un JSON con tips relevantes de desarrollo web
import type { Config } from '@netlify/functions'
import { fetchFeedItems, generateTips, saveTips } from '../lib/devTips.ts'

export default async (req: Request) => {
  const { next_run } = await req.json().catch(() => ({}))

  const items = await fetchFeedItems()
  if (items.length === 0) {
    console.error('No se pudo obtener ningún artículo de las fuentes RSS')
    return
  }

  const tips = await generateTips(items)
  if (tips.length === 0) {
    console.error('La IA no devolvió tips válidos; se conserva el JSON anterior')
    return
  }

  const doc = await saveTips(tips)
  console.log(`Guardados ${doc.tips.length} tips para ${doc.date}. Próxima ejecución: ${next_run}`)
}

export const config: Config = {
  schedule: '0 6 * * *', // Todos los días a las 06:00 UTC
}

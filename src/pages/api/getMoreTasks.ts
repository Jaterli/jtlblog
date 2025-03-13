import type { APIRoute } from 'astro';
import tasksData from '../../data/tasks.json';
// De esta manera se activa el modo server para esta página para poder obtener los parámetros pasados por url
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const start = parseInt(url.searchParams.get('start') || '0');
  const end = parseInt(url.searchParams.get('end') || '10');
  const tasks = tasksData.completed.slice(start, end);

  return new Response(JSON.stringify(tasks), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
import type { APIRoute } from 'astro';
export const prerender = false;


export const POST: APIRoute = async ({ request }) => {
  try {
    // Asegurar que el cuerpo es JSON válido
    const data = await request.json().catch(() => {
      throw new Error('Invalid JSON format');
    });
    
    if (!data.token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing token'
      }), { status: 400 });
    }
    console.log("Token pasado a la api: "+data.token)
   

    return new Response(JSON.stringify({
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { status: 500 });
  }
};
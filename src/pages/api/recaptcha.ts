import type { APIRoute } from 'astro';
// De esta manera se activa el modo server para esta página para poder obtener los parámetros pasados por url
export const prerender = false;

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json().catch(() => {
      throw new Error("Formato JSON inválido");
    });

    const secretKey = '6LfVdBkrAAAAAHq252SP5MySLPt7w8otmTqzVqT2';
    if (!secretKey) throw new Error("Falta la clave secreta de reCAPTCHA");

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: data.token
      })
    });
    
    const responseData = await response.json();
    console.log("Respuesta: "+responseData);    

    return new Response(JSON.stringify({
      success: responseData.success,
      score: responseData.score,
      errors: responseData['error-codes'] || []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
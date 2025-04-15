import type { APIRoute } from 'astro';
export const prerender = false;


export const POST: APIRoute = async ({ request }) => {
  console.log("Dentro de la api");
  try {
    // Asegurar que el cuerpo es JSON válido
    const data = await request.json().catch(() => {
      throw new Error('Invalid JSON format');
    });
    console.log("¿Token pasado a la api?: "+data.token);

    if (!data.token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing reCAPTCHA token'
      }), { status: 400 });
    }
    console.log("Token pasado a la api ok: "+data.token);
   
    const secretKey = import.meta.env.VITE_RECAPTCHA_SECRET_KEY;
    const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';

    const requestBody = new URLSearchParams({
      secret: secretKey,
      response: data.token,    // El token pasado desde el cliente
    });


    const verification = await fetch(recaptchaURL, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: requestBody.toString()
    });

    const responseData = await verification.json();
    
    // Verificar acción y puntuación
    const isValidAction = responseData.action === 'contact';
    const isValidScore = responseData.score >= 0.5;

    return new Response(JSON.stringify({
      success: responseData.success && isValidAction && isValidScore,
      score: responseData.score,
      action: responseData.action,
      errors: responseData['error-codes'] || []
    }), {
      status: responseData.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { status: 500 });
  }
};
import type { APIRoute } from 'astro';
// export const prerender = false;


export const post: APIRoute = async ({ request }) => {
  try {
    // Asegurar que el cuerpo es JSON válido
    const data = await request.json().catch(() => {
      throw new Error('Invalid JSON format');
    });
    
    if (!data.token) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing reCAPTCHA token'
      }), { status: 400 });
    }
    console.log("Token pasado a la api: "+data.token)
   
    const secretKey = '6LfVdBkrAAAAAHq252SP5MySLPt7w8otmTqzVqT2';
    const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';

    const requestBody = new URLSearchParams({
      secret: secretKey,   // Esto puede ser una variable de entorno
      response: data.recaptcha          // El token pasado desde el cliente
    });


    const verification = await fetch(recaptchaURL, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: requestBody.toString()
    });

    const responseData = await verification.json();
    
    // Verificar acción y puntuación
    const isValidAction = responseData.action === 'submit';
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
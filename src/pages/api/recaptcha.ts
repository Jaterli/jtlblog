import type { APIRoute } from 'astro';
export const prerender = false;


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

    const secretKey = '6LfVdBkrAAAAAHq252SP5MySLPt7w8otmTqzVqT2';
    const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';

    const verification = await fetch(recaptchaURL, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: data.token
      })
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
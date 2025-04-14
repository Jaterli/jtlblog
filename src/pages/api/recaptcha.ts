import type { APIRoute } from 'astro';
// De esta manera se activa el modo server para esta página para poder obtener los parámetros pasados por url
export const prerender = false;

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
  const secretKey = '6LdUxxgrAAAAAIgSJRfx-O21m-dtuHu08FOMRhTQ';

  const response = await fetch(recaptchaURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: data.token
    })
  });

  const responseData = await response.json();
  
  return new Response(JSON.stringify({
    success: responseData.success,
    score: responseData.score,
    errors: responseData['error-codes']
  }), {
    status: responseData.success ? 200 : 400
  });
};
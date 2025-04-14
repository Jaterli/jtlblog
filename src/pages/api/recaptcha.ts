import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
  const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;

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
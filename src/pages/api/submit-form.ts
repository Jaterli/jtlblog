import type { APIRoute } from "astro";

export const prerender = false;

export async function GET() {
  return new Response(JSON.stringify({ message: "API de formulario disponible" }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Permite el acceso desde cualquier origen
      },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();

    // Envía los datos a hCaptcha para verificar el token
    const hCaptchaResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: import.meta.env.VITE_HCAPTCHA_SECRET_KEY, // Tu clave secreta de hCaptcha
        response: formData["h-captcha-response"], // El token de hCaptcha
      }),
    });

    const hCaptchaResult = await hCaptchaResponse.json();

    if (!hCaptchaResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Por favor, completa el captcha correctamente.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Si el captcha es válido, envía los datos a Web3Forms
    const accessKey = import.meta.env.VITE_PUBLIC_ACCESS_KEY;
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...formData,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "¡Mensaje enviado correctamente!",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Hubo un error al enviar el formulario.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Hubo un error en el servidor.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
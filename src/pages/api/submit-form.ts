import type { APIRoute } from "astro";

export const prerender = false;

export async function GET() {
  return new Response(JSON.stringify({ message: "API de formulario disponible" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();

    // API Key de Web3Forms
    const accessKey = import.meta.env.VITE_PUBLIC_ACCESS_KEY
    
    // Envía los datos a Web3Forms
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
        },
      }
    );
  }
};
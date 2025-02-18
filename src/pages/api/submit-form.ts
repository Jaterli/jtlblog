import type { APIRoute } from "astro";

export const prerender = false; // Deshabilita la prerenderización

export async function GET() {
  return new Response(JSON.stringify({ message: "API de formulario disponible" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();

    // Reemplaza con tu API Key de Web3Forms
    const accessKey = "3f29590d-7f93-4bdc-9b20-14c4e840787a";

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
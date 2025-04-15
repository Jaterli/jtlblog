const handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const msg_error_container = document.getElementById("msg-error-container");
  const msg_error_text = msg_error_container.querySelector("span");
  const msg_success_container = document.getElementById("msg-success-container");

  let formData = new FormData(contactForm);

  // Validar campos obligatorios
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !message) {
    msg_error_text.innerHTML = "Por favor, completa todos los campos obligatorios.";
    msg_error_container.style.display = 'block';
    msg_success_container.style.display = 'none';
    return;
  }

  // Enviar formulario si todo está correcto
  fetch("/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-store"
    },
    body: new URLSearchParams(formData).toString(),
  })
  .then((response) => {
    if (response.ok) {
      msg_error_container.style.display = 'none';                
      msg_success_container.style.display = 'block';
      contactForm.reset();
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    msg_error_text.innerHTML = "Error al enviar el mensaje. Inténtalo de nuevo.";
    msg_error_container.style.display = 'block';
    msg_success_container.style.display = 'none';
  });
};

// Inicializar el evento submit
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}
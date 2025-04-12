const handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const msg_error_container = document.getElementById("msg-error-container");
  const msg_error_text = msg_error_container.querySelector("span");
  const msg_success_container = document.getElementById("msg-success-container");
  const recaptchaMessage = document.getElementById("recaptcha-message");
  const recaptchaContainer = document.getElementById("recaptcha-container");

  let formData = new FormData(contactForm);

  // Validar campos obligatorios
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !message) {
    msg_error_text.innerHTML = "Por favor, completa todos los campos obligatorios.";
    msg_error_container.style.display = 'block';
    msg_success_container.style.display = 'none';
    recaptchaMessage.style.display = 'none';
    recaptchaContainer.style.display = 'none';
    return;
  }

  // Mostrar recaptcha si no está completado
  if (!formData.get('g-recaptcha-response')) {
    recaptchaMessage.style.display = 'block';
    recaptchaContainer.style.display = 'flex';
    msg_error_container.style.display = 'none';
    msg_success_container.style.display = 'none';
    
    // Hacer scroll suave al recaptcha
    recaptchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      recaptchaMessage.style.display = 'none';
      recaptchaContainer.style.display = 'none';
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
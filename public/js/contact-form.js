let handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const submitMessage = document.getElementById("contact-form-result");

  let formData = new FormData(contactForm);

  if (!formData.get('g-recaptcha-response')) {
    submitMessage.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
        <strong>Error!</strong> Por favor, completa el reCAPTCHA.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    return;
  }

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.status === 303) {
        submitMessage.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
            <strong>Error!</strong> Parece que hubo un problema con el reCAPTCHA. Por favor, inténtalo de nuevo.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        return;
      } else {
        submitMessage.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Gracias!</strong> Tu mensaje ha sido enviado.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        contactForm.reset();
        contactForm.style.display = "none"; // Oculta el formulario
      }
    })
    .catch((error) => {
      submitMessage.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> No se pudo enviar el mensaje, por favor inténtalo de nuevo más tarde.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    });
};

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}
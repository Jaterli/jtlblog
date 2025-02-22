const handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const submitMessage = document.getElementById("contact-form-result");

  let formData = new FormData(contactForm);

  if (!formData.get('g-recaptcha-response')) {
    submitMessage.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">Por favor, completa el reCAPTCHA.</span>
        <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
    return;
  }

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-store" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.status === 303) {
        submitMessage.innerHTML = `
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">Parece que hubo un problema con el reCAPTCHA. Por favor, inténtalo de nuevo.</span>
            <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" data-bs-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `;
        return;
      } else {
        submitMessage.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">¡Gracias!</strong>
            <span class="block sm:inline">Tu mensaje ha sido enviado.</span>
            <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" data-bs-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `;
        contactForm.reset();
        contactForm.style.display = "none"; // Oculta el formulario
      }
    })
    .catch((error) => {
      submitMessage.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">No se pudo enviar el mensaje, por favor inténtalo de nuevo más tarde.</span>
          <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `;
    });
};

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}
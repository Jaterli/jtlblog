const handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const submitMessage = document.getElementById("contact-form-result");

  let formData = new FormData(contactForm);

  if (!formData.get('g-recaptcha-response')) {
    submitMessage.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
        <div class="flex-1">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> Por favor, completa el reCAPTCHA.</span>
        </div>
        <button type="button" class="ml-4 text-red-700 hover:text-red-900" onclick="this.parentElement.style.display='none'" aria-label="Close">
          &times;
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
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
            <div class="flex-1">
              <strong class="font-bold">Error!</strong>
              <span class="block sm:inline"> Parece que hubo un problema con el reCAPTCHA. Por favor, inténtalo de nuevo.</span>
            </div>
            <button type="button" class="ml-4 text-red-700 hover:text-red-900" onclick="this.parentElement.style.display='none'" aria-label="Close">
              &times;
            </button>
          </div>
        `;
        return;
      } else {
        submitMessage.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-start" role="alert">
            <div class="flex-1">
              <strong class="font-bold">¡Gracias!</strong>
              <span class="block sm:inline"> Tu mensaje ha sido enviado.</span>
            </div>
            <button type="button" class="ml-4 text-green-700 hover:text-green-900" onclick="this.parentElement.style.display='none'" aria-label="Close">
              &times;
            </button>
          </div>
        `;
        contactForm.reset();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      submitMessage.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
          <div class="flex-1">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline"> No se pudo enviar el mensaje, por favor inténtalo de nuevo más tarde.</span>
          </div>
          <button type="button" class="ml-4 text-red-700 hover:text-red-900" onclick="this.parentElement.style.display='none'" aria-label="Close">
            &times;
          </button>
        </div>
      `;
    });
};

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

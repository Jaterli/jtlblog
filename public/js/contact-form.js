// const handleSubmit = (e) => {
//   e.preventDefault();
  
//   const contactForm = document.getElementById("contact-form");
//   const msg_error_container = document.getElementById("msg-error-container");
//   const msg_error_text = msg_error_container.querySelector("span");
//   const msg_success_container = document.getElementById("msg-success-container");
//   const captcha = document.getElementById("recaptcha-container");

//   let formData = new FormData(contactForm);

  // Mostrar recaptcha si no está completado
  // if (!formData.get('g-recaptcha-response')) {
  //   captcha.style.display = 'block';
  //   msg_error_text.innerHTML = "Por favor, completa el reCAPTCHA";
  //   msg_success_container.style.display = 'none';
  //   msg_error_container.style.display = 'block';
  //   return;
  // }

  // Enviar formulario si el recaptcha está completo
//   fetch("/", {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Cache-Control": "no-store" 
//     },
//     body: new URLSearchParams(formData).toString(),
//   })
//   .then((response) => {
//     if (response.status === 303) {
//       throw new Error('Error de reCAPTCHA');
//     }
//     msg_error_container.style.display = 'none';
//     msg_success_container.style.display = 'block';
//     contactForm.reset();
//     captcha.style.display = 'none'; // Ocultar recaptcha después de enviar
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//     msg_error_text.innerHTML = "Error al enviar, intenta nuevamente";
//     msg_success_container.style.display = 'none';
//     msg_error_container.style.display = 'block';
//   });
// }

// // Función global para el callback de recaptcha
// function onCaptchaSuccess() {
//   const contactForm = document.getElementById("contact-form");
//   alert('Enviando formulario')
//   contactForm.dispatchEvent(new Event('submit'));
// }


const handleSubmit = (e) => {
  const msg_success_container = document.getElementById("msg-success-container");

  e.preventDefault();

  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6LdUxxgrAAAAAJBH7V847nzcuLmmX_GCAP64warM', {action: 'contact'});
  })
  .then((response) => response.json())
  .then((gResponse) => {
    if (gResponse.success) {
      console.log('Token verificado con éxito');
      console.log(gResponse);
      fetch("/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-store" 
        },
        body: new URLSearchParams(formData).toString(),
      })
      msg_success_container.style.display = 'block';


    } else {
      console.log("Falló la verificación del token")
    }
  });


}

// Inicializar el evento submit
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}


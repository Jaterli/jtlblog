const handleSubmit = (e) => {
  e.preventDefault();

  const contactForm = document.getElementById("contact-form");
  const msg_error_container = document.getElementById("msg-error-container")
  const msg_error_text = msg_error_container.querySelector("span");
  const msg_success_container = document.getElementById("msg-success-container")  

  let formData = new FormData(contactForm);
  const captcha = document.getElementById("recaptcha-container")
  captcha.style.display='block';

  if (!formData.get('g-recaptcha-response')) {
    msg_error_text.innerHTML = `
      Por favor, completa el reCAPTCHA
    `;
    msg_success_container.style.display='none';
    msg_error_container.style.display='block';
    return;
  }else{
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Cache-Control": "no-store" },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (response.status === 303) {
          msg_error_text.innerHTML = `
            Parece que hubo un problema con el reCAPTCHA. Por favor, inténtalo de nuevo.</span>
          `;
          msg_success_container.style.display='none';
          msg_error_container.style.display='block';
          return;
        } else {
          msg_error_container.style.display='none';                
          msg_success_container.style.display='block';        
          contactForm.reset();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        msg_error_text.innerHTML = `
          No se pudo enviar el mensaje, por favor inténtalo de nuevo más tarde.</span>
        `;
        msg_success_container.style.display='none';
        msg_error_container.style.display='block';      
      });
  };
  
}


const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

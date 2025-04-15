const form = document.getElementById('contact-form');

// Cargar reCAPTCHA correctamente
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgErrorContainer = document.getElementById('msg-error-container');
    const msgSuccessContainer = document.getElementById('msg-success-container');
    
    try{
    
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LfVdBkrAAAAAJ5d-acgwQXvLhaPghlzX4I595M1', {action: 'contact'});
        console.log('Token generado:', token);        
        
        const response = await fetch('/api/recaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        const result = await response.json();
        
        if (result.success && result.score > 0.5) { // Verificación exitosa, enviar formulario
          
          const formData = new FormData(form);
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
          })
          .then((response) => {
            console.log("Formulario enviado. "+response)
            msgSuccessContainer.style.display = 'block';
            msgErrorContainer.style.display = 'none';
            form.reset();              
          })
          .catch((error) => {
            msgErrorContainer.querySelector('span:last-child').textContent = "Error. "+error;
          });
        
        } else {
          console.log("Error: "+result.errors)
          msgErrorContainer.querySelector('span:last-child').textContent = "Error de verificación reCAPTCHA";
          msgSuccessContainer.style.display = 'none';
          msgErrorContainer.style.display = 'block';    
        }
      });

    } catch (error) {
      console.error('Error:', error);
      msgErrorContainer.querySelector('span:last-child').textContent = error.message;
      msgSuccessContainer.style.display = 'none';
      msgErrorContainer.style.display = 'block';
    }
  });

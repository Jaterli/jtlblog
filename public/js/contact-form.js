const form = document.getElementById('contact-form');
const msgErrorContainer = document.getElementById('msg-error-container');
const msgSuccessContainer = document.getElementById('msg-success-container');
const errorMessageSpan = msgErrorContainer.querySelector('span:last-child');

// Obtener la clave desde las variables de entorno
const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

if (!RECAPTCHA_SITE_KEY) {
  throw new Error('Falta la clave reCAPTCHA en las variables de entorno');
}

// Cargar reCAPTCHA correctamente
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        await new Promise((resolve, reject) => {
            grecaptcha.enterprise.ready(async () => {
                try {
                    const token = await grecaptcha.enterprise.execute(
                        RECAPTCHA_SITE_KEY, 
                        { action: 'contact' }
                    );
                    
                    console.log('Token generado:', token);
                    const recaptchaResponse = await fetch('/api/recaptcha', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token })
                    });

                    if (!recaptchaResponse.ok) throw new Error('Error en validación reCAPTCHA');
                    
                    const result = await recaptchaResponse.json();
                    
                    if (result.success && result.score > 0.5) {
                        await submitForm(form);
                        handleSuccess();
                    } else {
                        throw new Error('Error de verificación reCAPTCHA');
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (error) {
        handleError(error);
    }
});

async function submitForm(form) {
    const formData = new FormData(form);
    const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    });
    if (!response.ok) throw new Error('Error en envío de formulario');
}

function handleSuccess() {
    console.log("Formulario enviado correctamente");
    msgSuccessContainer.style.display = 'block';
    msgErrorContainer.style.display = 'none';
    form.reset();
}

function handleError(error) {
    console.error('Error:', error);
    errorMessageSpan.textContent = error.message;
    msgSuccessContainer.style.display = 'none';
    msgErrorContainer.style.display = 'block';
}
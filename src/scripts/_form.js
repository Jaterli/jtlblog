const form = document.getElementById("form");
const result = document.getElementById("result");

export const emailform = form.addEventListener("submit", function (e) {
  e.preventDefault();
  form.classList.add("was-validated");
  if (!form.checkValidity()) {
    form.querySelectorAll(":invalid")[0].focus();
    return;
  }

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Enviando...";
  result.style.display = "block";

  fetch("api/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.classList.remove("text-red-500");
        result.classList.add("text-green-500");
        result.innerHTML = "¡Mensaje enviado correctamente!";
      } else {
        result.classList.remove("text-green-500");
        result.classList.add("text-red-500");
        result.innerHTML = json.message || "Hubo un error al enviar el formulario.";
      }
    })
    .catch((error) => {
      console.log(error);
      result.classList.remove("text-green-500");
      result.classList.add("text-red-500");
      result.innerHTML = "Hubo un error al enviar el formulario.";
    })
    .then(function () {
      form.reset();
      form.classList.remove("was-validated");
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
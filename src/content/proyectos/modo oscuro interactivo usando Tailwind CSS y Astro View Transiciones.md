---
title: "Tema claro/oscuro interactivo con Tailwind CSS + daisyui + Astro View Transicions."
description: "Funcionalidad para cambiar entre modo oscuro y modo claro utilizando Astro junto con Tailwind CSS y la librería daisyui."
pubDate: "2024-09-12"
heroImage: "/assets/images/proyectos/projects.theme-controller.png"
badge: "En curso"
tags: ["Astro", "Javascript"]
---

### Introducción

En este artículo, explicaré cómo integré un botón con los íconos de sol y luna en mi blog, permitiendo alternar entre los modos claro y oscuro. Utilicé Astro en conjunto con Tailwind CSS y la librería DaisyUI, que es una biblioteca de componentes diseñada específicamente para Tailwind CSS y que facilita la gestión de temas visuales.

Aunque existe suficiente documentación sobre cómo implementar esta funcionalidad con Tailwind CSS, gran parte de ella no incluye DaisyUI, la cual maneja los temas de manera distinta, lo que introduce algunas variaciones en el código.

### Requisitos

Para empezar, es necesario tener Tailwind CSS instalado. Para ello, puedes ejecutar el siguiente comando:

```bash
astro add tailwind
```

Si no tienes Astro instalado a nivel global, puedes ejecutar este comando con `npx`:

```bash
npx astro add tailwind
```

Luego, instala DaisyUI con el siguiente comando:

```bash
npm i -D daisyui@latest
```

A continuación, debes agregar DaisyUI a tu archivo `tailwind.config.js`:

```js

/** @type {import('tailwindcss').Config} */

module.exports = {
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"], // false: solo light + dark | true: todos los temas | array: temas específicos como ["light", "dark", "cupcake"]
  }
}
```

> Si no especificas el array `themes`, DaisyUI utilizará por defecto los temas `light` y `dark`, que son los dos que vamos a implementar. Si decides utilizar otros temas, tendrás que ajustar el código para reflejar estos cambios.

----------

Para simplificar la implementación y hacerlo más claro, he creado un componente único en Astro que incluye toda la funcionalidad del botón para cambiar entre temas.

### Archivo `src/components/ThemeToggle.astro`

```astro
<!-- src/components/ThemeToggle.astro -->  
<button id="theme-toggle-btn" class="ml-2 max-sm:ml-4 icon-button" aria-label="Toggle theme">Light/Dark</button>

<script is:inline>
  const defaultTheme = 'light'; // Tema predeterminado

  // Íconos de los temas
  const lightIcon = '<svg ...></svg>'; // SVG del tema claro
  const darkIcon = '<svg ...></svg>'; // SVG del tema oscuro

  // Cambia el tema y actualiza el ícono
  const toggleTheme = (themeToggleBtn) => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'light' ? darkIcon : lightIcon;
  };

  // Ajusta el ícono basado en el tema actual
  const adjustIcon = (themeToggleBtn, theme) => {
    themeToggleBtn.innerHTML = theme === 'light' ? darkIcon : lightIcon;
  };

  const init = () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return; // Verifica si el botón existe

    // Añade el evento de clic para cambiar el tema
    themeToggleBtn.addEventListener("click", () => toggleTheme(themeToggleBtn));

    // Recupera el tema guardado o establece el tema por defecto
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
    adjustIcon(themeToggleBtn, savedTheme);
  };

  // Inicializa cuando la página carga
  init();

  // Re-inicializa después del intercambio de páginas (si es necesario)
  document.addEventListener("astro:after-swap", init);
</script>

<style>
  #theme-toggle-btn {
    right: 15px;
    top: 10px;
    position: absolute;
  }
</style>
```

### Explicación del Código

#### 1. Botón HTML:

```html
<button id="theme-toggle-btn" class="ml-2 max-sm:ml-4 icon-button" aria-label="Toggle theme">Light/Dark</button>
```

Este botón permite alternar entre los temas claro y oscuro. Tiene un `id` para poder ser referenciado desde el script y su clase se encarga de aplicar el estilo visual.

#### 2. Definición de Íconos:

```js
const lightIcon = '<svg>...</svg>';
const darkIcon = '<svg>...</svg>';
```

Estos íconos representan el sol y la luna, que se mostrarán dependiendo del tema actual. No he incluido el código completo de los íconos SVG, pero puedes encontrarlos fácilmente en línea.

#### 3. Función `toggleTheme`:

```js
const toggleTheme = (themeToggleBtn) => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggleBtn.innerHTML = newTheme === 'light' ? darkIcon : lightIcon;
};
```

Esta función alterna entre los temas claro y oscuro, actualiza el atributo `data-theme` en el documento y guarda la preferencia en `localStorage` para que persista entre cargas de página.

#### 4. Función `adjustIcon`:

```js
const adjustIcon = (themeToggleBtn, theme) => {
  themeToggleBtn.innerHTML = theme === 'light' ? darkIcon : lightIcon;
};
```

Ajusta el ícono del botón según el tema actual, permitiendo que el botón refleje correctamente si el tema es claro o oscuro.

#### 5. Función `init`:

```js
const init = () => {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => toggleTheme(themeToggleBtn));

  const savedTheme = localStorage.getItem('theme') || defaultTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  adjustIcon(themeToggleBtn, savedTheme);
};
```

Esta función inicializa el botón y ajusta el tema basado en el valor guardado en `localStorage` o en el tema predeterminado.

#### 6. Evento `astro:after-swap`:

```js
document.addEventListener("astro:after-swap", init);
```

Este evento asegura que el botón se reinicialice cuando cambias de página en una aplicación Astro con navegación SPA.

#### 7. Estilos del Botón:

```css
#theme-toggle-btn {
  right: 15px;
  top: 10px;
  position: absolute;
}
```

El botón se posiciona de manera absoluta en la esquina superior derecha de la página, pero puedes ajustarlo a tu preferencia.

### Resumen del Funcionamiento:

1. Al cargar la página, el script revisa si hay un tema almacenado en el navegador. Si existe, lo aplica; si no, usa el tema predeterminado.
2. El botón permite alternar entre los temas claro y oscuro, cambiando el ícono que refleja el tema activo.
3. El tema seleccionado se guarda en `localStorage` para que se conserve en futuras visitas.
4. En aplicaciones Astro con navegación mejorada (SPA), el script se reinicializa automáticamente tras cada cambio de página.
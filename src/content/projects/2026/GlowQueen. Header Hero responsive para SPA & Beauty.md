---
title: "GlowQueen: Header Hero responsive para SPA & Beauty"
description: "Desarrollo de un header-hero con menú de navegación sticky, dropdown interactivo y menú hamburguesa responsive. Implementación con SASS, arquitectura modular y JavaScript."
pubDate: "2026-03-09"
heroImage: "/images/proyectos/projects.glowqueen.webp"
tags: [HTML5, CSS3, SASS, JavaScript, Figma, Diseño Web, Responsive Design, UX]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "GlowQueen - SPA & Beauty Header"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Header hero profesional para un sitio web de SPA con menú sticky, dropdown y diseño responsive. Implementación avanzada con SASS y JavaScript vanilla."
  "image": "https://jaterli.com/images/proyectos/projects.glowqueen.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/glowqueen-header-spa-css-avanzado"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-03-09"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript"
  ]
  "featureList": [
    "Maquetación pixel-perfect a partir de diseño Figma",
    "Arquitectura CSS modular con SASS (8 archivos parciales)",
    "Sistema de capas superpuestas (3 fondos de color + imagen decorativa SVG)",
    "Menú de navegación sticky con efecto blur al hacer scroll",
    "Dropdown interactivo para 'More' con animación",
    "Menú hamburguesa funcional para dispositivos móviles",
    "Diseño responsive con 4 breakpoints (1920px, 1400px, 992px, 576px)",
    "Metodología BEM para nomenclatura de clases",
    "Componentes reutilizables (tarjetas testimoniales, botones, grid de características)",
    "Sistema de variables CSS para colores, tipografía y sombras",
    "Mixins para media queries, botones y transiciones",
    "Efectos hover en todos los elementos interactivos",
    "Iconos en formato SVG y Font Awesome",
    "Atributos ARIA para accesibilidad"
  ]
---

## Visión General

**GlowQueen** es un pequeño proyecto de maquetación web que forma parte del módulo de CSS Experto del Máster en Desarrollo Web Full Stack. El objetivo principal era replicar con la máxima fidelidad el header-hero de una página web para un negocio de SPA (Salud y Belleza) a partir de un diseño proporcionado en Figma.

Aunque los requisitos de la tarea solicitaban únicamente un diseño estático no responsive, decidí ir **mucho más allá**, transformando este ejercicio en un componente profesional, interactivo y completamente funcional. El resultado es un header que no solo es visualmente idéntico al diseño original, sino que incorpora características avanzadas de usabilidad propias de un sitio web moderno: un menú sticky, un dropdown interactivo y una experiencia móvil perfecta con un menú hamburguesa. Esta iniciativa demuestra mi compromiso con la calidad y mi capacidad para anticiparme a las necesidades reales de un proyecto.

---

## El Desafío Técnico

El diseño, aunque hermoso, presentaba varios retos complejos que requerían un enfoque técnico avanzado:

### Sistema de Capas Superpuestas
El diseño incluía **tres capas de fondo** superpuestas (beige, verde y blanco) además de una imagen decorativa de flor de loto y la fotografía principal de la modelo. Gestionar correctamente el `z-index` y el posicionamiento absoluto de todas estas capas, manteniendo la flexibilidad para el responsive, fue uno de los primeros desafíos.

### Interactividad Avanzada
El mayor reto fue implementar todas las mejoras interactivas que no estaban en los requisitos:
- **Menú Sticky**: La barra de navegación se vuelve "pegajosa" al hacer scroll, con un sutil efecto de desenfoque (`backdrop-filter`) y una animación de entrada.
- **Dropdown Interactivo**: El enlace "More" despliega un submenú al hacer clic, con un icono que rota para indicar el estado abierto/cerrado. La lógica incluye cerrar el menú al hacer clic fuera de él.
- **Menú Hamburguesa**: En móviles, la navegación se transforma en un panel deslizante desde la derecha, con una animación suave. Se integra con los enlaces móviles y se gestiona el estado del botón.

### Diseño Adaptativo Complejo
Las tarjetas testimoniales tenían posiciones absolutas con transformaciones específicas en desktop (`transform: translateX(130px) translateY(180px)`). El reto fue crear una estrategia de media queries que transformara este layout complejo en un flujo vertical natural en móvil, sin perder la jerarquía de la información.

---

## Solución Implementada

### Arquitectura SASS Modular y Escalable

Opté por una estructura de archivos SASS completamente modular que separa las responsabilidades y facilita el mantenimiento:

```plaintext
scss/
├── main.scss                # Archivo principal (importaciones)
├── _variables.scss          # Variables globales (colores, breakpoints, sombras)
├── _mixins.scss             # Mixins reutilizables (flex-center, respond-to, button-base)
├── _base.scss               # Estilos base y reset
├── _layout.scss             # Estructura de página y capas de fondo
├── _navigation.scss         # Estilos de navegación, menú sticky, dropdown y hamburguesa
├── _hero.scss               # Hero section, botones y feature grid
├── _testimonials.scss       # Tarjetas testimoniales
└── _responsive.scss         # Todos los media queries
```

### Interactividad con JavaScript Vanilla

Para la capa de interacción, implementé una solución robusta y ligera con JavaScript puro:

```javascript
// Lógica del menú sticky con detección de scroll
function handleScroll() {
    if (window.scrollY > 50) {
        siteHeader.classList.add('sticky');
    } else {
        siteHeader.classList.remove('sticky');
    }
}

// Toggle del menú hamburguesa con gestión de estados
menuToggle.addEventListener('click', function() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// Dropdown con cierre al hacer clic fuera
moreWrapper.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('open');
});

document.addEventListener('click', function(e) {
    if (!moreWrapper.contains(e.target)) {
        moreWrapper.classList.remove('open');
    }
});

// Cerrar menú al hacer clic fuera o en un enlace
document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});
```

### Estrategia Responsive

Implementé **4 breakpoints** clave para una experiencia fluida en todos los dispositivos, utilizando el mixin `respond-to`:

- **1920px+**: Diseño fijo, anclado al lienzo original de Figma con todas las capas de fondo visibles.
- **1400px**: El layout se vuelve fluido. La tipografía comienza a escalar y **aparece el menú hamburguesa**, transformando la navegación.
- **992px (Tablets)**: **Punto de inflexión**. Se ocultan todas las capas de fondo absolutas y la imagen de la modelo. El layout pasa a una sola columna.
- **576px (Móviles Pequeños)**: Ajustes finos de tipografía, espaciado y optimización del grid de características.

### Sistema de Componentes Reutilizables

El diseño se construyó con componentes claramente definidos:

- **Tarjetas Testimoniales**: Con efecto de desenfoque (`backdrop-filter`), sombra suave y posicionamiento absoluto en escritorio que se transforma en flujo natural en móvil.
- **Feature Grid**: Grid de 3 columnas con iconos SVG circulares y fondo verde.
- **Botones**: Sistema completo con estilos base, primario (Book Now) y secundario (Watch Video), todos con estados hover.
- **Navegación**: Sistema que integra logo, menú con dropdown, acciones (buscar, bolsa) y enlaces de sign in/up, con transición fluida entre desktop y móvil.

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con header, nav, main, section, article y atributos ARIA para accesibilidad.
- **CSS3 Avanzado**: Flexbox, Grid, posicionamiento absoluto, `backdrop-filter`, transiciones, transformaciones.
- **SASS/SCSS**: Arquitectura modular, variables, mixins, anidamiento, funciones y partials.
- **JavaScript (Vanilla)**: Manipulación del DOM para menú sticky, dropdown y menú hamburguesa.

### Herramientas de Diseño
- **Figma**: Análisis y extracción de medidas, colores y tipografías.
- **SVG Optimizados**: Iconos (masaje, loto, mortero, comillas) en formato vectorial.
- **Font Awesome**: Para iconografía adicional (búsqueda, bolsa, chevron, play).

### Metodologías
- **BEM**: Nomenclatura consistente de clases (`.hero-buttons`, `.btn-book`, `.feature-item`).
- **Arquitectura CSS**: Separación de concerns con archivos parciales.
- **Progressive Enhancement**: Funcionalidad base sin JavaScript, experiencia mejorada con él.

---

## Características Principales

- **Fidelidad Pixel-Perfect**: Recreación exacta del diseño Figma.
- **Arquitectura SASS Modular**: Código mantenible con 8 archivos parciales.
- **Menú Sticky**: Navegación fija al hacer scroll con efecto blur.
- **Dropdown Interactivo**: Submenú para "More" con indicador visual de estado.
- **Menú Hamburguesa**: Panel deslizante con integración de enlaces móviles.
- **Sistema de Capas**: 3 fondos superpuestos + imagen decorativa SVG.
- **Diseño Responsive**: 4 breakpoints estratégicos.
- **Componentes Reutilizables**: Sistema de diseño coherente.
- **Iconos SVG y Vectoriales**: Formato ligero y escalable.
- **Accesibilidad**: Atributos ARIA en elementos interactivos.
- **Estados Hover**: Feedback visual en todos los elementos interactivos.
- **Sistema de Variables**: Colores, tipografías y breakpoints centralizados.
- **Mixins Eficientes**: Código DRY para botones, transiciones y media queries.

---

## Enlaces

<div class="flex flex-col sm:flex-row gap-4 justify-center my-8">
  <a href="https://jaterli.github.io/CSS-entregable-1/" target="_blank" class="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
    </svg>
    Ver Proyecto en Vivo
  </a>
  
  <a href="https://github.com/Jaterli/CSS-entregable-1" target="_blank" class="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
    </svg>
    Código en GitHub
  </a>
</div>

---

## Conclusión

**GlowQueen** es la materialización de mi filosofía de desarrollo: **superar las expectativas y construir para el mundo real**. Lo que comenzó como un ejercicio de maquetación estática se ha convertido en un componente de header profesional, interactivo y totalmente funcional.

Este proyecto demuestra mi capacidad para:
1. **Ejecutar con precisión**: Lograr un pixel-perfect del diseño original.
2. **Pensar como un arquitecto front-end**: Diseñar una estructura de código (SASS modular) mantenible y escalable.
3. **Añadir valor con interactividad**: Implementar con JavaScript vanilla características (sticky nav, dropdown, menú hamburguesa) que transforman la experiencia de usuario.
4. **Priorizar la experiencia en todos los dispositivos**: Crear un diseño responsive fluido.
5. **Considerar la accesibilidad**: Integrar atributos ARIA en elementos clave.

GlowQueen no es solo un header bonito; es un ejemplo tangible de mi enfoque para construir componentes web completos, robustos y listos para integrarse en cualquier proyecto profesional.

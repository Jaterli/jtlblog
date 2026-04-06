---
title: "GathSession: Header Hero responsive para Comunidades"
description: "Desarrollo de un header-hero con menú hamburguesa, fiel al diseño Figma. Implementación de SASS, sistema de capas y diseño responsive."
pubDate: "2026-03-17"
heroImage: "/images/proyectos/projects.gathsessions.webp"
tags: [HTML5, CSS3, SASS, Figma, JavaScript, Diseño Web, Responsive Design, CSS Grid, Flexbox, Menú Hamburguesa ]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "GathSession - Header para Comunidades"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Header hero responsive para una plataforma de comunidades, con menú hamburguesa, implementado con SASS y fidelidad total al diseño original de Figma."
  "image": "https://jaterli.com/images/proyectos/projects.gathsessions.webp" 
  "url": "https://jaterli.com/proyectos/entry/2026/gathsession-header-comunidades-css-avanzado"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-03-17"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript"
  ]
  "featureList": [
    "Maquetación pixel-perfect a partir de diseño Figma",
    "Arquitectura CSS modular con SASS (7 archivos parciales)",
    "Menú hamburguesa interactivo con JavaScript puro y overlay",
    "Diseño responsive con 5 breakpoints (1920px a 576px)",
    "Header sticky con efecto blur al hacer scroll",
    "Sistema de rejilla con CSS Grid para el layout principal",
    "Componentes reutilizables (feature grid, botones)",
    "Sistema de variables CSS para colores y tipografía",
    "Mixins para media queries, funciones de color y efectos hover",
    "Efectos hover en todos los elementos interactivos",
    "Iconos en formato SVG optimizados",
    "Gestión del scroll del body cuando el menú móvil está abierto"
  ]
---

## Visión General

**GathSession** es la segunda práctica del módulo de CSS Experto, donde el objetivo era replicar un header-hero moderno para una plataforma de creación de comunidades. El diseño, proporcionado en Figma, presentaba una estética limpia con una tipografía serif para el titular y una paleta de colores oscuros acentuados con un rosa vibrante.

Siguiendo la filosofía de ir más allá de los requisitos, no me limité al diseño estático solicitado. Añadí una capa de interactividad y adaptabilidad crucial para la experiencia de usuario real: **un header sticky, un menú hamburguesa funcional y un diseño completamente responsive con 5 breakpoints**. Esto convierte un simple ejercicio de maquetación en un componente listo para ser integrado en cualquier proyecto web moderno.

---

## El Desafío Técnico

Aunque el diseño era menos complejo en capas que el anterior, presentaba sus propios retos:

### Interactividad Mobile-First (Aunque el Diseño Era Desktop)
El mayor desafío fue implementar un menú hamburguesa y un header sticky que no estaban en los requisitos. Esto implicó:
- **Diseñar la lógica con JavaScript puro** para abrir/cerrar el menú, gestionar el overlay y añadir/remover la clase `sticky` al header.
- **Asegurar que la animación del icono hamburguesa** (transformación a una "X") fuera fluida y accesible.
- **Gestionar el scroll del body** cuando el menú móvil está abierto para mejorar la usabilidad.
- **Coordinar el z-index** de los diferentes elementos (header, menú, overlay) para que el comportamiento fuera el esperado.

### Consistencia en el Diseño Responsive
El diseño desktop (1920x1080) es muy horizontal. El reto fue adaptarlo a pantallas más pequeñas sin perder la jerarquía visual:
- **Transición del layout**: Pasar de un `grid` de dos columnas en desktop a una sola columna en móvil, ocultando la imagen decorativa para priorizar el contenido.
- **Escalado tipográfico**: Reducir progresivamente el enorme `h1` de 80px para que siguiera siendo legible y contundente en móviles.
- **Reorganización de elementos**: El grid de características y los botones debían apilarse verticalmente de forma natural en los breakpoints más pequeños.

### Grid de Características
Alinear correctamente los iconos SVG con el texto en el grid de 3 columnas, asegurando que el contenedor de los iconos (con su fondo sutil) mantuviera un tamaño fijo y que todo el conjunto fuera responsive.

---

## Solución Implementada

### Arquitectura SASS Modular

Mantuve una estructura de archivos parciales, lo que demuestra la escalabilidad y el buen hacer en la organización del código:

```plaintext
scss/
├── main.scss                # Archivo principal (solo importaciones)
├── _variables.scss          # Variables globales (colores, tipografía, breakpoints)
├── _mixins.scss             # Mixins reutilizables y funciones de color (lighten/darken con OKLCH)
├── _base.scss               # Estilos base y reset
├── _layout.scss             # Estructura de página (page-wrapper, main-content, header)
├── _navigation.scss         # Estilos de navegación, logo y menú hamburguesa
├── _hero.scss               # Hero section, botones y feature grid
└── _responsive.scss         # Todos los media queries organizados por breakpoint
```

### Header Sticky y Menú Hamburguesa con JavaScript Puro

Para la interactividad, implementé una solución ligera y eficaz con JavaScript vanilla, demostrando un conocimiento sólido del lenguaje base.

```javascript
// Lógica principal del menú y header sticky
function toggleMenu() {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
}

function handleScroll() {
    if (window.scrollY > 50) {
        siteHeader.classList.add('sticky');
    } else {
        siteHeader.classList.remove('sticky');
    }
}

// Event listeners para botón, overlay, enlaces, scroll y resize
// Cierre automático del menú al redimensionar a desktop
```

### Estrategia Responsive y de Interactividad

Implementé **5 breakpoints** que garantizan una experiencia óptima en cualquier dispositivo, utilizando un mixin `respond-to` para mantener el código limpio:

- **`xxl` (1920px+)**: Diseño fijo, anclado al lienzo original de Figma.
- **`xl` (1400px)**: El layout se vuelve fluido, tipografía comienza a escalar y se ajustan los paddings.
- **`lg` (992px - Tablets)**: Aparece el menú hamburguesa. La navegación se transforma en un panel deslizante desde la derecha. La imagen de la derecha se oculta.
- **`md` (768px - Móviles Grandes)**: El grid de características se apila verticalmente para una lectura más cómoda.
- **`sm` (576px - Móviles Pequeños)**: Los botones y el padding general se ajustan al máximo para dispositivos muy pequeños.

### Sistema de Color Inteligente con OKLCH

Para los estados `hover` y los fondos, utilicé la función `color.scale()` de Sass con el espacio de color `oklch`. Esto permite generar variaciones de color de forma dinámica y mantener una paleta coherente sin necesidad de definir colores manualmente, además de ser más perceptualmente uniforme para el ojo humano.

```scss
// _mixins.scss
@function color-lighten($color, $percentage) {
    @return color.scale($color, $lightness: $percentage, $space: oklch);
}

// Uso en _hero.scss para el hover del botón
&:hover {
    background-color: color-lighten($primary-pink, 10%);
}
```

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con `header`, `nav`, `main`, `section`, `button` y uso correcto de `aria-label` para accesibilidad.
- **CSS3 Avanzado**: CSS Grid, Flexbox, posicionamiento, transiciones, `backdrop-filter` para el efecto blur del header sticky.
- **SASS/SCSS**: Arquitectura modular, mixins, funciones (`color.scale`), variables y partials.
- **JavaScript (Vanilla)**: Manipulación del DOM para la interactividad del menú hamburguesa y el header sticky.

### Herramientas de Diseño
- **Figma**: Extracción precisa de medidas, colores y tipografías.
- **SVG Optimizados**: Iconos vectoriales listos para web, ligeros y escalables.
- **Font Awesome**: Uso opcional para iconografía de apoyo, demostrando flexibilidad.

### Metodologías
- **BEM (Bloque Elemento Modificador)**: Nomenclatura de clases (`.hero-buttons`, `.btn-primary`, `.feature-item`, `.menu-toggle.open`).
- **Arquitectura CSS**: Clara separación de responsabilidades en archivos parciales (7-1 adaptado).
- **Progressive Enhancement**: La funcionalidad base existe sin JavaScript, pero la experiencia mejora con él.

---

## Características Principales

- **Fidelidad Pixel-Perfect**: Recreación exacta del diseño Figma.
- **Arquitectura SASS Modular**: Código limpio, mantenible y escalable.
- **Header Sticky**: El header se vuelve "sticky" con un efecto de blur al hacer scroll.
- **Menú Hamburguesa Funcional**: Implementado con JS puro, con animaciones suaves y overlay.
- **Diseño Completamente Responsive**: 5 breakpoints que adaptan el layout a cualquier pantalla.
- **Interactividad Mejorada**: Efectos hover en botones, enlaces e ítems del feature grid.
- **Iconos SVG**: Todos los iconos en formato vectorial.
- **Gestión de Estado del Menú**: Control del scroll del body cuando el menú móvil está abierto para una mejor UX.
- **Semántica HTML y Accesibilidad**: Código estructurado correctamente y uso de atributos ARIA donde es necesario.
- **Sistema de Variables**: Centralización de colores, fuentes y breakpoints.
- **Mixins Eficientes**: Funciones para aclarar/oscurecer colores y media queries reutilizables.

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/CSS-entregable-2/" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/CSS-entregable-2.git" target="_blank" class="flex items-center btn btn-primary"> 
  <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

**GathSession** consolida mi enfoque de desarrollo front-end: no se trata solo de cumplir, sino de **crear valor añadido**. Fui más allá de los requisitos de la tarea, añadiendo un header sticky y un menú hamburguesa que transforman un diseño estático en una experiencia de usuario dinámica y profesional. La meticulosa arquitectura SASS y el diseño responsive demuestran una comprensión profunda de las mejores prácticas actuales.

Este proyecto demuestra mi capacidad para:
1.  **Leer e interpretar un diseño** de Figma con precisión milimétrica.
2.  **Construir una arquitectura CSS** robusta y mantenible con SASS.
3.  **Añadir funcionalidad compleja** con JavaScript puro, integrando la lógica de negocio (el menú, el sticky header) con el diseño.
4.  **Pensar en el usuario final**, asegurando que la experiencia sea excelente en todos los dispositivos, no solo en el escritorio.

Es un paso más en mi camino para construir componentes web completos, profesionales y listos para producción.


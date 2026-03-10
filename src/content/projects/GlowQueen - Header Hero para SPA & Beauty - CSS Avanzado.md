---
title: "GlowQueen: Header Hero para SPA & Beauty - CSS Avanzado"
description: "Desarrollo de un header-hero fiel al diseño Figma para un negocio de SPA, implementando SASS, arquitectura CSS modular y técnicas avanzadas de posicionamiento con capas superpuestas."
pubDate: "2026-03-10"
heroImage: "/images/proyectos/projects.glowqueen.webp"
tags: [HTML5, CSS3, SASS, Figma, Diseño Web, Responsive Design, Flexbox, CSS Grid]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "GlowQueen - SPA & Beauty Header"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Header hero para sitio web de SPA con diseño responsive y arquitectura modular en SASS, implementado con fidelidad total al diseño original de Figma."
  "image": "https://jaterli.com/images/proyectos/projects.glowqueen.webp"
  "url": "https://jaterli.com/proyectos/entry/glowqueen-header-spa-css-avanzado"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-03-10"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS"
  ]
  "featureList": [
    "Maquetación pixel-perfect a partir de diseño Figma",
    "Arquitectura CSS modular con SASS (7 archivos parciales)",
    "Sistema de capas superpuestas (3 fondos de color + imagen decorativa)",
    "Diseño responsive con 4 breakpoints (1920px, 1400px, 992px, 576px)",
    "Metodología BEM para nomenclatura de clases",
    "Componentes reutilizables (tarjetas testimoniales, botones, grid de características)",
    "Sistema de variables CSS para colores, tipografía y sombras",
    "Mixins para media queries y estilos base",
    "Efectos hover en todos los elementos interactivos"
  ]
---


## Visión general

**GlowQueen** es un pequeño proyecto de maquetación web que forma parte del módulo de CSS Experto del Máster en Desarrollo Web Full Stack. El objetivo era replicar con la máxima fidelidad posible el header-hero de una página web para un negocio de SPA (Salud y Belleza) a partir de un diseño proporcionado en Figma.

Aunque los requisitos de la tarea solicitaban únicamente un diseño estático no responsive, decidí ir más allá e implementar una solución completamente responsive con arquitectura SASS modular. Esta decisión me permitió profundizar en técnicas avanzadas de organización CSS, sistemas de capas superpuestas y metodologías como BEM, creando un componente profesional y escalable que mantiene su integridad visual en todos los dispositivos.

---

## El Desafío Técnico

El diseño presentaba varios retos interesantes que requerían un enfoque cuidadoso:

### Sistema de Capas Superpuestas
El diseño incluía **tres capas de fondo** superpuestas (beige, verde y blanco) además de una imagen decorativa de flor de loto y la fotografía principal de la modelo. Gestionar correctamente el z-index y el posicionamiento absoluto manteniendo la flexibilidad responsive fue uno de los mayores desafíos.

### Diseño Adaptativo Complejo
Las tarjetas testimoniales tenían posiciones absolutas con transformaciones específicas en desktop (`transform: translateX(130px) translateY(180px)`) que debían transformarse en un flujo natural en móvil. Esto requería una estrategia de media queries cuidadosamente planificada.

### Componentes Visualmente Ricos
El diseño incluía:
- Grid de características con iconos SVG circulares
- Tarjetas testimoniales con efecto blur y sombras
- Botones con estados hover personalizados
- Navegación compleja con iconos y divisores

---

## Solución Implementada

### Arquitectura SASS Modular

Opté por una estructura de archivos SASS completamente modular que separa las responsabilidades:

```plaintext
scss/
├── main.scss                # Archivo principal (importaciones)
├── _variables.scss          # Variables globales (colores, breakpoints, sombras)
├── _mixins.scss             # Mixins reutilizables (flex-center, respond-to, button-base)
├── _base.scss               # Estilos base y reset
├── _layout.scss             # Estructura de página y capas de fondo
├── _navigation.scss         # Estilos de navegación
├── _hero.scss               # Hero section y feature grid
├── _testimonials.scss       # Tarjetas testimoniales
└── _responsive.scss         # Todos los media queries
```

Esta organización permite:
- **Mantenibilidad**: Cada componente tiene su propio archivo
- **Reutilización**: Variables y mixins centralizados
- **Escalabilidad**: Fácil añadir nuevos componentes

### Sistema de Variables Robusto

```scss
// _variables.scss
$primary-dark: #264065;
$primary-green: #A9D6CB;
$background-beige: #FAF8F5;
$breakpoint-xl: 1400px;
$breakpoint-lg: 992px;
$shadow-card: 0 18px 30px -12px rgba(0,0,0,0.15);
```

### Mixins Inteligentes

```scss
// _mixins.scss
@mixin respond-to($breakpoint) {
    @if $breakpoint == sm {
        @media (max-width: $breakpoint-sm) { @content; }
    } @else if $breakpoint == lg {
        @media (max-width: $breakpoint-lg) { @content; }
    } @else if $breakpoint == xl {
        @media (max-width: $breakpoint-xl) { @content; }
    }
}
```

### Estrategia Responsive

Implementé **4 breakpoints** clave:

- **1920px+**: Diseño fijo con ancho de 1920x1080 (fiel al diseño original)
- **1400px**: Transición a layout fluido, testimonios reposicionados
- **992px**: Mobile-first, capas de fondo ocultas, testimonios apilados
- **576px**: Ajustes para móviles pequeños (tipografía reducida, botones apilados)

### Gestión de Capas

```scss
// Sistema de z-index organizado
.bg-beige { z-index: 1; }
.bg-green { z-index: 1; }
.bg-white-bottom { z-index: 2; }
.flower-svg-bg { z-index: 5; }
.main-content { z-index: 10; }
.testimonial-card.card1 { z-index: 30; }
```

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con header, nav, section y article implícitos
- **CSS3 Avanzado**: Flexbox, Grid, posicionamiento absoluto, backdrop-filter
- **SASS/SCSS**: Arquitectura modular, variables, mixins, anidamiento

### Herramientas de Diseño
- **Figma**: Análisis y extracción de medidas, colores y tipografías
- **SVG Optimizados**: Todos los iconos en formato vectorial

### Metodologías
- **BEM**: Nomenclatura consistente de clases
- **Arquitectura CSS**: Separación de concerns
- **Mobile First**: Aunque el diseño era desktop-first, apliqué principios mobile-first en la transición

---

## Características Principales

- **Fidelidad Pixel-Perfect**: Recreación exacta del diseño Figma
- **Arquitectura SASS Modular**: 7 archivos parciales bien organizados
- **Sistema de Capas Complejo**: 3 fondos superpuestos + imagen decorativa
- **Diseño Completamente Responsive**: 4 breakpoints para todos los dispositivos
- **Componentes Reutilizables**: Sistema de diseño coherente
- **Iconos SVG**: Todos los iconos en formato vectorial optimizado
- **Semántica HTML**: Estructura correcta y accesible
- **Estados Hover**: Todos los elementos interactivos tienen feedback visual
- **Sistema de Variables**: Colores, tipografías, sombras y breakpoints centralizados
- **Mixins Eficientes**: Código DRY y mantenible

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

**GlowQueen** representa mi enfoque hacia el desarrollo CSS profesional: ir más allá de los requisitos mínimos para crear soluciones robustas, mantenibles y escalables. Aunque la tarea solo pedía un diseño estático, la implementación de SASS, arquitectura modular y responsive design demuestra mi compromiso con las buenas prácticas y la calidad del código.

Este proyecto, aunque pequeño en alcance, incorpora principios fundamentales que aplico en desarrollos más complejos: organización modular, sistemas de diseño coherentes, atención al detalle en la implementación visual y una mentalidad de mejora continua. Es la base sobre la que construyo proyectos full-stack más ambiciosos como AnGoTest.

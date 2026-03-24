---
title: "Modern Art Gallery: Mini-site responsive con dos vistas"
description: "Desarrollo de un mini-site de dos páginas para una galería de arte moderno. Implementación mobile-first con SASS, diseño responsive y navegación entre vistas."
badge: "Finalizado"
pubDate: "2026-03-19"
heroImage: "/images/proyectos/projects.modern-art-gallery.webp"
tags: [HTML5, CSS3, SASS, Figma, Responsive Design, Mobile First, CSS Grid ]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Modern Art Gallery - Mini-site"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Mini-site de dos vistas para una galería de arte moderno con diseño mobile-first, responsive y navegación entre páginas."
  "image": "https://tusitio.com/images/proyectos/projects.modern-art-gallery.webp"
  "url": "https://jaterli.github.io/CSS-entregable-3/"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-03-19"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS"
  ]
  "featureList": [
    "Maquetación pixel-perfect a partir de diseño Figma",
    "Arquitectura SASS modular (abstracts, base, components, layouts)",
    "Estrategia mobile-first con 3 breakpoints (768px, 1024px, 1275px)",
    "Mini-site con dos vistas (home y location)",
    "Componente botón reutilizable con flecha SVG y hover interactivo",
    "Footer con variantes de color mediante clases modificadoras",
    "Sistema de CSS Grid para layouts complejos",
    "Imágenes decorativas gestionadas como backgrounds CSS",
    "Iconos sociales en SVG inline para mejor rendimiento",
    "Tipografías optimizadas desde Google Fonts"
  ]
---

## Visión General

**Modern Art Gallery** es la tercera tarea entregable del módulo de CSS Avanzado. El proyecto consiste en un mini-site de dos páginas para una galería de arte, con un diseño proporcionado en Figma que debía replicarse con precisión.

A diferencia de los entregables anteriores, este proyecto introduce un requisito fundamental: **mobile-first**. Toda la estrategia de desarrollo parte desde la vista móvil, añadiendo progresivamente estilos para tablet y desktop mediante media queries.

El resultado es un sitio web de dos vistas (home y location) con un sistema de grid complejo, un componente de botón reutilizable con efecto hover, y un footer que cambia de color según la página.

---

## El Desafío Técnico

### Mobile First como Estrategia Principal
Este era el primer proyecto donde se exigía explícitamente mobile-first. Esto implicó:
- Diseñar los estilos base pensando primero en pantallas pequeñas
- Usar `min-width` en lugar de `max-width` para las media queries
- Asegurar que el layout se expande y reorganiza correctamente al crecer la pantalla

### Sistema de Grid Complejo
La página home presenta dos grids distintos:
- **Grid 1**: Texto e imagen que intercambian orden en móvil vs desktop
- **Grid 2**: Columna izquierda que ocupa dos filas implícitas en desktop

Gestionar estas reordenaciones con CSS Grid y `order` fue un desafío interesante.

### Componentes con Variantes
El footer requería dos variantes de color:
- **Footer home**: Fondo oscuro con iconos blancos
- **Footer location**: Fondo acento (naranja) con iconos oscuros

Mantener la misma estructura HTML y cambiar solo los estilos mediante clases modificadoras fue la solución elegante.

### Imágenes como Backgrounds
Todas las imágenes del diseño se implementaron como `background-image` en lugar de etiquetas `<img>`. Esto permitió un control más preciso del escalado y la posición, pero requirió usar `role="img"` y `aria-label` para mantener la accesibilidad.

---

## Solución Implementada

### Arquitectura SASS Modular

```
scss/
├── abstracts/
│   └── _variables.scss     # Colores, fuentes, breakpoints, espaciados
├── base/
│   ├── _reset.scss         # Reset básico
│   └── _typography.scss    # Tipografías base
├── components/
│   ├── _button.scss        # Botón con flecha y hover
│   ├── _footer.scss        # Footer con variantes home/location
│   ├── _header.scss        # Hero y header del mapa
│   └── _main.scss          # Contenido principal (grids)
└── layouts/
    └── _responsive.scss    # Media queries (tablet, desktop)
```

### Estrategia Mobile First

```scss
// Estilos base (móvil)
.hero__title {
  font-size: 60px;
  line-height: 55px;
  color: $color-dark;
}

// Tablet (768px+)
@media (min-width: $breakpoint-tablet) {
  .hero__title {
    font-size: 70px;
    line-height: 65px;
  }
}

// Desktop (1024px+)
@media (min-width: $breakpoint-desktop) {
  .hero__title {
    color: $color-white; // Cambia de color al aparecer capa negra
  }
}
```

### Componente Botón Reutilizable

El botón con flecha es un componente clave del diseño:

```html
<div class="button">
  <span class="button-text">OUR LOCATION</span>
  <div class="button-arrow">
    <svg width="10" height="24" viewBox="0 0 10 24">
      <path d="M1 0L9 12L1 24" stroke="white" stroke-width="2"/>
    </svg>
  </div>
</div>
```

El efecto hover intercambia los colores:
- Normal: texto negro sobre fondo oscuro, flecha naranja
- Hover: texto negro sobre fondo naranja, flecha oscura

### Grids Complejos con CSS Grid

**Grid 1** (reordenación móvil/desktop):
```scss
.main-home__grid1 {
  grid-template-columns: 1fr; // móvil: una columna
  
  &-col1 {
    order: 2; // texto después de imagen
  }
  &-col2 {
    order: 1; // imagen primero
  }
}

@media (min-width: $breakpoint-tablet) {
  .main-home__grid1 {
    grid-template-columns: 0.8fr 1.2fr; // desktop: dos columnas
    
    &-col1 {
      order: 0; // orden natural
    }
  }
}
```

### Footer con Variantes

```scss
.footer {
  &-home {
    background-color: $color-dark;
    color: $color-white;
    .footer__social-link svg {
      fill: $color-white;
      &:hover { fill: $color-accent; }
    }
  }
  
  &-location {
    background-color: $color-accent;
    color: $color-dark;
    .footer__social-link svg {
      fill: $color-dark;
      &:hover { fill: $color-white; }
    }
  }
}
```

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con header, main, footer, section y article implícitos. Atributos ARIA para accesibilidad.
- **CSS3 Avanzado**: CSS Grid, Flexbox, posicionamiento, transiciones, `background-size: cover`.
- **SASS/SCSS**: Arquitectura modular (abstracts, base, components, layouts), variables, anidamiento.

### Herramientas de Diseño
- **Figma**: Extracción precisa de medidas, colores y tipografías.
- **SVG Inline**: Iconos sociales y flechas optimizados sin peticiones HTTP.
- **Google Fonts**: Big Shoulders Display (800,900) y Outfit (400).

### Metodologías
- **Mobile First**: Estilos base para móvil, media queries con `min-width`.
- **BEM**: Nomenclatura consistente (`.main-home__grid1-col1`).
- **Arquitectura CSS**: Separación de responsabilidades en archivos parciales.

---

## Características Principales

- **Mobile First**: Diseño pensado desde móvil hacia desktop
- **Dos Vistas**: Home y location con navegación entre páginas
- **CSS Grid Avanzado**: Layouts complejos con reordenación de elementos
- **Componente Botón Reutilizable**: Con flecha SVG y hover interactivo
- **Footer con Variantes**: Misma estructura, diferentes colores según página
- **Tipografía Dual**: Big Shoulders Display para títulos, Outfit para texto
- **SVG Inline**: Iconos sociales sin peticiones HTTP adicionales
- **Imágenes Background**: Control preciso del escalado con `background-size`
- **Breakpoints Estratégicos**: 768px, 1024px y 1275px
- **Accesibilidad**: Atributos ARIA en elementos decorativos

---

## Enlaces

<div class="flex flex-col sm:flex-row gap-4 justify-center my-8">
  <a href="https://jaterli.github.io/CSS-entregable-3/" target="_blank" class="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
    </svg>
    Ver Proyecto en Vivo
  </a>
  
  <a href="https://github.com/Jaterli/CSS-entregable-3" target="_blank" class="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
    </svg>
    Código en GitHub
  </a>
</div>

---

## Conclusión

**Modern Art Gallery** representa la aplicación práctica de una arquitectura CSS robusta y escalable en un contexto mobile-first. La implementación demuestra cómo los principios de diseño atómico y la planificación estratégica de breakpoints permiten crear sistemas coherentes que se adaptan sin fricción a cualquier dispositivo.

Más allá de cumplir con los requisitos técnicos, el proyecto destaca por:
- **Decisiones arquitectónicas sólidas**: La separación en capas (abstracts, base, components, layouts) facilita el mantenimiento y la escalabilidad futura.
- **Componentes inteligentes**: El botón con hover invertido y el footer con variantes mediante modificadores muestran un dominio de patrones de diseño reutilizables.
- **Precisión en la ejecución**: Cada detalle del diseño Figma se ha traducido con fidelidad, desde los sistemas de grid hasta la tipografía dual.

En definitiva, un componente front-end profesional que podría integrarse sin modificaciones en cualquier proyecto real de galería o museo.
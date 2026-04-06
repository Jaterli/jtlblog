---
title: "Modern Art Gallery: Mini-site responsive con dos vistas"
description: "Desarrollo de un mini-site de dos páginas para una galería de arte moderno. Implementación mobile-first con SASS, diseño responsive y navegación entre vistas."
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
  "image": "https://jaterli.com/images/proyectos/projects.modern-art-gallery.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/modern-art-gallery-mini-site-de-dos-vistas"
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

<div class="btn-group">
  <a href="https://jaterli.github.io/CSS-entregable-3/" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/CSS-entregable-3" target="_blank" class="flex items-center btn btn-primary"> 
  <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
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
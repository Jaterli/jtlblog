---
title: "Adam Keyes Mini-portfolio responsive con validación de formulario"
description: "Desarrollo de un mini-portafolio personal con diseño mobile-first, grid de proyectos con efectos hover, sección de habilidades y formulario de contacto con validación visual en tiempo real."
pubDate: "2026-03-23"
heroImage: "/images/proyectos/projects.portfolio-1.webp"
tags: [HTML5, CSS3, SASS, JavaScript, Figma, Responsive Design, Mobile First, CSS Grid, Form Validation]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Adam Keyes - Front-end Developer Portfolio"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Mini-portafolio personal para front-end developer con diseño mobile-first, grid de proyectos interactivo y formulario de contacto con validación visual."
  "image": "https://jaterli.com/images/proyectos/projects.portfolio-1.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/mini-portafolio-responsive-con-validacion-de-formulario"
  "author": {
    "@type": "Person",
    "name": "Tu Nombre"
  }
  "datePublished": "2026-03-23"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript"
  ]
  "featureList": [
    "Maquetación pixel-perfect a partir de diseño Figma",
    "Arquitectura SASS modular (abstracts, base, components, layouts)",
    "Estrategia mobile-first con 3 breakpoints (768px, 1024px, 1275px)",
    "Grid de proyectos responsive (1-2-3 columnas)",
    "Efecto hover en proyectos desktop (overlay con enlaces)",
    "Sección de habilidades con grid adaptable",
    "Formulario de contacto con validación visual en tiempo real",
    "Iconos sociales en SVG inline",
    "Elementos decorativos con elipses SVG",
    "Componente botón reutilizable en múltiples secciones"
  ]
---

## Visión General

**Adam Keyes Portfolio** es la cuarta tarea entregable del módulo de CSS Avanzado. El proyecto consiste en un mini-portafolio personal para un front-end developer, con un diseño proporcionado en Figma que debía replicarse con precisión.

Este proyecto introduce varios elementos nuevos: un formulario de contacto con validación visual, un grid de proyectos con efectos interactivos en desktop, y una sección de habilidades que organiza la experiencia del desarrollador. Como en los proyectos anteriores, mantengo la estrategia **mobile-first** y la arquitectura **SASS modular**.

---

## El Desafío Técnico

### Formulario con Validación Visual
El diseño incluía un formulario de contacto con estados de validación:
- **Estado normal**: borde inferior blanco semitransparente
- **Estado válido**: borde inferior verde (acento)
- **Estado inválido**: borde inferior rojo + mensaje de error

Implementar esta validación en tiempo real con JavaScript sin afectar la experiencia de usuario fue un desafío interesante.

### Grid de Proyectos con Overlay en Desktop
En desktop, cada tarjeta de proyecto debe mostrar un overlay con enlaces al hacer hover:
- La imagen se oscurece (opacidad 0.5)
- Aparecen los enlaces "VIEW PROJECT" y "VIEW CODE" centrados
- En móvil y tablet, los enlaces siempre visibles

### Layout Complejo con Elementos Decorativos
El diseño incluye elementos decorativos superpuestos:
- Elipse SVG en header y contacto
- Circunferencia decorativa alrededor de la imagen de perfil
- Posicionamiento absoluto que debía ajustarse en cada breakpoint

### Consistencia de Componentes
Mantener la consistencia visual entre header y footer (iconos sociales, logo) y entre los botones "CONTACT ME" en diferentes secciones.

---

## Solución Implementada

### Arquitectura SASS Modular

```
scss/
├── abstracts/
│   └── _variables.scss     # Colores, fuentes, breakpoints, espaciados
├── base/
│   ├── _reset.scss         # Reset básico
│   └── _typography.scss    # Utilidades tipográficas
├── components/
│   ├── _button.scss        # Botón reutilizable
│   ├── _contact.scss       # Formulario con validación visual
│   ├── _footer.scss        # Footer consistente
│   ├── _header.scss        # Header con elipse decorativa
│   ├── _hero.scss          # Hero section
│   ├── _projects.scss      # Grid de proyectos con hover effect
│   └── _skills.scss        # Grid de habilidades
└── layouts/
    └── _responsive.scss    # Utilidad container
```

### Validación Visual del Formulario

Implementé validación en tiempo real con JavaScript:

```javascript
function validateName() {
  const value = nameInput.value.trim();
  const isValid = value.length >= 2;
  updateFieldStatus(nameField, isValid);
  return isValid;
}

function updateFieldStatus(field, isValid) {
  const input = field.querySelector('input, textarea');
  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');
    input.classList.add('valid');
  } else {
    field.classList.remove('valid');
    field.classList.add('invalid');
    input.classList.add('invalid');
  }
}
```

Los estilos asociados:
```scss
.contact__input {
  border-bottom: 1px solid $color-white;
  
  &:focus {
    border-bottom-color: $color-accent;
  }
  
  &.valid {
    border-bottom-color: $color-accent;
  }
  
  &.invalid {
    border-bottom-color: $color-error;
  }
}
```

### Grid de Proyectos Responsive

```scss
.projects__grid {
  display: grid;
  grid-template-columns: 1fr;           // móvil: 1 columna
  gap: 1rem;
}

@media (min-width: $breakpoint-tablet) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr); // tablet: 2 columnas
  }
}

@media (min-width: $breakpoint-desktop) {
  .projects__grid {
    grid-template-columns: repeat(3, 1fr); // desktop: 3 columnas
  }
}
```

### Efecto Hover en Proyectos (Desktop)

```scss
@media (min-width: $breakpoint-desktop) {
  .projects__card {
    position: relative;
  }

  .projects__links {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .projects__card:hover &__links {
    opacity: 1;
  }

  .projects__card:hover &__image img {
    opacity: 0.5;
  }
}
```

### Sistema de Espaciado Consistente

Utilicé variables de espaciado para mantener consistencia:
```scss
$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
$spacing-md: 2rem;
$spacing-lg: 4rem;
$spacing-xl: 6rem;
$spacing-2xl: 8rem;
$spacing-3xl: 10rem;
```

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con header, main, section, footer y atributos ARIA para accesibilidad.
- **CSS3 Avanzado**: CSS Grid, Flexbox, posicionamiento absoluto, transiciones, `object-fit`.
- **SASS/SCSS**: Arquitectura modular (abstracts, base, components, layouts), variables, anidamiento.
- **JavaScript (Vanilla)**: Validación de formulario en tiempo real con feedback visual.

### Herramientas de Diseño
- **Figma**: Extracción precisa de medidas, colores y tipografías.
- **SVG Inline**: Iconos sociales optimizados sin peticiones HTTP.
- **Google Fonts**: Space Grotesk (400, 500, 700).

### Metodologías
- **Mobile First**: Estilos base para móvil, media queries con `min-width`.
- **BEM**: Nomenclatura consistente (`.projects__card-title`, `.contact__field.invalid`).
- **Arquitectura CSS**: Separación de responsabilidades en archivos parciales.

---

## Características Principales

- **Mobile First**: Diseño pensado desde móvil hacia desktop
- **Formulario con Validación Visual**: Feedback en tiempo real con colores verde/rojo
- **Grid de Proyectos Responsive**: 1-2-3 columnas según breakpoint
- **Efecto Hover en Proyectos**: Overlay con enlaces al hacer hover en desktop
- **Sección de Habilidades**: Grid adaptable con años de experiencia
- **Iconos Sociales SVG**: Consistentes en header y footer
- **Elementos Decorativos**: Elipses y circunferencia posicionadas absolutamente
- **Componente Botón Reutilizable**: Mismo estilo en hero, projects y contacto
- **Breakpoints Estratégicos**: 768px, 1024px y 1275px
- **Accesibilidad**: Atributos ARIA en iconos sociales y etiquetas de formulario

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/CSS-entregable-4/" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/jaterli/CSS-entregable-4" target="_blank" class="flex items-center btn btn-primary"> 
  <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

**Adam Keyes Portfolio** consolida mi dominio de CSS avanzado y SASS, incorporando nuevas habilidades fundamentales:

1. **Validación de formularios**: Implementación de feedback visual en tiempo real con JavaScript vanilla.
2. **Efectos interactivos avanzados**: Overlay con enlaces al hacer hover en proyectos desktop.
3. **Grids complejos**: Adaptación de layouts de 1, 2 y 3 columnas según breakpoint.
4. **Consistencia de componentes**: Reutilización de estilos en múltiples secciones del sitio.

Este proyecto demuestra mi capacidad para construir componentes interactivos completos, con especial atención a la experiencia de usuario y la retroalimentación visual.

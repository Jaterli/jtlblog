---
title: "Mini Conquer Blocks: Sitio web para academia de tecnología"
description: "Desarrollo de un sitio web de 12 páginas para una academia de tecnología, con menú hamburguesa, formularios, blog, cursos y diseño responsive mobile-first."
pubDate: "2026-03-30"
heroImage: "/images/proyectos/projects.conquer-blocks.webp"
tags: [HTML5, CSS3, SASS, JavaScript, Responsive Design, Mobile First, Formularios, SEO]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Conquer Blocks - Academia de Tecnología"
  "applicationCategory": "WebApplication"
  "operatingSystem": "Web"
  "description": "Sitio web de 12 páginas para academia de tecnologías emergentes con menú hamburguesa, formularios de registro y contacto, blog y catálogo de cursos."
  "image": "https://jaterli.com/images/proyectos/projects.conquer-blocks.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/conquer-blocks-sitio-web-para-academia-de-tecnologia"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-03-30"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "SASS",
    "JavaScript"
  ]
  "featureList": [
    "Sitio web de 12 páginas interconectadas",
    "Arquitectura SASS modular (9 archivos parciales)",
    "Estrategia mobile-first con 4 breakpoints (480px, 768px, 1024px, 1200px)",
    "Menú hamburguesa funcional con JavaScript vanilla",
    "Imágenes responsive con srcset y sizes",
    "Formulario de registro con 8 campos (text, date, email, url, file, textarea)",
    "Formulario de login y contacto",
    "Página de contacto con mapa de Google Maps embebido",
    "Blog con listado de noticias y detalle",
    "Catálogo de cursos con páginas de detalle",
    "Página Quiénes somos con equipo y misión/visión",
    "Aviso legal con contenido informativo",
    "Efectos hover en todos los elementos interactivos",
    "SEO básico: titles y meta descriptions únicos por página"
  ]
---

## Visión General

**Mini Conquer Blocks** es la quinta y última tarea entregable del módulo de CSS Avanzado. A diferencia de los proyectos anteriores, esta tarea partía de un proyecto HTML ya existente (desarrollado en el módulo de HTML) que debía ser estilizado y mejorado siguiendo los mismos estándares de calidad: mobile-first, SASS modular, interactividad y diseño responsive.

El resultado es un pequeño sitio web de 12 páginas para una academia de tecnologías emergentes, inspirado en Conquer Blocks, la academia donde curso el máster. De su web he obtenido algunos recursos, como textos e imágenes, para dar coherencia al proyecto. El sitio cuenta con un menú hamburguesa funcional, formularios de registro y contacto, blog con noticias, catálogo de cursos y una página institucional completa.

---

## El Desafío Técnico

### Escalabilidad del Proyecto HTML
El proyecto HTML original tenía 12 páginas interconectadas. El principal desafío fue:
- Mantener la consistencia visual en todas las páginas
- Asegurar que todos los enlaces funcionaran correctamente
- Implementar un sistema de estilos que pudiera aplicarse uniformemente

### Menú Hamburguesa con Estrategia Mobile-First
Aunque el menú hamburguesa ya lo había implementado en proyectos anteriores, aquí tenía que integrarse en un sitio de 12 páginas, lo que requería:
- Un JavaScript que funcionara en todas las páginas
- Gestión del estado `aria-expanded` para accesibilidad
- Cierre del menú al hacer clic en cualquier enlace

### Imágenes Responsive con srcset
El logo debía adaptarse a diferentes tamaños de pantalla. Implementé `srcset` y `sizes` para servir la imagen más adecuada según el viewport.

### Formularios Complejos
El formulario de registro requería 8 campos de diferentes tipos, incluyendo `date`, `url` y `file`. Aunque no se implementó validación avanzada, se respetó la semántica y accesibilidad.

### Layouts Complejos
Diferentes páginas requerían layouts específicos:
- Home: Hero con imagen de fondo, grid de cursos y blog
- Quiénes somos: Grid para historia, misión/visión, y equipo
- Cursos: Grid de tarjetas
- Contacto: Grid de dos columnas para información y mapa

---

## Solución Implementada

### Arquitectura SASS Modular

```
scss/
├── _variables.scss         # Variables globales
├── _header.scss            # Header con menú hamburguesa
├── _footer.scss            # Footer consistente
├── _home.scss              # Página principal
├── _quienes-somos.scss     # Página Quiénes somos
├── _cursos.scss            # Cursos y detalle
├── _blog.scss              # Blog y detalle
├── _forms.scss             # Formularios (registro, login, contacto)
├── _contacto.scss          # Página de contacto específica
├── _responsive.scss        # Utilidades generales
└── main.scss               # Archivo principal con importaciones
```

### Menú Hamburguesa Funcional

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');
    
    function toggleMenu() {
        nav.classList.toggle('header__nav--open');
        menuBtn.classList.toggle('header__menu-btn--active');
        
        if (nav.classList.contains('header__nav--open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.header__nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('header__nav--open');
            menuBtn.classList.remove('header__menu-btn--active');
            document.body.style.overflow = '';
        });
    });
    
    // Inicializar y escuchar cambios de tamaño
    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);
});
```

### Imágenes Responsive con srcset

```html
<img 
    srcset="assets/Conquer-Blocks-logo-175w.png 175w,
            assets/Conquer-Blocks-logo-220w.png 220w,
            assets/Conquer-Blocks-logo-300w.png 300w"
    sizes="(min-width: 1024px) 300px,
           (min-width: 761px) 220px,
           175px"
    src="assets/Conquer-Blocks-logo-175w.png" 
    alt="Conquer Blocks"
/>
```

### Grid de Cursos Responsive

```scss
.courses-grid {
  display: grid;
  grid-template-columns: 1fr;           // móvil: 1 columna
  gap: 1.5rem;
}

@media (min-width: $breakpoint-tablet) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr); // tablet: 2 columnas
  }
}
```

### Formulario de Registro Completo

```html
<form class="register-form" action="#" method="POST" enctype="multipart/form-data">
    <div class="form-group">
        <label for="fullname">Nombre completo *</label>
        <input type="text" id="fullname" name="fullname" required>
    </div>
    <div class="form-group">
        <label for="birthdate">Fecha de nacimiento *</label>
        <input type="date" id="birthdate" name="birthdate" required>
    </div>
    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
    </div>
    <!-- ... más campos ... -->
</form>
```

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica con 12 páginas interconectadas. Uso de header, nav, main, section, article, footer.
- **CSS3 Avanzado**: CSS Grid, Flexbox, posicionamiento, transiciones, `object-fit`, `backdrop-filter` implícito.
- **SASS/SCSS**: Arquitectura modular con 10 archivos parciales, variables, anidamiento, media queries.
- **JavaScript (Vanilla)**: Menú hamburguesa con toggle, gestión de scroll, cierre al hacer clic en enlaces.

### Imágenes y Assets
- **srcset y sizes**: Imagen del logo responsive con múltiples resoluciones.
- **SVG**: Iconos sociales (si los hubiera) en formato vectorial.
- **Imágenes optimizadas**: Uso de `loading="lazy"` para mejorar rendimiento.

### Metodologías
- **Mobile First**: Estilos base para móvil, media queries con `min-width`.
- **BEM**: Nomenclatura consistente (`.header__menu-btn`, `.course-card__img`).
- **Arquitectura CSS**: Separación de responsabilidades por componente/página.

---

## Características Principales

- **Sitio simplificado**: 12 páginas interconectadas con navegación funcional
- **Mobile First**: Diseño pensado desde móvil hacia desktop
- **Menú Hamburguesa**: Funcional en todas las páginas, con animación y gestión de scroll
- **Imágenes Responsive**: Logo con srcset y sizes para diferentes resoluciones
- **Formulario de Registro**: 8 campos incluyendo date, url y file
- **Formulario de Login**: Email y contraseña
- **Formulario de Contacto**: Nombre, email, asunto, mensaje
- **Mapa de Google Maps**: Embebido en página de contacto
- **Blog**: Listado de noticias con páginas de detalle
- **Catálogo de Cursos**: Grid de cursos con páginas de detalle
- **Página Institucional**: Quiénes somos con historia, misión, visión y equipo
- **Aviso Legal**: Contenido informativo sobre términos de uso
- **SEO Básico**: Titles y meta descriptions únicos por página
- **Efectos Hover**: En botones, tarjetas y enlaces
- **Carga Lazy**: Imágenes con `loading="lazy"` para mejorar rendimiento

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/CSS-entregable-5/" target="_blank" class="btn btn-neutral flex items-center">
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/jaterli/CSS-entregable-5" target="_blank" class="btn btn-primary flex items-center"> 
  <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

**Mini Conquer Blocks** es el proyecto más completo de los cinco entregables. Partiendo de un proyecto HTML ya existente, lo he transformado en un sitio web con un toque profesional con estilos modernos, menú hamburguesa funcional, formularios completos y diseño responsive.

Este proyecto demuestra mi capacidad para:
1. **Escalar proyectos**: Tomar un sitio de 12 páginas y aplicar un sistema de estilos coherente.
2. **Implementar componentes reutilizables**: Menú hamburguesa que funciona en todas las páginas.
3. **Gestionar imágenes responsive**: Uso correcto de srcset y sizes para el logo.
4. **Construir formularios completos**: Registro con 8 campos, login y contacto.
5. **Mantener consistencia visual**: Mismos estilos y componentes en todas las páginas.

Con este quinto entregable, cierro el módulo de CSS Avanzado con una muestra completa de mis habilidades: desde la maquetación pixel-perfect de diseños Figma hasta la construcción de sitios web completos desde cero.

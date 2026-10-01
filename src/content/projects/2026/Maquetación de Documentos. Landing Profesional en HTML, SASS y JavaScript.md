---
title: "Maquetación de Documentos: Landing Profesional en HTML, SASS y JavaScript"
description: "Sitio web estático de una sola página desarrollado en HTML5, SASS y JavaScript vanilla como carta de presentación para servicios de maquetación DTP."
pubDate: "2026-10-02"
heroImage: "/images/proyectos/projects.maquetaciondedocumentos.webp"
tags: [HTML5, CSS3, SASS, JavaScript, Responsive, RGPD, Landing Page, Maquetación DTP]
jsonLd:
  "@context": "https://schema.org"
  "@type": "WebSite"
  "name": "Maquetación de Documentos · Jaime Terciado"
  "url": "https://maquetaciondedocumentos.com/"
  "description": "Sitio web profesional de Jaime Terciado, maquetador DTP especializado en preparación de archivos para traducción, maquetación de documentos traducidos y conversión de PDF a formatos editables."
  "image": "https://maquetaciondedocumentos.com/images/proyectos/projects.maquetaciondedocumentos.webp"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-10-02"
  "programmingLanguage": [
    "HTML5",
    "CSS3 (SASS)",
    "JavaScript (ES6+)"
  ]
  "featureList": [
    "Arquitectura SASS modular con variables",
    "Diseño responsive mobile-first",
    "Menú hamburguesa accesible con cierre múltiple",
    "Navegación sticky con scroll suave",
    "Página de Aviso Legal conforme a RGPD y LSSI-CE",
    "HTML5 semántico con atributos ARIA",
    "Tipografía editorial con Google Fonts",
    "Formulario de contacto por email y WhatsApp"
  ]
---

## Visión General

**Maquetación de Documentos** es un sitio web estático de una sola página (`index.html` + `aviso-legal.html`) desarrollado como carta de presentación profesional para ofrecer servicios de maquetación DTP a agencias y empresas de traducción. El proyecto nace de una necesidad real: tras más de **20 años trabajando en el sector de la traducción**, el titular necesitaba un escaparate digital claro y honesto donde mostrar su experiencia y disponibilidad.

El sitio está pensado para dos perfiles de cliente:

- **Agencias de traducción** que necesitan externalizar la preparación y maquetación de documentos.
- **Empresas** que buscan incorporar un perfil DTP a su plantilla.

Es un proyecto **deliberadamente ligero**: no requiere base de datos, ni frameworks, ni backend. Su valor está en la claridad del mensaje, la estética editorial y el cumplimiento normativo. De hecho, el sitio completo se desarrolló en una sola tarde, lo que lo convierte en un ejemplo perfecto de proyecto con una relación calidad/precio excelente: un encargo de estas características podría venderse por unos **100 €**, ofreciendo al cliente una presencia web profesional, accesible y conforme a normativa.

### Sobre el proceso

El desarrollo se ha apoyado en herramientas de IA para acelerar la escritura de código y textos, pero **guiadas en todo momento por criterio humano**: definición de secciones, arquitectura, tono y verificación de cada dato. La IA ayuda, pero no conoce el negocio; fue necesario revisar y corregir cada párrafo para que reflejara la realidad del profesional y no contenido inventado. Además, parte de los estilos fueron editados manualmente por mí para ajustarlos a mis preferencias y mejorar el diseño, especialmente en dispositivos móviles.

---

## Estructura del Proyecto

```text
maquetaciondedocumentos/
├── index.html          # Página principal
├── aviso-legal.html    # Aviso Legal, Privacidad y RGPD
├── styles.scss         # Fuente SASS modular
├── styles.css          # CSS compilado
├── styles.css.map      # Source map
├── nav.js              # Lógica del menú responsive
└── img/                # Recursos gráficos (logos, hero, perfil)
```

---

## Funcionalidades Implementadas

### 1. Header sticky con navegación por anclas
Header fijo con efecto `backdrop-filter`, logotipo, subtítulo de especialidad y navegación por anclas con scroll suave. Botón CTA "Presupuesto" integrado.

### 2. Menú hamburguesa accesible
Visible solo en móvil (≤ 768px). El panel se abre a pantalla completa y se cierra por **cuatro vías**: click en el botón, click en cualquier enlace, tecla ESC y cambio a escritorio (vía `matchMedia`). Actualiza atributos ARIA y bloquea el scroll del `body`.

### 3. Sección Hero con doble CTA
Mensaje claro de especialización, badge de credibilidad y dos botones: "Solicitar Presupuesto" y "Ver Mis Servicios".

### 4. Secciones informativas
- **Maquetación antes y después de traducir** con pills de software.
- **Experiencia profesional** (badge "20+ años").
- **Conversión de PDF e imágenes a Word** con fondo oscuro destacado.
- **Ventajas competitivas** en grid de 6 tarjetas.
- **Servicios profesionales** en 3 tarjetas.

### 5. Contacto y Aviso Legal
Contacto directo por email, WhatsApp y LinkedIn. Página independiente de Aviso Legal conforme a **RGPD, LOPDGDD y LSSI-CE**.

---

## Arquitectura del Código

### SASS modular con variables

Paleta cromática, tipografías y medidas centralizadas para mantener coherencia:

```scss
$color-primary:  #0d131f; // Azul noche
$color-accent:   #c89d56; // Dorado champán
$font-heading:   'Cormorant Garamond', Georgia, serif;
$font-body:      'Inter', sans-serif;
$header-height:  84px;
```

Anidamiento con `&` para nomenclatura tipo BEM:

```scss
.hero {
    &__inner { display: grid; grid-template-columns: 1.1fr 0.9fr; }
    &__title { font-family: $font-heading; font-size: 3.2rem; }
}
```

### JavaScript vanilla en IIFE

El menú responsive se encapsula en una función autoejecutable sin contaminar el scope global:

```javascript
(function () {
    const toggle = document.querySelector('.header__toggle');
    const nav    = document.querySelector('.header__nav');
    if (!toggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => { /* abrir/cerrar */ });
    nav.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());
    
    const mq = window.matchMedia('(min-width: 769px)');
    mq.addEventListener('change', e => e.matches && closeMenu());
})();
```

---

## Tecnologías

- **HTML5 semántico** con atributos ARIA (`aria-label`, `aria-expanded`, `aria-controls`).
- **SASS (SCSS)** compilado a CSS3 con variables, anidamiento y source maps.
- **JavaScript vanilla ES6+** (IIFE, `matchMedia`, `classList`).
- **CSS Grid y Flexbox** para layouts.
- **Google Fonts**: *Cormorant Garamond* (titulares) e *Inter* (cuerpo).
- **Diseño responsive mobile-first** con dos breakpoints (992px y 768px).

---

## Aprendizajes Clave

1. **SASS modular**: coherencia visual mantenible con variables.
2. **Accesibilidad real**: ARIA, navegación por teclado, cierre múltiple del menú.
3. **JavaScript moderno sin frameworks**: IIFE, `matchMedia`, manejo de eventos.
4. **Cumplimiento normativo**: RGPD, LOPDGDD y LSSI-CE aplicados a un sitio real.
5. **Uso responsable de IA**: herramienta de productividad guiada por criterio humano para garantizar contenido veraz.

---

## Enlaces

<div class="not-prose my-6 flex flex-wrap items-center gap-3">

<a href="https://maquetaciondedocumentos.jaterli.com/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
<svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
Ver Proyecto en Vivo</a>

<a href="https://github.com/Jaterli/maquetaciondedocumentos.git" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
<svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
Código en GitHub</a>

</div>

---

## Conclusión

**Maquetación de Documentos** es un proyecto sencillo pero bien ejecutado: HTML5, SASS y JavaScript vanilla para construir una landing profesional que cumple su objetivo de servir como carta de presentación para agencias y empresas de traducción. Prioriza la **claridad del mensaje, la accesibilidad y el cumplimiento normativo** por encima de la complejidad técnica, demostrando que un sitio web útil no necesita frameworks ni infraestructura pesada.
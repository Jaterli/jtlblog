# Jaterli Blog | Plantilla de Sitio Web de Portafolio Personal

![Jaterli Blog | Personal Porfolio Website](public/images/others/Screenshot%20jtlblog.webp)


## Instalación

Ejecuta el siguiente comando en tu terminal:

```bash
pnpm install
```

Una vez instalados los paquetes, estarás listo para ejecutar Astro. Astro incluye un servidor de desarrollo integrado que tiene todo lo necesario para el desarrollo del proyecto. El comando `astro dev` iniciará el servidor de desarrollo local para que puedas ver tu nuevo sitio web en acción.

```bash
pnpm run dev
```

## Tecnologías Utilizadas

- [Astro](https://astro.build)
- [tailwindcss](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Estructura del Proyecto

```php
├── src/
│   ├── components/
│   │   ├── cv/
│   │   │   ├── TimeLine
│   │   ├── BaseHead.astro
│   │   ├── Card.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── HorizontalCard.astro
│   │   └── SideBar.astro
│   │   └── SideBarMenu.astro
│   │   └── SideBarFooter.astro
│   ├── content/
│   │   ├── blog/
│   │   │   ├── post1.md
│   │   │   ├── post2.md
│   │   │   └── post3.md
│   │   ├── store/
│   │   │   ├── item1.md
│   │   │   ├── item2.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │   └── PostLayout.astro
│   └── pages/
│   │   ├── blog/
│   │   │   ├── [...page].astro
│   │   │   ├── [slug].astro
│   │   └── cv.astro
│   │   └── index.astro
│   │   └── projects.astro
│   │   └── rss.xml.js
│   ├── styles/
│   │   └── global.css
│   └── config.ts
├── public/
│   ├── favicon.svg
│   └── profile.webp
│   └── social_img.webp
├── astro.config.mjs
├── tailwind.config.cjs
├── package.json
└── tsconfig.json
```

### Configuración del Sitio

Puedes cambiar la configuración global del sitio en el archivo `/src/config.ts`:

- **SITE_TITLE**: Título predeterminado de las páginas.
- **SITE_DESCRIPTION**: Descripción predeterminada de las páginas.
- **GENERATE_SLUG_FROM_TITLE**: Por defecto, Astrofy generará los slugs de las páginas del blog a partir del nombre del artículo. Cambia esta variable a `false` si quieres usar el nombre del archivo Astro en su lugar (compatible con versiones anteriores de Astrofy).
- **TRANSITION_API**: Habilita o deshabilita la API de transiciones.

### Uso de Componentes

#### Componentes de Diseño

Los componentes `BaseHead`, `Footer`, `Header` y `SideBar` ya están incluidos en el sistema de diseño. Para cambiar el contenido del sitio web, puedes editar el contenido de estos componentes.

##### SideBar

En la barra lateral puedes cambiar tu foto de perfil, los enlaces a todas las páginas de tu sitio web y tus íconos de redes sociales.

Puedes cambiar la forma de tu avatar usando las [clases de máscara](https://daisyui.com/components/mask/).

Los íconos de redes sociales usados son SVG del paquete [BoxIcons](https://boxicons.com/). Puedes reemplazar los íconos en el componente `SideBarFooter`.

Para añadir una nueva página en la barra lateral, ve al componente `SideBarMenu`.

```
<li><a class="py-3 text-base" id="home" href="/">Inicio</a></li>
```

**Nota**: Para cambiar el elemento activo del menú de la barra lateral, debes configurar la propiedad `sideBarActiveItemID` en el componente `BaseLayout` de tu nueva página y agregar ese ID al enlace en `SideBarMenu`.

#### TimeLine

Los componentes de línea de tiempo se usan para confirmar el CV.

```html
<div class="time-line-container">
  <TimeLineElement title="Título del Elemento" subtitle="Subtítulo">
    Contenido que puede contener
    <div>divs</div>
    y <span>cualquier otra cosa que desees</span>.
  </TimeLineElement>
  ...
</div>
```

### Agregar un Componente Personalizado

Para agregar un componente personalizado, puedes crear un archivo `.astro` en la carpeta `components` dentro del directorio `src`.

Los componentes deben seguir este formato. Los `---` representan el bloque de código y usan JavaScript para las importaciones.

```html
---
// Script del Componente (JavaScript)
---
<!-- Plantilla del Componente (HTML + Expresiones JS) -->
```

Para más detalles, consulta la documentación de [componentes de Astro](https://docs.astro.build/en/core-concepts/astro-components/).

### Despliegue

Puedes desplegar tu sitio en tu servicio de hosting estático favorito, como Vercel, Netlify, GitHub Pages, etc.

La configuración del despliegue varía según la plataforma donde lo realices. Consulta la [documentación oficial de Astro](https://docs.astro.build/en/guides/deploy/) para desplegar tu sitio web.

> **⚠️ ATENCIÓN** </br>
> La paginación del blog en esta plantilla está implementada usando parámetros de ruta dinámicos en el nombre del archivo, y por ahora este formato es incompatible con configuraciones de despliegue SSR. Por favor, usa las opciones de despliegue estático por defecto.

## Contribuciones

¡Las sugerencias y pull requests son bienvenidos! No dudes en abrir una discusión o un issue para solicitar una nueva característica o informar de un error.


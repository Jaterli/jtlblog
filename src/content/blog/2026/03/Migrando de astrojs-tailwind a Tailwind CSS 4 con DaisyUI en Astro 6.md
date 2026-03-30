---
draft: false
title: "Migrando de @astrojs/tailwind a Tailwind CSS 4 con DaisyUI en Astro 6"
description: "Cómo solucioné el conflicto de dependencias entre Astro 6 y @astrojs/tailwind 6, migrando exitosamente a Tailwind CSS 4 con DaisyUI sin perder funcionalidades."
pubDate: "2026-03-28"
heroImage: "/images/blog/blog.tailwind-migration.webp"
category: "Tecnología"
tags: [Astro, TailwindCSS, DaisyUI, Desarrollo Web, Migración, GitHub Actions]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Migrando de @astrojs/tailwind a Tailwind CSS 4 con DaisyUI en Astro 6",
      "description": "Cómo solucioné el conflicto de dependencias entre Astro 6 y @astrojs/tailwind 6, migrando exitosamente a Tailwind CSS 4 con DaisyUI sin perder funcionalidades.",
      "author": {
        "@type": "Person",
        "name": "Jaterli"
      },
      "datePublished": "2026-03-28T00:00:00+01:00",
      "image": "https://jaterli.com/images/blog/blog.tailwind-migration.webp",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2026/03/migrando-de-astrojs-tailwind-a-tailwind-css-4-con-daisyui-en-astro-6"
      }
    }
  ]
---

**Introducción**

Todo comenzó después de actualizar Astro en mi blog personal a la versión 6.0.8. Un workflow de GitHub Actions que llevaba meses funcionando perfectamente comenzó a fallar con un mensaje críptico sobre dependencias incompatibles. Mi blog, construido con Astro y TailwindCSS, se negaba a instalar las dependencias.

El error apuntaba a un conflicto entre `astro@6.0.8` y `@astrojs/tailwind@6.0.2`. La causa: la integración oficial de Tailwind para Astro no era compatible con la última versión del framework que acababa de instalar. Lo que parecía un problema menor tras una actualización rutinaria se convirtió en una oportunidad para modernizar toda la configuración de estilos de mi blog.

---

## El problema: Conflicto de dependencias

### El error en GitHub Actions

Mi workflow fallaba durante la instalación de dependencias:

```
npm error ERESOLVE unable to resolve dependency tree
npm error Could not resolve dependency:
npm error peer astro@"^3.0.0 || ^4.0.0 || ^5.0.0" from @astrojs/tailwind@6.0.2
npm error node_modules/@astrojs/tailwind
```

La causa era clara: `@astrojs/tailwind@6.0.2` requería Astro 3, 4 o 5, pero mi blog usaba Astro 6.0.8. La integración oficial no se había actualizado para soportar la última versión del framework.

### El dilema técnico

Me enfrentaba a varias opciones:

1. **Degradar Astro a la versión 5**: Solución rápida pero temporal, perdiendo las mejoras de Astro 6.
2. **Forzar la instalación con `--legacy-peer-deps`**: Parche que no resolvía el problema de raíz.
3. **Migrar a Tailwind CSS 4**: Solución moderna y definitiva, pero requería cambios estructurales.

Opté por la tercera opción. No solo resolvería el problema inmediato, sino que modernizaría toda la infraestructura de estilos de mi blog.
---

## La solución: Migración a Tailwind CSS 4

### 1. Entendiendo el nuevo ecosistema

Tailwind CSS 4 introduce cambios significativos:
- **Configuración basada en CSS**: Adiós a `tailwind.config.js`
- **Plugin de Vite**: Integración más limpia con Astro
- **Sistema de temas mejorado**: Variables CSS nativas
- **Rendimiento optimizado**: Builds más rápidos

### 2. Desinstalando dependencias antiguas

```bash
# Eliminar la integración obsoleta
yarn remove @astrojs/tailwind

# Eliminar dependencias que ya no necesitamos
yarn remove autoprefixer

# Tailwind 3 se actualizará a la versión 4
```

### 3. Instalando las nuevas dependencias

```bash
# Tailwind CSS 4 y su plugin Vite
yarn add -D tailwindcss@^4.0.0 @tailwindcss/vite@^4.0.0

# Typography para Tailwind 4 (versión compatible)
yarn add -D @tailwindcss/typography@^0.5.15
```

### 4. El problema con DaisyUI

Tras realizar estos cambios, mi blog dejó de funcionar correctamente. Muchos de los estilos aplicados a componentes se rompieron por completo. Mi blog utilizaba **DaisyUI 4.4.10**, una biblioteca de componentes que extiende Tailwind CSS proporcionando clases predefinidas para crear interfaces modernas sin tener que escribir CSS personalizado. Esta versión funcionaba perfectamente con `@astrojs/tailwind@6.0.2` y Tailwind CSS 3, pero al actualizar a Tailwind CSS 4, dejó de ser compatible.

Consulté a la IA para encontrar una solución. La recomendación inicial fue que DaisyUI era incompatible con Tailwind CSS 4 y que debía eliminarla, rehaciendo todos los estilos manualmente con Tailwind puro. Esto significaba muchas horas de trabajo y cientos de líneas de código CSS adicional.

### 5. Investigando por mi cuenta

Antes de embarcarme en la tediosa tarea de reescribir todos los estilos, decidí investigar más a fondo. Revisé la documentación oficial de DaisyUI y descubrí que **DaisyUI 5.5.19 es completamente compatible con Tailwind CSS 4**. La versión 5 había sido lanzada específicamente para soportar las nuevas características de Tailwind 4.

La solución era mucho más simple de lo que parecía inicialmente:

```bash
# Actualizar DaisyUI a la versión compatible
yarn add -D daisyui@^5.5.19
```

### 6. Configurando DaisyUI con Tailwind 4

Con DaisyUI 5, la configuración cambia. En lugar de un archivo `tailwind.config.js`, ahora se configura directamente en CSS:

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "@tailwindcss/typography";
@plugin "daisyui";

/* Configuración de temas con CSS nativo */
@theme {
  --font-size-4xl: 2.8rem;
  --font-size-4xl--line-height: 3.2rem;
  /* ... más configuraciones ... */
}

/* Personalización de temas de DaisyUI */
[data-theme="light"] {
  --color-base-content: #323232ff;
  --color-base-200: rgb(235, 235, 235);
  --color-customlink: rgb(31, 86, 187);
}

[data-theme="dark"] {
  --color-base-content: #eeeeeeff;
  --color-base-200: rgb(9, 17, 27);
  --color-customlink: rgb(152, 195, 230);
}
```

### 7. Eliminando la configuración antigua

```bash
# Ya no necesitamos este archivo
rm tailwind.config.cjs
```

Toda la configuración que antes vivía en JavaScript ahora vive en CSS, más declarativa y fácil de mantener.

---

## Lecciones aprendidas

### 1. Verificar antes de actuar

La recomendación inicial de la IA sobre la incompatibilidad de DaisyUI resultó ser incorrecta porque se basaba en información desactualizada. La lección es clara: siempre contrastar las sugerencias automáticas con la documentación oficial antes de tomar decisiones drásticas.

### 2. La migración incremental es clave

En lugar de hacer todos los cambios de una vez:
- Primero actualicé las dependencias base
- Identifiqué el problema con DaisyUI
- Investigé soluciones antes de reescribir código
- Probé la actualización de DaisyUI a la versión 5

Este enfoque evitó semanas de trabajo innecesario.

### 3. Las herramientas evolucionan

Tanto DaisyUI como Tailwind CSS están en activo desarrollo. Lo que era incompatible ayer puede ser compatible hoy. Mantenerse actualizado con las últimas versiones y leer las notas de lanzamiento es fundamental.

### 4. El CSS moderno es poderoso

Tailwind 4 aprovecha las características más recientes de CSS:
- Variables CSS nativas para temas
- `@theme` para configuraciones globales
- `@plugin` para extensiones

El resultado es un código más limpio y mantenible.

---

## Conclusión

Lo que comenzó como un error en GitHub Actions se convirtió en una oportunidad para modernizar mi blog. La migración a Tailwind CSS 4 no solo resolvió el conflicto de dependencias, sino que mejoró la arquitectura de estilos, simplificó la configuración y me preparó para futuras actualizaciones.

**La lección más importante**: Cuando enfrentes problemas de compatibilidad, investiga todas las opciones antes de tomar decisiones drásticas. En mi caso, actualizar DaisyUI a su versión 5 fue mucho más simple que reescribir todos los estilos manualmente, y me permitió conservar la productividad y consistencia visual que esta biblioteca proporciona.

Mi blog ahora corre sobre Astro 6, Tailwind CSS 4 y DaisyUI 5, una combinación moderna, eficiente y completamente funcional. Y lo mejor: el workflow de GitHub Actions que desencadenó todo esto ahora corre más rápido que nunca.


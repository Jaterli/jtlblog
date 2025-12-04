---
draft: false
title: "Qué es JSON-LD y cómo mejora el SEO de tus proyectos"
description: "Si quieres que tu web destaque en Google y otros motores de búsqueda, JSON-LD es una de las herramientas más efectivas."
pubDate: "2025-09-05"
heroImage: "/images/blog/blog.JSON-LD.webp"
category: "Blog"
tags: [Tutoriales, SEO]
---


Si eres desarrollador o creador de contenido, seguro te interesa que tus proyectos destaquen en los resultados de búsqueda de Google. Una forma muy efectiva de lograrlo es utilizando **JSON-LD**, un formato de datos estructurados que ayuda a los motores de búsqueda a comprender el contenido de tu web de manera más precisa.

---

## 1. ¿Qué es JSON-LD?

JSON-LD (JavaScript Object Notation for Linked Data) es un **formato de datos estructurados basado en JSON** que permite describir entidades de tu sitio web de manera semántica.

> En otras palabras, JSON-LD **explica a Google y otros motores de búsqueda qué es cada cosa** en tu página: un artículo, un proyecto de software, un evento, un producto, un perfil profesional, etc.

A diferencia de otros métodos de microdatos o RDFa, JSON-LD **no requiere modificar el HTML visible** y se puede insertar de manera independiente dentro de la página.

---

## 2. Ventajas de usar JSON-LD

Usar JSON-LD en tu web tiene varias ventajas clave:

1. **Mejora la comprensión de tu contenido**
   Los motores de búsqueda entienden mejor qué representa cada sección de tu web. Por ejemplo, si un proyecto es una aplicación de software, se puede mostrar como tal en los resultados de búsqueda.

2. **Mayor visibilidad en Google**
   Permite que tus páginas tengan **rich snippets**, mostrando información adicional como calificaciones, autor, tecnologías usadas, fecha de publicación o capturas destacadas.

3. **Flexibilidad y facilidad de implementación**
   Se agrega como un bloque de código JSON independiente dentro del `<head>` de la página, sin interferir con el diseño.

4. **Mejora el posicionamiento SEO de forma orgánica**
   Facilita que Google y otros buscadores **muestren tus proyectos con más detalle**, aumentando la tasa de clics.

---

## 3. Ejemplos de uso

Dependiendo del tipo de contenido, puedes usar diferentes tipos de JSON-LD:

* **Perfil personal o profesional** → `Person`
* **Proyecto de software o aplicación** → `SoftwareApplication`
* **Artículo de blog** → `Article`

Por ejemplo, para mi proyecto de Web3 llamado *EasyCryptoBuy*, que es una plataforma de comercio electrónico con pagos en blockchain:

```json
{
  "@context": "https://schema.org"
  "@type": "SoftwareApplication",
  "name": "EasyCryptoBuy",
  "description": "Plataforma de comercio electrónico con integración de pagos en blockchain.",
  "url": "https://tusitio.com/projects/easycryptobuy",
  "creator": {
    "@type": "Person",
    "name": "Jaime TL"
  }
}
```

---

## 4. Cómo aplico JSON-LD en mi web

En mi sitio personal, **integro JSON-LD en cada página relevante**:

* Perfil profesional → `Person`
* Proyectos de software → `SoftwareApplication`
* Blog → `Article`

💡 **Dónde integrarlo en la página:**
JSON-LD se incluye dentro de la sección `<head>` de tu HTML, como un bloque `<script>` con tipo `application/ld+json`. Esto permite que los motores de búsqueda lean la información sin afectar al contenido visible de la web.

```html
<head>
  <title>Mi proyecto Web3 - EasyCryptoBuy</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EasyCryptoBuy",
    "description": "Plataforma de comercio electrónico con integración de pagos en blockchain.",
    "url": "https://tusitio.com/projects/easycryptobuy",
    "creator": {
      "@type": "Person",
      "name": "Jaime TL"
    }
  }
  </script>
</head>
```

---

## 5. Ejemplo visual de integración en mis proyectos

Imagina que tu proyecto es un marketplace que acepta pagos con tokens ERC-20. Con JSON-LD, puedo mostrar:

* **Nombre del proyecto**: EasyCryptoBuy
* **Tecnologías usadas**: Django, React, Web3
* **Descripción**: Marketplace con integración de pagos en tokens ERC-20
* **Autor**: Jaime TL

📌 Esto permite que Google entienda claramente que **es un proyecto de software**, y que puede mostrarlo con información adicional en los resultados de búsqueda, haciendo que destaque más frente a otros proyectos similares.

---

## 6. Beneficios prácticos que obtengo

Integrando JSON-LD en mis páginas de proyectos:

* Los motores de búsqueda muestran **información detallada de mis proyectos**, como tecnologías usadas y descripción.
* Mis proyectos destacan más en resultados de búsqueda, aumentando la visibilidad y la tasa de clics.
* Mantengo el **control sobre cómo se presenta la información** sin cambiar la apariencia de la web.

---

## 7. Conclusión

JSON-LD es una herramienta sencilla pero muy potente para mejorar el SEO y la visibilidad de tus proyectos. Al integrarlo:

* Los buscadores comprenden mejor tu contenido
* Tu web se ve más profesional
* Los usuarios encuentran tus proyectos con más facilidad

En mi caso, **cada proyecto que publico en mi portfolio tiene su propio JSON-LD**, mostrando de forma clara y estructurada la información más importante, lo que ayuda a posicionar mi trabajo y atraer visitantes interesados.


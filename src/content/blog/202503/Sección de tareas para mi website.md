---
draft: false
title: "Sección de Tareas para mi website"
description: "Me permite organizar y visualizar mis metas, además de ser una fuente de motivación personal y una forma de inspirar a quienes visitan mi sitio."
pubDate: "2025-03-13"
heroImage: "/images/blog/blog.tasks.jpg"
category: "Máster en Desarrollo Full Stack"
tags: [Progreso]
---

En mi constante búsqueda por mejorar mi sitio web y compartir mi viaje de aprendizaje y crecimiento, he desarrollado una nueva sección dedicada a mis **tareas y objetivos**. Esta funcionalidad no solo me permite organizar y visualizar mis metas, sino que también sirve como una fuente de motivación personal y una forma de inspirar a quienes visitan mi sitio.

### ¿Por qué una Sección de Tareas Diarias?

La idea detrás de esta sección surgió de la necesidad de tener un espacio donde pudiera ver de manera tangible mi progreso. A menudo, en el día a día, es fácil perder de vista los pequeños logros que, sumados, representan un avance significativo. Con esta herramienta, puedo:

- **Organizar mis tareas:** Clasificar mis actividades por descripción, detalles y fechas de inicio y finalización.
- **Visualizar mi progreso:** Ver cuántas tareas he completado y cuántas están pendientes.
- **Mantener la motivación:** Recordar que cada tarea completada es un paso más hacia mis metas.

### Cómo Funciona la Sección

La sección de tareas está diseñada para ser simple pero efectiva. Aquí te explico cómo la he desarrollado:

1. **Datos Dinámicos:**  
   Las tareas se cargan desde un archivo JSON (`tasks.json`), lo que me permite actualizarlas fácilmente sin modificar el código. Cada tarea tiene una descripción, detalles opcionales, una fecha de inicio y una fecha de finalización (que puede ser nula si la tarea está pendiente).

2. **Diseño Visual:**  
   Utilicé **Tailwind CSS** para darle un estilo limpio y moderno. Las tareas pendientes se marcan con un icono rojo y texto en rojo, mientras que las completadas tienen un icono verde y texto en verde. Esto permite una identificación rápida del estado de cada tarea.

3. **Paginación Dinámica:**  
   Para no sobrecargar la página, solo se muestran 10 tareas inicialmente. Si hay más, un botón "Ver más" permite cargar tareas adicionales de manera dinámica usando JavaScript y una llamada a una API simulada.

4. **Accesibilidad y Semántica:**  
   Me aseguré de que la sección fuera accesible y semánticamente correcta. Por ejemplo, las tareas se muestran en una lista (`<ul>`), y el botón "Ver más" incluye un `aria-label` para mejorar la experiencia de usuarios con lectores de pantalla.

### Tecnologías Utilizadas

- **Astro:** Para la estructura del sitio y la renderización de componentes.
- **Tailwind CSS:** Para los estilos y diseño responsive.
- **TypeScript:** Para agregar tipado estático y mejorar la calidad del código.
- **JavaScript:** Para la lógica de carga dinámica de tareas.
- **HTML Semántico:** Para garantizar que el contenido sea accesible y bien estructurado.

### Desafíos y Aprendizajes

Uno de los desafíos más interesantes fue implementar la carga dinámica de tareas. Tuve que asegurarme de que la experiencia del usuario fuera fluida, incluso cuando se cargan más tareas. También aprendí la importancia de manejar errores de manera adecuada, mostrando mensajes claros en la interfaz si algo falla.

Otro aprendizaje clave fue la importancia de la **semántica y la accesibilidad**. Aunque a veces es tentador priorizar el diseño, asegurarse de que el contenido sea accesible para todos los usuarios es fundamental.

### Reflexión Final

Esta sección no solo es una herramienta útil para mí, sino también una forma de compartir mi proceso de crecimiento con quienes visitan mi sitio. Ver mi progreso de manera visual me motiva a seguir adelante, y espero que también inspire a otros a perseguir sus metas con determinación.

Si estás interesado en cómo implementar algo similar en tu sitio web, ¡no dudes en dejarme un comentario! Estoy feliz de compartir más detalles sobre el código o las decisiones técnicas que tomé.



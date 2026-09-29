---
draft: false
title: "Conseguí el Certificado de ORMs en Python"
description: "Acabo de superar con éxito el examen de evaluación para obtener el certificado de ORMs en Python impartido por la academia Conquer Blocks."
pubDate: "2026-09-29"
heroImage: "/certifications/Certificado-de-ORMs-en-Python.png"
category: "Blog"
tags: [Certificado, ORM, Python, SQLAlchemy, Django, SQL, Backend, Conquer Blocks]
jsonLd: 
    "@context": "https://schema.org"
    "@graph": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Certificado de ORMs en Python",
        "description": "Certificación en ORMs en Python de Academia Conquer Blocks",
        "dateIssued": "2026-09-29",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Academia Conquer Blocks"
        },
        "image": "https://jaterli.com/certifications/Certificado-de-ORMs-en-Python.png"
      },
      {
        "@type": "BlogPosting",
        "headline": "He aprobado el Certificado de ORMs en Python",
        "description": "Acabo de superar con éxito el examen de evaluación para obtener el certificado de ORMs en Python.",
        "datePublished": "2026-09-29T00:00:00+01:00",
        "image": "https://jaterli.com/certifications/Certificado-de-ORMs-en-Python.png",
        "author": {
          "@type": "Person",
          "name": "Jaime TL",
          "url": "https://jaterli.com"
        },
        "mainEntity": {
          "@type": "EducationalOccupationalCredential",
          "name": "Certificado de ORMs en Python"
        }
      }
    ]
---

Hoy, **29 de septiembre de 2026**, he obtenido oficialmente el **Certificado de ORMs en Python**, perteneciente al **Máster de Desarrollo Full Stack** impartido por la **Academia Conquer Blocks**.

## Un examen que ya tenía ganado de antemano

Al igual que me ocurrió ayer con el certificado de Django Avanzado, este examen llevaba tiempo pendiente. No porque no dominara la materia —llevo años trabajando con ORMs, especialmente el de Django—, sino porque he estado inmerso en el desarrollo de proyectos reales que me han mantenido alejado de las evaluaciones formales. Ahora que he cerrado una etapa importante con el último proyecto en el que he estado trabajando, he decidido sacar de una vez por todas estos certificados que tenía pendientes.

El examen constaba de **15 preguntas tipo test** y lo he superado con un **100% de aciertos**. Pero más que el resultado en sí, lo que me deja tranquilo es saber que las respuestas no venían de haber memorizado teoría, sino de **años de uso real de ORMs** en producción y de un conocimiento profundo del lenguaje SQL que hay debajo.

## Por qué el SQL sigue importando aunque uses un ORM

Hay una idea extendida de que si usas un ORM no necesitas saber SQL. Nada más lejos de la realidad. Un ORM es una **abstracción**, y como toda abstracción, tiene fugas. Cuando una consulta empieza a ir lenta, cuando necesitas entender qué está generando el ORM por debajo, cuando quieres optimizar un `select_related` o un `prefetch_related`, o cuando tienes que decidir entre hacer un `JOIN` con el ORM o bajar a SQL crudo, el conocimiento de SQL marca la diferencia entre un desarrollador que *usa* un ORM y uno que lo *domina*.

En mi caso, esa base de SQL es lo que me permite tomar decisiones informadas: saber cuándo el ORM está haciendo algo ineficiente, cuándo conviene anotar en lugar de iterar en Python, y cuándo es mejor escribir la consulta a mano.

## Qué he consolidado durante este camino

A lo largo del máster, y muy especialmente durante el desarrollo de proyectos propios, he trabajado en profundidad los aspectos que cubre esta certificación:

### Fundamentos de los ORMs
- **Qué es un ORM y por qué usarlo**: mapeo objeto-relacional, conversión bidireccional entre objetos del lenguaje y filas de la base de datos.
- **Ventajas y desventajas**: productividad y abstracción frente a la curva de aprendizaje y la posible sobrecarga de rendimiento.
- **Cuándo NO usar un ORM**: consultas analíticas complejas, operaciones masivas o escenarios donde el control fino del SQL es crítico.

### SQLAlchemy
- **Definición de modelos** con clases y `Column`, y mapeo declarativo.
- **Sesiones** (`Session`) y su ciclo de vida: `session.add()`, `session.commit()`, `session.rollback()`.
- **Consultas** con `session.query()` y con el estilo moderno de `select()`.
- **Relaciones** entre entidades y carga diferida vs. eager loading.

### El ORM de Django
- **Modelos y ORM**: relaciones complejas (`ForeignKey`, `OneToOne`, `ManyToMany`), `related_name`, `on_delete`.
- **Optimización de consultas**: `select_related` y `prefetch_related` para evitar el problema N+1, agregaciones y anotaciones.
- **Migraciones**: creación, modificación y reversión, incluida la gestión de migraciones conflictivas en producción.
- **QuerySets**: evaluación perezosa, `filter`, `exclude`, `annotate`, `aggregate`, y comprensión de cuándo se ejecuta realmente la consulta.

### Conocimiento de SQL subyacente
- **Comandos CRUD**: `SELECT`, `INSERT INTO`, `UPDATE`, `DELETE`.
- **Bases de datos relacionales**: PostgreSQL como motor principal en mis proyectos.
- **Bases de datos NoSQL**: comprensión de sus diferencias, ventajas (esquema flexible, escalabilidad horizontal) y cuándo elegirlas frente a una relacional.
- **Joins, índices y planes de ejecución**: leer y entender qué hace la base de datos por debajo del ORM.

### Buenas prácticas
- **Migraciones versionadas** en control de versiones.
- **Separación de responsabilidades**: lógica de negocio fuera de los modelos cuando corresponde.
- **Transacciones atómicas** para operaciones que deben ejecutarse como una unidad.
- **Serialización de datos** con `dumpdata` / `loaddata` cuando ha sido necesario.

## Un papel no construye software

Igual que comenté en el post anterior con el certificado de Django, lo repito aquí: **un certificado no construye software**. Lo que de verdad importa es la capacidad de diseñar, desarrollar, mantener y escalar aplicaciones en el mundo real. Un título se puede conseguir mediante estrategias relativamente sencillas; lo que marca la diferencia es haber roto cosas, haberlas depurado y haberlas vuelto a levantar mientras construías proyectos completos.

En mi caso, proyectos como **[AnGoTest](https://angotest.com)** —plataforma inteligente de creación, gestión y realización de tests con IA— y **EasyCryptoBuy** —e-commerce con pagos en blockchain— son mi mejor carta de presentación. Y detrás de ambos hay mucho ORM: consultas optimizadas, relaciones bien modeladas, migraciones ordenadas y decisiones de diseño que solo se aprenden cuando tienes usuarios reales usando tu aplicación.

> El ORM escribe el SQL por ti. Entender ese SQL es lo que te convierte en desarrollador.

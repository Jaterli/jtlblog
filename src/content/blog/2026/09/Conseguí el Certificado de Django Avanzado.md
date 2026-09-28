---
draft: false
title: "Conseguí el Certificado de Django Avanzado"
description: "Acabo de superar con éxito el examen de evaluación para obtener el certificado de Django Avanzado impartido por la academia Conquer Blocks."
pubDate: "2026-09-28"
heroImage: "/certifications/Certificado-de-Django-Avanzado.png"
category: "Blog"
tags: [Certificado, Django, Python, Backend, DRF, Conquer Blocks]
jsonLd: 
    "@context": "https://schema.org"
    "@graph": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Certificado de Django Avanzado",
        "description": "Certificación en Django Avanzado de Academia Conquer Blocks",
        "dateIssued": "2026-09-28",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Academia Conquer Blocks"
        },
        "image": "https://jaterli.com/certifications/Certificado-de-Django-Avanzado.png"
      },
      {
        "@type": "BlogPosting",
        "headline": "He aprobado el Certificado de Django Avanzado",
        "description": "Acabo de superar con éxito el examen de evaluación para obtener el certificado de Django Avanzado.",
        "datePublished": "2026-09-28T00:00:00+01:00",
        "image": "https://jaterli.com/certifications/Certificado-de-Django-Avanzado.png",
        "author": {
          "@type": "Person",
          "name": "Jaime TL",
          "url": "https://jaterli.com"
        },
        "mainEntity": {
          "@type": "EducationalOccupationalCredential",
          "name": "Certificado de Django Avanzado"
        }
      }
    ]
---

# Conseguí el Certificado de Django Avanzado

Hoy, **28 de septiembre de 2026**, he obtenido oficialmente el **Certificado de Django Avanzado**, perteneciente al **Máster de Desarrollo Full Stack** impartido por la **Academia Conquer Blocks**.

## Un examen pendiente que por fin ha llegado

Si bien es cierto que atendí a las clases hace ya varios meses, y que desde entonces he desarrollado proyectos robustos basados en este framework —como **AngoTest** y **EasyCryptoBuy**, entre otros—, aún tenía pendiente realizar la evaluación oficial. Hoy por fin he cerrado ese capítulo superando el examen con éxito.

## Lo que realmente importa

Esta certificación reconoce mis conocimientos avanzados en Django, pero para mí es mucho más importante **conocer el framework a fondo** y saber aplicar esos conocimientos demostrándolo con proyectos reales, que el hecho de tener el certificado en sí. Al final, un título se puede conseguir mediante estrategias relativamente sencillas; lo que de verdad marca la diferencia es la capacidad de **construir, mantener y escalar aplicaciones Django en el mundo real**.

Y es que el temario del examen cubre solo una parte de lo que implica llevar Django a producción. Gran parte de lo que sé hoy no viene de una lección concreta, sino de **investigar por mi cuenta, romper cosas, depurarlas y volverlas a levantar** mientras construía aplicaciones completas.

## Qué he consolidado durante este camino

A lo largo del máster —pero sobre todo durante el desarrollo de mis propios proyectos— he trabajado en profundidad aspectos que van mucho más allá de la teoría de un examen:

### Fundamentos sólidos de Django
- **Modelos y ORM**: relaciones complejas (`ForeignKey`, `OneToOne`, `ManyToMany`), `related_name`, `on_delete`, `prefetch_related` y `select_related` para optimizar consultas, agregaciones y anotaciones.
- **Migraciones**: creación, modificación y reversión, así como gestión de migraciones conflictivas en proyectos en producción.
- **Class-Based Views (CCBV)**: uso de `ListView`, `DetailView`, `CreateView`, `UpdateView`, `FormView` y mixins personalizados como `LoginRequiredMixin` para reutilizar lógica.
- **Formularios**: `Form` y `ModelForm`, validaciones personalizadas, `clean_*`, y procesamiento seguro de datos con `is_valid()`.

### APIs y arquitectura backend
- **Django REST Framework**: diseño de APIs RESTful con `APIView` y vistas genéricas, decisión deliberada de no usar `ViewSet` cuando la lógica de negocio no encaja en el patrón CRUD estándar (como en AnGoTest).
- **Serializers**: anidados, personalizados, con validaciones de negocio y lógica condicional.
- **Autenticación JWT** con `djangorestframework-simplejwt` combinada con **cookies `HttpOnly`, `Secure` y `SameSite`** para mitigar XSS y CSRF —un enfoque que va más allá de la autenticación por cabeceras estándar.
- **Documentación OpenAPI** con `drf-spectacular` y decoradores `@extend_schema`.
- **CORS** y permisos personalizados (`IsAuthenticated`, `IsAdminUser`).
- **Filtrado dinámico** con `django-filter`.

### Rendimiento y caché
- **Cacheo con Redis y LocMemCache** para jerarquías de temas y respuestas correctas, reduciendo tiempos de respuesta en peticiones recurrentes.
- **Optimización de queries** en vistas con gran volumen de datos.

### Seguridad aplicada
- **Gestión de secretos** mediante `python-dotenv` y variables de entorno, evitando exponer credenciales en el código.
- **Hashing de contraseñas** con PBKDF2 y gestión de `PASSWORD_HASHERS`.
- **Rate limiting** para prevenir ataques de fuerza bruta.
- **Firma criptográfica y nonces de un solo uso** para verificar identidad en flujos Web3 (EasyCryptoBuy).
- **Desactivación de cuentas con anonimización de datos** y transferencia a un usuario contenedor para preservar trazabilidad.
- **HTTPS con Let's Encrypt** montado en contenedores Docker.

### Tareas asíncronas y automatización
- **Cron jobs** dentro de contenedores para tareas programadas: expiración automática de tests en progreso, limpieza de carritos abandonados, backups automáticos con `pg_dump`.
- **Listeners de eventos on-chain** en proyectos blockchain que actualizan el estado de las transacciones en tiempo real.
- **Integración con APIs externas de IA** (Groq, modelos Llama y Mistral) para generación dinámica de tests.

### DevOps y despliegue
- **Docker y Docker Compose**: definición de servicios (PostgreSQL, backend con Gunicorn, frontend con Nginx), redes externas, volúmenes persistentes y healthchecks.
- **Gunicorn + Nginx** como stack de producción.
- **WhiteNoise** para servir archivos estáticos sin depender de servicios externos.
- **Despliegue en VPS (DigitalOcean)** con certificados SSL y configuración segura de `ALLOWED_HOSTS` y `DEBUG = False`.

### Frontend e integración con Django
- **Angular 20** como SPA consumiendo APIs Django con interceptor HTTP, `withCredentials`, guards (`authGuard`, `adminGuard`, `roleGuard`) y servicios tipados en TypeScript.
- **React + Wagmi + Viem** para integración con wallets y smart contracts en el proyecto blockchain.

### Internacionalización y documentación
- **i18n** con `{% trans %}`, extracción de cadenas y gestión con `django-rosetta`.
- **Plantillas de Django** para servir documentación estática (guías de usuario y administrador) sin depender del ciclo de build del frontend.

### Buenas prácticas transversales
- **Middlewares** y **context processors** para lógica transversal.
- **Mensajes one-time** con el framework `messages`.
- **Serialización de datos** con `dumpdata` / `loaddata`.
- **Acciones personalizadas en el admin** para operaciones masivas.
- **Roles y permisos granulares** (admin, user, guest, deleted) integrados con el sistema de autenticación de Django.

## Un camino que sigue

Obtener este certificado es un reconocimiento, sí, pero también un recordatorio de que el aprendizaje en desarrollo de software nunca termina. Django sigue evolucionando y, con él, las buenas prácticas y las herramientas disponibles.

Proyectos como **[AnGoTest](https://angotest.com)** —plataforma inteligente de creación, gestión y realización de tests con IA— y **EasyCryptoBuy** —e-commerce con pagos en blockchain— son mi mejor carta de presentación. Este certificado es simplemente una confirmación más de que voy por el camino correcto, pero no el destino.

> El conocimiento se demuestra construyendo. El certificado, cuando llega, solo lo confirma.

Gracias a la **Academia Conquer Blocks** por la formación, y a todos los que habéis seguido este camino conmigo. Seguimos construyendo.
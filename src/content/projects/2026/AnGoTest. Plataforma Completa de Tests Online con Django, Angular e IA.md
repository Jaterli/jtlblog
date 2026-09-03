---
title: "AnGoTest: Plataforma Completa de Tests Online con Django, Angular e IA"
description: "Una aplicación full-stack de tests online con autenticación JWT, dashboard de administración avanzado, rankings detallados y generación de tests mediante inteligencia artificial (IA)."
pubDate: "2026-09-03"
heroImage: "/images/proyectos/projects.AnGoTest.webp"
badge: "DESTACADO"
tags: [Django, Django REST Framework, Angular, PostgreSQL, JWT, Docker, TypeScript, AI, TailwindCSS, Full-Stack]
jsonLd: 
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "AnGoTest"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Plataforma full-stack de tests online con panel de administración avanzado, rankings de usuarios y generación de tests mediante IA, desarrollada con Angular y Django."
  "image": "https://jaterli.com/images/proyectos/projects.AnGoTest.webp"
  "url": "https://jaterli.com/blog/angotest-detalles-tecnicos"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-09-03"
  "programmingLanguage": [
    "TypeScript",
    "Python",
    "SQL"
  ]
  "featureList": [
    "Registro, autenticación y recuperación de contraseña con JWT (vía cookies HttpOnly)",
    "Sistema de roles: usuarios (con perfiles de invitado) y administradores",
    "Tests clasificados por jerarquía de temas (principal, subtema, específico) y niveles",
    "Progreso de tests en tiempo real (iniciados, en progreso, completados, abandonados)",
    "Ranking global y por niveles con múltiples métricas (precisión, tiempo, preguntas)",
    "Panel de administración con dashboard interactivo y estadísticas detalladas",
    "Gestión completa de tests (CRUD) con interfaz amigable",
    "Sistema de invitaciones a tests para otros usuarios",
    "Generación de tests mediante IA (Groq) con control de cuotas mensuales por usuario",
    "Arquitectura backend escalable en Django (DRF) y frontend reactivo en Angular (Señales)"
  ]
---

Este artículo es una inmersión profunda en **AnGoTest**, el proyecto que he desarrollado como trabajo final de mi máster en desarrollo web full-stack. Aquí explico el problema que resuelve, las tecnologías elegidas, la arquitectura, las funcionalidades clave, las medidas de seguridad y el despliegue en producción.

---

## 1. El problema: la evaluación tradicional está obsoleta

En el ámbito educativo, formativo y de selección de personal, la evaluación del conocimiento es una herramienta fundamental. Sin embargo, los métodos tradicionales presentan carencias significativas:

- **Corrección lenta y manual**: los educadores dedican horas a corregir pruebas, retrasando la retroalimentación.
- **Falta de inmediatez**: los alumnos no reciben feedback al instante, lo que reduce la efectividad del aprendizaje.
- **Dificultad para crear tests personalizados**: generar preguntas ajustadas a un nivel o tema específico requiere mucho tiempo y experiencia.
- **Baja motivación**: la ausencia de rankings, estadísticas y seguimiento de progreso desincentiva la mejora continua.
- **Falta de escalabilidad**: en procesos de selección, evaluar a múltiples candidatos con tests estandarizados y obtener resultados comparables es un desafío.

**AnGoTest** nace para dar respuesta a todas estas necesidades, ofreciendo una plataforma integral que automatiza la creación, corrección y análisis de pruebas, y que además incorpora inteligencia artificial para generar tests personalizados en segundos.

---

## 2. Solución propuesta

AnGoTest es una aplicación web completa que permite:

- **Crear tests de forma rápida** mediante un formulario guiado o mediante IA (integración con Groq), con opción de importación JSON para administradores.
- **Obtener resultados inmediatos** con corrección automática, desglose de errores y estadísticas detalladas.
- **Seguir el progreso** a través de dashboards personales y rankings globales.
- **Gestionar usuarios y permisos** con roles diferenciados (usuario, invitado, administrador).
- **Invitar a usuarios registrados o invitados** (sin necesidad de cuenta) a través de enlaces únicos de un solo uso.
- **Administrar el sistema** con un panel completo que incluye KPIs, gestión de cuotas de IA, exportación de datos y configuración de parámetros del sistema.

La plataforma está diseñada para educadores, estudiantes, autodidactas, empresas y responsables de RR.HH., ofreciendo una experiencia ágil, personalizada y motivadora.

---

## 3. Tecnologías utilizadas

### Backend (Django + DRF)

| Tecnología | Versión / Componente | Justificación |
|------------|----------------------|---------------|
| **Django** | 5.0.3 | Framework web robusto con ORM, autenticación, migraciones y administración integrada. |
| **Django REST Framework** | 3.14.0 | Construcción de APIs RESTful con serializadores, vistas basadas en clases y permisos. |
| **Simple JWT** | 5.5.1 | Implementación de tokens JWT para autenticación stateless con cookies HttpOnly. |
| **PostgreSQL** | Driver psycopg2 | Base de datos relacional potente, con soporte JSON y alta concurrencia. |
| **django-cors-headers** | 4.3.1 | Gestión de CORS para comunicación segura con el frontend. |
| **django-filter** | 24.2 | Filtros dinámicos para listados y búsquedas. |
| **drf-spectacular** | 0.30.0 | Generación de documentación OpenAPI (Swagger UI). |
| **python-dotenv** | 1.0.1 | Gestión de variables de entorno para secretos y configuraciones. |
| **Redis / LocMemCache** | - | Caché para jerarquías de temas y respuestas correctas, reduciendo tiempos de respuesta. |
| **Groq API SDK** | 0.4.2 | Integración con IA para generación de tests (modelos Llama y Mistral). |
| **Gunicorn** | - | Servidor WSGI para producción con múltiples workers. |

**Decisión de diseño**: he optado por usar `APIView` y vistas genéricas en lugar de `ViewSet`, porque la lógica de negocio incluye operaciones complejas (invitaciones, generación con IA, cuotas, expiración automática) que no encajan en el patrón CRUD estándar. Esto proporciona mayor control, claridad y mantenibilidad.

### Frontend (Angular + Tailwind)

| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **Angular** | 20.3.0 | Framework completo para SPA con componentes, inyección de dependencias y enrutamiento. |
| **Angular CLI** | 21.0.2 | Generación de componentes, servicios y gestión del build. |
| **TypeScript** | 5.9.2 | Tipado estático que reduce errores y facilita el mantenimiento. |
| **RxJS** | 7.8.0 | Programación reactiva para peticiones HTTP, eventos y estados asíncronos. |
| **Angular Router** | - | Guards (auth, admin, role) para control de acceso. |
| **Interceptor HTTP** | - | Añade credenciales (`withCredentials`) y maneja errores 401/403. |
| **Servicios personalizados** | - | Centralizan la lógica de negocio y comunicación con la API, usando Signals para actualización reactiva. |
| **Tailwind CSS** | 4.1.17 | Framework utility-first para diseño rápido y responsivo, con modo oscuro. |
| **Font Awesome** | - | Iconos vectoriales para mejorar la interfaz. |

### DevOps y despliegue

| Tecnología / Herramienta | Componente | Justificación |
|--------------------------|------------|---------------|
| **Git & GitHub** | Control de versiones | Seguimiento de cambios y colaboración. |
| **Docker** | Contenedores (backend, frontend, postgres) | Aislamiento y reproducibilidad del entorno. |
| **Docker Compose** | Orquestación | Define y ejecuta los contenedores con redes y volúmenes compartidos. |
| **Nginx** | Servidor frontend | Sirve el build de Angular con configuración para SPA. |
| **Gunicorn** | Servidor backend | WSGI de producción con 4 workers y timeout de 120s. |
| **Cron** | Tarea programada | Expiración diaria de resultados en progreso y copias de seguridad con `pg_dump`. |
| **Variables de entorno** | `.env` | Secretos, credenciales, API keys y parámetros de entorno. |
| **VPS / DigitalOcean** | - | Despliegue con Docker, CORS y cookies seguras (`Secure`). HTTPS con Let's Encrypt. |

---

## 4. Funcionalidades clave (casos de uso)

### Visitante (no autenticado)
- **Registro** de nuevos usuarios con validación de email y username.
- **Recuperación de contraseña** mediante enlace por correo con token de un solo uso.

### Usuario registrado
- **Realizar tests**: selección desde lista de disponibles, progreso en tiempo real, corrección automática y feedback con desglose de errores.
- **Generar tests con IA** (modo guiado): elige tema, subtema, nivel, número de preguntas y respuestas; el sistema consume una cuota mensual y llama a Groq para crear el test.
- **Dashboard personal** con estadísticas de rendimiento, progreso, rankings y comparativas.
- **Invitaciones**: puede invitar a otros usuarios a tests mediante enlaces únicos.

### Usuario invitado (guest)
- Acepta una invitación sin necesidad de registro previo.
- Realiza el test asignado y recibe feedback.
- Puede completar su perfil para convertirse en usuario registrado.

### Administrador
- **Panel de administración completo** con métricas globales (KPIs, tests más completados, usuarios activos, tasas de acierto, tiempos medios).
- **Gestión de usuarios**: listar, ver perfiles, eliminar (con anonimización y transferencia a usuario contenedor).
- **Gestión de tests**: crear, editar, duplicar, eliminar, importar JSON.
- **Gestión de resultados**: listar, filtrar, exportar a CSV.
- **Gestión de cuotas de IA**: crear, editar, eliminar y ver estadísticas de uso.
- **Configuración del sistema** (SystemConfig): ajustar parámetros como días de expiración de tests.
- **Gestión de invitaciones**: listar, filtrar, eliminar.

---

## 5. Seguridad y protección de datos

La aplicación implementa múltiples capas de seguridad:

- **Autenticación JWT con cookies HttpOnly**: el token se almacena en una cookie con banderas `HttpOnly`, `Secure` (en producción) y `SameSite=Strict`, mitigando ataques XSS y CSRF.
- **Hashing de contraseñas** con PBKDF2 (Django por defecto).
- **Validación y sanitización**: los serializadores de DRF validan tipos, longitudes y reglas de negocio; el ORM previene SQL injection; Angular escapa automáticamente las salidas en plantillas.
- **Control de acceso**: todos los endpoints requieren autenticación salvo excepciones públicas, y los administrativos usan permisos personalizados (`IsAdminUser`).
- **Variables de entorno**: todos los secretos (SECRET_KEY, JWT, credenciales de BD, API keys) se cargan desde `.env` y no se incluyen en el repositorio.
- **HTTPS**: en producción, la cookie se marca como `Secure` y se usa Let's Encrypt para cifrar todas las comunicaciones.
- **Copias de seguridad diarias** con `pg_dump` y tarea cron.
- **Registro de auditoría**: las solicitudes a la IA se guardan en `AIRequestLog` para trazabilidad.

---

## 6. Arquitectura de datos (modelos principales)

El diagrama de modelos (extraído de la documentación técnica) muestra las relaciones clave:

- **User** (con roles: user, guest, admin, deactivated)
- **Test** (título, descripción, nivel, temas, preguntas, etc.)
- **Question** (texto, tipo, respuestas, correcta)
- **Answer** (respuesta del usuario, asociada a Question y TestResult)
- **TestResult** (progreso, estado, puntuación, tiempo, intentos)
- **TestInvitation** (token, invitador, invitado, test, expiración)
- **UserQuota** (cuota mensual de generación IA)
- **AIRequestLog** (registro de peticiones a Groq)
- **Topic** (jerarquía de temas, sin relación FK directa con Test, pues los temas se guardan como campos de texto)
- **SystemConfig** (configuraciones clave-valor)

---

## 7. Despliegue y operaciones

El proyecto está completamente dockerizado y orquestado con Docker Compose. Los servicios son:

- **postgres**: imagen oficial PostgreSQL 15 Alpine, con volumen persistente.
- **backend**: construido con Dockerfile propio, inicia Gunicorn con 4 workers, ejecuta migraciones y recolección de estáticos.
- **frontend**: construido con Dockerfile multietapa (build con Node.js y servido con Nginx), expone el puerto 80 internamente.

Además, se incluye una tarea cron diaria que:
- Marca automáticamente como expirados los tests en progreso que superen el tiempo configurado.
- Realiza copias de seguridad de la base de datos con `pg_dump`.

La configuración de CORS y cookies seguras se adapta a producción, y se ha montado un volumen para certificados SSL de Let's Encrypt.

---

## 8. Reflexión final

AnGoTest no es solo un proyecto académico; es un producto real, desplegado y funcional, que he diseñado, planificado y ejecutado desde cero. Me ha permitido profundizar en:

- Arquitectura limpia y separación de responsabilidades.
- Diseño de APIs robustas con Django REST Framework.
- Desarrollo frontend moderno con Angular y Signals.
- Integración de servicios de IA (Groq) y control de cuotas.
- Seguridad avanzada (JWT, cookies, HTTPS).
- DevOps y despliegue con Docker en un VPS.

Ahora solo queda esperar la evaluación del tribunal y preparar la defensa oral, pero el proyecto ya está entregado y el resultado me llena de orgullo.

---

## Enlaces de interés

- [Vídeo de presentación](https://www.youtube.com/watch?v=JOpi1MysM9g)
- [Publicación destacada](/proyectos/entry/2026/angotest-migracion-de-go-a-django-un-salto-en-productividad-y-escalabilidad/)
- [Repositorio en GitHub](https://github.com/Jaterli/angotest) (privado durante la evaluación)
- [Documentación técnica completa (PDF)](/projects/angotest/AngoTest_Documentacion_Tecnica.pdf)

---

*Este artículo se actualizará con la fecha de la defensa una vez que el tribunal confirme la cita. ¡Mantente al tanto!*
---
title: "AnGoTest: Plataforma Completa de Tests Online con Angular, Go e IA"
description: "Una aplicación full-stack de tests online con autenticación JWT, dashboard de administración avanzado, rankings detallados y generación de tests mediante inteligencia artificial (IA)."
pubDate: "2026-02-27"
heroImage: "/images/proyectos/projects.AnGoTest.webp"
badge: "DESTACADO"
tags: [Angular, Go, Gin, PostgreSQL, JWT, Docker, TypeScript, AI, TailwindCSS, Full-Stack]
jsonLd: 
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "AnGoTest"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Plataforma full-stack de tests online con panel de administración avanzado, rankings de usuarios y generación de tests mediante IA, desarrollada con Angular y Go."
  "image": "https://jaterli.com/images/proyectos/projects.AnGoTest.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/angotest-plataforma-tests-online-angular-go-ia"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-02-27"
  "programmingLanguage": [
    "TypeScript",
    "Go",
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
    "Arquitectura backend escalable en Go (Gin) y frontend reactivo en Angular (Señales)"
  ]
---
## Visión general

**AnGoTest** es un proyecto personal que nace con un doble objetivo: profundizar de forma práctica en tecnologías modernas como Angular y Go, y diseñar un producto real con potencial comercial. Más que una simple aplicación de tests, AnGoTest representa un ejercicio completo de arquitectura full-stack, pensado desde el inicio como una solución escalable, profesional y lista para ofrecerse a instituciones educativas, empresas o comunidades que necesiten una plataforma avanzada de evaluación online. Su utilidad principal radica en permitir la creación, gestión y realización de tests estructurados con seguimiento detallado del rendimiento, rankings comparativos y generación automatizada de contenido mediante inteligencia artificial, facilitando tanto la evaluación académica como la formación corporativa y los procesos de selección.


<div class="flex flex-col items-center justify-center my-8 space-y-4">
   
  <div class="w-full max-w-3xl mx-auto mt-8">
    <a href="https://www.youtube.com/watch?v=XZ-KDlTW6d8" target="_blank" class="block group">
      <div class="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105">
        <img src="https://img.youtube.com/vi/XZ-KDlTW6d8/maxresdefault.jpg" alt="Demo de AnGoTest - Experiencia de Usuario" class="w-full h-auto">
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
          <div class="flex items-center justify-center w-20 h-20 bg-red-600 rounded-full shadow-xl">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <p class="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        👤 Ver demo: Experiencia de Usuario (Frontend + Flujo de Tests)
      </p>
    </a>
  </div>
   

  <div class="w-full max-w-3xl mx-auto mt-8">
    <a href="https://youtu.be/E2Lk8xWsVjY" target="_blank" class="block group">
      <div class="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105">
        <img src="https://img.youtube.com/vi/E2Lk8xWsVjY/maxresdefault.jpg" alt="Demo de AnGoTest - Panel de Administración" class="w-full h-auto">
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300">
          <div class="flex items-center justify-center w-20 h-20 bg-red-600 rounded-full shadow-xl">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <p class="mt-4 text-xl font-semibold text-center text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        🛠️ Demo del Panel de Administración
      </p>
    </a>
  </div>

</div>

---   

### El Origen del Nombre
El nombre **AnGoTest** no es casualidad, sino que refleja la esencia tecnológica y funcional del proyecto:
- **An** - Hace referencia a **Angular**, el potente framework de frontend con el que está construida toda la interfaz de usuario.
- **Go** - Representa a **Go (Golang)**, el lenguaje que impulsa un backend eficiente, concurrente y de alto rendimiento.
- **Test** - Define su utilidad principal: la creación, gestión y realización de **tests educativos**.

Esta combinación tecnológica no solo da nombre al proyecto, sino que representa su filosofía: unir lo mejor del desarrollo frontend moderno con la eficiencia y escalabilidad del backend en Go.

---
## De la Idea a la Realidad: Un Producto Evolucionado

El proyecto final ha superado con creces el plan inicial. No se limita a un test diario, sino que ofrece una experiencia mucho más rica y compleja:

- **Estructura de Conocimiento:** Los tests se organizan en una jerarquía de tres niveles (`main_topic` > `sub_topic` > `specific_topic`), lo que permite una clasificación muy precisa del contenido y una navegación intuitiva para los usuarios.

- **Gestión de Usuarios Avanzada:** Además de los roles estándar (`user` y `admin`), implementé un rol `guest` que permite a usuarios no registrados aceptar invitaciones y realizar tests, con la opción de convertir su perfil a permanente más tarde. Se incluye un flujo completo de recuperación de contraseña por email.

- **Sistema de Invitaciones:** Los usuarios pueden invitar a otros a realizar tests específicos mediante enlaces únicos. El backend maneja de forma inteligente la lógica de autenticación, creando usuarios `guest` si es necesario o asociando el test a un usuario existente.

- **Gamificación y Análisis:** El sistema de rankings no es un simple contador. Ofrece estadísticas desglosadas por **primer intento vs. todos los intentos**, por nivel de dificultad y por múltiples métricas (tests completados, precisión, tiempo por pregunta, etc.). Esto proporciona una visión profunda del progreso del usuario.

- **Empoderamiento del Administrador:** El panel de administración es una de las partes más sólidas del proyecto. No es un CRUD básico, sino un centro de comando con un dashboard interactivo que muestra KPIs, tendencias, y permite una gestión granular de usuarios, tests, resultados, invitaciones y cuotas de IA.

- **IA con Control:** La generación de tests con IA (usando Groq) no es una caja negra. Los usuarios tienen una **cuota mensual configurable**, y el sistema es capaz de inferir la jerarquía de temas a partir de un prompt libre del usuario, añadiendo automáticamente nuevos temas a la base de datos si es necesario.

---
## Posibles Usos de la Aplicación

La flexibilidad y robustez de AnGoTest la hacen apta para múltiples escenarios:

### 🎓 **Educación y Formación Académica**
- **Instituciones educativas**: Colegios, institutos y universidades pueden utilizarla para crear exámenes periódicos, evaluaciones continuas o tests de autoevaluación para sus alumnos.
- **Plataformas de e-learning**: Integración como herramienta de evaluación para cursos online, permitiendo a los instructores medir el progreso de sus estudiantes.
- **Preparación de oposiciones**: Creación de baterías de preguntas para que los opositores practiquen y comparen su evolución con la comunidad.

### 💼 **Formación Empresarial y RRHH**
- **Onboarding de empleados**: Tests de evaluación sobre los conocimientos adquiridos durante el periodo de incorporación.
- **Formación continua**: Evaluación periódica del personal sobre normativas, productos o procedimientos internos.
- **Procesos de selección**: Pruebas técnicas o de conocimientos específicos para candidatos, con la opción de invitarlos como usuarios `guest`.

### 🏆 **Comunidades y Gamificación**
- **Comunidades de aprendizaje**: Grupos de estudio que pueden crear y compartir tests, compitiendo en rankings internos.
- **Eventos y competiciones**: Organización de torneos de preguntas y respuestas con temáticas específicas.
- **Aplicaciones de trivia**: Base para construir una app de trivia generalista con diferentes categorías y niveles.

### 🔧 **Casos de Uso Específicos**
- **Preparación de certificaciones técnicas**: Tests para certificaciones como AWS, Google Cloud, Cisco, etc.
- **Aprendizaje de idiomas**: Evaluación de vocabulario, gramática y comprensión.
- **Cultura general**: Creación de quizzes diarios sobre historia, ciencia, arte, etc.

---
## Escalabilidad y Próximos Pasos

AnGoTest ha sido diseñada con una arquitectura que permite su crecimiento tanto en funcionalidades como en capacidad de usuarios. Estas son algunas de las vías por las que podría seguir evolucionando:

### 🚀 **Mejoras Técnicas Inmediatas**
- **WebSockets**: Implementar conexiones en tiempo real para notificar a los administradores de nuevas actividades o permitir la realización de tests sincronizados (tipo "quiz battle").
- **Modo offline**: Habilitar la realización de tests sin conexión utilizando Service Workers de Angular y sincronización diferida de resultados.
- **Exportación de datos**: Permitir a administradores y usuarios exportar sus resultados y estadísticas a formatos como PDF, CSV o Excel.
- **Múltiples proveedores de IA**: Ampliar la generación de tests para que pueda utilizar OpenAI (GPT), Anthropic (Claude) o modelos locales, seleccionables por el administrador.

### 📈 **Escalado Horizontal**
- **Containerización**: Dockerizar la aplicación para facilitar su despliegue en entornos de orquestación como Kubernetes.
- **Caché distribuida**: Implementar Redis para cachear consultas frecuentes (como la jerarquía de temas o rankings) y reducir la carga en la base de datos.
- **Separación de lecturas/escrituras**: Configurar la base de datos con réplicas de lectura para escalar las consultas de rankings y dashboards sin afectar las operaciones de escritura.

### ✨ **Nuevas Funcionalidades**
- **Tests colaborativos**: Permitir que múltiples administradores o usuarios avanzados creen tests de forma colaborativa.
- **Comentarios y discusión**: Añadir la posibilidad de comentar preguntas específicas, fomentando el aprendizaje colaborativo.
- **Personalización de perfiles**: Avatares, biografías y logros (achievements) para aumentar la gamificación.
- **API Pública**: Exponer una API para que desarrolladores externos puedan consumir tests y rankings en sus propias aplicaciones.
- **Sistema de notificaciones**: Email y notificaciones in-app para recordar tests pendientes, nuevos rankings o invitaciones.
- **Modo "Examen"**: Tests con tiempo limitado por pregunta, sin posibilidad de pausa y con supervisión (proctoring básico).

---
## Tecnologías Implementadas

### Backend (Go)
- **Framework:** `Gin` para un enrutamiento rápido y middleware.
- **Base de Datos:** `PostgreSQL` con `GORM` como ORM, facilitando las migraciones y relaciones complejas.
- **Autenticación:** `JWT` almacenado en **cookies HttpOnly** para mayor seguridad contra XSS.
- **Seguridad:** `bcrypt` para el hash de contraseñas y middleware para proteger rutas por rol (`AuthMiddleware`, `AdminMiddleware`).
- **IA:** Integración con la API de **Groq** (modelos Llama) para la generación de tests, con un sistema de fallback a datos mock para desarrollo.

### Frontend (Angular)
- **Framework:** **Angular 20+** con componentes standalone y nueva sintaxis de control de flujo (`@if`, `@for`).
- **Estilos:** **TailwindCSS** para un diseño rápido, moderno y totalmente responsivo.
- **Estado:** Uso de **señales (Signals)** para una gestión del estado reactiva y eficiente, mejorando el rendimiento y la legibilidad del código.
- **Interactividad:** Modales reutilizables, gráficos de datos y una experiencia de usuario fluida que consume todas las capacidades del backend.

---
## Características Principales (Feature List)

Basado en el código, estas son las funcionalidades reales implementadas:

- **Autenticación y Usuarios:**
  - Registro, login, logout con cookies seguras HttpOnly.
  - Recuperación de contraseña por email con tokens de un solo uso.
  - Perfil de usuario con datos personales y estadísticas.
  - Roles: `user`, `admin`, `guest` y `deleted` (anonimización).
  - Conversión de cuenta `guest` a `user` permanente.

- **Sistema de Tests:**
  - Jerarquía de temas: Principal > Subtema > Específico.
  - Niveles de dificultad: Principiante, Intermedio, Avanzado.
  - Tests con múltiples preguntas y respuestas (configurables).
  - Filtrado y búsqueda avanzada de tests.

- **Realización de Tests:**
  - Obtención de preguntas paginadas (sin mostrar la respuesta correcta al usuario).
  - Guardado del progreso en tiempo real (`in_progress`).
  - Finalización de tests con cálculo automático de resultados (`completed`).
  - Historial de tests completados y en progreso con filtros.
  - Visualización detallada de respuestas incorrectas al finalizar.

- **Rankings y Gamificación:**
  - Rankings globales por: tests completados, precisión (primer intento/todos), tiempo por pregunta, preguntas respondidas.
  - Rankings específicos por nivel de dificultad.
  - Posición del usuario actual en cada ranking.
  - Promedios de la comunidad para comparativa.

- **Panel de Administración:**
  - Dashboard con KPIs: total de usuarios, tests, resultados, etc.
  - Listas de "top tests" (más completados, más abandonados, mayor/menor precisión, etc.).
  - Listas de usuarios (más activos, nuevos, inactivos, último login).
  - CRUD completo de tests (crear, editar, eliminar en cascada).
  - Gestión de usuarios (ver perfil, estadísticas detalladas, eliminar con transferencia de datos).
  - Gestión de resultados (listado con filtros, eliminación individual/masiva).
  - Gestión de invitaciones (listado, filtros, eliminación).
  - Gestión de cuotas de IA por usuario.
  - Configuración del sistema mediante clave-valor.

- **Inteligencia Artificial:**
  - Generación de tests mediante integración con la API de Groq, diseñada con una abstracción que permite integrar fácilmente otros proveedores de IA.
  - Dos modos de generación: guiado (basado en jerarquía existente) y libre (la IA infiere automáticamente la estructura temática).
  - Sistema de importación de tests vía JSON estructurado, compatible con generación automatizada mediante prompt engineering.
  - Control de cuotas mensuales por usuario para limitar el consumo de recursos IA.
  - Validación, normalización y almacenamiento automático de nuevos temas detectados por la IA.

---
## Arquitectura de la Aplicación

La estructura final del proyecto refleja una separación de concerns clara y escalable:

```plaintext
AnGoTest/
├── frontend/ (Angular 20+)
│   ├── src/app/
│   │   ├── core/               # Servicios singleton, guards, interceptores
│   │   ├── shared/              # Componentes reutilizables (modales, botones)
│   │   ├── features/
│   │   │   ├── auth/            # Login, registro, recover-password
│   │   │   ├── dashboard/        # Dashboard de usuario (personal data)
│   │   │   ├── tests/            # Listado de tests, realización de tests
│   │   │   ├── results/          # Historial y detalle de resultados
│   │   │   ├── rankings/         # Vistas de rankings
│   │   │   └── admin/            # Módulo de administración (con sus sub-componentes)
│   │   └── ...
│   └── ...
│
├── backend/ (Go)
│   ├── cmd/
│   │   └── server/ (main.go)
│   ├── internal/                 # Lógica de negocio privada
│   │   ├── controllers/          # Handlers de Gin (admin, shared, user)
│   │   ├── middleware/           # Auth, Admin, User middleware
│   │   ├── models/               # Definiciones de GORM y lógica de modelos
│   │   └── services/             # Servicios de dashboard y rankings
│   ├── pkg/                       # Código público reutilizable
│   │   ├── config/                # Configuración de DB
│   │   └── routes/                # Definición de rutas
│   ├── go.mod
│   └── ...
│
└── db/
    └── ...                        # Migraciones y seeds
```

## Dockerización y Despliegue en Producción

Una vez finalizado el desarrollo funcional, el siguiente paso fue profesionalizar el proyecto mediante su **dockerización completa** y despliegue en un entorno real.

### 🐳 Containerización con Docker

La aplicación fue dividida en tres servicios principales definidos mediante `docker-compose`:

* **Frontend (Angular)**: Construido en modo producción y servido mediante Nginx.
* **Backend (Go + Gin)**: API REST compilada en una imagen ligera basada en Alpine.
* **Base de Datos (PostgreSQL)**: Persistencia gestionada mediante volúmenes Docker para asegurar la integridad de los datos.

Esta arquitectura permite:

* Aislamiento de servicios
* Entornos reproducibles
* Configuración mediante variables de entorno
* Fácil escalado horizontal en el futuro

Además, el uso de volúmenes garantiza que los datos permanezcan intactos incluso tras reconstrucciones de contenedores.

### 🚀 Despliegue en Servidor

El despliegue se realizó en un droplet de **DigitalOcean**, utilizando:

* Docker & Docker Compose
* Nginx como reverse proxy
* Certificados SSL para servir la aplicación mediante HTTPS
* Variables de entorno seguras para la configuración de base de datos y claves JWT

El flujo de despliegue es sencillo y profesional:

1. Actualización del código desde GitHub (`git pull`)
2. Reconstrucción de contenedores (`docker compose up -d --build`)
3. Ejecución de migraciones
4. Verificación de servicios activos

Este proceso permite iterar rápidamente sobre nuevas funcionalidades manteniendo estabilidad en producción.

La dockerización no solo facilita el despliegue, sino que convierte el proyecto en una aplicación lista para entornos de orquestación como Kubernetes o servicios cloud gestionados.


## Conclusión y Aprendizajes

Este proyecto ha sido un viaje increíblemente enriquecedor que ha superado todas mis expectativas iniciales. No solo he consolidado mis conocimientos en **Angular y Go**, sino que he aprendido a:

1.  **Diseñar una API RESTful compleja y coherente**, con rutas bien organizadas para diferentes roles de usuario.
2.  **Implementar un sistema de autenticación robusto y seguro** utilizando JWT en cookies HttpOnly.
3.  **Trabajar con bases de datos relacionales a gran escala**, diseñando un modelo de datos complejo con GORM y realizando consultas SQL optimizadas para el dashboard y los rankings.
4.  **Construir una interfaz de usuario dinámica y reactiva** con las nuevas señales de Angular, mejorando el rendimiento y la experiencia de desarrollo.
5.  **Integrar y controlar una API de Inteligencia Artificial**, creando un flujo de trabajo que no solo consume el servicio, sino que también gestiona el resultado, lo valida y lo integra en el modelo de datos existente.

**AnGoTest** es, uno de los proyectos más completos que he realizado hasta la fecha. Representa no solo el dominio técnico de un stack moderno (Angular + Go), sino también la capacidad de **diseñar, planificar y ejecutar** un producto software con principios de arquitectura limpia, seguridad y escalabilidad. Estoy orgulloso de cómo cada pieza encaja para formar un producto funcional y con un alto valor educativo, y emocionado por las posibilidades de crecimiento que tiene por delante.

<div class="text-center">
  <a href="https://angotest.com" target="_blank" class="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
    </svg>
    Visitar AnGoTest
  </a>
</div> 
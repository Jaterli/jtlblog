---
title: "AnGoTest: Tests online con Angular, Go e IA"
description: "App que servirá como proyecto de final de módulo de Angular y de Go del máster en Desarrollo Web Full Stack. Además, será mi primera toma de contacto con la integración de Inteligencia Artificial."
pubDate: "2025-09-19"
heroImage: "/images/proyectos/projects.AnGoTest.webp"
badge: "En progreso"
tags: [Angular, Go, Gin, PostgreSQL, JWT, TypeScript, AI]
jsonLd: 
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AnGoTest",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "description": "Aplicación web de tests online desarrollada con Angular y Go como proyecto académico, con ranking de usuarios y generación de tests mediante IA.",
    "image": "https://jaterli.com/images/proyectos/projects.AnGoTest.webp",
    "url": "https://jaterli.com/proyectos/entry/angotest-tests-online-con-angular-go-e-ia",
    "author": {
      "@type": "Person",
      "name": "Jaime TL"
    },
    "datePublished": "2025-09-19",
    "programmingLanguage": [
      "TypeScript",
      "Go",
      "SQL"
    ],
    "featureList": [
      "Registro y autenticación de usuarios con JWT",
      "Tests diarios con 10-20 preguntas",
      "Ranking global de usuarios",
      "Panel de administración para gestionar tests",
      "Integración opcional con IA para generar preguntas"
    ]
   
---

## Visión general

**AnGoTest** será una aplicación web de **tests online** que servirá tanto como práctica académica en el máster de **Desarrollo Web Full Stack** como un producto útil para el aprendizaje en diferentes áreas de conocimiento.  

Cada día, los usuarios registrados tendrán acceso a un **nuevo test con 10-20 preguntas**, de respuesta múltiple, que deberán completar en un tiempo determinado.  
El sistema guardará sus resultados (respuestas correctas, incorrectas y tiempo empleado), y con estos datos se generará un **ranking global de usuarios**, incentivando la participación diaria.  

Además, contará con un **panel de administración** en el que se podrán crear, editar y eliminar tests, así como consultar estadísticas globales. De manera opcional, se incorporará la **generación de preguntas mediante IA**, que servirá como mi primera toma de contacto con este tipo de integración.

---

## Plan de Desarrollo

### 🟢 Fase 1 – MVP básico
- Backend (Go + Gin):
  - Endpoint `/tests/today` con un test estático.  
  - Endpoint `/results` en memoria (guardar respuestas y puntuación).  
- Frontend (Angular):
  - Página de login/registro dummy.  
  - Visualización y resolución del test del día.  

---

### 🟡 Fase 2 – Persistencia en base de datos
- Backend:
  - Conexión a **PostgreSQL**.  
  - Tablas para usuarios, tests, preguntas, respuestas y resultados.  
- Frontend:
  - Consumo real de API.  
  - Historial de tests realizados por usuario.  

---

### 🔵 Fase 3 – Autenticación y usuarios
- Backend:
  - Registro y login con **JWT**.  
  - Middleware para proteger endpoints.  
- Frontend:
  - Formulario de login/registro.  
  - Rutas protegidas (Angular Router Guards).  

---

### 🟣 Fase 4 – Ranking y gamificación
- Backend:
  - Endpoint `/ranking` con los mejores usuarios.  
- Frontend:
  - Página de ranking global.  
  - Visualización de estadísticas personales vs globales.  

---

### 🟠 Fase 5 – Panel de administración
- Backend:
  - CRUD completo para tests, preguntas y respuestas.  
  - Endpoint `/stats/global` para métricas generales.  
- Frontend:
  - Dashboard con Angular Material.  
  - Gráficas de resultados globales.  

---

### 🔴 Fase 6 – Integración con IA (opcional)
- Backend:
  - Endpoint `/tests/generate` que conecta con una API de IA (ej. OpenAI).  
  - Generación automática o asistida de preguntas y respuestas.  
- Frontend:
  - Botón “Generar test con IA” en el panel de administración.  

---

## Arquitectura de trabajo

- **Frontend (Angular)**:  
  - Angular + Angular Material.  
  - Guards + interceptors para JWT.  
  - NgRx/signals para manejo de estado.  

- **Backend (Go)**:  
  - Go + Gin.  
  - ORM: GORM / sqlx.  
  - JWT para auth.  
  - Posible integración con OpenAI API.  

- **Base de datos (PostgreSQL)**:  
  - `users`  
  - `tests`  
  - `questions`  
  - `answers`  
  - `results`  

---

## Estructura de carpetas básica

```plaintext
AnGoTest/
├── frontend/ (Angular)
│   ├── src/app/
│   │   ├── auth/
│   │   ├── tests/
│   │   ├── results/
│   │   ├── ranking/
│   │   └── admin/
│   └── assets/
│
├── backend/ (Go)
│   ├── cmd/
│   │   └── server/ (main.go)
│   ├── internal/
│   │   ├── auth/
│   │   ├── tests/
│   │   ├── results/
│   │   ├── ranking/
│   │   └── admin/
│   ├── pkg/
│   │   ├── database/
│   │   ├── middleware/
│   │   └── utils/
│   └── go.mod
│
└── db/
    ├── migrations/
    └── seed/
```

---

## Conclusión

Este proyecto me permitirá:

1. Afianzar mis conocimientos de **Angular** en frontend moderno.
2. Construir un backend con **Go** seguro y escalable.
3. Practicar el **diseño de bases de datos relacionales** con PostgreSQL.
4. Aprender a integrar **Inteligencia Artificial** en un flujo de aplicación real.
5. Desarrollar un producto con un alto componente de **gamificación y utilidad educativa**.

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{{ jsonLd }}
</script>
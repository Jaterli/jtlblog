---
draft: false
title: "AnGoTest: Migración de Go a Django, un salto en productividad y escalabilidad"
description: "Un análisis detallado del proceso de migración del backend de AnGoTest de Go a Django, las ventajas que ha aportado y el aprendizaje adquirido."
pubDate: "2026-06-18"
heroImage: "/images/proyectos/projects.angotest-migracion-django.webp"
category: "Desarrollo Web"
tags: [Django, Python, Go, Migración, Full Stack, Angular, IA]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Un análisis detallado del proceso de migración del backend de AnGoTest de Go a Django, las ventajas que ha aportado y el aprendizaje adquirido.",
      "author": {
        "@type": "Person",
        "name": "Jaterli"
      },
      "datePublished": "2026-06-18T00:00:00+01:00",
      "image": "https://jaterli.com/images/proyectos/projects.angotest-migracion-django.webp"
    }
  ]
---

## Introducción

**AnGoTest** es una plataforma completa de tests online que integra autenticación JWT, rankings gamificados, un potente panel de administración y generación de tests mediante inteligencia artificial. Nació como un proyecto personal para profundizar en dos tecnologías que me apasionan: **Angular** en el frontend y **Go** en el backend. Hace unas semanas decidí dar un paso audaz: **migrar todo el backend de Go a Django**.

Este artículo documenta ese viaje: los motivos, el proceso, los desafíos y las ventajas que Django ha aportado al proyecto. También explico por qué esta aplicación, que presentaré como **Proyecto Final de Máster (PFM)** para el **Máster en Desarrollo Web Full Stack de Conquer Blocks**, va mucho más allá de los requisitos académicos.

---

## El Origen de AnGoTest: Aprender Haciendo

Cuando empecé AnGoTest, estaba cursando el Máster en Desarrollo Web Full Stack. El programa incluye módulos dedicados tanto a frontend como a backend, y mi forma más eficiente de aprender es codificando. Por eso decidí construir una aplicación completa desde cero usando **Angular** como frontend y **Go** como backend.

Quería aprender Go en profundidad. Me atraía su velocidad, su modelo de concurrencia basado en goroutines y su creciente adopción en entornos empresariales. Construí un backend robusto con **Gin** y **GORM**, con un sistema de autenticación JWT en cookies HttpOnly, una arquitectura de controladores y servicios bien estructurada, y una integración funcional con la API de Groq para generar tests mediante IA.

El proyecto funcionaba bien, pero a medida que crecía, ciertas fricciones empezaron a ralentizar el desarrollo. La verbosidad de Go, la falta de un ORM tan maduro como el de Django, y la necesidad de implementar manualmente funcionalidades comunes empezaron a pesar.

---

## La Decisión de Migrar a Django

La migración no fue una decisión trivial. Implicaba reescribir cientos de líneas de código y rediseñar la arquitectura. Ya había integrado Django en otras aplicaciones como EasyCryptoBuy y Translator Management, pero esta migración me ha permitido explorar aún más sus capacidades. El motivo principal es que el proyecto final de máster requería usar este framework.

**¿Por qué Django?**

- **Productividad**: Django ORM y DRF permiten construir APIs complejas en una fracción del tiempo. Las consultas complejas (joins, agregaciones, subconsultas) se expresan en pocas líneas de código.
- **Seguridad out-of-the-box**: Protección contra XSS, CSRF, SQL Injection y Clickjacking por defecto.
- **Escalabilidad**: La arquitectura basada en "apps" permite una separación clara de responsabilidades.
- **Caché integrado**: Sistema flexible para cachear consultas pesadas con Redis o Memcached.

---

## El Papel de la Inteligencia Artificial en la Migración

La IA ha sido una herramienta muy útil para acelerar el proceso de migración. Sin embargo, su uso requiere un análisis y una supervisión constantes por parte del desarrollador.

En muchas ocasiones, la IA genera código innecesario, redundante o difícil de mantener, por lo que es necesario revisarlo, simplificarlo y adaptarlo a la arquitectura del proyecto. Además, suele tener dificultades para comprender las dependencias y relaciones existentes entre diferentes archivos y módulos, lo que puede dar lugar a inconsistencias o implementaciones duplicadas.

Por este motivo, resulta fundamental comprender los principios y fundamentos de la aplicación que se está desarrollando. Solo con un conocimiento sólido de la lógica de negocio, la estructura del código y las interacciones entre sus componentes es posible guiar correctamente a la IA y aprovechar todo su potencial. De lo contrario, en lugar de agilizar el desarrollo, puede introducir complejidad innecesaria y dificultar la evolución del proyecto.

---

## El Proceso de Migración

### 1. Rediseño de la Estructura del Proyecto

**En Go**, la estructura era típica de un proyecto Gin:
```
backend/
├── cmd/server/          # Entry point
├── internal/
│   ├── controllers/     # Handlers
│   ├── middleware/      # Auth, CORS
│   ├── models/          # GORM models
│   └── services/        # Business logic
└── pkg/
    ├── config/
    └── routes/
```

**En Django**, adopté una estructura modular:
```
backend/
├── angotest/            # Configuración del proyecto
│   ├── settings.py
│   └── urls.py
└── apps/                # Aplicaciones modulares
    ├── accounts/        # Autenticación y usuarios
    ├── admin_panel/     # Dashboard y gestión
    ├── ai/              # Generación de tests por IA
    ├── invitations/     # Sistema de invitaciones
    ├── results/         # Progreso y resultados
    ├── shared/          # Modelos y lógica compartida
    └── test/            # Modelo y gestión de tests
```

Esta separación en apps facilita el mantenimiento y la reutilización de componentes.

### 2. Modelos: De GORM a Django ORM

La migración de modelos fue gratificante. Lo que en Go requería definiciones extensas y etiquetas GORM, en Django se expresa de forma más limpia. La herencia de `AbstractBaseUser` para el modelo de usuario me dio de forma gratuita todo el sistema de autenticación y permisos de Django.

### 3. Vistas y Serializadores

En Django, los **ViewSets** de DRF proporcionan funcionalidades como paginación, filtrado y ordenación casi sin esfuerzo adicional. La lógica de negocio se organiza en vistas que aprovechan el ORM para consultas optimizadas.

### 4. Autenticación: De JWT Manual a SimpleJWT

En Go, implementé manualmente la generación y verificación de JWT con middleware para extraer el token de las cookies. En Django, `djangorestframework-simplejwt` proporciona toda esta funcionalidad de forma integrada.

### 5. Un Panel de Gestión Propio, no el Admin de Django

Aunque Django ofrece un admin integrado, para AnGoTest ya había desarrollado un panel de gestión completo cuando la plataforma se integraba con Go. Este panel permite gestionar usuarios, tests, resultados, invitaciones y cuotas con diferentes tipos de filtrados avanzados.

He mantenido este panel en la migración porque:
- Mantiene la misma interfaz que el resto de la aplicación.
- Facilita el acceso entre todas las funcionalidades.
- Es más intuitivo y funcional que el admin de Django.
- La eficiencia y la experiencia de usuario son clave en esta app.

---

## Las Ventajas Clave de Django

### 1. Consultas Complejas Hechas Simples

Uno de los mayores retos en Go era construir consultas complejas para el dashboard y los rankings. En Django, el ORM permite expresar estas consultas de forma declarativa.

**Para el dashboard de administración**, necesito estadísticas como:
- Total de usuarios, tests y resultados
- Distribución de tests por nivel
- Usuarios más activos
- Tests con mayor y menor precisión

El ORM de Django permite obtener todo esto combinando agregaciones, filtros y anotaciones en pocas líneas de código. Por ejemplo, para obtener el total de resultados completados, en progreso y expirados, utilizo `Count` con filtros `Q` en una sola consulta agregada. Para los rankings, las anotaciones con `Case` y `When` calculan métricas complejas como la precisión por nivel de dificultad directamente en la base de datos.

### 2. Caché Efectivo

La jerarquía de temas (`main_topic > sub_topic > specific_topic`) se consulta constantemente. Cachearla reduce drásticamente la carga en la base de datos. Django ofrece un sistema de caché flexible que permite almacenar estas estructuras de forma eficiente con tiempo de expiración configurable.

### 3. Migraciones Automáticas

Django gestiona automáticamente los cambios en el esquema de la base de datos, detectando modificaciones en los modelos y generando las migraciones necesarias.

### 4. Seguridad Integrada

Django incluye protección contra **SQL Injection** (a través del ORM), **XSS**, **CSRF** y **Clickjacking** por defecto.

---

## El Aprendizaje: Dos Filosofías, Dos Mundos

Migrar de Go a Django fue un aprendizaje profundo sobre dos filosofías de desarrollo distintas.

**De Go aprendí:**
- La importancia del rendimiento y la concurrencia.
- El valor de la simplicidad y la disciplina.
- Gestión de memoria y comprensión de lenguajes compilados.

**De Django aprendí:**
- El poder de un framework maduro que acelera el desarrollo.
- La elegancia y legibilidad de Python.
- La importancia de una comunidad activa con documentación excelente.

---

## Más Allá de los Requisitos Académicos

Este proyecto no es solo un ejercicio académico. Para el **PFM de Conquer Blocks**, los objetivos incluyen aplicar conocimientos en backend con Django, desarrollar una aplicación completa con flujo real de datos y despliegue operativo, y demostrar autonomía técnica.

**AnGoTest va mucho más allá:**

### 1. Integración de Inteligencia Artificial

La generación de tests mediante IA (Groq) permite:
- Dos modos: guiado (basado en jerarquía existente) y libre (la IA infiere la estructura).
- Cuotas mensuales por usuario configurable desde el panel.
- Logs detallados de cada solicitud.
- Arquitectura extensible para otros proveedores de IA.

### 2. Sistema de Gamificación y Rankings

Rankings con múltiples métricas: tests completados, precisión (primer intento vs. todos), tiempo por pregunta, preguntas respondidas. Rankings específicos por nivel y posición del usuario en cada ranking.

### 3. Panel de Administración Profesional

Dashboard interactivo con KPIs, visualización de tendencias, listas de "top", y gestión granular de usuarios, tests, resultados, invitaciones y cuotas.

### 4. Sistema de Invitaciones Complejo

Enlaces únicos para invitar a tests, soporte para usuarios `guest`, transferencia automática de progreso al registrarse, y auditoría completa.

### 5. Arquitectura Escalable

Estructura modular en apps que facilita añadir nuevas características y escalar horizontalmente.

### 6. Despliegue en Entorno Real

Dockerizado y desplegado en DigitalOcean con Nginx, SSL y PostgreSQL con persistencia.

---

## Un Trayecto de Tres Aplicaciones Completas en un Año

Este proyecto se suma a otros dos completados en el último año:

### EasyCryptoBuy

Plataforma de comercio electrónico Web3 que permite comprar con criptomonedas. Desarrollé frontend en React con conexión a wallets, backend en Django REST Framework, smart contracts en Solidity y listener blockchain. Presentado como trabajo final para los módulos de Django y Web3/Solidity.

### Translator Management

Herramienta para gestionar perfiles de traductores profesionales con backend en Django REST Framework, frontend en React + TypeScript, y sistema de consultas personalizadas.

### AnGoTest

La más ambiciosa de las tres: backend en Django con 7 apps modulares, frontend en Angular 20+ con Signals, integración con IA, gamificación, panel de administración avanzado, sistema de invitaciones, y despliegue en producción.

---

## Dockerización y Despliegue

La aplicación está dockerizada con tres servicios principales:
1. **Frontend (Angular)**: Construido en modo producción con Nginx.
2. **Backend (Django)**: API REST con Gunicorn.
3. **Base de Datos (PostgreSQL)**: Persistencia con volúmenes.

Desplegado en DigitalOcean con Docker Compose, Nginx como reverse proxy, SSL, y variables de entorno seguras.

---

## Conclusión

La migración de AnGoTest de Go a Django ha sido uno de los proyectos más enriquecedores de mi trayectoria. He aprendido a fondo dos ecosistemas muy diferentes y he comprendido cuándo y por qué elegir uno u otro.

**Go** me enseñó rendimiento, concurrencia y simplicidad. **Django** me ha demostrado el poder de un framework maduro que integra todo lo necesario para construir aplicaciones web complejas de forma eficiente y segura.

El resultado es una aplicación que:
- Cumple sobradamente los objetivos académicos del PFM.
- Va mucho más allá, integrando IA, gamificación y arquitectura profesional.
- Está lista para producción, dockerizada y desplegada.
- Demuestra competencias profesionales en análisis, diseño, desarrollo, documentación y despliegue.

Este proyecto, junto con EasyCryptoBuy y Translator Management, forma un portfolio que evidencia mi capacidad para abordar problemas diversos en el desarrollo full stack.

---

## Enlaces y Recursos

- **AnGoTest en producción**: [https://angotest.com](https://angotest.com)
- **+ información sobre AnGoTest con Go**: [aquí](/proyectos/entry/2026/angotest-tests-online-con-angular-go-e-ia/)

---

## Agradecimientos

A **Conquer Blocks** por proporcionar un programa formativo que me ha dado las herramientas para construir proyectos de este nivel. A los profesores y mentores que han guiado mi aprendizaje. Y a la comunidad de desarrolladores que hace que tecnologías como Django, Angular y Go sean tan accesibles y potentes.

---

*"La mejor manera de aprender es construyendo. Y la mejor manera de demostrar lo que sabes es compartiéndolo."*
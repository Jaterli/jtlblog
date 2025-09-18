---
title: "Mini E-commerce con Angular y Go"
description: "Este es el próximo proyecto que tengo en mente para avanzar con mis conocimientos de Angular y Go, que me servirá como proyecto de final de módulo de Angular y de Go del máster en Desarrollo Web Full Stack."
pubDate: "2025-09-18"
heroImage: "/images/proyectos/projects.Angular+Go+Crypto.jpg"
badge: "En progreso"
tags: [Angular, Go, Gin, PostgreSQL, JWT, TypeScript]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  name: "AngularGoShop"
  applicationCategory: "BusinessApplication"
  operatingSystem: "Web"
  description: "Mini e-commerce escalable desarrollado con Angular y Go como proyecto académico y de práctica Full Stack."
  image: "https://jaterli.com/images/proyectos/projects.angular-go-ecommerce.jpg"
  url: "https://jaterli.com/proyectos/entry/mini-ecommerce-angular-go/"
  creator:
    "@type": "Person"
    name: "Jaime TL"
  programmingLanguage:
    - "TypeScript"
    - "Go"
    - "SQL"
  featureList:
    - "Catálogo de productos"
    - "Gestión de carritos"
    - "Autenticación con JWT"
    - "Persistencia con PostgreSQL"
    - "Gestión de pedidos y usuarios"

---

## Visión general

Este es el próximo proyecto que tengo en mente para avanzar con mis conocimientos de **Angular y Go**, y que me servirá como **proyecto de final de módulo de Angular y de Go** del máster que estoy cursando de **Desarrollo Web Full Stack en la Academia Conquer Blocks**.  

El objetivo es construir un **mini e-commerce** que comience siendo un MVP muy simple, pero que pueda **escalar gradualmente** hasta convertirse en una aplicación web completa y robusta.  

Con este proyecto consolidaré tanto el **desarrollo frontend con Angular** como el **backend en Go**, aprendiendo a estructurar un sistema modular, seguro y con buenas prácticas.  

---

## Plan de Desarrollo

### 🟢 Fase 1 – MVP básico
- Backend (Go + Gin):
  - Endpoint `/products` con productos estáticos en JSON.  
  - Endpoint `/cart` en memoria (añadir/quitar productos).  
- Frontend (Angular):
  - Página de productos.  
  - Carrito simple con datos locales.  

---

### 🟡 Fase 2 – Persistencia en base de datos
- Backend:
  - Conexión a **PostgreSQL** con GORM.  
  - CRUD de productos.  
  - Carrito persistente por usuario.  
- Frontend:
  - Consumo de API real.  
  - Formulario para gestionar productos (admin).  

---

### 🔵 Fase 3 – Autenticación y usuarios
- Backend:
  - Registro y login con **JWT**.  
  - Middleware para proteger endpoints.  
- Frontend:
  - Formulario de login/registro.  
  - Rutas protegidas (Angular Router Guards).  

---

### 🟣 Fase 4 – Pedidos y compras
- Backend:
  - Endpoint `/orders` para generar pedidos desde el carrito.  
  - Historial de pedidos por usuario.  
- Frontend:
  - Proceso de checkout.  
  - Página de historial de pedidos.  

---

### 🟠 Fase 5 – Escalabilidad real
- Backend:
  - Modularización por dominios (usuarios, productos, pedidos).  
  - Middlewares de seguridad (CORS, rate limiting, logs).  
  - Tests unitarios e integración.  
- Frontend:
  - Dashboard de administración (productos, usuarios, pedidos).  
  - Lazy loading de módulos.  
  - Mejoras de UX/UI (Angular Material o PrimeNG).  

---

## Tecnologías Principales

- **Frontend**: Angular, TypeScript, Angular Material/PrimeNG  
- **Backend**: Go (Gin Framework, GORM)  
- **Base de datos**: PostgreSQL  
- **Autenticación**: JWT  
- **Arquitectura**: API REST escalable con separación de responsabilidades  

---

## Conclusión

Este proyecto me permitirá:
1. Consolidar conocimientos de **Angular** para frontend moderno y escalable.  
2. Desarrollar un backend en **Go** robusto, rápido y seguro.  
3. Entender el ciclo completo de desarrollo **Full Stack**: cliente, servidor y base de datos.  
4. Preparar una base que podría evolucionar hacia un **e-commerce real** con integraciones de pago, microservicios o incluso blockchain en el futuro.  

---
title: "9 aplicaciones interactivas en Javascript para practicar DOM y eventos"
description: "Colección de 9 ejercicios prácticos de JavaScript: cambiador de color, contador de clics, lista dinámica, filtro en tiempo real, calculadora, temporizador, generador de contraseñas, contador de texto y lista de tareas con LocalStorage."
pubDate: "2026-04-06"
heroImage: "/images/proyectos/projects.js-ejercicios1.png"
tags: [JavaScript, DOM, Eventos, LocalStorage, CSS3, HTML5, Responsive, Mobile First]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Ejercicios JavaScript - Master Full Stack"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "9 ejercicios prácticos de JavaScript que cubren manipulación del DOM, eventos, temporizadores, generación aleatoria, validación de formularios y persistencia con LocalStorage."
  "image": "https://jaterli.com/images/proyectos/projects.js-ejercicios1.png"
  "url": "https://jaterli.com/proyectos/js-ejercicios"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-04-06"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "JavaScript"
  ]
  "featureList": [
    "Cambiador de color de fondo aleatorio",
    "Contador de clics con mensajes motivacionales",
    "Lista dinámica con eliminación de elementos",
    "Filtro de búsqueda en tiempo real",
    "Calculadora con validación de divisiones por cero",
    "Temporizador con inicio, pausa y reinicio",
    "Generador de contraseñas seguras con crypto API",
    "Contador de palabras y caracteres en tiempo real",
    "Lista de tareas con persistencia LocalStorage",
    "Diseño responsive mobile-first",
    "Atributos ARIA para accesibilidad"
  ]
---

## Visión General

Esta relación ejercicios sencillos en JS forma parte de los entregables del módulo de JavaScript del Máster en Desarrollo Web Full Stack. Consiste en 9 aplicaciones web independientes que demuestran el dominio de conceptos fundamentales de JavaScript: manipulación del DOM, eventos, temporizadores, generación aleatoria, validación de formularios y persistencia con LocalStorage.

El proyecto incluye una página de índice que enlaza a cada ejercicio, estilos CSS responsive unificados y funcionalidades extra que mejoran la experiencia de usuario más allá de los requisitos básicos.

---

## Estructura del Proyecto

```
proyecto-js/
├── index.html              # Página principal con índice
├── css/
│   └── styles.css          # Estilos responsive unificados
├── js/
│   ├── ejercicio1.js       # Cambiador de color
│   ├── ejercicio2.js       # Contador de clics
│   ├── ejercicio3.js       # Lista dinámica
│   ├── ejercicio4.js       # Filtro de búsqueda
│   ├── ejercicio5.js       # Calculadora
│   ├── ejercicio6.js       # Temporizador
│   ├── ejercicio7.js       # Generador de contraseñas
│   ├── ejercicio8.js       # Contador de palabras
│   └── ejercicio9.js       # Lista de tareas
└── pages/
    ├── ejercicio1.html
    ├── ejercicio2.html
    └── ... (9 archivos)
```

---

## Ejercicios Implementados

### 1. Cambiador de Color de Fondo
Genera colores hexadecimales aleatorios al hacer clic y muestra el código del color actual.

**Técnicas utilizadas:** Eventos de clic, manipulación de estilos CSS, generación aleatoria.

### 2. Contador de Clics
Incrementa un contador con cada clic y muestra mensajes motivacionales aleatorios.

**Extra implementado:** Array con 12 mensajes de ánimo que aparecen aleatoriamente.

**Técnicas utilizadas:** Eventos, actualización del DOM, arrays.

### 3. Lista Dinámica
Permite agregar elementos a una lista con eliminación individual y vaciado completo.

**Extra implementado:** Botón "Vaciar Lista" que solo aparece cuando hay elementos.

**Técnicas utilizadas:** Creación/eliminación de elementos DOM, eventos dinámicos.

### 4. Filtro de Búsqueda en Tiempo Real
Filtra una lista predefinida de frameworks/librerías mientras el usuario escribe.

**Técnicas utilizadas:** Eventos de input, filtrado de arrays, actualización dinámica.

### 5. Calculadora Sencilla
Realiza operaciones básicas (suma, resta, multiplicación, división) con validación de errores.

**Validaciones:** Números no válidos, división por cero.

**Técnicas utilizadas:** Parseo de números, condicionales, eventos de botones.

### 6. Temporizador
Cuenta horas, minutos y segundos con controles de inicio, pausa y reinicio.

**Extra implementado:** Indicador visual del estado (En marcha/Pausado/Reiniciado).

**Técnicas utilizadas:** setInterval, clearInterval, formateo de números.

### 7. Generador de Contraseñas Aleatorias
Genera contraseñas seguras con letras, números y caracteres especiales.

**Características destacadas:** 
- Uso de `crypto.getRandomValues()` para aleatoriedad criptográfica
- Asegura al menos un carácter de cada tipo
- Validación de longitud (4-20 caracteres)

**Técnicas utilizadas:** API Crypto, arrays, Fisher-Yates shuffle.

### 8. Contador de Palabras y Caracteres
Muestra en tiempo real el número de caracteres (sin espacios) y palabras.

**Extra implementado:** Botón para limpiar el texto.

**Técnicas utilizadas:** Expresiones regulares, eventos de input.

### 9. Lista de Tareas con LocalStorage
Aplicación completa de tareas con persistencia de datos.

**Características:**
- Añadir tareas con Enter o botón
- Marcar tareas como completadas con checkbox
- Eliminar tareas individualmente
- Limpiar todas las tareas completadas
- Persistencia automática en LocalStorage

**Técnicas utilizadas:** LocalStorage, JSON, estado de aplicación.

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica, atributos ARIA para accesibilidad
- **CSS3**: Flexbox, Grid, media queries, transiciones
- **JavaScript (Vanilla)**: DOM manipulation, eventos, LocalStorage, Crypto API

### Metodologías
- **Mobile First**: Diseño responsive con breakpoints progresivos
- **BEM ligero**: Nomenclatura de clases consistente
- **Separación de concerns**: HTML, CSS y JS en archivos independientes

---

## Características Técnicas Destacadas

### Generación de Contraseñas Segura
```javascript
function getRandomInt(max) {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    return randomArray[0] % max;
}
```

### Prevención de Múltiples Intervalos
```javascript
function iniciar() {
    if (!corriendo) {
        if (intervalo) clearInterval(intervalo);
        intervalo = setInterval(incrementarTiempo, 1000);
        corriendo = true;
    }
}
```

### Persistencia con LocalStorage
```javascript
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        renderizarTareas();
    }
}
```

---

## Responsive Design

El proyecto implementa una estrategia mobile-first con breakpoints:

| Breakpoint | Pantalla | Grid ejercicios |
|------------|----------|-----------------|
| Base | Móvil (≤480px) | 1 columna |
| 480px+ | Móvil grande | auto-fill (min 250px) |
| 768px+ | Tablet | auto-fill con hover effects |
| 1024px+ | Desktop | Mismos estilos optimizados |

---

## Accesibilidad

Se han implementado buenas prácticas de accesibilidad:
- Atributos `aria-label` en botones e inputs
- `aria-live="polite"` para actualizaciones dinámicas
- `role="status"` para resultados de operaciones
- `aria-describedby` para campos con ayuda
- Estructura semántica con header, main, nav, footer

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/JS-Entrega-de-ejercicios-1/" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/JS-Entrega-de-ejercicios-1" target="_blank" class="flex items-center btn btn-primary"> 
  <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

Esta primera entrega de ejercicios JavaScript demuestra un dominio sólido de los fundamentos del lenguaje y su aplicación práctica en el navegador:

1. **Manipulación del DOM**: Creación, eliminación y actualización dinámica de elementos
2. **Eventos**: Manejo de clics, input, submit y eventos de teclado
3. **Temporización**: Uso correcto de setInterval y clearInterval
4. **Persistencia**: Implementación completa de LocalStorage
5. **Seguridad**: Uso de Crypto API para generación aleatoria
6. **UX**: Validaciones, feedback visual y funcionalidades extra

Cada ejercicio es funcional, responsive y accesible, cumpliendo con los requisitos del enunciado y añadiendo valor con características adicionales bien implementadas.

---
title: "Rick and Morty Explorer: Aplicación web con JavaScript, API REST y LocalStorage"
description: "Desarrollo completo de una SPA que consume la API de Rick and Morty con sistema de favoritos persistente, búsqueda en tiempo real, filtros combinados y vista detallada de personajes y episodios."
pubDate: "2026-04-12"
heroImage: "/images/proyectos/projects.rickandmorty-explorer.webp"
tags: [JavaScript, API REST, LocalStorage, CSS3, HTML5, Responsive]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Rick and Morty Explorer - Master Full Stack"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Aplicación web SPA que consume la API de Rick and Morty con sistema de caché, paginación, filtros combinados, favoritos persistentes y vista detallada de personajes y episodios con navegación bidireccional."
  "image": "https://jaterli.com/images/proyectos/projects.rickandmorty-explorer.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/rick-and-morty-explorer-aplicacion-web-con-javascript-api-rest-y-localstorage"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-04-12"
  "programmingLanguage": [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)"
  ]
  "featureList": [
    "Consumo de API REST con async/await",
    "Sistema de caché para reducir peticiones",
    "Búsqueda en tiempo real por nombre",
    "Filtros combinados por estado y especie",
    "Paginación en personajes y episodios",
    "Vista modal con detalle completo",
    "Favoritos con persistencia LocalStorage",
    "Navegación bidireccional personaje-episodio",
    "Indicadores de carga y manejo de errores",
    "Diseño responsive mobile-first",
    "Animaciones CSS y transiciones suaves"
  ]
---

## Visión General

**Rick and Morty Explorer** es una aplicación web de página única (SPA) desarrollada como parte del entregable del módulo de JavaScript del Máster en Desarrollo Web Full Stack. El proyecto demuestra el consumo de APIs REST, manejo de peticiones asíncronas, manipulación avanzada del DOM, gestión de estado, persistencia con LocalStorage y una experiencia de usuario cuidada.

La aplicación consume la [API oficial de Rick and Morty](https://rickandmortyapi.com/) y permite explorar personajes y episodios de la serie, con funcionalidades completas de búsqueda, filtrado, paginación y un sistema de favoritos que persiste entre sesiones.

---

## Estructura del Proyecto

```
rickandmorty-explorer/
├── index.html              # Estructura principal (SPA)
├── css/
│   └── styles.css          # Estilos globales, variables CSS, responsive
├── js/
│   ├── api.js              # Cliente API con sistema de caché
│   ├── favorites.js        # Gestión de favoritos (LocalStorage)
│   ├── ui.js               # Renderizado y manipulación del DOM
│   └── app.js              # Lógica principal y control de eventos
└── README.md
```

---

## Arquitectura y Patrones

### Separación de Responsabilidades

El código se organiza en cuatro módulos independientes siguiendo el principio de separación de concerns:

| Módulo | Responsabilidad |
|--------|----------------|
| `api.js` | Comunicación con la API, caché de peticiones |
| `favorites.js` | Gestión del estado de favoritos, persistencia |
| `ui.js` | Renderizado, manipulación del DOM, modales |
| `app.js` | Eventos, estado global, coordinación entre módulos |

### Sistema de Caché

Implementación de un sistema de caché con `Map()` que almacena las respuestas de la API, evitando peticiones redundantes:

```javascript
class RickMortyAPI {
    constructor() {
        this.cache = new Map();
    }

    async fetchWithCache(url) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        
        const response = await fetch(url);
        const data = await response.json();
        this.cache.set(url, data);
        return data;
    }
}
```

### Patrón de Estado Global

La aplicación mantiene un estado centralizado en `app.js`:

```javascript
let currentPage = 1;
let currentFilters = { name: '', status: '', species: '' };
let currentView = 'characters';
let currentEpisodesPage = 1;
let totalPages = 1;
let totalEpisodesPages = 1;
```

---

## Funcionalidades Implementadas

### 1. Exploración de Personajes

- **Listado paginado**: Grid responsive con imagen, nombre, estado y especie
- **Búsqueda en tiempo real**: Filtra mientras el usuario escribe
- **Filtros combinados**: Estado (Vivo/Muerto/Desconocido) + Especie (Humano, Alienígena, Robot, etc.)
- **Persistencia de filtros**: Al cambiar de página, los filtros se mantienen

### 2. Detalle de Personaje (Modal)

Al hacer clic en cualquier personaje se abre un modal con:
- Imagen en alta resolución
- Nombre completo
- Estado, especie, tipo, género
- Origen y ubicación actual
- Lista de episodios donde aparece (limitada a 10 por rendimiento)

### 3. Exploración de Episodios

- **Listado paginado** de episodios
- **Búsqueda por nombre** del episodio
- Información mostrada: nombre, fecha de emisión, código (ej: S01E01)

### 4. Detalle de Episodio (Modal)

- Nombre y código del episodio
- Fecha de emisión
- Lista completa de personajes que aparecen
- **Navegación bidireccional**: Al hacer clic en un personaje, se abre su detalle

### 5. Sistema de Favoritos

- **Marcar/desmarcar** personajes desde la tarjeta o desde el modal
- **Persistencia automática** con LocalStorage
- **Contador dinámico** visible en el botón de favoritos
- **Vista independiente** que muestra solo los personajes marcados
- Los favoritos se mantienen al recargar la página

### 6. Manejo de Estados

- **Loading states**: Spinners animados mientras cargan datos
- **Error handling**: Mensajes contextuales que se auto-ocultan
- **Empty states**: Mensajes claros cuando no hay resultados

---

## Tecnologías Implementadas

### Frontend
- **HTML5**: Estructura semántica, modales, layout SPA
- **CSS3**: Variables CSS, Flexbox, Grid, animaciones, media queries
- **JavaScript (ES6+)**: Async/Await, fetch API, Promises, Map(), localStorage

### API Externa
- **Rick and Morty API**: Endpoints de `/character` y `/episode` con paginación integrada

### Librerías Externas
- **Font Awesome 6**: Iconografía
- **Google Fonts (Inter)**: Tipografía profesional

---

## Características Técnicas Destacadas

### Peticiones Concurrentes con Promise.all

Para mostrar episodios en el detalle de un personaje:

```javascript
const episodeUrls = character.episode || [];
const episodes = await Promise.all(
    episodeUrls.slice(0, 10).map(url => fetch(url).then(r => r.json()))
);
```

### Navegación Bidireccional

Desde el detalle de episodio se puede acceder al detalle del personaje:

```javascript
document.querySelectorAll('.character-link').forEach(el => {
    el.addEventListener('click', async () => {
        const charId = parseInt(el.dataset.id);
        const character = await api.getCharacterById(charId);
        // Renderizar detalle del personaje
    });
});
```

### Prevención de XSS con escapeHtml

```javascript
escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
```

### Gestión de Favoritos con LocalStorage

```javascript
class FavoritesManager {
    toggleFavorite(character) {
        if (this.isFavorite(character.id)) {
            this.removeFavorite(character.id);
        } else {
            this.addFavorite(character);
        }
        this.saveFavorites();
    }
    
    saveFavorites() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    }
}
```

---

## Responsive Design

<div class="md-table">

El proyecto implementa una estrategia mobile-first con breakpoints progresivos:

| Breakpoint | Pantalla | Grid personajes | Layout |
|------------|----------|-----------------|--------|
| Base | Móvil (<768px) | 1 columna | Navegación apilada |
| 768px+ | Tablet | 2-3 columnas | Header horizontal |
| 1024px+ | Desktop | 4 columnas | Filtros en paralelo |

</div>

### Ejemplo de media queries:

```css
/* Tablet */
@media (min-width: 768px) {
    .characters-grid {
        grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .filters-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-xl);
    }
}
```

---

## UX/UI Destacado

### Animaciones y Transiciones

- **Fade-in** al cambiar de vista
- **Hover effects** en tarjetas (elevación y cambio de borde)
- **Transiciones suaves** en botones y modales

### Feedback Visual

- Spinner animado durante cargas
- Mensajes de error con color rojo y auto-ocultamiento
- Botones de paginación deshabilitados visualmente en límites
- Corazón relleno/vacío para estado de favorito

### Accesibilidad

- Atributos `aria-label` en botones
- Estructura semántica con header, main, nav
- `loading="lazy"` en imágenes para rendimiento

---

## Aprendizajes Clave

Este proyecto ha permitido consolidar los siguientes conceptos fundamentales:

1. **Consumo de APIs REST**: Peticiones asíncronas con `fetch` y manejo de errores
2. **Gestión de estado**: Variables globales, sincronización entre módulos
3. **Patrón MVC ligero**: Separación clara entre datos, UI y lógica de control
4. **Persistencia local**: Uso de LocalStorage para guardar preferencias
5. **Optimización de rendimiento**: Sistema de caché, lazy loading, límite de episodios
6. **Eventos complejos**: Delegación de eventos, eventos personalizados (`CustomEvent`)
7. **Diseño responsive**: Mobile-first, CSS Grid, Flexbox, media queries

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/js-rick-and-morty-explorer/" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/js-rick-and-morty-explorer" target="_blank" class="flex items-center btn btn-primary"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

**Rick and Morty Explorer** es una aplicación completa que demuestra un dominio sólido de JavaScript en un contexto real:

1. **API REST**: Consumo correcto de endpoints paginados con async/await
2. **DOM avanzado**: Renderizado dinámico, modales, eventos delegados
3. **Persistencia**: Implementación robusta de LocalStorage
4. **UX**: Filtros combinados, búsqueda en tiempo real, feedback visual
5. **Arquitectura**: Código modular, mantenible y escalable
6. **Rendimiento**: Sistema de caché y optimización de peticiones

La aplicación cumple con todos los requisitos del enunciado y añade valor con características adicionales como el sistema de caché, la navegación bidireccional entre personajes y episodios, y una interfaz de usuario cuidada y responsive.
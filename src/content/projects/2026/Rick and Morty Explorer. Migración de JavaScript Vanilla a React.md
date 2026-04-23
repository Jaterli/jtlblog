---
title: "Rick and Morty Explorer: Migración de JavaScript Vanilla a React"
description: "Migración completa de una aplicación SPA que consume la API de Rick and Morty desde JavaScript puro a React, implementando custom hooks, Context API, sistema de caché con Axios, persistencia de favoritos y navegación bidireccional entre personajes y episodios."
pubDate: "2026-04-23"
heroImage: "/images/proyectos/projects.react-rickandmorty-explorer.webp"
tags: [React, JavaScript, Hooks, Context API, API REST, Axios, LocalStorage, CSS3, HTML5, Responsive]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Rick and Morty Explorer - Master Full Stack"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Aplicación web SPA desarrollada con React que consume la API de Rick and Morty. Incluye exploración de personajes y episodios, búsqueda en tiempo real, filtros combinados, sistema de favoritos con persistencia LocalStorage, vista detallada con modales y navegación bidireccional."
  "image": "https://jaterli.com/images/proyectos/projects.react-rickandmorty-explorer.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/rick-and-morty-explorer-migracion-de-javascript-a-react"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-04-23"
  "programmingLanguage": [
    "React 19",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3"
  ]
  "featureList": [
    "Migración completa de JavaScript Vanilla a React",
    "Custom hooks para lógica reusable (useCharacters, useEpisodes)",
    "Context API para estado global de favoritos",
    "Sistema de caché con Map() y Axios",
    "Búsqueda en tiempo real por nombre",
    "Filtros combinados por estado y especie",
    "Paginación en personajes y episodios",
    "Modal reutilizable con detalle completo",
    "Navegación bidireccional personaje-episodio",
    "Persistencia de favoritos con LocalStorage",
    "Diseño responsive mobile-first",
    "Loading states y manejo de errores"
  ]
---

## Visión General

**Rick and Morty Explorer** es una aplicación web de página única (SPA) desarrollada como parte del entregable del módulo de React del Máster en Desarrollo Web Full Stack. El proyecto representa la **migración completa** de una aplicación previamente implementada en JavaScript puro a React, demostrando el dominio de los conceptos fundamentales de esta biblioteca.

La aplicación consume la [API oficial de Rick and Morty](https://rickandmortyapi.com/) y permite explorar personajes y episodios de la serie, con funcionalidades completas de búsqueda, filtrado, paginación y un sistema de favoritos que persiste entre sesiones.

La migración a React ha permitido:

- **Mejor organización del código**: Separación clara por componentes y hooks
- **Estado reactivo**: Actualizaciones automáticas de la UI sin manipulación manual del DOM
- **Código más mantenible**: Lógica de negocio extraída a custom hooks
- **Mejor experiencia de desarrollo**: Componentes reutilizables y estructura predecible

---

## Estructura del Proyecto

```
react-rick-and-morty-explorer/
├── src/
│   ├── assets/                      # Imágenes estáticas
│   ├── components/
│   │   ├── CharacterCard/          # Tarjeta de personaje
│   │   ├── CharacterDetail/        # Modal detalle personaje
│   │   ├── CharacterFilters/       # Filtros de búsqueda
│   │   ├── EpisodeCard/            # Tarjeta de episodio
│   │   ├── EpisodeDetail/          # Modal detalle episodio
│   │   ├── ErrorMessage/           # Componente de error
│   │   ├── Footer/                 # Pie de página
│   │   ├── Header/                 # Cabecera con navegación
│   │   ├── LoadingSpinner/         # Spinner de carga
│   │   ├── Modal/                  # Modal reutilizable
│   │   └── Pagination/             # Control de paginación
│   ├── context/
│   │   ├── FavoritesContext.js     # Contexto y hook personalizado
│   │   └── FavoritesProvider.jsx   # Provider de favoritos
│   ├── hooks/
│   │   ├── useCharacters.js        # Custom hook para personajes
│   │   └── useEpisodes.js          # Custom hook para episodios
│   ├── services/
│   │   └── api.js                  # Cliente API con caché
│   ├── styles/
│   │   └── global.css              # Variables y estilos globales
│   ├── views/
│   │   ├── CharactersView.jsx      # Vista de personajes
│   │   ├── EpisodesView.jsx        # Vista de episodios
│   │   └── FavoritesView.jsx       # Vista de favoritos
│   ├── App.jsx                     # Componente principal
│   ├── App.css                     # Estilos específicos de vistas
│   └── main.jsx                    # Punto de entrada
├── index.html
└── package.json
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
- Botón de favoritos integrado

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

- **Loading states**: Spinner animado mientras cargan datos
- **Error handling**: Mensajes contextuales con botón de reintento
- **Empty states**: Mensajes claros cuando no hay resultados

---

## Arquitectura en React

### Custom Hooks Implementados

#### `useCharacters` - Gestión de personajes

```jsx
export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', status: '', species: '' });
  
  const loadCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCharacters(currentPage, filters);
      setCharacters(data.results || []);
      setTotalPages(data.info?.pages || 1);
    } catch (err) {
      setError('Error al cargar los personajes');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    loadCharacters();
  }, [currentPage, filters, loadCharacters]);

  return {
    characters, loading, error, currentPage, totalPages, filters,
    updateFilters: (newFilters) => { /* ... */ },
    goToPage: (page) => { /* ... */ },
    reload: () => { /* ... */ }
  };
};
```

#### `useEpisodes` - Gestión de episodios

```jsx
export const useEpisodes = (shouldLoad = true) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  // Similar a useCharacters pero para episodios
  
  return {
    episodes, loading, error, currentPage, totalPages, search,
    updateSearch, goToPage, reload
  };
};
```

### Context API para Favoritos

```jsx
// FavoritesProvider.jsx
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('rickmorty_favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('rickmorty_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((character) => {
    if (isFavorite(character.id)) {
      setFavorites(prev => prev.filter(fav => fav.id !== character.id));
    } else {
      setFavorites(prev => [...prev, {
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species
      }]);
    }
  }, [isFavorite]);

  // ... resto de métodos

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
```

### Sistema de Caché con Axios

```javascript
class RickMortyAPI {
  constructor() {
    this.cache = new Map();
  }

  async fetchWithCache(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);  // Retorna desde caché
    }
    
    const response = await axios.get(url);
    this.cache.set(url, response.data);
    return response.data;
  }

  async getCharacters(page = 1, filters = {}) {
    let url = `${API_BASE}/character?page=${page}`;
    if (filters.name) url += `&name=${encodeURIComponent(filters.name)}`;
    if (filters.status && filters.status !== '') url += `&status=${filters.status}`;
    if (filters.species && filters.species !== '') url += `&species=${filters.species}`;
    return this.fetchWithCache(url);
  }
}
```

### Modal Reutilizable

```jsx
export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>×</span>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
```

---

## Tecnologías Implementadas

### React Ecosystem
- **React 19**: Componentes funcionales y Hooks
- **React Router DOM 6**: No utilizado explícitamente (single view con estado), pero preparado para futuras extensiones
- **Hooks**: useState, useEffect, useCallback, useRef

### Frontend
- **HTML5**: Estructura semántica, modales, layout SPA
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones, media queries
- **JavaScript ES6+**: Arrow functions, destructuring, spread operator, template literals

### Networking
- **Axios**: Cliente HTTP con interceptor
- **Rick and Morty API**: API REST pública

### Persistencia
- **LocalStorage**: Almacenamiento persistente de favoritos

### Librerías Externas
- **Font Awesome 6**: Iconografía
- **Google Fonts (Inter)**: Tipografía profesional

---

## Características Técnicas Destacadas

### Navegación Bidireccional

Desde el detalle de episodio se puede acceder al detalle del personaje:

```jsx
// EpisodeDetail.jsx
<div className="character-link" onClick={() => onCharacterClick(char.id)}>
  <img src={char.image} alt={char.name} />
  <span>{char.name}</span>
</div>
```

### Peticiones Concurrentes con Promise.all

Para mostrar episodios en el detalle de un personaje:

```jsx
const episodeUrls = character.episode || [];
const episodesData = await Promise.all(
  episodeUrls.slice(0, 10).map(url => fetch(url).then(r => r.json()))
);
```

### Prevención de Re-renderizados Innecesarios

Uso de `useCallback` y `useRef` para evitar cargas duplicadas:

```jsx
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    loadCharacters();
  } else {
    loadCharacters();
  }
}, [currentPage, filters, loadCharacters]);
```

---

## Comparativa: JavaScript Vanilla vs React

<div class="md-table">


| Aspecto | JavaScript Vanilla | React |
|---------|-------------------|-------|
| **Manipulación del DOM** | Manual con `querySelector`, `innerHTML` | Declarativa con JSX y estado |
| **Gestión de estado** | Variables globales + eventos | useState + Context API |
| **Actualización de UI** | Re-renderizado manual | Automático al cambiar estado |
| **Efectos secundarios** | Event listeners manuales | useEffect con cleanup automático |
| **Persistencia** | Lectura/escritura directa | useEffect + lazy initialization |
| **Lógica reusable** | Funciones sueltas | Custom hooks |
| **Estado global** | Variables globales o Pub/Sub | Context API |
| **Caché de API** | Implementación manual | Clase con Map() + Axios |
| **Reutilización de UI** | Templates HTML + clone | Componentes con props |
| **Mantenibilidad** | Modular con imports/exports | Estructura por componentes |

</div>

---

## Aprendizajes Clave

Este proyecto ha permitido consolidar los siguientes conceptos fundamentales de React:

1. **Custom Hooks**: Extracción de lógica reusable (useCharacters, useEpisodes)
2. **Context API**: Estado global sin prop drilling para favoritos
3. **Optimización con useCallback**: Prevención de renders innecesarios
4. **Composición de componentes**: Modal reutilizable que acepta children
5. **Patrón container/presentational**: Separación de lógica y UI (hooks + vistas)
6. **Manejo de efectos secundarios**: useEffect con cleanup en modales
7. **Sistema de caché**: Map() para reducir peticiones a API
8. **Persistencia**: LocalStorage con lazy initialization
9. **Eventos sintéticos**: Manejo unificado en React
10. **Comunicación entre componentes**: Props drilling resuelto con Context

---

## Diseño Responsive

El proyecto implementa una estrategia mobile-first con breakpoints progresivos:

| Breakpoint | Pantalla | Grid personajes | Grid episodios |
|------------|----------|-----------------|----------------|
| Base | Móvil (<768px) | 1-2 columnas | 1 columna |
| 768px+ | Tablet | 2-3 columnas | 2 columnas |
| 1024px+ | Desktop | 4 columnas | 2-3 columnas |

### Ejemplo de media queries:

```css
/* Mobile base */
.characters-grid {
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: var(--spacing-lg);
}

/* Tablet */
@media (min-width: 768px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
    gap: var(--spacing-xl);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .characters-grid {
    grid-template-columns: repeat(auto-fill, minmax(13.75rem, 1fr));
  }
}
```

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/react-rick-and-morty-explorer" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/react-rick-and-morty-explorer" target="_blank" class="flex items-center btn btn-primary"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

**Rick and Morty Explorer** es una aplicación completa que demuestra un dominio sólido de React en un contexto real:

1. **Dominio de Hooks**: Uso apropiado de useState, useEffect, useCallback y useRef
2. **Context API**: Implementación correcta de estado global con FavoritesProvider
3. **Custom Hooks**: Extracción de lógica reusable (useCharacters, useEpisodes)
4. **Optimización**: useCallback para memoización, lazy initialization para LocalStorage
5. **Arquitectura**: Separación clara en componentes, hooks, servicios y vistas
6. **Rendimiento**: Sistema de caché con Map() para reducir peticiones a API
7. **Experiencia de usuario**: Loading states, error handling, diseño responsive
8. **Accesibilidad**: Atributos ARIA, navegación por teclado, contraste adecuado

La migración de JavaScript puro a React ha permitido apreciar las ventajas del modelo declarativo: menor código boilerplate, actualizaciones automáticas de la UI, mejor organización del código, lógica reusable con custom hooks y una experiencia de desarrollo más productiva. La aplicación cumple con todos los requisitos del enunciado y añade valor con características adicionales como el sistema de caché, la navegación bidireccional entre personajes y episodios, y una interfaz de usuario cuidada y responsive.
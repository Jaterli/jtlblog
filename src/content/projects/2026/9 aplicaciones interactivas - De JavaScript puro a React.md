---
title: "Migración de 9 aplicaciones interactivas de JavaScript a React"
description: "Migración completa de 9 aplicaciones interactivas de JavaScript puro a React, demostrando el uso de Hooks (useState, useEffect, useRef), React Router, LocalStorage y buenas prácticas de accesibilidad y diseño responsive."
pubDate: "2026-04-21"
heroImage: "/images/proyectos/projects.react-ejercicios-1.png"
tags: [React, JavaScript, Hooks, React Router, LocalStorage, CSS3, HTML5, Responsive, Accesibilidad]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "React aplicaciones interactivas - Master Full Stack"
  "applicationCategory": "EducationalApplication"
  "operatingSystem": "Web"
  "description": "Colección de 9 aplicaciones interactivas desarrolladas con React como parte del módulo de React del Máster en Desarrollo Web Full Stack. Incluye cambiador de color, contador de clics, lista dinámica, búsqueda en tiempo real, calculadora, temporizador, generador de contraseñas, contador de texto y lista de tareas con persistencia LocalStorage."
  "image": "https://jaterli.com/images/proyectos/projects.react-ejercicios-1.png"
  "url": "https://jaterli.com/proyectos/entry/2026/9-aplicaciones-interactivas---de-javascript-puro-a-react"
  "author": {
    "@type": "Person",
    "name": "Jaterli"
  }
  "datePublished": "2026-04-21"
  "programmingLanguage": [
    "React 18",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3"
  ]
  "featureList": [
    "9 componentes funcionales independientes",
    "Uso intensivo de useState, useEffect y useRef",
    "Navegación entre ejercicios con React Router",
    "Persistencia de datos con LocalStorage",
    "Generación criptográfica segura de contraseñas",
    "Búsqueda y filtrado en tiempo real",
    "Temporizador con intervalos controlados",
    "Validación de formularios y manejo de errores",
    "Diseño responsive mobile-first",
    "Atributos ARIA para accesibilidad",
    "Animaciones CSS y transiciones",
    "Código modular y reutilizable"
  ]
--- 

## Visión General

**Migración de aplicaciones interactivas de JavaScript a React** es un proyecto desarrollado como parte del entregable del módulo de React del Máster en Desarrollo Web Full Stack. El proyecto representa la **migración completa** de una colección de ejercicios previamente implementados en JavaScript puro a React, demostrando el dominio de los conceptos fundamentales de esta biblioteca.

Cada ejercicio es un componente funcional independiente que utiliza **Hooks de React** (`useState`, `useEffect`, `useRef`), gestiona su propio estado, y ofrece una interfaz de usuario interactiva y accesible. La aplicación incluye un sistema de navegación con **React Router** que permite acceder a cada ejercicio desde un índice central.

---

## Estructura del Proyecto

```
react-ejercicios/
├── src/
│   ├── components/
│   │   ├── Ejercicio1.jsx      # Cambiador de Color
│   │   ├── Ejercicio2.jsx      # Contador de Clics
│   │   ├── Ejercicio3.jsx      # Lista Dinámica
│   │   ├── Ejercicio4.jsx      # Búsqueda en Tiempo Real
│   │   ├── Ejercicio5.jsx      # Calculadora Sencilla
│   │   ├── Ejercicio6.jsx      # Temporizador
│   │   ├── Ejercicio7.jsx      # Generador de Contraseñas
│   │   ├── Ejercicio8.jsx      # Contador de Palabras
│   │   ├── Ejercicio9.jsx      # Lista de Tareas (LocalStorage)
│   │   └── Layout.jsx          # Layout común y navegación
│   ├── App.jsx                 # Router y configuración principal
│   ├── App.css                 # Estilos globales y responsive
│   └── main.jsx                # Punto de entrada
├── index.html
└── package.json
```

---

## Los 9 Ejercicios en Detalle

### Ejercicio 1: 🎨 Cambiador de Color

**Conceptos demostrados**: `useState`, `useEffect`, manipulación directa del DOM.

Componente que cambia el color de fondo de la página de forma aleatoria. Implementa:

- Generación de colores hexadecimales aleatorios
- Botón para cambiar color y botón para restablecer a blanco
- Uso de `useEffect` para asignar un ID al contenedor principal
- Manipulación de `document.body.style.backgroundColor`

```jsx
const cambiarColor = () => {
    const nuevoColor = getRandomColor();
    setColorActual(nuevoColor);
    document.body.style.backgroundColor = nuevoColor;
};
```

### Ejercicio 2: 🔢 Contador de Clics

**Conceptos demostrados**: `useState`, eventos, arrays y números aleatorios.

Contador que incrementa con cada clic y muestra mensajes motivadores aleatorios:

- Estado para el contador numérico
- Array predefinido de 12 mensajes motivadores
- Selección aleatoria de mensaje en cada clic
- Feedback visual en tiempo real

### Ejercicio 3: 📝 Lista Dinámica

**Conceptos demostrados**: `useState`, renderizado de listas, filtrado de arrays.

Lista interactiva que permite:

- Agregar elementos mediante input + botón o tecla Enter
- Eliminar elementos individuales con botón "X"
- Validación para evitar elementos vacíos
- Renderizado dinámico con `map()`

```jsx
const eliminarElemento = (index) => {
    setLista(lista.filter((_, i) => i !== index));
};
```

### Ejercicio 4: 🔍 Búsqueda en Tiempo Real

**Conceptos demostrados**: `useState`, filtrado dinámico, binding de inputs.

Filtro de búsqueda que actualiza la lista mientras el usuario escribe:

- Lista predefinida de frameworks y tecnologías web
- Campo de texto con binding a estado
- Filtrado case-insensitive con `toLowerCase()` e `includes()`
- Mensaje cuando no hay resultados

### Ejercicio 5: 🧮 Calculadora Sencilla

**Conceptos demostrados**: `useState`, validación de formularios, operaciones matemáticas.

Calculadora con operaciones básicas y validación completa:

- Dos campos numéricos con tipo `number`
- Botones para suma, resta, multiplicación y división
- Validación de números válidos (isNaN)
- Validación específica para división entre cero
- Mensajes de error contextuales

```jsx
const dividir = () => {
    const nums = obtenerNumeros();
    if (nums) {
        if (nums.n2 === 0) {
            setError('No se puede dividir por cero');
            setResultado(null);
        } else {
            setResultado(nums.n1 / nums.n2);
        }
    }
};
```

### Ejercicio 6: ⏱️ Temporizador

**Conceptos demostrados**: `useState`, `useEffect`, `useRef`, `setInterval`/`clearInterval`.

Temporizador completo con control de intervalos:

- Estado para horas, minutos y segundos
- Hook `useRef` para mantener la referencia del intervalo
- `useEffect` para limpiar intervalo al desmontar
- Botones: Iniciar, Pausar, Reiniciar
- Indicador visual del estado (En marcha/Pausado/Reiniciado)

```jsx
useEffect(() => {
    return () => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
}, []);
```

### Ejercicio 7: 🔐 Generador de Contraseñas Aleatorias

**Conceptos demostrados**: `useState`, criptografía segura, algoritmos de mezcla.

Generador de contraseñas robustas con:

- Longitud configurable (4-20 caracteres)
- Uso de `crypto.getRandomValues()` para aleatoriedad criptográfica
- Aseguramiento de al menos un carácter de cada tipo (mayúscula, minúscula, número, especial)
- Algoritmo Fisher-Yates para mezclar caracteres
- Validación de rango de longitud

```javascript
const getRandomInt = (max) => {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    return randomArray[0] % max;
};
```

### Ejercicio 8: 📊 Contador de Palabras y Caracteres

**Conceptos demostrados**: `useState`, expresiones regulares, computación derivada.

Analizador de texto en tiempo real:

- Área de texto multilínea
- Conteo de caracteres (excluyendo espacios y saltos de línea)
- Conteo de palabras usando `split(/\s+/)`
- Botón para limpiar el texto
- Actualización instantánea en cada cambio

### Ejercicio 9: ✅ Lista de Tareas con LocalStorage

**Conceptos demostrados**: `useState`, `useEffect`, LocalStorage, CRUD completo.

Aplicación de tareas completa con persistencia:

- Carga inicial desde LocalStorage con lazy initialization
- Persistencia automática en cada cambio mediante `useEffect`
- Agregar tareas con texto
- Marcar/desmarcar como completadas
- Eliminar tareas individuales
- Limpiar todas las tareas completadas
- Estado vacío con mensaje amigable

```jsx
const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
});

useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}, [tareas]);
```

---

## Tecnologías Implementadas

### React Ecosystem
- **React 18**: Componentes funcionales y Hooks
- **React Router DOM 6**: Navegación SPA entre ejercicios
- **Hooks**: useState, useEffect, useRef

### Frontend
- **HTML5**: Estructura semántica, atributos ARIA
- **CSS3**: Variables CSS, Grid, Flexbox, media queries, animaciones
- **JavaScript ES6+**: Arrow functions, destructuring, spread operator, template literals

### Persistencia
- **LocalStorage**: Almacenamiento persistente de tareas

### Seguridad
- **Web Crypto API**: `crypto.getRandomValues()` para generación segura de contraseñas

---

## Características Técnicas Destacadas

### Navegación con React Router

Implementación de rutas dinámicas con Layout compartido:

```jsx
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ejercicio/1" element={<Ejercicio1 />} />
          {/* ... */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

### Lazy Initialization de useState

Para cargar tareas guardadas sin ejecutar en cada render:

```jsx
const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
});
```

### Limpieza de Efectos Secundarios

Prevención de memory leaks en el temporizador:

```jsx
useEffect(() => {
    return () => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
}, []);
```

### Persistencia Automática

Cada cambio en las tareas se guarda automáticamente:

```jsx
useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}, [tareas]);
```

### Accesibilidad (ARIA)

Implementación de atributos de accesibilidad en todos los componentes:

```jsx
<button 
    className="btn" 
    aria-label="Generar color aleatorio" 
    onClick={cambiarColor}>
    Cambiar Color
</button>

<div 
    className="resultado" 
    aria-live="polite" 
    aria-label="Color actual del fondo">
    {colorActual}
</div>
```

### Diseño Responsive

CSS Mobile-first con breakpoints progresivos:

```css
/* Mobile base */
.grid-4 {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
}

/* Tablet (480px+) */
@media (min-width: 480px) {
    .grid-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop (768px+) */
@media (min-width: 768px) {
    .grid-4 {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## Comparativa: JavaScript vs React

<div class="md-table">

| Aspecto | JavaScript Vanilla | React |
|---------|-------------------|-------|
| **Manipulación del DOM** | Manual con `querySelector`, `innerHTML` | Declarativa con JSX y estado |
| **Gestión de estado** | Variables globales + eventos | useState con actualización controlada |
| **Actualización de UI** | Re-renderizado manual | Automático al cambiar estado |
| **Efectos secundarios** | Event listeners manuales | useEffect con cleanup automático |
| **Persistencia** | Lectura/escritura directa | useEffect + lazy initialization |
| **Navegación** | Multi-page o SPA manual | React Router declarativo |
| **Reutilización** | Funciones y clases | Componentes con props |
| **Mantenibilidad** | Modular con imports/exports | Estructura por componentes |

</div>

---  

## Aprendizajes Clave

Este proyecto ha permitido consolidar los siguientes conceptos fundamentales de React:

1. **Componentes funcionales**: Creación de componentes reutilizables y autónomos
2. **useState**: Gestión de estado local y actualizaciones que disparan re-renderizados
3. **useEffect**: Manejo de efectos secundarios, suscripciones y limpieza
4. **useRef**: Referencias mutables sin causar re-renderizados (ideal para intervalos)
5. **React Router**: Navegación declarativa entre vistas de la SPA
6. **LocalStorage en React**: Persistencia combinada con useEffect y lazy initialization
7. **Eventos sintéticos**: Manejo unificado de eventos en React
8. **Renderizado condicional**: Operadores ternarios y cortocircuitos lógicos
9. **Renderizado de listas**: Uso de `map()` con keys únicas
10. **Accesibilidad**: Atributos ARIA integrados en componentes
11. **CSS Modules vs CSS global**: Organización de estilos en proyecto React

---

## Enlaces

<div class="btn-group">
  <a href="https://jaterli.github.io/react-entrega-ejercicios-1" target="_blank" class="flex items-center btn btn-neutral"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-web"></use> </svg>
    <span>Ver Proyecto en Vivo</span>
  </a>
  <a href="https://github.com/Jaterli/react-entrega-ejercicios-1" target="_blank" class="flex items-center btn btn-primary"> 
    <svg class="w-5 h-5" fill="currentColor"> <use href="/assets/icons.svg#icon-github"></use> </svg>
    <span>Código en GitHub</span>
  </a>
</div>

---

## Conclusión

Este proyecto demuestra un dominio sólido de React y su ecosistema:

1. **Dominio de Hooks**: Uso apropiado de useState, useEffect y useRef en diferentes contextos
2. **Arquitectura de componentes**: Organización clara, responsabilidad única y reutilización
3. **Gestión de estado**: Desde estado local simple hasta persistencia con LocalStorage
4. **Efectos secundarios**: Control preciso de intervalos, manipulación controlada del DOM y persistencia
5. **Navegación**: Implementación completa de React Router con layout compartido
6. **Experiencia de usuario**: Diseño responsive, feedback visual, manejo de errores
7. **Accesibilidad**: Atributos ARIA en todos los componentes interactivos

La migración de JavaScript puro a React ha permitido apreciar las ventajas del modelo declarativo: menor código boilerplate, actualizaciones automáticas de la UI, mejor organización del código y una experiencia de desarrollo más productiva. Cada ejercicio resuelve un problema específico de forma elegante, demostrando cómo React facilita la creación de interfaces interactivas complejas.

---
title: "Integración de Gráfica Desarrollada en Python Usando la Librería Streamlit."
description: "Este texto describe un proyecto personal que consiste en integrar una gráfica interactiva en un blog."
pubDate: "2024-08-29"
heroImage: "/assets/images/proyectos/projects.streamlit.webp"
badge: "Pendiente"
codes: ["Astro", "Python", "Streamlit"]
---

## Introducción ##

Este proyecto personal tiene como objetivo incorporar una gráfica interactiva en mi blog, programada en Python utilizando la librería Streamlit. Con ello, pretendo darle un toque más dinámico y visualmente atractivo a la página principal, mostrando las interacciones que realizo en mi blog diariamente.

La gráfica será inicialmente un gráfico de barras, donde el eje X representará el tiempo en días y el eje Y mostrará el número de interacciones, como la creación, actualización o eliminación de texto, código o archivos.

Este proyecto forma parte de mi proceso de aprendizaje de Streamlit, una potente librería para Python que permite crear aplicaciones web interactivas y visualizaciones de datos en tiempo real. Actualmente, estoy estudiando esta tecnología como parte del Máster en Desarrollo Full Stack, y mi intención es implementarla en un futuro cercano, aprovechando su capacidad para generar gráficos a partir de datos estadísticos y mejorar la experiencia de usuario en mi blog.


## Resolución ##

### Paso 1: Script que guarda en un archivo JSON los datos para la estadística ###

El siguiente script en formato ES Module (`countPostsByMonth.mjs`) cuenta el número de archivos .md y .mdx creados por mes en los directorios `/content/blog`, y `/content/projectos`, y guarda los resultados en un archivo `postsByMonth.json`. Este script organiza el conteo de posts por mes para cada directorio por separado.

```javascript
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Directorios donde se encuentran los archivos Markdown
const baseDir = "src/content";
const dirs = ['blog', 'proyectos']; // se pueden añadir más

// Directorio donde se guardará el archivo con los datos
const saveDir = "public/data";

// Objeto para almacenar el conteo de publicaciones por mes, separado por directorio
const postsByMonth = {};

// Inicializa el objeto postsByMonth con claves para cada directorio
dirs.forEach(dir => {
  postsByMonth[dir] = {};
});

// Función para procesar los archivos en un directorio dado
function processPosts(directory) {
  const dirPath = join(baseDir, directory);
  const files = readdirSync(dirPath);

  files.forEach(file => {
    // Verifica si el archivo tiene extensión .md o .mdx
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      try {
        const filePath = join(dirPath, file);
        const fileContents = readFileSync(filePath, 'utf8');

        // Extrae el frontmatter con gray-matter
        const { data } = matter(fileContents);

        // Verifica si tiene la variable pubDate
        if (data.pubDate) {
          const pubDate = new Date(data.pubDate);
          const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;

          // Incrementa el contador para ese mes en el directorio correspondiente
          postsByMonth[directory][yearMonth] = (postsByMonth[directory][yearMonth] || 0) + 1;
        }
      } catch (error) {
        console.error(`Error procesando el archivo ${file} en ${directory}:`, error);
      }
    }
  });
}

// Procesa los archivos en todos los directorios
dirs.forEach(dir => processPosts(dir));

// Define la ruta del archivo donde se almacenan los datos
const outputPath = join(saveDir, 'postsByMonth.json');

// Convierte el objeto en JSON y escribe el archivo
writeFileSync(outputPath, JSON.stringify(postsByMonth, null, 2), 'utf8');

console.log('Conteo de publicaciones por mes:', postsByMonth);
console.log(`Archivo guardado en: ${outputPath}`);
```

### Explicación:

1. **Directorios y Objeto de Conteo**:
   - Se definen los directorios (`blog`, `proyectos`) en los que se buscarán los archivos Markdown.
   - `postsByMonth` se inicializa para contener un objeto separado para cada directorio.

2. **Función `processPosts`**:
   - Esta función toma un directorio, lee los archivos Markdown y cuenta el número de posts por mes utilizando la fecha `pubDate`.

3. **Procesamiento de Archivos**:
   - El script procesa cada directorio utilizando la función `processPosts` y acumula el conteo en `postsByMonth`.

4. **Guardar en JSON**:
   - Finalmente, se guarda el objeto `postsByMonth` en un archivo JSON `postsByMonth.json` en el directorio `public/data`.

5. **Errores y Consola**:
   - Se incluye manejo de errores para cada archivo, y el resultado final se imprime en la consola junto con la ruta del archivo generado.

Este script permite llevar un registro organizado del número de posts por mes en diferentes secciones del contenido de mi proyecto, y es útil para análisis y visualización de datos.


### Paso 2: Conectar el archivo JSON con Streamlit ###


Hay que empezar por crear el Entorno: ....
pip install streamlit fastapi matplotlib 
luego lo guardemos en github y conectaremos con Streamlit a través de una api...

### Paso 3: Crear la app.py que genera el gráfico ###

Explicación...

### Paso 4: GitHub Action ###

Subirlo a GitHub y crear un GitHub Action que ejecute el código una vez al día y guarde el gráfico en un archivo png

Crear una GitHub Action:
1. Menú -> Actions -> set up a workflow yourselft

### Paso 5: Lincar archivo en la página de Astro ###




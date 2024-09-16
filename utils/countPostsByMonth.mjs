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

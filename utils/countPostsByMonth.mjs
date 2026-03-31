import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { existsSync, mkdirSync } from 'fs';

const baseDir = "src/content";
const dirs = ['blog', 'projects'];
const saveDir = "public/data";

// Calcular la fecha límite (hace 2 años)
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

// Inicializa el objeto de conteo
const postsByMonth = {};
dirs.forEach(dir => {
  postsByMonth[dir] = {};
});

// Función recursiva para obtener todos los archivos .md y .mdx en un directorio
function getAllMarkdownFiles(dirPath, baseDirPath = '') {
  const files = [];
  const entries = readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const relativePath = baseDirPath ? join(baseDirPath, entry.name) : entry.name;
    
    if (entry.isDirectory()) {
      // Recursivamente procesar subdirectorios
      const subFiles = getAllMarkdownFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push({
        path: fullPath,
        relativePath: relativePath,
        name: entry.name
      });
    }
  }
  
  return files;
}

// Función para procesar un directorio recursivamente
function processDirectoryRecursively(directory, category) {
  const dirPath = join(baseDir, directory);
  
  // Verificar que el directorio existe
  if (!existsSync(dirPath)) {
    console.warn(`Directorio no encontrado: ${dirPath}`);
    return;
  }
  
  // Obtener todos los archivos markdown recursivamente
  const markdownFiles = getAllMarkdownFiles(dirPath);
  
  let processedCount = 0;
  let skippedCount = 0;
  
  markdownFiles.forEach(file => {
    try {
      const fileContents = readFileSync(file.path, 'utf8');
      const { data } = matter(fileContents);
      
      if (data.pubDate) {
        const pubDate = new Date(data.pubDate);
        
        // Validar que la fecha es válida
        if (isNaN(pubDate.getTime())) {
          console.warn(`Fecha inválida en ${file.relativePath}: ${data.pubDate}`);
          return;
        }
        
        // Filtrar solo archivos de los últimos 2 años
        if (pubDate >= twoYearsAgo) {
          const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;
          postsByMonth[category][yearMonth] = (postsByMonth[category][yearMonth] || 0) + 1;
          processedCount++;
        } else {
          skippedCount++;
          console.log(`Archivo omitido (más de 2 años): ${file.relativePath} (${data.pubDate})`);
        }
      } else {
        console.warn(`Archivo sin pubDate: ${file.relativePath}`);
      }
    } catch (error) {
      console.error(`Error procesando archivo ${file.relativePath}:`, error.message);
    }
  });
  
  console.log(`Procesados ${processedCount} archivos en ${category} (${skippedCount} omitidos por antigüedad)`);
}

// Ejecuta el procesamiento para cada directorio
dirs.forEach(dir => {
  console.log(`\nProcesando directorio: ${dir}`);
  processDirectoryRecursively(dir, dir);
});

// Crear directorio de salida si no existe
if (!existsSync(saveDir)) {
  mkdirSync(saveDir, { recursive: true });
}

// Guardar el archivo
const outputPath = join(saveDir, 'postsByMonth.json');
writeFileSync(outputPath, JSON.stringify(postsByMonth, null, 2), 'utf8');

console.log('\n=== Resumen ===');
console.log('Conteo de publicaciones por mes:', postsByMonth);
console.log(`Archivo guardado en: ${outputPath}`);
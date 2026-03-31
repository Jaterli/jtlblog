import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { existsSync, mkdirSync } from 'fs';

const baseDir = "src/content";
const dirs = ['projects']; // 'blog' lo tratamos aparte por su estructura especial
const saveDir = "public/data";

// Calcular fecha límite (últimos 2 años)
const currentDate = new Date();
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

// Inicializa el objeto de conteo
const postsByMonth = {};
dirs.forEach(dir => {
  postsByMonth[dir] = {};
});
postsByMonth['blog'] = {};

// Función para verificar si una fecha está dentro de los últimos 2 años
function isWithinLastTwoYears(year, month) {
  const postDate = new Date(year, month - 1, 1); // mes -1 porque en JS los meses van 0-11
  return postDate >= twoYearsAgo;
}

// Función para procesar directorios normales como 'projects'
function processFlatDirectory(directory) {
  const dirPath = join(baseDir, directory);
  const files = readdirSync(dirPath);

  files.forEach(file => {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      try {
        const filePath = join(dirPath, file);
        const fileContents = readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        if (data.pubDate) {
          const pubDate = new Date(data.pubDate);
          
          // Filtrar solo archivos de los últimos 2 años
          if (pubDate >= twoYearsAgo) {
            const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;
            postsByMonth[directory][yearMonth] = (postsByMonth[directory][yearMonth] || 0) + 1;
          }
        }
      } catch (error) {
        console.error(`Error procesando archivo ${file} en ${directory}:`, error);
      }
    }
  });
}

// Función especial para procesar 'blog' con estructura /YYYY/MM/
function processBlogDirectory() {
  const blogDir = join(baseDir, 'blog');
  
  // Verificar si el directorio blog existe
  if (!existsSync(blogDir)) {
    console.warn(`Directorio blog no encontrado: ${blogDir}`);
    return;
  }
  
  // Leer años disponibles
  const years = readdirSync(blogDir).filter(name => {
    const fullPath = join(blogDir, name);
    return statSync(fullPath).isDirectory() && /^\d{4}$/.test(name); // Validar formato YYYY
  });
  
  years.forEach(year => {
    const yearPath = join(blogDir, year);
    const yearInt = parseInt(year);
    
    // Leer meses disponibles dentro del año
    const months = readdirSync(yearPath).filter(name => {
      const fullPath = join(yearPath, name);
      return statSync(fullPath).isDirectory() && /^\d{2}$/.test(name); // Validar formato MM
    });
    
    months.forEach(month => {
      const monthInt = parseInt(month);
      
      // Verificar si está dentro de los últimos 2 años
      if (isWithinLastTwoYears(yearInt, monthInt)) {
        const monthPath = join(yearPath, month);
        const yearMonth = `${year}-${month}`;
        
        // Leer archivos dentro del mes
        const files = readdirSync(monthPath);
        
        files.forEach(file => {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            try {
              const filePath = join(monthPath, file);
              const fileContents = readFileSync(filePath, 'utf8');
              const { data } = matter(fileContents);
              
              if (data.pubDate) {
                postsByMonth['blog'][yearMonth] = (postsByMonth['blog'][yearMonth] || 0) + 1;
              }
            } catch (error) {
              console.error(`Error procesando archivo ${file} en blog/${year}/${month}:`, error);
            }
          }
        });
      }
    });
  });
}

processBlogDirectory();

// Ejecuta el procesamiento para los directorios planos
dirs.forEach(dir => processFlatDirectory(dir));

const outputPath = join(saveDir, 'postsByMonth.json');

if (!existsSync(saveDir)) {
  mkdirSync(saveDir, { recursive: true });
}

writeFileSync(outputPath, JSON.stringify(postsByMonth, null, 2), 'utf8');

console.log('Conteo de publicaciones por mes (últimos 2 años):', postsByMonth);
console.log(`Archivo guardado en: ${outputPath}`);
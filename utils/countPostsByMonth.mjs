import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { existsSync, mkdirSync } from 'fs';

const baseDir = "src/content";
const dirs = ['projects']; // 'blog' lo tratamos aparte por su estructura especial
const saveDir = "public/data";

// Inicializa el objeto de conteo
const postsByMonth = {};
dirs.forEach(dir => {
  postsByMonth[dir] = {};
});
postsByMonth['blog'] = {};

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
          const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;
          postsByMonth[directory][yearMonth] = (postsByMonth[directory][yearMonth] || 0) + 1;
        }
      } catch (error) {
        console.error(`Error procesando archivo ${file} en ${directory}:`, error);
      }
    }
  });
}

// Función especial para procesar 'blog' con subdirectorios por mes
function processBlogDirectory() {
  const blogDir = join(baseDir, 'blog');
  const subDirs = readdirSync(blogDir).filter(name => {
    const fullPath = join(blogDir, name);
    return statSync(fullPath).isDirectory();
  });

  subDirs.forEach(subDir => {
    const yearMonthRaw = subDir;
    if (!/^\d{6}$/.test(yearMonthRaw)) {
      console.warn(`Subdirectorio ignorado (formato incorrecto): ${subDir}`);
      return;
    }

    const yearMonth = `${yearMonthRaw.slice(0, 4)}-${yearMonthRaw.slice(4)}`;
    const fullSubDirPath = join(blogDir, subDir);
    const files = readdirSync(fullSubDirPath);

    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        try {
          const filePath = join(fullSubDirPath, file);
          const fileContents = readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);

          if (data.pubDate) {
            postsByMonth['blog'][yearMonth] = (postsByMonth['blog'][yearMonth] || 0) + 1;
          }
        } catch (error) {
          console.error(`Error procesando archivo ${file} en blog/${subDir}:`, error);
        }
      }
    });
  });
}

// Ejecuta el procesamiento
dirs.forEach(dir => processFlatDirectory(dir));
processBlogDirectory();

const outputPath = join(saveDir, 'postsByMonth.json');

if (!existsSync(saveDir)) {
  mkdirSync(saveDir, { recursive: true });
}

writeFileSync(outputPath, JSON.stringify(postsByMonth, null, 2), 'utf8');

console.log('Conteo de publicaciones por mes:', postsByMonth);
console.log(`Archivo guardado en: ${outputPath}`);

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { existsSync, mkdirSync } from 'fs';

const baseDir = "src/content";
const dirs = ['blog', 'projects'];
const saveDir = "public/data";

const postsByMonth = {};

// Inicializa el objeto postsByMonth con claves para cada directorio
dirs.forEach(dir => {
  postsByMonth[dir] = {};
});

function processPosts(directory) {
  const dirPath = join(baseDir, directory);

  // Si es 'blog', procesamos subdirectorios por año/mes
  if (directory === 'blog') {
    const years = readdirSync(dirPath).filter(name =>
      statSync(join(dirPath, name)).isDirectory()
    );

    years.forEach(year => {
      const yearPath = join(dirPath, year);
      const months = readdirSync(yearPath).filter(name =>
        statSync(join(yearPath, name)).isDirectory()
      );

      months.forEach(month => {
        const monthPath = join(yearPath, month);
        const files = readdirSync(monthPath);

        files.forEach(file => {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            try {
              const filePath = join(monthPath, file);
              const fileContents = readFileSync(filePath, 'utf8');
              const { data } = matter(fileContents);

              if (data.pubDate) {
                const pubDate = new Date(data.pubDate);
                const yearMonth = `${pubDate.getFullYear()}-${String(pubDate.getMonth() + 1).padStart(2, '0')}`;

                postsByMonth[directory][yearMonth] = (postsByMonth[directory][yearMonth] || 0) + 1;
              }
            } catch (error) {
              console.error(`Error procesando el archivo ${file} en ${directory}/${year}/${month}:`, error);
            }
          }
        });
      });
    });
  } else {
    // Estructura plana para otros directorios
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
          console.error(`Error procesando el archivo ${file} en ${directory}:`, error);
        }
      }
    });
  }
}

dirs.forEach(dir => processPosts(dir));

const outputPath = join(saveDir, 'postsByMonth.json');

if (!existsSync(saveDir)) {
  mkdirSync(saveDir, { recursive: true });
}

writeFileSync(outputPath, JSON.stringify(postsByMonth, null, 2), 'utf8');

console.log('Conteo de publicaciones por mes:', postsByMonth);
console.log(`Archivo guardado en: ${outputPath}`);

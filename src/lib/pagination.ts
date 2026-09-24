/**
 * Genera la URL de una página dada su número y la ruta base.
 */
export function pageUrl(n: number, basePath: string): string {
  return n === 1 ? basePath : `${basePath}/${n}`;
}

/**
 * Devuelve un array con un máximo de 3 números de página centrados en la página actual.
 */
export function getPageNumbers(current: number, last: number): number[] {
  if (last <= 3) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  let start = current - 1;
  let end = current + 1;

  if (start < 1) {
    start = 1;
    end = 3;
  } else if (end > last) {
    end = last;
    start = last - 2;
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
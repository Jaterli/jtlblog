export default function generateSlug(url: string) {
  if (!url) return '';
  return url
    .trim()                   // Eliminar espacios al inicio/final
    .toLowerCase()            // Convertir a minúsculas
    .normalize("NFD")         // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Eliminar tildes y diacríticos
    .replace(/\s+/g, '-')     // Reemplazar espacios con guiones
    .replace(/[^\w-]/g, '')   // Eliminar caracteres no alfanuméricos
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/final
}
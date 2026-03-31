import generateUrlSlug from "./generateUrlSlug";

export function getProjectUrl(file:string): string {
  const [year, originalSlug] = file.split("/");
  const finalSlug = generateUrlSlug(originalSlug);
  return `/proyectos/entry/${year}/${finalSlug}`;
}

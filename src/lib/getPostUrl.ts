import generateUrlSlug from "./generateUrlSlug";

export function getPostUrl(file:string): string {
  const [dateFolder, originalSlug] = file.split("/");
  const finalSlug = generateUrlSlug(originalSlug); // opcional, si quieres "slugificar"
  return `/blog/posts/${dateFolder}/${finalSlug}`;
}

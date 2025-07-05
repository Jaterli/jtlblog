import generateSlug from "./generateUrlSlug";

export function getPostUrl(file:string): string {
  const [dateFolder, originalSlug] = file.split("/");
  const finalSlug = generateSlug(originalSlug); // opcional, si quieres "slugificar"
  return `/blog/posts/${dateFolder}/${finalSlug}`;
}

import generateUrlSlug from "./generateUrlSlug";

export function getPostUrl(file:string): string {
  const [year, month, originalSlug] = file.split("/");
  const finalSlug = generateUrlSlug(originalSlug);
  return `/blog/posts/${year}/${month}/${finalSlug}`;
}

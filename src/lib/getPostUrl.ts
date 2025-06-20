import type { CollectionEntry } from "astro:content";
import createSlug from "./createSlug";

export function getPostUrl(entry: CollectionEntry<"blog">): string {
  const [dateFolder, originalSlug] = entry.slug.split("/");
  const finalSlug = createSlug(entry.data.title, originalSlug); // opcional, si quieres "slugificar"
  return `/blog/posts/${dateFolder}/${finalSlug}`;
}


export function getProjectUrl(entry: CollectionEntry<"project">): string {
  const finalSlug = createSlug(entry.data.title, entry.slug);
  return `/proyectos/entry/${finalSlug}`;
}

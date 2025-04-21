import type { CollectionEntry } from "astro:content";
import createSlug from "./createSlug";

export default function getPostUrl(entry: CollectionEntry<"blog">): string {
  const [dateFolder, originalSlug] = entry.slug.split("/");
  const finalSlug = createSlug(entry.data.title, originalSlug); // opcional, si quieres "slugificar"
  return `/blog/posts/${dateFolder}/${finalSlug}`;
}

import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const jobCollection = defineCollection({
  loader: glob({ base: "./src/content/jobs", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    pubDate: z.coerce.date(),
    badge: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    badge: z.string().optional(),
    heroImage: z.string().optional(),
    jsonLd: z.record(z.string(), z.unknown()).optional(),
    tags: z.array(z.string())
      .refine(items => new Set(items).size === items.length, {
        message: "tags must be unique",
      })
      .optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    jsonLd: z.record(z.string(), z.unknown()).optional(),
    badge: z.string().optional(),
    tags: z.array(z.string())
      .refine(items => new Set(items).size === items.length, {
        message: "tags must be unique",
      })
      .optional(),
  }),
});

export const collections = {
  jobs: jobCollection,
  projects: projectCollection,
  blog: blogCollection,
};
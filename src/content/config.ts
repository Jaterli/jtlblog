import { z, defineCollection } from "astro:content";
const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
    message: 'tags must be unique',
    }).optional(),
});

const jobSchema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    badge: z.string().optional(),
    heroImage: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type JobSchema = z.infer<typeof jobSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const jobCollection = defineCollection({ schema: jobSchema });

export const collections = {
    'blog': blogCollection,
    'job': jobCollection
}
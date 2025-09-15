import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    github: z.string().optional(),
    demo: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  'projects': projectsCollection,
};
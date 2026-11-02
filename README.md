import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The editor can save empty fields as "" or null. These helpers accept that.
const text = z
  .union([z.string(), z.number()])
  .nullish()
  .transform((v) => (v == null ? '' : String(v)));
const flag = z.boolean().nullish().transform((v) => v ?? false);
const optDate = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.date().optional(),
);
const score = z.coerce.number().min(0).max(10);

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    pillar: z.enum(['eat', 'sip', 'travel', 'pray', 'play', 'stay']),
    area: z.string(),
    badge: text,
    price: text,
    verdict: text,
    address: text,
    station: text,
    timings: text,
    bestFor: text,
    score1: score,
    score2: score,
    score3: score,
    image: text,
    imageAlt: text,
    published: z.coerce.date(),
    updated: optDate,
    sample: flag,
    draft: flag,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: text,
    category: z.string().nullish().transform((v) => v || 'Story'),
    image: text,
    published: z.coerce.date(),
    updated: optDate,
    featured: flag,
    sample: flag,
    draft: flag,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: text,
    noAds: flag,
  }),
});

export const collections = { reviews, posts, pages };

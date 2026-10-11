import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Accepts `2025`, `2025-03` or a full date (YAML turns `2025-03-01` into a
// Date). Normalised to "YYYY" or "YYYY-MM".
const monthOrYear = z
  .union([z.number().int(), z.string(), z.date()])
  .transform((v, ctx) => {
    if (v instanceof Date) return v.toISOString().slice(0, 7);
    const s = String(v).trim();
    const m = /^(\d{4})(?:-(\d{2}))?(?:-\d{2})?$/.exec(s);
    if (!m || (m[2] && (+m[2] < 1 || +m[2] > 12))) {
      ctx.addIssue({ code: 'custom', message: `Expected a date like 2025 or 2025-03, got "${s}"` });
      return z.NEVER;
    }
    return m[2] ? `${m[1]}-${m[2]}` : m[1];
  });

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: monthOrYear,
        link: z.url(),
        pinned: z.boolean().default(false), // shown first, with a thumbnail
        image: image().optional(),
        imageAlt: z.string().optional(),
        imagePosition: z.string().default('center'), // crop anchor, e.g. "left" or "top"
        note: z.string().optional(),
        draft: z.boolean().default(false),
      })
      .refine((p) => !p.image || p.imageAlt, {
        message: '`imageAlt` is required when `image` is set',
        path: ['imageAlt'],
      }),
});

const publications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    month: z.number().int().min(1).max(12).optional(), // optional, for ordering and CV dates
    type: z.enum(['paper', 'preprint', 'poster', 'talk']),
    links: z
      .object({
        abstract: z.string().optional(),
        pdf: z.string().optional(),
        code: z.url().optional(),
        arxiv: z.url().optional(),
        poster: z.string().optional(),
        slides: z.string().optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

const cvEntry = z.object({
  title: z.string(),
  org: z.string(),
  start: monthOrYear,
  end: monthOrYear.nullish(), // empty = Present
  bullets: z.array(z.string()).optional(),
  order: z.number().default(0),
  draft: z.boolean().default(false),
});

const cv = (section: string) =>
  defineCollection({
    loader: glob({ pattern: '*.{yaml,yml}', base: `./src/content/cv/${section}` }),
    schema: cvEntry,
  });

export const collections = {
  projects,
  publications,
  education: cv('education'),
  experience: cv('experience'),
  scholarships: cv('scholarships'),
};

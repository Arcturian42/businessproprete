import { z } from 'zod';

/**
 * Frontmatter schema for editorial MDX files.
 * Used by /guides/[slug] and /reglementation/[slug].
 */
export const guideFrontmatterSchema = z.object({
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(320),
  /** Slug — must match the filename for routing safety. */
  slug: z.string().min(1).max(120),
  /** First-50-words BLUF, surfaced visually and in metadata. */
  bluf: z.string().min(1).max(600),
  category: z.string().min(1).max(40),
  tags: z.array(z.string().max(40)).max(12).optional(),
  author: z.string().min(1).max(80),
  /** ISO date (YYYY-MM-DD). */
  datePublished: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'datePublished doit être au format YYYY-MM-DD'),
  /** ISO date (YYYY-MM-DD). */
  dateModified: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  /** Allow content to ship without being indexed. */
  draft: z.boolean().optional(),
  /** Override the auto-computed reading time (in minutes). */
  readingTime: z.number().int().positive().optional(),
  /** Optional cover/OG image path. */
  ogImage: z.string().optional(),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;

import fs from 'node:fs/promises';
import path from 'node:path';

import {
  guideFrontmatterSchema,
  type GuideFrontmatter,
} from './frontmatter';
import { estimateReadingTime } from './reading-time';
import { extractToc, type TocEntry } from './toc';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export type GuideRecord = {
  /** Frontmatter parsed + validated. */
  meta: GuideFrontmatter;
  /** Raw MDX source — to be compiled with next-mdx-remote/rsc. */
  source: string;
  /** Pre-extracted TOC for the sticky sidebar. */
  toc: TocEntry[];
  /** Auto-computed reading time (overridden by meta.readingTime if set). */
  readingTimeMin: number;
  /** Directory the file belongs to ("guides", "reglementation", ...). */
  collection: string;
  /** Relative path (collection + slug) without extension. */
  path: string;
};

/** List every .mdx file in a content collection. */
export async function listCollectionSlugs(collection: string): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, collection);
  let entries: string[] = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Load a single MDX file by collection + slug.
 * Returns null when not found, throws on validation error so the
 * editorial author sees the issue at build time.
 */
export async function loadGuide(
  collection: string,
  slug: string,
): Promise<GuideRecord | null> {
  const file = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(file, 'utf8');
  } catch {
    return null;
  }

  const { frontmatter, body } = parseFrontmatter(raw);
  const parsed = guideFrontmatterSchema.safeParse({ ...frontmatter, slug });
  if (!parsed.success) {
    throw new Error(
      `Frontmatter invalide pour ${collection}/${slug}: ${parsed.error.issues
        .map((i) => `${i.path.join('.')} — ${i.message}`)
        .join(' · ')}`,
    );
  }

  const toc = extractToc(body);
  const readingTimeMin = parsed.data.readingTime ?? estimateReadingTime(body);

  return {
    meta: parsed.data,
    source: body,
    toc,
    readingTimeMin,
    collection,
    path: `/${collection}/${slug}`,
  };
}

/** List all guide records for a collection, sorted by datePublished desc. */
export async function listGuides(collection: string): Promise<GuideRecord[]> {
  const slugs = await listCollectionSlugs(collection);
  const records = await Promise.all(slugs.map((slug) => loadGuide(collection, slug)));
  return records
    .filter((r): r is GuideRecord => r !== null && !r.meta.draft)
    .sort((a, b) => b.meta.datePublished.localeCompare(a.meta.datePublished));
}

/**
 * Minimal YAML frontmatter parser — supports the subset used by
 * our editorial files (key: value, arrays as inline JSON, booleans
 * + numbers as bare literals, strings double-quoted or bare).
 *
 * For richer documents add `gray-matter` and use parseFrontmatter
 * from `vfile-matter` — but the MVP doesn't need it.
 */
export function parseFrontmatter(raw: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, body: raw };
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    return { frontmatter: {}, body: raw };
  }
  const yaml = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, '');
  const frontmatter: Record<string, unknown> = {};
  for (const line of yaml.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colon = trimmed.indexOf(':');
    if (colon === -1) continue;
    const key = trimmed.slice(0, colon).trim();
    const valueRaw = trimmed.slice(colon + 1).trim();
    frontmatter[key] = coerce(valueRaw);
  }
  return { frontmatter, body };
}

function coerce(value: string): unknown {
  if (!value) return '';
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      // fall through
    }
  }
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

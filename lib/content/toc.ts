/**
 * Extract H2 / H3 headings from raw MDX source.
 * Returns a flat list with computed anchor slugs. The actual
 * anchor IDs are inserted by rehype-slug at render time, so this
 * slugifier must match the rehype-slug algorithm.
 */

export type TocEntry = {
  level: 2 | 3;
  text: string;
  slug: string;
};

const HEADING_RE = /^(#{2,3})[ \t]+(.+?)\s*$/gm;
const CODE_BLOCK_RE = /```[\s\S]*?```/g;

export function extractToc(mdxSource: string): TocEntry[] {
  // Strip fenced code blocks so we don't pick up `## something` lines from snippets.
  const stripped = mdxSource.replace(CODE_BLOCK_RE, '');
  const entries: TocEntry[] = [];
  for (const match of stripped.matchAll(HEADING_RE)) {
    const hashes = match[1] ?? '';
    const raw = (match[2] ?? '').trim();
    if (!raw) continue;
    const level = hashes.length === 2 ? 2 : 3;
    entries.push({
      level: level as 2 | 3,
      text: raw,
      slug: slugify(raw),
    });
  }
  return entries;
}

/**
 * Slug normaliser — must mirror rehype-slug's `github-slugger`
 * behaviour for the common cases (accented French characters
 * lower-cased and stripped to ASCII).
 */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

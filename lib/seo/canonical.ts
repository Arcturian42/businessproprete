import { SITE_URL } from './constants';

/**
 * Build a canonical absolute URL for a given path.
 * Normalises leading/trailing slashes and removes double slashes.
 */
export function canonicalUrl(path: string): string {
  const cleaned = `/${path}`.replace(/\/+/g, '/').replace(/\/+$/, '') || '/';
  return `${SITE_URL.replace(/\/+$/, '')}${cleaned}`;
}

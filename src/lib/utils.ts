/**
 * Resolves an internal path against Astro's BASE_URL (useful for GitHub Pages subpaths or root domains)
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

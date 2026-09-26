/**
 * Resolves static assets with support for subpaths (e.g. GitHub Pages /Carzento/)
 * and absolute URLs. Idempotent — will not double-prefix if called multiple times.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';

  // Already prefixed with full base path
  if (base !== '/' && path.startsWith(base)) {
    return path;
  }

  const clean = path.replace(/^\//, '');
  const cleanBase = base.replace(/^\//, '');

  if (cleanBase && clean.startsWith(cleanBase)) {
    return `/${clean}`;
  }

  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}

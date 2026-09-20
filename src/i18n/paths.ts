import type { Lang } from './ui';

export const DEFAULT_LANG: Lang = 'en';
export const LANGS: Lang[] = ['en', 'es'];

/** Returns the other supported language. */
export function alternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

/** Removes the `/es` locale prefix from a pathname, if present. */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/es(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

/**
 * Builds the pathname of `pathname` in the given language.
 * English (default) has no prefix; Spanish lives under `/es`.
 * Hash fragments and query strings are preserved.
 */
export function localizedPath(pathname: string, lang: Lang): string {
  const match = pathname.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] ?? pathname;
  const suffix = match?.[2] ?? '';
  const base = stripLocale(path);
  if (lang === DEFAULT_LANG) return `${base}${suffix}`;
  return `${base === '/' ? '/es' : `/es${base}`}${suffix}`;
}

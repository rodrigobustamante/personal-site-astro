/**
 * Edge language negotiation for the portfolio pages.
 *
 * Runs inside the Cloudflare Worker before the Astro handler (see worker.ts
 * and `run_worker_first` in wrangler.toml). It replaces the former
 * client-side `location.replace`, which cost a full extra navigation.
 *
 * Preference order: `lang` cookie (set by the header toggle), then the best of
 * en/es in Accept-Language. No preference → no redirect, so crawlers, which
 * send no Accept-Language, always index the URL they asked for.
 */
import type { Lang } from '../i18n/ui.ts';
import { LANGS, localizedPath, stripLocale } from '../i18n/paths.ts';

/** English paths of the pages that exist in both languages: the home and everything under /work. */
export const isLocalizedPage = (basePath: string) =>
  basePath === '/' || basePath === '/work' || basePath.startsWith('/work/');

const isLang = (value: string | undefined): value is Lang => LANGS.includes(value as Lang);

export function preferredLanguage(request: Request): Lang | undefined {
  const cookie = request.headers.get('cookie') ?? '';
  const fromCookie = cookie.match(/(?:^|;\s*)lang=([^;]+)/)?.[1]?.trim();
  if (isLang(fromCookie)) return fromCookie;

  const header = request.headers.get('accept-language');
  if (!header) return undefined;

  let best: { lang: Lang; q: number; order: number } | undefined;
  header.split(',').forEach((part, order) => {
    const [tag, ...params] = part.trim().split(';');
    const primary = tag.toLowerCase().split('-')[0];
    if (!isLang(primary)) return;
    const qParam = params.find((p) => p.trim().startsWith('q='));
    const q = qParam ? Number.parseFloat(qParam.split('=')[1]) : 1;
    if (Number.isNaN(q) || q <= 0) return;
    if (!best || q > best.q || (q === best.q && order < best.order)) best = { lang: primary, q, order };
  });
  return best?.lang;
}

export function languageRedirect(request: Request): Response | undefined {
  const url = new URL(request.url);
  const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
  const isSpanish = pathname === '/es' || pathname.startsWith('/es/');
  const base = stripLocale(pathname);
  if (!isLocalizedPage(base)) return undefined;

  const pageLang: Lang = isSpanish ? 'es' : 'en';
  const preferred = preferredLanguage(request);
  if (!preferred || preferred === pageLang) return undefined;

  return new Response(null, {
    status: 302,
    headers: {
      Location: localizedPath(base, preferred) + url.search,
      Vary: 'Cookie, Accept-Language',
      'Cache-Control': 'no-store',
    },
  });
}

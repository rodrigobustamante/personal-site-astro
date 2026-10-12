/**
 * Renders the Open Graph cards referenced by the built pages.
 *
 * Pages point `og:image` at `/og/<key>.png`. After the build, this hook scans
 * the emitted HTML, reads each page's own `og:title`, `og:description` and
 * `lang`, and renders the matching PNG into the client output directory. The
 * card therefore always shows exactly what the page declares.
 *
 * Runs in Node (astro:build:done), which is what lets it use sharp: with the
 * Cloudflare adapter, prerendered routes run inside workerd instead.
 */
import type { AstroIntegration } from 'astro';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderOgCard, type OgCard } from '../utils/og';
import { clientDirOf, walkHtml } from './html-files';

const SITE_NAME = 'Rodrigo Bustamante';

export default function ogImages(): AstroIntegration {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const clientDir = await clientDirOf(dir);

        const cards = new Map<string, OgCard>();
        for (const file of await walkHtml(clientDir)) {
          const html = await readFile(file, 'utf8');
          const parsed = cardFromHtml(html);
          if (parsed && !cards.has(parsed.key)) cards.set(parsed.key, parsed.card);
        }

        let total = 0;
        for (const [key, card] of cards) {
          const target = path.join(clientDir, 'og', `${key}.png`);
          await mkdir(path.dirname(target), { recursive: true });
          await writeFile(target, await renderOgCard(card));
          total += 1;
        }
        logger.info(`rendered ${total} Open Graph card${total === 1 ? '' : 's'} into /og`);
      },
    },
  };
}

// ---- HTML → card ----------------------------------------------------------

const meta = (html: string, attr: 'property' | 'name', key: string) => {
  const m = html.match(new RegExp(`<meta\\s+${attr}="${key}"\\s+content="([^"]*)"`));
  return m ? decode(m[1]) : undefined;
};

/** The tag a /work entry shows above its title. */
const workTag = (html: string) => {
  const m = html.match(/<span class="cs-tag"[^>]*>([^<]+)<\/span>/);
  return m ? decode(m[1].trim()) : undefined;
};

export function cardFromHtml(html: string): { key: string; card: OgCard } | undefined {
  const image = meta(html, 'property', 'og:image');
  const key = image?.match(/\/og\/(.+)\.png$/)?.[1];
  if (!key) return undefined;

  const lang: OgCard['lang'] = /<html[^>]*\blang="es"/.test(html) ? 'es' : 'en';
  const rawTitle = meta(html, 'property', 'og:title') ?? SITE_NAME;
  const description = meta(html, 'property', 'og:description') ?? '';
  const es = lang === 'es';

  if (key.startsWith('home/')) {
    // "Rodrigo Bustamante — Senior Software Engineer · Design Engineer & Senior FrontEnd Engineer"
    const [name, ...rest] = rawTitle.split(' — ');
    return {
      key,
      card: { kind: 'portfolio', lang, label: 'Portfolio', name, title: rest.join(' — ') || '' },
    };
  }

  const title = rawTitle.replace(new RegExp(`\\s+—\\s+${SITE_NAME}$`), '');
  const isWorkIndex = /^work\/(en|es)$/.test(key);
  const label = isWorkIndex
    ? es
      ? 'Trabajos'
      : 'Work'
    : key.startsWith('work/')
      ? // Each entry says what it is in its own tag ("Case Study", "Side project"…).
        (workTag(html) ?? (es ? 'Trabajo' : 'Work'))
      : key.startsWith('system/')
        ? es
          ? 'Sistema de diseño'
          : 'Design system'
        : key.startsWith('uses/')
          ? es
            ? 'Cómo está hecho'
            : 'How it’s built'
          : 'Blog';
  const isBlogIndex = /^blog\/(en|es)$/.test(key);
  return {
    key,
    card: {
      kind: 'article',
      lang,
      label,
      title: isBlogIndex
        ? es
          ? 'Notas sobre rendimiento web, frontend y design systems'
          : 'Notes on web performance, frontend engineering and design systems'
        : title,
      subtitle: isBlogIndex ? undefined : description,
    },
  };
}

function decode(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// ---- fs helpers -----------------------------------------------------------

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
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderOgCard, type OgCard } from '../utils/og';

const SITE_NAME = 'Rodrigo Bustamante';

export default function ogImages(): AstroIntegration {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const clientDir = (await exists(path.join(outDir, 'client'))) ? path.join(outDir, 'client') : outDir;

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

export function cardFromHtml(html: string): { key: string; card: OgCard } | undefined {
  const image = meta(html, 'property', 'og:image');
  const key = image?.match(/\/og\/(.+)\.png$/)?.[1];
  if (!key) return undefined;

  const lang: OgCard['lang'] = /<html[^>]*\blang="es"/.test(html) ? 'es' : 'en';
  const rawTitle = meta(html, 'property', 'og:title') ?? SITE_NAME;
  const description = meta(html, 'property', 'og:description') ?? '';
  const es = lang === 'es';

  if (key.startsWith('home/')) {
    // "Rodrigo Bustamante — Staff Frontend Engineer · Design Systems Architect"
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
      ? es
        ? 'Caso de estudio'
        : 'Case study'
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

async function exists(p: string) {
  try {
    await readdir(p);
    return true;
  } catch {
    return false;
  }
}

async function walkHtml(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkHtml(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

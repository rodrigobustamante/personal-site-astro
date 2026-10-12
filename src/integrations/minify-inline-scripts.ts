/**
 * Minifies the classic inline scripts (`<script is:inline>`) in the built
 * HTML. Astro bundles and minifies module scripts but leaves inline ones as
 * written, comments and indentation included. The anti-FOUC script in
 * PortfolioLayout ships on every page and the hero count-up on the home, so
 * this keeps ~0.3–0.5 KB gzipped out of each page's first round trip.
 *
 * Only bare `<script>` tags are touched: modules, JSON-LD and external
 * scripts all carry attributes. Both scripts are IIFEs, so esbuild's
 * transform (no bundling, top-level names kept) is safe.
 */
import type { AstroIntegration } from 'astro';
import { readFile, writeFile } from 'node:fs/promises';
import { transform } from 'esbuild';
import { clientDirOf, walkHtml } from './html-files';

const INLINE_SCRIPT = /<script>([\s\S]*?)<\/script>/g;

export default function minifyInlineScripts(): AstroIntegration {
  return {
    name: 'minify-inline-scripts',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const cache = new Map<string, string>();
        let saved = 0;
        for (const file of await walkHtml(await clientDirOf(dir))) {
          const html = await readFile(file, 'utf8');
          const sources = [...html.matchAll(INLINE_SCRIPT)].map((m) => m[1]);
          if (!sources.length) continue;
          for (const source of sources) {
            if (!cache.has(source)) {
              const { code } = await transform(source, { loader: 'js', minify: true, target: 'es2020' });
              cache.set(source, code.trim());
            }
          }
          const out = html.replace(INLINE_SCRIPT, (_, source: string) => `<script>${cache.get(source)}</script>`);
          saved += html.length - out.length;
          await writeFile(file, out);
        }
        logger.info(`minified inline scripts, ${(saved / 1024).toFixed(1)} KB saved across pages`);
      },
    },
  };
}

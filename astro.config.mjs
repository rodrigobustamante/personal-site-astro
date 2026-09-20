import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import tasks from './src/utils/tasks';
import ogImages from './src/integrations/og-images';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import { SITE } from './src/utils/config.ts';
import cloudflare from '@astrojs/cloudflare';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'server',
  build: {
    // The whole portfolio stylesheet is ~4 KB gzipped: cheaper inlined in
    // <head> than as a render-blocking request on first visit.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap(),
    mdx(),
    tasks(),
    ogImages(),
    compress({
      CSS: true,
      HTML: false,
      Image: false,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin],
  },
  vite: {
    resolve: {
      alias: [
        { find: '~', replacement: path.resolve(__dirname, './src') },
        // Wrap the Cloudflare adapter's Worker entrypoint so the edge language
        // redirect runs before prerendered pages are served (see src/edge/worker.ts).
        {
          find: /^@astrojs\/cloudflare\/entrypoints\/server(\.js)?$/,
          replacement: path.resolve(__dirname, './src/edge/worker.ts'),
        },
      ],
    },
    optimizeDeps: {
      include: ['sharp'],
    },
  },
  adapter: cloudflare({
    // Every page is prerendered, so images are optimized by sharp at build time
    // and served as static assets; nothing is transformed in the Worker.
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
});

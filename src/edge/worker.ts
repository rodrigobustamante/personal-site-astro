/**
 * Worker entrypoint. Replaces `@astrojs/cloudflare/entrypoints/server` via a
 * Vite alias in astro.config.mjs so the language redirect can run before the
 * adapter's handler, which otherwise serves prerendered pages straight from
 * the assets binding. Only the paths listed in `run_worker_first`
 * (wrangler.toml) reach this code; everything else is served as a static
 * asset without invoking the Worker.
 */
import { handle } from '@astrojs/cloudflare/handler';
import { languageRedirect } from './language-redirect.ts';

export default {
  fetch(request: Request, env: unknown, context: unknown) {
    return languageRedirect(request) ?? (handle as (...args: unknown[]) => Promise<Response>)(request, env, context);
  },
};

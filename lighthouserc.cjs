/**
 * Lighthouse CI budget. Runs against the static build in dist/client, so it
 * measures the pages exactly as prerendered, independent of Cloudflare.
 *
 * `/es` is not listed on purpose: the anti-FOUC script redirects portfolio
 * pages to the browser's preferred language, so in CI (en-US Chrome) `/es`
 * would just be audited as `/`. Spanish coverage comes from the blog index,
 * which never redirects. Locally, a Spanish Chrome flips it the other way.
 */
const PORTFOLIO = ['/', '/work/hangar-design-system/'];
const BLOG = ['/blog/en/', '/blog/es/', '/blog/en/core-web-vitals-complete-guide-for-beginners/'];

/** @type {import('@lhci/cli').LighthouseCiConfig} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: 'dist/client',
      url: [...PORTFOLIO, ...BLOG],
      numberOfRuns: 3,
      // Defaults: mobile emulation + simulated slow 4G, same as PageSpeed Insights.
    },
    assert: {
      assertions: {
        // Category scores block the PR. Medians across the 3 runs.
        'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:best-practices': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'categories:seo': ['error', { minScore: 0.95, aggregationMethod: 'median-run' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1, aggregationMethod: 'median-run' }],
        // Timing metrics only warn: GitHub runners are too noisy to block on them.
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
        'total-blocking-time': ['warn', { maxNumericValue: 200, aggregationMethod: 'median-run' }],
        // Home transfers ~365 KB today, 308 KB of which are the five self-hosted
        // font files. Budget sits just above that so it flags regressions only.
        'resource-summary:total:size': ['warn', { maxNumericValue: 400 * 1024 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

/**
 * Lighthouse CI budget. Runs against the static build in dist/client, so it
 * measures the pages exactly as prerendered, independent of Cloudflare.
 *
 * Language negotiation happens in the Worker (src/edge/language-redirect.ts),
 * which this static server bypasses, so every localized page can be audited
 * directly regardless of the browser language.
 */
const PORTFOLIO = ['/', '/es/', '/work/', '/work/hangar-design-system/'];
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
        // Heaviest page today is the home at ~205 KB (148 KB of it fonts, after
        // instancing them down to the axes in use). Budgets sit just above.
        'resource-summary:total:size': ['warn', { maxNumericValue: 250 * 1024 }],
        'resource-summary:font:size': ['warn', { maxNumericValue: 160 * 1024 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

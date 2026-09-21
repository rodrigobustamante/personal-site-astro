/**
 * Site configuration. Plain constants: every value below is exactly what the
 * former AstroWind loader produced after merging its defaults, trimmed to the
 * fields the codebase reads.
 */

export interface SiteConfig {
  name: string;
  site: string;
  base: string;
  trailingSlash: boolean;
  /** Cloudflare Web Analytics beacon token (public). Empty string disables the beacon. */
  analyticsToken: string;
}

export interface RobotsConfig {
  index: boolean;
  follow: boolean;
}

export interface BlogRouteConfig {
  isEnabled: boolean;
  pathname: string;
  robots: RobotsConfig;
}

export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  post: { isEnabled: boolean; permalink: string; robots: RobotsConfig };
  list: BlogRouteConfig;
  category: BlogRouteConfig;
  tag: BlogRouteConfig;
}

export const SITE: SiteConfig = {
  name: 'Rodrigo Bustamante',
  site: 'https://rodrigobustamante.cl',
  base: '/',
  trailingSlash: false,
  analyticsToken: '6926c477a8094b5b834e4f94047a6c2e',
};

/** Only `description` is read today (RSS feed). Kept in sync with BlogLayout's default description. */
export const METADATA = {
  description: 'Articles on web performance, frontend engineering, and software craftsmanship.',
};

export const I18N = {
  language: 'en',
  dateFormatter: new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }),
};

export const APP_BLOG: AppBlogConfig = {
  isEnabled: true,
  postsPerPage: 6,
  post: {
    isEnabled: true,
    // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
    permalink: 'blog/%slug%',
    robots: { index: true, follow: true },
  },
  list: {
    isEnabled: true,
    pathname: 'blog',
    robots: { index: true, follow: true },
  },
  category: {
    isEnabled: true,
    pathname: 'blog/category',
    robots: { index: true, follow: true },
  },
  tag: {
    isEnabled: true,
    pathname: 'blog/tag',
    robots: { index: false, follow: true },
  },
};

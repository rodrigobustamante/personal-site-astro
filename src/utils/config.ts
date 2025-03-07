import merge from 'lodash.merge';

import type { MetaData } from '~/types';

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}
export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}
export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
  };
}

const config = {
  site: {
    name: 'Rodrigo Bustamante',
    site: 'https://rodrigobustamante.cl',
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
  },
  metadata: {
    title: {
      default: 'Rodrigo Bustamante',
      template: '%s — Rodrigo Bustamante',
    },
    description: 'Web UI Developer',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      site_name: 'Rodrigo Bustamante',
      images: [
        {
          url: '~/assets/images/default.png',
          width: 1200,
          height: 628,
        },
      ],
      type: 'website',
    },
    twitter: {
      handle: '@onwidget',
      site: '@onwidget',
      cardType: 'summary_large_image',
    },
  },
  i18n: {
    language: 'en',
    textDirection: 'ltr',
  },
  apps: {
    blog: {
      isEnabled: true,
      postsPerPage: 6,
      post: {
        isEnabled: true,
        permalink: '/%slug%',
        robots: {
          index: true,
        },
      },
      list: {
        isEnabled: true,
        pathname: 'blog',
        robots: {
          index: true,
        },
      },
      category: {
        isEnabled: true,
        pathname: 'category',
        robots: {
          index: true,
        },
      },
      tag: {
        isEnabled: true,
        pathname: 'tag',
        robots: {
          index: false,
        },
      },
    },
  },
  ui: {
    theme: 'system',
    tokens: {
      default: {
        fonts: {
          sans: 'InterVariable',
          serif: 'var(--ph-font-sans)',
          heading: 'var(--ph-font-sans)',
        },
        colors: {
          default: 'rgb(16 16 16)',
          heading: 'rgb(0 0 0)',
          muted: 'rgb(40 40 40)',
          bgPage: 'rgb(255 255 255)',
          primary: 'rgb(0 124 220)',
          secondary: 'rgb(30 58 138)',
          accent: 'rgb(109 40 217)',
          info: 'rgb(119 182 234)',
          success: 'rgb(54 211 153)',
          warning: 'rgb(251 189 35)',
          error: 'rgb(248 114 114)',
          link: 'var(--ph-color-primary)',
          linkActive: 'var(--ph-color-link)',
        },
      },
      dark: {
        fonts: {},
        colors: {
          default: 'rgb(247, 248, 248)',
          heading: 'rgb(247, 248, 248)',
          muted: 'rgb(200, 188, 208)',
          bgPage: 'rgb(3 6 32)',
          primary: 'rgb(29 78 216)',
          secondary: 'rgb(30 58 138)',
          accent: 'rgb(135 77 2267)',
          info: 'rgb(58 191 248)',
          success: 'rgb(54 211 153)',
          warning: 'rgb(251 189 35)',
          error: 'rgb(248 114 114)',
          link: 'var(--ph-color-primary)',
          linkActive: 'var(--ph-color-link)',
        },
      },
    },
  },
  analytics: {
    vendors: {
      googleAnalytics: {
        id: null,
      },
    },
  },
};

const DEFAULT_SITE_NAME = 'Rodrigo Bustamante';

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,

    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: true,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

const getI18N = () => {
  const _default = {
    language: 'en',
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

const getAppBlog = () => {
  const _default = {
    isEnabled: false,
    postsPerPage: 6,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'tag',
      robots: {
        index: false,
        follow: true,
      },
    },
  };

  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};

const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const UI = getUI();
export const ANALYTICS = getAnalytics();

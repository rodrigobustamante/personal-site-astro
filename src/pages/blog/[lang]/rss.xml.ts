import type { APIRoute, GetStaticPaths } from 'astro';
import { getRssString } from '@astrojs/rss';

import { SITE, APP_BLOG } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';
import { useTranslations, type Lang } from '~/i18n/ui';

export const prerender = true;

// One feed per language, matching the /blog/en and /blog/es listings.
export const getStaticPaths = (() =>
  APP_BLOG.isEnabled ? (['en', 'es'] as const).map((lang) => ({ params: { lang } })) : []) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const posts = (await fetchPosts()).filter((post) => post.slug.startsWith(`${lang}/`));

  const rss = await getRssString({
    title: `${SITE.name} — Blog`,
    description: useTranslations(lang).t('blog.description'),
    site: site ?? '',
    customData: `<language>${lang}</language>`,
    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),
    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, { headers: { 'Content-Type': 'application/xml' } });
};

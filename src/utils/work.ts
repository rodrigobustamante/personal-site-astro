import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '~/i18n/ui';

/** Entry ids look like `en/hangar-design-system`; the slug is the part after the language. */
export const workSlug = (entry: CollectionEntry<'work'>) => entry.id.replace(/^[a-z]{2}\//, '');

export const workLang = (entry: CollectionEntry<'work'>): Lang => (entry.id.startsWith('es/') ? 'es' : 'en');

/** Case studies for one language, in display order. */
export async function getWork(lang: Lang) {
  const entries = await getCollection('work', (entry) => workLang(entry) === lang);
  return entries.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

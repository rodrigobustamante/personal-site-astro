import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '~/i18n/ui';
import type { SceneName } from '~/components/portfolio/dioramas/scenes';

/** Entry ids look like `en/hangar-design-system`; the slug is the part after the language. */
export const workSlug = (entry: CollectionEntry<'work'>) => entry.id.replace(/^[a-z]{2}\//, '');

export const workLang = (entry: CollectionEntry<'work'>): Lang => (entry.id.startsWith('es/') ? 'es' : 'en');

/** /work entries for one language, in display order. */
export async function getWork(lang: Lang) {
  const entries = await getCollection('work', (entry) => workLang(entry) === lang);
  return entries.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Decorative diorama for the case studies that have one, by slug. */
const SCENE_BY_SLUG: Record<string, SceneName> = {
  'hangar-design-system': 'hangar',
  'latam-airlines-home': 'terminal',
  'mining-supplier-platform': 'mine',
  pace: 'pace',
  intervalo: 'intervalo',
  'a11y-web-validator': 'a11y',
};
export const workScene = (slug: string): SceneName | undefined => SCENE_BY_SLUG[slug];

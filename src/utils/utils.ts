import type { Lang } from '~/i18n/ui';

const dateFormatters: Record<Lang, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }),
  es: new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }),
};

export const getFormattedDate = (date: Date, lang: Lang = 'en'): string =>
  date ? dateFormatters[lang].format(date) : '';

/** Value for a `<time datetime>` attribute: the calendar date in UTC. */
export const getDatetime = (date: Date): string => (date ? date.toISOString().slice(0, 10) : '');

/** Language of a post, from the locale folder its slug starts with. */
export const getPostLang = (slug: string): Lang => (slug.startsWith('es/') ? 'es' : 'en');

export const trim = (str = '', ch?: string) => {
  let start = 0,
    end = str.length || 0;
  while (start < end && str[start] === ch) ++start;
  while (end > start && str[end - 1] === ch) --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
};

// Function to format a number in thousands (K) or millions (M) format depending on its value
export const toUiAmount = (amount: number) => {
  if (!amount) return 0;

  let value: string;

  if (amount >= 1000000000) {
    const formattedNumber = (amount / 1000000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'B';
    } else {
      value = formattedNumber + 'B';
    }
  } else if (amount >= 1000000) {
    const formattedNumber = (amount / 1000000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'M';
    } else {
      value = formattedNumber + 'M';
    }
  } else if (amount >= 1000) {
    const formattedNumber = (amount / 1000).toFixed(1);
    if (Number(formattedNumber) === parseInt(formattedNumber)) {
      value = parseInt(formattedNumber) + 'K';
    } else {
      value = formattedNumber + 'K';
    }
  } else {
    value = Number(amount).toFixed(0);
  }

  return value;
};

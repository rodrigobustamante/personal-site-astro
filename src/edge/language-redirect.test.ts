import { test } from 'node:test';
import assert from 'node:assert/strict';
import { languageRedirect, preferredLanguage } from './language-redirect.ts';

const req = (path: string, headers: Record<string, string> = {}) =>
  new Request(`https://rodrigobustamante.cl${path}`, { headers });

test('preferredLanguage: cookie wins over Accept-Language', () => {
  assert.equal(preferredLanguage(req('/', { cookie: 'theme=dark; lang=es', 'accept-language': 'en-US' })), 'es');
  assert.equal(preferredLanguage(req('/', { cookie: 'lang=en', 'accept-language': 'es-ES' })), 'en');
});

test('preferredLanguage: picks the best of en/es by q-value', () => {
  assert.equal(preferredLanguage(req('/', { 'accept-language': 'es-419,es;q=0.9,en;q=0.8' })), 'es');
  assert.equal(preferredLanguage(req('/', { 'accept-language': 'en-GB,en;q=0.9,es;q=0.5' })), 'en');
  assert.equal(preferredLanguage(req('/', { 'accept-language': 'fr-FR,fr;q=0.9,es;q=0.3,en;q=0.8' })), 'en');
});

test('preferredLanguage: undefined when neither language is acceptable or header is missing', () => {
  assert.equal(preferredLanguage(req('/')), undefined);
  assert.equal(preferredLanguage(req('/', { 'accept-language': 'de-DE,fr;q=0.8' })), undefined);
  assert.equal(preferredLanguage(req('/', { cookie: 'lang=pt' })), undefined);
});

test('redirects the home to /es for a Spanish browser', () => {
  const res = languageRedirect(req('/', { 'accept-language': 'es-ES,es;q=0.9' }));
  assert.equal(res?.status, 302);
  assert.equal(res?.headers.get('location'), '/es');
  assert.equal(res?.headers.get('vary'), 'Cookie, Accept-Language');
});

test('redirects /es back to / for an English browser (symmetric)', () => {
  const res = languageRedirect(req('/es', { 'accept-language': 'en-US,en;q=0.9' }));
  assert.equal(res?.headers.get('location'), '/');
});

test('the lang cookie overrides the browser language in both directions', () => {
  assert.equal(
    languageRedirect(req('/', { cookie: 'lang=es', 'accept-language': 'en-US' }))?.headers.get('location'),
    '/es'
  );
  assert.equal(
    languageRedirect(req('/es', { cookie: 'lang=en', 'accept-language': 'es-ES' }))?.headers.get('location'),
    '/'
  );
  assert.equal(languageRedirect(req('/es', { cookie: 'lang=es', 'accept-language': 'en-US' })), undefined);
});

test('case study pages redirect to their localized sibling, keeping the query string', () => {
  const res = languageRedirect(req('/work/hangar-design-system?utm=x', { 'accept-language': 'es' }));
  assert.equal(res?.headers.get('location'), '/es/work/hangar-design-system?utm=x');
  assert.equal(
    languageRedirect(req('/es/work/hangar-design-system', { 'accept-language': 'en' }))?.headers.get('location'),
    '/work/hangar-design-system'
  );
});

test('no redirect when the page already matches, when no preference exists, or for crawlers without Accept-Language', () => {
  assert.equal(languageRedirect(req('/', { 'accept-language': 'en-US' })), undefined);
  assert.equal(languageRedirect(req('/es', { 'accept-language': 'es-CL' })), undefined);
  assert.equal(languageRedirect(req('/')), undefined);
  assert.equal(languageRedirect(req('/es')), undefined);
});

test('the /work index and any case study are localized pages', () => {
  assert.equal(languageRedirect(req('/work', { 'accept-language': 'es' }))?.headers.get('location'), '/es/work');
  assert.equal(
    languageRedirect(req('/es/work/future-case-study', { 'accept-language': 'en' }))?.headers.get('location'),
    '/work/future-case-study'
  );
  assert.equal(languageRedirect(req('/workshop', { 'accept-language': 'es' })), undefined);
});

test('never touches routes outside the portfolio pages', () => {
  for (const p of ['/blog/en', '/blog/es', '/rss.xml', '/privacy', '/og/home/en.png', '/es/blog/en']) {
    assert.equal(languageRedirect(req(p, { cookie: 'lang=es', 'accept-language': 'es' })), undefined, p);
  }
});

test('tolerates a trailing slash on the incoming path', () => {
  assert.equal(languageRedirect(req('/es/', { 'accept-language': 'en' }))?.headers.get('location'), '/');
});

/**
 * Open Graph card renderer. Runs at build time only (prerendered endpoint).
 * satori lays out a small React-like tree into SVG (text becomes paths, so no
 * font is needed at raster time); sharp turns that SVG into a 1200x630 PNG.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type OgCard =
  | { kind: 'portfolio'; lang: 'en' | 'es'; label: string; name: string; title: string }
  | { kind: 'article'; lang: 'en' | 'es'; label: string; title: string; subtitle?: string; meta?: string };

// Same tokens as the dark theme in PortfolioLayout.astro, resolved to hex
// because satori/librsvg do not understand oklch().
const C = {
  paper: oklchToHex(0.205, 0.012, 56),
  paper2: oklchToHex(0.245, 0.014, 56),
  ink: oklchToHex(0.94, 0.012, 80),
  inkSoft: oklchToHex(0.82, 0.014, 78),
  muted: oklchToHex(0.68, 0.016, 70),
  line: oklchToHex(0.36, 0.016, 58),
  accent: oklchToHex(0.72, 0.12, 48),
};

const FONT_DIR = path.join(process.cwd(), 'node_modules/@fontsource');
const fontFile = (pkg: string, file: string) => readFile(path.join(FONT_DIR, pkg, 'files', file));

let fontsPromise: Promise<Awaited<ReturnType<typeof loadFonts>>> | undefined;
async function loadFonts() {
  const [serif, serifItalic, sans, sansSemibold] = await Promise.all([
    fontFile('newsreader', 'newsreader-latin-400-normal.woff'),
    fontFile('newsreader', 'newsreader-latin-400-italic.woff'),
    fontFile('hanken-grotesk', 'hanken-grotesk-latin-500-normal.woff'),
    fontFile('hanken-grotesk', 'hanken-grotesk-latin-600-normal.woff'),
  ]);
  return [
    { name: 'Newsreader', data: toArrayBuffer(serif), weight: 400 as const, style: 'normal' as const },
    { name: 'Newsreader', data: toArrayBuffer(serifItalic), weight: 400 as const, style: 'italic' as const },
    { name: 'Hanken Grotesk', data: toArrayBuffer(sans), weight: 500 as const, style: 'normal' as const },
    { name: 'Hanken Grotesk', data: toArrayBuffer(sansSemibold), weight: 600 as const, style: 'normal' as const },
  ];
}

let portraitPromise: Promise<string> | undefined;
const PORTRAIT = { w: 340, h: 425 };
function loadPortrait() {
  return sharp(path.join(process.cwd(), 'public/images/portrait-crop.webp'))
    .resize(PORTRAIT.w * 2, PORTRAIT.h * 2, { fit: 'cover' })
    .png()
    .toBuffer()
    .then((buf) => `data:image/png;base64,${buf.toString('base64')}`);
}

export async function renderOgCard(card: OgCard): Promise<Buffer> {
  fontsPromise ??= loadFonts();
  const fonts = await fontsPromise;
  const tree = card.kind === 'portfolio' ? await portfolioCard(card) : articleCard(card);
  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}

// ---- templates ------------------------------------------------------------

const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, ...(children === undefined ? {} : { children }) },
});

const frame = (children: unknown[]) =>
  el(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px 56px',
      backgroundColor: C.paper,
      backgroundImage: `linear-gradient(135deg, ${C.paper} 0%, ${C.paper2} 100%)`,
      color: C.ink,
      fontFamily: 'Hanken Grotesk',
    },
    children
  );

const label = (text: string) =>
  el(
    'div',
    { display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 600, letterSpacing: '0.14em', color: C.accent },
    [el('div', { width: 10, height: 10, borderRadius: 5, backgroundColor: C.accent }), el('span', {}, text.toUpperCase())]
  );

const footer = () =>
  el(
    'div',
    {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 28,
      borderTop: `1px solid ${C.line}`,
      fontSize: 24,
      color: C.muted,
    },
    [el('span', { fontFamily: 'Newsreader', fontSize: 28, color: C.inkSoft }, 'Rodrigo Bustamante'), el('span', {}, 'rodrigobustamante.cl')]
  );

async function portfolioCard(card: Extract<OgCard, { kind: 'portfolio' }>) {
  portraitPromise ??= loadPortrait();
  const portrait = await portraitPromise;
  return frame([
    el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48 }, [
      el('div', { display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 680 }, [
        label(card.label),
        el('div', { fontFamily: 'Newsreader', fontSize: 92, lineHeight: 0.98, letterSpacing: '-0.02em', color: C.ink }, card.name),
        el('div', { fontSize: 32, fontWeight: 600, color: C.inkSoft, lineHeight: 1.3, maxWidth: 600 }, card.title),
      ]),
      { type: 'img', props: { src: portrait, width: PORTRAIT.w, height: PORTRAIT.h, style: { borderRadius: 6, objectFit: 'cover' } } },
    ]),
    footer(),
  ]);
}

function articleCard(card: Extract<OgCard, { kind: 'article' }>) {
  const title = clamp(card.title, 90);
  const titleSize = title.length > 60 ? 60 : title.length > 40 ? 68 : 76;
  return frame([
    el('div', { display: 'flex', flexDirection: 'column', gap: 30 }, [
      label(card.label),
      el('div', { fontFamily: 'Newsreader', fontSize: titleSize, lineHeight: 1.08, letterSpacing: '-0.015em', color: C.ink }, title),
      ...(card.subtitle ? [el('div', { fontSize: 28, color: C.muted, lineHeight: 1.4, maxWidth: 1000 }, clamp(card.subtitle, 150))] : []),
      ...(card.meta ? [el('div', { fontSize: 22, fontWeight: 600, letterSpacing: '0.06em', color: C.inkSoft }, card.meta.toUpperCase())] : []),
    ]),
    footer(),
  ]);
}

// ---- helpers --------------------------------------------------------------

function clamp(text: string, max: number) {
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

/** oklch → sRGB hex (clipped). Enough for flat UI colours. */
function oklchToHex(L: number, Cc: number, hDeg: number): string {
  const h = (hDeg * Math.PI) / 180;
  const a = Cc * Math.cos(h);
  const b = Cc * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gamma = (c: number) => {
    const v = Math.min(1, Math.max(0, c));
    return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  };
  const hex = (c: number) => Math.round(gamma(c) * 255).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(bl)}`;
}

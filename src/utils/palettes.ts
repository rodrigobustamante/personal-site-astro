/**
 * Accent palettes. `l` / `d` are the accent in light / dark mode, `li` / `di`
 * the darker / lighter ink variant used for accent text. Read by the anti-FOUC
 * script in PortfolioLayout (via define:vars) and rendered on /system.
 * `l` keeps white button text at 4.5:1 or more (WCAG AA); accent text uses
 * the ink variant.
 */
export interface Palette {
  l: string;
  d: string;
  li: string;
  di: string;
}

export const DEFAULT_PALETTE = 'Magenta';

// Saturated accents over the cool indigo base, after Kurzgesagt's flat
// illustration style. Checked to WCAG AA against --paper and --card.
export const PALETTES: Record<string, Palette> = {
  Magenta: {
    l: 'oklch(0.55 0.21 355)',
    d: 'oklch(0.72 0.18 355)',
    li: 'oklch(0.5 0.2 355)',
    di: 'oklch(0.8 0.13 355)',
  },
  Coral: { l: 'oklch(0.56 0.18 30)', d: 'oklch(0.74 0.16 34)', li: 'oklch(0.5 0.17 30)', di: 'oklch(0.8 0.12 36)' },
  Amber: { l: 'oklch(0.55 0.13 62)', d: 'oklch(0.82 0.15 76)', li: 'oklch(0.49 0.12 60)', di: 'oklch(0.86 0.13 80)' },
  Teal: { l: 'oklch(0.52 0.1 198)', d: 'oklch(0.78 0.12 192)', li: 'oklch(0.47 0.09 198)', di: 'oklch(0.83 0.1 190)' },
  Sky: { l: 'oklch(0.52 0.14 248)', d: 'oklch(0.76 0.12 238)', li: 'oklch(0.47 0.14 250)', di: 'oklch(0.82 0.1 236)' },
  Violet: {
    l: 'oklch(0.52 0.2 300)',
    d: 'oklch(0.73 0.15 302)',
    li: 'oklch(0.47 0.2 300)',
    di: 'oklch(0.81 0.11 302)',
  },
};

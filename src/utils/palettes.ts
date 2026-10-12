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

export const DEFAULT_PALETTE = 'Terracotta';

export const PALETTES: Record<string, Palette> = {
  Terracotta: {
    l: 'oklch(0.565 0.125 42)',
    d: 'oklch(0.72 0.12 48)',
    li: 'oklch(0.46 0.12 42)',
    di: 'oklch(0.78 0.12 50)',
  },
  Ochre: { l: 'oklch(0.56 0.12 75)', d: 'oklch(0.78 0.11 82)', li: 'oklch(0.5 0.11 72)', di: 'oklch(0.82 0.11 84)' },
  Olive: {
    l: 'oklch(0.545 0.09 130)',
    d: 'oklch(0.72 0.1 135)',
    li: 'oklch(0.45 0.09 128)',
    di: 'oklch(0.78 0.1 138)',
  },
  Indigo: {
    l: 'oklch(0.5 0.11 270)',
    d: 'oklch(0.7 0.12 275)',
    li: 'oklch(0.45 0.12 270)',
    di: 'oklch(0.76 0.12 278)',
  },
  Plum: {
    l: 'oklch(0.52 0.13 350)',
    d: 'oklch(0.72 0.12 352)',
    li: 'oklch(0.45 0.13 350)',
    di: 'oklch(0.78 0.12 354)',
  },
};

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
  /** Illustration-only companions (--accent-2 / --accent-3), light / dark: hues
   * set against the accent so dioramas keep three distinct colours. */
  l2: string;
  d2: string;
  l3: string;
  d3: string;
}

export const DEFAULT_PALETTE = 'Magenta';

// Saturated accents over the cool indigo base, after Kurzgesagt's flat
// illustration style. Checked to WCAG AA against --paper and --card.
export const PALETTES: Record<string, Palette> = {
  // Companions: amber, teal.
  Magenta: {
    l: 'oklch(0.55 0.21 355)',
    d: 'oklch(0.72 0.18 355)',
    li: 'oklch(0.5 0.2 355)',
    di: 'oklch(0.8 0.13 355)',
    l2: 'oklch(0.64 0.15 64)',
    d2: 'oklch(0.84 0.15 82)',
    l3: 'oklch(0.6 0.1 195)',
    d3: 'oklch(0.8 0.12 190)',
  },
  // Companions: teal, violet.
  Coral: {
    l: 'oklch(0.56 0.18 30)',
    d: 'oklch(0.74 0.16 34)',
    li: 'oklch(0.5 0.17 30)',
    di: 'oklch(0.8 0.12 36)',
    l2: 'oklch(0.6 0.1 195)',
    d2: 'oklch(0.8 0.12 190)',
    l3: 'oklch(0.56 0.17 300)',
    d3: 'oklch(0.76 0.13 302)',
  },
  // Companions: magenta, sky.
  Amber: {
    l: 'oklch(0.55 0.13 62)',
    d: 'oklch(0.82 0.15 76)',
    li: 'oklch(0.49 0.12 60)',
    di: 'oklch(0.86 0.13 80)',
    l2: 'oklch(0.58 0.2 355)',
    d2: 'oklch(0.75 0.17 355)',
    l3: 'oklch(0.57 0.13 245)',
    d3: 'oklch(0.77 0.12 238)',
  },
  // Companions: coral, amber.
  Teal: {
    l: 'oklch(0.52 0.1 198)',
    d: 'oklch(0.78 0.12 192)',
    li: 'oklch(0.47 0.09 198)',
    di: 'oklch(0.83 0.1 190)',
    l2: 'oklch(0.62 0.17 32)',
    d2: 'oklch(0.77 0.14 34)',
    l3: 'oklch(0.64 0.15 64)',
    d3: 'oklch(0.84 0.15 82)',
  },
  // Companions: amber, magenta.
  Sky: {
    l: 'oklch(0.52 0.14 248)',
    d: 'oklch(0.76 0.12 238)',
    li: 'oklch(0.47 0.14 250)',
    di: 'oklch(0.82 0.1 236)',
    l2: 'oklch(0.64 0.15 64)',
    d2: 'oklch(0.84 0.15 82)',
    l3: 'oklch(0.58 0.2 355)',
    d3: 'oklch(0.75 0.17 355)',
  },
  // Companions: amber, teal.
  Violet: {
    l: 'oklch(0.52 0.2 300)',
    d: 'oklch(0.73 0.15 302)',
    li: 'oklch(0.47 0.2 300)',
    di: 'oklch(0.81 0.11 302)',
    l2: 'oklch(0.64 0.15 64)',
    d2: 'oklch(0.84 0.15 82)',
    l3: 'oklch(0.6 0.1 195)',
    d3: 'oklch(0.8 0.12 190)',
  },
};

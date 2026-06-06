# Rodrigo Bustamante — Personal Site · Design Spec

Implementation brief for building this portfolio site. Aesthetic: **warm editorial** — cream paper background, a serif display face (Newsreader) paired with a grotesque sans (Hanken Grotesk), a single warm accent, generous whitespace, recruiter-friendly. No gradients, no emoji, no drop-shadow-heavy cards. Quiet and confident.

The reference implementation is React + Babel (single page). You can build it in any stack (Next.js / Astro / plain HTML+CSS recommended). What matters is matching the **tokens, type scale, layout, and component specs** below.

---

## 1. Tech & structure

- Single-page site, anchor-nav between sections.
- **Bilingual (EN / ES)** — all copy lives in a data object keyed by locale; a toggle in the header swaps it. Persist choice in `localStorage` (`lang`). Default from `navigator.language`.
- **Light / dark mode** — `data-theme="light|dark"` on `<html>`. Persist in `localStorage` (`theme`); default from `prefers-color-scheme`.
- **Accent palette** is a runtime-swappable token set (see §3). Persist in `localStorage` (`palette`). Default **Terracotta** (see §3 for the Terracotta-vs-Indigo decision).
- Scroll-reveal: sections fade/translate in on enter (`IntersectionObserver`), gated behind `@media (prefers-reduced-motion: no-preference)`.
- Sticky header that gains a translucent blurred background + bottom border after scroll (`.scrolled`).

### Section order (top → bottom)
1. **Header** (sticky) — wordmark · nav · tools (lang toggle, theme toggle)
2. **Hero** — two columns: text left, portrait right
3. **Experience** (`01`) — company-grouped timeline
4. **Skills** (`02`) — grouped grid
5. **Education & beyond** (`03`) — education card + details list
6. **Writing** (`04`) — blog post cards
7. **Contact** (`05`) — big serif CTA
8. **Footer** — credit + socials

---

## 2. Typography

| Token | Stack |
|---|---|
| `--serif` | `'Newsreader', Georgia, 'Times New Roman', serif` |
| `--sans`  | `'Hanken Grotesk', system-ui, -apple-system, sans-serif` |

Load from Google Fonts: Newsreader (optical 6–72, weights 300/400/500, plus italics 300/400/500) and Hanken Grotesk (400/500/600).

**Serif** is for display: name, section titles, post titles, company names, the hero pitch, big numbers, contact CTA. Often italic for small editorial accents (section numbers, education notes).
**Sans** is the body/UI face. Base body = `17px / 1.6`.

Type scale (all serif unless noted, `clamp(min, vw, max)`):
- Hero name: `clamp(48px, 10vw, 104px)`, weight 400, line-height 0.96, letter-spacing −0.025em, `white-space: pre-line` (name breaks across two lines).
- Hero pitch: `clamp(20px, 2.6vw, 28px)`, weight 300, line-height 1.42, `max-width: 24ch`. Emphasised keywords use `<em>` → ink color + italic.
- Contact title: `clamp(40px, 8vw, 80px)`, weight 400.
- Section title: `clamp(32px, 5vw, 50px)`, weight 400, letter-spacing −0.02em.
- Company name: `clamp(24px, 3.2vw, 32px)`, weight 500.
- Post title: `23px`, weight 500.
- Section number (italic serif): `16px`, accent color.
- Body / bullets: `15.5–17px` sans.
- Eyebrows / labels (sans): `12–15px`, `letter-spacing: 0.04–0.08em`, `text-transform: uppercase`.

---

## 3. Color tokens

All colors are **oklch**. Neutrals are warm (low chroma toward hue ~55–80). Accent is a single hue, swappable. Define neutrals on `:root` and `:root[data-theme='dark']`; set the accent trio (`--accent`, `--accent-ink`, `--accent-soft`) at runtime from the chosen palette + theme.

### Neutrals — Light (warm paper)
```css
--paper:     oklch(0.972 0.013 79);
--paper-2:   oklch(0.945 0.016 78);
--card:      oklch(0.99 0.006 85);
--ink:       oklch(0.27 0.018 55);
--ink-soft:  oklch(0.42 0.02 52);
--muted:     oklch(0.56 0.018 55);
--faint:     oklch(0.7 0.015 60);
--line:      oklch(0.88 0.014 72);
--line-soft: oklch(0.92 0.012 75);
```

### Neutrals — Dark
```css
--paper:     oklch(0.205 0.012 56);
--paper-2:   oklch(0.245 0.014 56);
--card:      oklch(0.255 0.014 56);
--ink:       oklch(0.94 0.012 80);
--ink-soft:  oklch(0.82 0.014 78);
--muted:     oklch(0.68 0.016 70);
--faint:     oklch(0.55 0.016 65);
--line:      oklch(0.36 0.016 58);
--line-soft: oklch(0.31 0.014 58);
```

### Accent palettes
Each palette defines 4 values: `l` = accent (light theme), `d` = accent (dark theme), `li` = accent-ink (light), `di` = accent-ink (dark). `accent-ink` is a darker/more-saturated variant used for small text on paper so it stays legible.

```js
const PALETTES = {
  Terracotta: { l:'oklch(0.585 0.125 42)',  d:'oklch(0.72 0.12 48)',  li:'oklch(0.46 0.12 42)',  di:'oklch(0.78 0.12 50)'  },
  Ochre:      { l:'oklch(0.62 0.12 75)',    d:'oklch(0.78 0.11 82)',  li:'oklch(0.5 0.11 72)',   di:'oklch(0.82 0.11 84)'  },
  Olive:      { l:'oklch(0.55 0.09 130)',   d:'oklch(0.72 0.1 135)',  li:'oklch(0.45 0.09 128)', di:'oklch(0.78 0.1 138)'  },
  Indigo:     { l:'oklch(0.5 0.11 270)',    d:'oklch(0.7 0.12 275)',  li:'oklch(0.45 0.12 270)', di:'oklch(0.76 0.12 278)' },
  Plum:       { l:'oklch(0.52 0.13 350)',   d:'oklch(0.72 0.12 352)', li:'oklch(0.45 0.13 350)', di:'oklch(0.78 0.12 354)' },
};
```

Apply (per theme):
```js
--accent      = isDark ? p.d  : p.l;
--accent-ink  = isDark ? p.di : p.li;
--accent-soft = color-mix(in oklab, <accent> <isDark?16:12>%, transparent);
```

#### ⚑ Palette decision: Terracotta vs Indigo
You're choosing between two directions. Both use the **same warm cream neutrals** above — only the accent hue changes.

- **Terracotta** (`hue 42`) — warm, earthy, editorial. Harmonises with the cream paper (everything stays in the warm family). Feels crafted / human. **Recommended** — it's cohesive with the portrait (brick-wall background) and the overall tone.
- **Indigo** (`hue 270`) — cool, technical, "engineer" signal. Creates a deliberate warm-paper / cool-accent contrast that reads more corporate-tech. Sharper, less cozy.

Pick one as the shipped default; the palette switcher can keep the rest as options, or you can drop the switcher and hard-code the winner. If unsure, ship **Terracotta** and keep Indigo as the alternate.

### Usage rules
- `--accent`: primary button fill, wordmark dot, section numbers, bullet ticks, hover underlines, post arrow, big-number context.
- `--accent-ink`: small accent **text** on paper (eyebrow role label, post category, highlight pills, links) — never use raw `--accent` for small text on light bg, contrast is too low.
- `--accent-soft`: pill/badge backgrounds, `::selection` background.
- Primary button text = near-white on light (`oklch(0.99 0.01 85)`); on dark, dark ink (`oklch(0.18 0.02 56)`).

---

## 4. Spacing & layout primitives

```css
--maxw: 1080px;                 /* content column */
--pad:  clamp(20px, 5vw, 64px); /* horizontal page padding */
```
- `.wrap` = `max-width: var(--maxw); margin-inline: auto; padding-inline: var(--pad)`.
- Section vertical rhythm: `padding: clamp(64px, 9vh, 110px) 0`. Consecutive sections separated by a `1px solid var(--line-soft)` top border.
- Section head bottom margin: `clamp(40px, 6vh, 64px)`.
- Radii: buttons/pills `999px`; chips & portrait `6–7px`; grid cards `14px`; tweaks panel `16px`.
- **Use flex/grid with `gap`** for all groups (chips, nav, stats, CTAs) — not inline-flow or per-item margins.

Breakpoints (max-width): `860` (hero stacks), `760` (hide nav), `720` (edu stacks), `680` (timeline/posts stack), `640`, `460`.

---

## 5. Component specs

### Header
- Sticky, `z-index: 40`, transparent until scrolled, then `background: color-mix(in oklab, var(--paper) 85%, transparent)` + `backdrop-filter: blur(10px) saturate(1.2)` + bottom border `var(--line)`.
- Left: **wordmark** = serif name (20px / 500) + accent dot.
- Center: **nav** links (14px, `--ink-soft`), animated left→right underline on hover in `--accent`. Hidden < 760px.
- Right: **tools** = pill buttons (36px tall, `border-radius: 999px`, `1px solid var(--line)`): EN/ES toggle (active locale in `--accent-ink` 600, other in `--faint`) and a theme toggle.

### Hero
- `.hero-grid`: two columns `minmax(0,1.15fr) minmax(0,0.85fr)`, `gap: clamp(32px,5vw,72px)`, `align-items: center`. Stacks to one column < 860px, with the **portrait moved above** the text (`order: -1`, `max-width: 320px`).
- Left column, in order:
  1. **Availability** pill-ish line: green status dot (`oklch(0.7 0.15 150)` with a soft ring via box-shadow) + text "Open to new roles · 2026".
  2. **Role eyebrow**: uppercase, `--accent-ink`, 600, letter-spacing 0.04em.
  3. **Name** (serif display, two lines via `\n` + `white-space: pre-line`).
  4. **Pitch** (serif, max 24ch, key phrase wrapped in `<em>`).
  5. **Stats line** (`.hero-stats`): a single thin flex row, wraps. Each stat = serif bold number (`19px`, `--ink`) + sans label (`14px`, `--muted`), separated by a small `3px` dot via `::after`. Current metrics: `9 years engineering · 50+ teams on the design system · Millions of passengers reached · 10+ countries`.
  6. **Meta**: location · remote (14px `--muted`, dot separator).
  7. **CTAs**: primary "Get in touch" (filled accent) + ghost "Download CV".
- Right column: **portrait** — a 4:5 rounded image (`border-radius: 7px`, `1px solid var(--line)`). In the reference build this is a drag-to-fill slot; for a static build just use an `<img>` with `object-fit: cover`. Asset: `images/portrait-crop.png` (608×760).

### Buttons (`.btn`)
- `height: 50px`, `padding: 0 24px`, `border-radius: 999px`, `font 15px/500`, `1px solid var(--line)`, optional leading icon (17px).
- Hover: `translateY(-1px)`.
- `.btn-primary`: accent fill, near-white text, hover glow `box-shadow: 0 10px 26px -10px color-mix(in oklab, var(--accent) 70%, transparent)`.
- `.btn-ghost`: hover → border `--ink-soft`, bg `--card`.

### Section head
- Italic serif number in accent (`01`…`05`) → serif title → `--muted` subtitle (`max-width: 56ch`).

### Experience timeline
- Each entry = grid `132px 1fr`, `gap: clamp(20px,4vw,52px)`, separated by `1px solid var(--line-soft)`. Stacks < 680px (aside becomes an inline baseline row).
- **Aside**: years (serif 19px) · sector (uppercase 12px `--faint`) · location (13px `--muted`).
- **Main**: company (serif `clamp(24px,3.2vw,32px)`/500) → **highlight pill** (accent-soft bg, `--accent-ink` text, `border-radius: 999px`, with a small star) → one or more **roles**.
- **Role**: head row = title (17px/600) + period (13px `--muted`, `font-variant-numeric: tabular-nums`, `white-space: nowrap`). Bullets: custom marker = a `7px` accent dash (`::before`), `15.5px`, `--ink-soft`.
- **Stack chips**: `font 12.5px`, `padding: 4px 11px`, `1px solid var(--line)`, `border-radius: 6px`, `background: var(--card)`.

### Skills
- Grid `repeat(auto-fit, minmax(200px, 1fr))` with a hairline look: `gap: 2px` over a `--line-soft` background + `1px` border, `border-radius: 14px`, `overflow: hidden` (cells are `--paper`, 26×24px padding). Each col: serif label (18px) with bottom rule, then a vertical `gap:9px` list of `15px --ink-soft` items.

### Education & beyond
- Two columns (`1fr 1fr`, stacks < 720px): left = education card (serif school 24px/500, degree, line of place·years in 13px `--muted`, italic serif notes); right = **details list** (`.facts-list`) — rows of `130px 1fr` (`k` 14px/600 ink, `v` 15px `--ink-soft`), hairline top borders.

### Writing
- Two-col card grid, same `gap:2px` hairline technique as Skills, `border-radius: 14px`. Each post: meta row (category in `--accent-ink` 600 · date · read-time, dot-separated) → serif title (23px/500) → excerpt (15px `--ink-soft`) → footer pinned to bottom (`margin-top:auto`) with tags + an accent arrow that nudges `translate(3px,-3px)` on hover. Below grid: a "Read all posts" link with accent bottom-border that widens its gap on hover.

### Contact
- Centered. Big serif title (`clamp(40px,8vw,80px)`), `--muted` subtitle (max 50ch), centered button row (primary email + secondary links).

### Footer
- Top border `--line`. Space-between row: credit text (13px `--muted`) + socials (hover → `--accent-ink`).

### Tweaks panel (optional / dev affordance)
- Fixed bottom-right card (264px, `border-radius: 16px`, blurred `--card` bg, soft shadow). Only needed if you keep the live palette switcher. Contains a row of color **swatches** (30px dots, active = `2px solid var(--ink)` ring). If you ship a single palette, you can omit this entirely.

---

## 6. Content data model

Copy is bilingual. Shape (per locale `en` / `es`):
```
hero:    { available, role, name (with \n), pitch, location, remote, cta1, cta2 }
facts:   [ { n, l } ]            // the hero stats line
nav:     { work, skills, writing, contact }
work/skills/education/writing/contact: { num, title, sub, ... }
eduList: [ { school, degree, place, years, notes } ]
additional: [ { label, value } ] // Industries / Languages / Work authorization
skillGroups: [ { label, items[] } ]
posts:   [ { date, category, readTime, title, excerpt, tags[] } ]
```
Experience is a separate array; each company has bilingual `sector`, `highlight`, `location`, and `roles[]` with bilingual `bullets`:
```
{ id, company, sector{en,es}, years, location{en,es}, highlight{en,es},
  roles:[ { title{en,es}, period, bullets:{en:[],es:[]} } ], stack:[] }
```
Use the attached CV (`uploads/cv-rodrigo-bustamante-general.pdf`) as the source of truth for facts. Note the framing is **deliberately not aviation-led** — describe scale/platforms/design-systems; aviation is mentioned only as one industry among several.

---

## 7. Assets
- `images/portrait-crop.png` — hero portrait, 4:5 (608×760). Original full-res at `images/portrait.png`.
- CV PDF linked from the "Download CV" button.

## 8. Accessibility & polish
- Respect `prefers-reduced-motion` (no reveal transforms, show final state).
- Maintain contrast: small accent text always uses `--accent-ink`, never `--accent`.
- Hit targets ≥ 36px (tools) / 50px (buttons).
- `text-wrap: pretty` on prose; `tabular-nums` on dates/periods.
- Smooth scroll; never use `scrollIntoView` in a way that hijacks layout.

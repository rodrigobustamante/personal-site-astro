# Self-hosted fonts

Newsreader and Hanken Grotesk, both OFL, from Google Fonts. The files here are
**partial instances** of the variable fonts, cut down to the axis ranges the
site actually uses. The full latin subsets were 129–147 KB each because of the
`opsz` (optical size) axis; these are 22–85 KB with identical rendering in the
range used.

| File                        | Axes kept                                                                 |
| --------------------------- | ------------------------------------------------------------------------- |
| `newsreader-normal-*.woff2` | `wght` 300–500, `opsz` 18–72 (body text at 17px up to the 72px hero name) |
| `newsreader-italic-*.woff2` | `wght` 300–400, `opsz` pinned at 18 (italic only appears at text sizes)   |
| `hanken-normal-*.woff2`     | `wght` 400–600                                                            |

The `@font-face` rules in `src/layouts/PortfolioLayout.astro` must declare the
same `font-weight` ranges.

## Rebuilding

Start from the Google Fonts CSS API subsets (`latin` and `latin-ext` of each
family, variable, `display=swap`), then instance with
[fonttools](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html):

```bash
python3 -m venv .venv && .venv/bin/pip install fonttools brotli

# Newsreader upright: keep weight 300–500 and optical size 18–72
.venv/bin/fonttools varLib.instancer newsreader-normal-latin.woff2 wght=300:500 opsz=18:72 -o out/newsreader-normal-latin.woff2
# Newsreader italic: keep weight 300–400, pin optical size to the text cut
.venv/bin/fonttools varLib.instancer newsreader-italic-latin.woff2 wght=300:400 opsz=18 -o out/newsreader-italic-latin.woff2
# Hanken Grotesk: keep weight 400–600
.venv/bin/fonttools varLib.instancer hanken-normal-latin.woff2 wght=400:600 -o out/hanken-normal-latin.woff2
```

Repeat for the `-latin-ext` files with the same arguments. If a new weight or
an italic display size is introduced in the CSS, widen the range here first.

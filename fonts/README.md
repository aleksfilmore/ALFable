# Self-hosted fonts

These typefaces are served directly from the site (first-party), so they load for
every visitor with no third-party request and no cookie-consent gate.

| Role | Family | Files | License |
|------|--------|-------|---------|
| Display serif | Fraunces | `fraunces-wght-normal.woff2` (+`-ext`), `fraunces-wght-italic.woff2` (+`-ext`) | SIL Open Font License 1.1 |
| Body / UI | Schibsted Grotesk | `schibsted-grotesk-wght-normal.woff2` (+`-ext`) | SIL Open Font License 1.1 |
| Mono / labels | Spline Sans Mono | `spline-sans-mono-wght-normal.woff2` (+`-ext`) | SIL Open Font License 1.1 |

All are variable fonts (weight axis), sourced via Fontsource (https://fontsource.org).

Each family ships in two `unicode-range` slices: the base file covers the `latin`
subset, and the `-ext` file covers `latin-ext`, which carries the Romanian
comma-below forms (ă ș ț — U+0102/0103, U+0218–021B). The browser downloads the
`-ext` file only on pages that actually contain those characters, so the English
pages pay nothing for Romanian coverage. See the `@font-face` blocks in
`styles.css` / `legal.css` for the exact ranges.

The SIL OFL permits bundling and self-hosting on the web.
Full license text: https://openfontlicense.org

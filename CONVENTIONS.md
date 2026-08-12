# Conventions

Why this repo is shaped the way it is. `README.md` covers how to use it; this file
records the decisions and the measurements behind them, so the next person does not
undo one by "simplifying" it.

Every number here was measured on this setup, not taken from documentation.

## Serving pages and an API from one site

The desktop app reads `api/*.json`; people read the pages. Both come from this one
repo because the payload is small and rarely changes — but they want opposite
things, and the split shows up in the layout:

| | Pages | API (`api/*.json`) |
|---|---|---|
| Freshness | Whenever | Should be current |
| URL stability | Free to change | Fixed — clients hardcode it |
| Build involvement | Compiled by VitePress | **Passed through untouched** via `docs/public/` |

`docs/public/` is the important part: VitePress copies it to the site root without
fingerprinting or rewriting, so `docs/public/api/index.json` is exactly
`/api/index.json`. Putting the API anywhere else would subject a client contract to
the build's asset pipeline.

## The API contract

**One entry point.** Clients hardcode only `api/index.json` and read every other URL
from responses. Two payoffs: a client never guesses a path, so it never hits the
~9 KB HTML 404 that static hosting returns (which surfaces as an opaque JSON parse
error); and moving domain or CDN touches one place.

**Manifests store repo-relative paths.** `"path": "zh/workflows/xiaohongshu"`, not an
absolute URL. Clients join `base + path`.

**Array order is part of the contract.** It drives card order on the home page and
mirrors the desktop app's own order, which is derived from a hardcoded id list
(`DEFAULT_MARKET_CARD_IDS`) rather than alphabetical — so sorting the JSON would
silently change the presentation.

**Adding a field is safe; renaming or removing one is breaking.** Clients ignore
unknown fields.

## Symmetry between the languages

Both languages live under a prefix (`/zh/`, `/en/`) instead of one at the root. That
keeps the page tree symmetric with the API file names, and adding a third language
needs no restructuring.

The consequence is a hard constraint: `LangSwitch` only rewrites the leading path
segment, so **a page that exists in one language only makes the switcher point at a
404**. `check:api` enforces symmetry rather than trusting anyone to remember.

## Two bugs that shaped the checks

Both shipped and were caught late. Both were invisible to manual spot-checking,
which is the reason `scripts/` exists.

**1. Two language switchers at once.** VitePress relocates its language flyout at
1280px (into the `...` extra menu) and again at 768px (into the full-screen menu).
Our inline switcher was visible from 768px up, so **between 768px and 1280px the
page showed two of them**. Checking a couple of wide viewports by eye could never
find this — breakpoints have to be enumerated, which is what `check:responsive`
does.

**2. Mermaid was unreadable in dark mode.** `vitepress-plugin-mermaid` swaps mermaid
to its own dark theme when the site is dark, discarding the `themeVariables` set in
`config.ts`. Nodes came out `#1F2020` against a `#242422` page — measured contrast
**1.05:1**, i.e. no visible structure — and a light container we had added made it
worse. Fixed by re-applying the brand palette in CSS with `!important` (mermaid
injects its palette as a `<style>` block *inside* the SVG, which wins on load
order).

The lesson generalises: **at dark-mode luminances, fill colour carries almost no
signal.** Any two dark surfaces land near 1.2:1. The readable cue is the stroke —
`#0099FF` on `#242422` measures 5.18:1. So dark-mode components are outlined, not
filled.

## Why the default language switcher was replaced

VitePress renders the *current* language as an unclickable menu heading and offers
only the other one as a link. With exactly two languages, the two labels therefore
**swap places on every switch**, so toggling back and forth looks like the menu is
jumping around. On phones it is worse: three taps (hamburger → expand the language
group → pick one).

A flyout is designed for many locales. With two, both labels fit side by side at
fixed positions — no hover, one click, and `check:responsive` asserts exactly one
switcher is visible at every breakpoint.

## Fonts

The desktop app loads Plus Jakarta Sans from `fonts.googleapis.com`. It can afford
that: it ships a CSP allowlist and runs locally. A public site cannot — Google Fonts
is unreachable from mainland China, and a render-blocking stylesheet there means a
white screen until it times out.

Self-hosted via `@fontsource`, latin subset only (12 KB per weight): the typeface has
no CJK glyphs, so Chinese falls through to the system stack exactly as it does in the
app.

`vitepress/theme-without-fonts` is used instead of `vitepress/theme`, which drops the
bundled Inter. That took the font payload from **18 files / 704 KB to 4 files / 52 KB**.
It is VitePress's own entry point for this, not a workaround.

## Colour and contrast

Design tokens are ported from the app's `renderer/styles/tokens.css` so the two read
as one product, including the dark theme's **warm** neutral grey (`#242422`, R=G with
B two lower). That warmth is deliberate — the app's earlier cool blue-grey was
reported as tiring, since at equal luminance a cool tone reads heavier.

One value could not be carried over as-is. `--vp-c-brand-1` is used for link text, and
the app's `#0099FF` measures ~2.9:1 on white — below WCAG AA's 4.5:1. Acceptable in a
dark-first app, not on a public light-mode page. Link text uses `#0072CC` (~4.9:1);
the untouched brand blue stays on hover and decoration. In dark mode `#0099FF` on
`#242422` is ~5.3:1 and is used directly.

## Mermaid's cost, accepted with eyes open

Enabling mermaid takes first load from **275 KB to about 2.3 MB**: its core lands in
`app.js` (1.3 KB → 624 KB) and 44 diagram chunks get `modulepreload`d, so the browser
fetches all of them even on a page with no diagram. Against the 100 GB/month soft
limit that is roughly 43k visits instead of 380k.

This was accepted knowingly — flow diagrams are the point of a workflow showcase.
Two things were tried first and failed: the plugin has no lazy-loading option (it
registers the component synchronously), and registering it as an async component
breaks the build, because rollup cannot resolve a dynamic import of a `.vue` file
inside `node_modules`.

If traffic ever makes this matter, the way out is to stop the plugin's global
synchronous registration and load mermaid only on pages that use it.

## Verification

**Verify from inside the serving network.** `github.io` failed 3/3 from the machine
this was authored on while `api.github.com` stayed up, so a local curl cannot confirm
a deployment. The smoke test runs in the CI runner after `deploy-pages`.

**Assert content-type, not just status.** A JSON route silently downgraded to
`text/plain` is a real failure mode on this class of host, and it breaks exactly those
clients that branch on the header.

**Enumerate breakpoints; do not sample them.** See the first bug above.

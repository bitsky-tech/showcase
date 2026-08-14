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

**Manifests store repo-relative paths.** `"path": "zh/workflows/price-monitor"`, not
an absolute URL. Clients join `base + path`.

**Array order is part of the contract.** It drives card order both on the home page
and in the desktop app, which renders the array as it arrives — so sorting the JSON
alphabetically would silently change the presentation in two places.

**Adding a field is safe; renaming or removing one is breaking.** Clients ignore
unknown fields, so a new one costs nothing. Removing one has to be done from the
client end first: its schema validates the payload, and a field it still requires
but no longer receives fails the whole parse. See *Every field is a field somebody
renders* below.

## A comment is not evidence

The payload carried `goal`, `requirement` and `output` for two days — one-line
answers to "what is this for / what do I need / what do I get". Added 2026-08-12
alongside the desktop client's data layer, removed 2026-08-14, once it turned out
**nothing had ever rendered them**: `git log -S'workflow.goal'` over the client's
dialog component returns no commits at all.

The card shows `name`, `desc`, `domain` and `status`. The preview dialog embeds
this site's own page instead of composing one out of fields, so it needs only
`path` and `name` — and it has done that since its first commit. This site's grid
reads the same six.

What kept the three alive was a comment in the client's schema stating the dialog
rendered them, and a matching one here saying a missing field would leave a blank
row there. Both described a plan; neither described the code that shipped. Nothing
failed, because nothing was reading the fields to begin with — the checks only
confirmed they were present and non-empty, which they always were.

So: **before writing a check that enforces a field, find the line that reads it.**
A comment naming a consumer is a claim about code, and the way to test that claim
is `git log -S` on the consumer, not a re-read of the comment.

Removal order matters, and it is the opposite of what feels natural: the client's
zod schema required all three, so deleting them here first would have failed
validation in every shipped build. The client dropped them from its schema first
(`.passthrough()` meant it ignored the ones still arriving), and only then did the
payload stop carrying them.

## Bypassing a check means owning what it was doing

Workflow files (`.amphi-workflow`) are offered for download from two tutorials.
The obvious spelling — a markdown link to a file sitting next to the page —
fails the build, and the error is actively misleading:

```
Found dead link ./downloads/%E4%B8%8A%E6%8A%A5...amphi-workflow
[vitepress] 3 dead link(s) found.
```

The files were **committed and present**. VitePress resolves a markdown link
against its page routes unless the extension is one it treats as an asset;
`.amphi-workflow` is not, so each link was read as a route, matched no page, and
`ignoreDeadLinks: false` turned that into a failed build. Reproduced by creating
the files and building: identical errors. Reading "dead link" as "file missing"
sends you looking in the wrong place — the fix is the *link*, not the file.

What works: the file in `docs/public/` (copied to the site root untouched, no
pipeline to confuse), linked with a raw `<a>` tag, carrying `download` — the
server recognises no extension here and sends an empty `Content-Type`, so a
browser may otherwise render the bytes instead of saving them.

The part worth generalising is what raw HTML costs. The dead-link check only
parses markdown link syntax, so switching to `<a>` gets the build passing by
**opting out of the check**, not by satisfying it. That trade is usually invisible
and always one-way: a typo in that href would now build clean, deploy clean, and
404 on click — strictly worse than the failure it replaced, which at least
announced itself. So `check:api` re-imposes the guarantee: every
`href="/downloads/..."` must exist under `docs/public` and must carry `download`.

**When you route around a check, you inherit its job.** Three of this repo's
checks now exist for exactly that reason — links hardcoded in `config.ts`, pages
absent from the payload, and these download links — each one covering a place the
framework stopped looking.

## The languages are allowed to diverge

Both languages live under a prefix (`/zh/`, `/en/`) instead of one at the root, so
adding a third needs no restructuring.

`check:api` used to enforce that the two page trees were identical. That was
abandoned, because it encoded a false assumption: it treated translation as part of
publishing a workflow. In practice a tutorial is written in Chinese and translated
later or never, so the rule blocked correct work — and its failure output buried the
real mistakes in noise. The branch that triggered the change produced four errors,
two of which were "no English counterpart" for pages nobody had translated yet.

What replaced it is narrower and strictly more useful: **each language is checked
against its own payload, in both directions.** Every `docs/<lang>/workflows/*.md`
must have an entry in `workflows.<lang>.json`, and every entry's `path` must point at
a page that exists. Translation lag cannot trip either one. Run against that same
branch, the new rule reports two errors instead of four, and both are real: the
branch had overwritten the `xiaohongshu` and `feishuDaily` entries instead of
appending, dropping two workflows off the home page. The old symmetry rule caught
that only by accident.

Across languages exactly one rule survives — `status` must agree for an `id` both of
them carry — because a "verified" badge in one language and not the other is always
a mistake, never a work-in-progress state.

The cost is paid at the switcher. `LangSwitch` only rewrites the leading path
segment, so a page that exists in one language only would point at a 404. Rather
than let that ship, the switcher is **hidden on workflow detail pages** — the only
place where a counterpart is likely to be missing. Everything else (home, the
workflow index, the API page) is bilingual by construction and keeps it.

**Drafts.** A file named `_<slug>.md` is exempt from the payload check, and
`config.ts` excludes `**/_*.md` from `build` while leaving it in `dev`. Both halves
are needed: VitePress otherwise publishes a draft like any other page *and* indexes
its text in the local search, so readers would find unfinished work by searching.
The exemption is symmetric — a payload entry may not point at a draft either, since
that would be a card leading to a 404 on the live site.

## The nav and sidebar were hand-maintained lists

Both are gone. Every new page needed an entry added to `config.ts` in lockstep, in
both languages, and nothing failed if you forgot — the page simply had no route into
it. That is exactly the failure the payload check now catches, so keeping a second
hand-written index alongside it bought nothing. The card grid on the home page is
the index, and it reads the same payload the API serves.

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
fixed positions — no hover, one click, and `check:responsive` asserts the switcher
count at every breakpoint (one, or none on workflow detail pages).

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

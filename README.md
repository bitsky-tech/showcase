# showcase

Workflow showcase and data API for bridgic clients, served from
`showcase.bridgic.ai`. Built with VitePress, bilingual (`zh` / `en`) with a
symmetric page tree and a matching pair of JSON endpoints.

One site serves both audiences: humans read the pages, the desktop app reads
`api/*.json`. The home page grid and the API are driven by the **same payload**,
so a card and a client can never disagree about what exists.

## Quick start

```bash
bun install
bun run dev        # http://localhost:5173  (add --host to expose on the LAN)
bun run build
bun run preview    # serves the built site on :4173
```

## Layout

| Path | Purpose |
|---|---|
| `docs/zh/**`, `docs/en/**` | Pages. The two trees are kept symmetric — enforced by `check:api` |
| `docs/index.md` | Root redirect; picks a language from the browser |
| `docs/public/api/*.json` | Hand-written data endpoints, published verbatim |
| `docs/public/assets/` | Brand logo and favicon |
| `docs/.vitepress/config.ts` | Locales, nav, sidebar, markdown and mermaid setup |
| `docs/.vitepress/theme/` | Brand tokens, the workflow card grid, the language switcher |
| `scripts/` | Pre-publish checks (see below) |
| `README.md`, `CONVENTIONS.md` | **Never published** — CI only uploads the built site |

Anything under `docs/public/` is copied to the site root untouched, which is why
the API lives there: `docs/public/api/index.json` serves at `/api/index.json`, with
no build step in between.

## Adding a workflow

Four edits, and the checks will tell you if you miss one:

1. `docs/zh/workflows/<slug>.md` and `docs/en/workflows/<slug>.md`
2. An entry in **both** `api/workflows.zh.json` and `api/workflows.en.json`
3. Sidebar entries for both languages in `config.ts`
4. `bun run check:api`

## Bilingual contract

Both languages sit under a prefix (`/zh/`, `/en/`) rather than one at the root.
That keeps pages symmetric with the API (`workflows.zh.json` / `workflows.en.json`),
and a third language needs no restructuring.

The language switcher only rewrites the leading path segment, so
`/zh/workflows/pdf-extract` becomes `/en/workflows/pdf-extract` and the reader stays
on the same page. This only works while the trees stay symmetric, which is why
`check:api` fails the build on a page that exists in one language only.

## API

| Purpose | URL |
|---|---|
| Endpoint index | `https://showcase.bridgic.ai/api/index.json` |
| Workflows (zh) | `https://showcase.bridgic.ai/api/workflows.zh.json` |
| Workflows (en) | `https://showcase.bridgic.ai/api/workflows.en.json` |

Clients hardcode only `index.json` and discover the rest from its response.
Fields map one-to-one onto the desktop app's `MarketCard` (`name`, `desc`,
`domain`, `status`), plus `id` and `path`. Full reference on the site itself at
`/zh/api` and `/en/api`.

Two rules that are easy to get wrong:

- **Array order is meaningful** — it drives the card order and mirrors the desktop
  app. Do not sort alphabetically.
- **`path` is repo-relative**, not an absolute URL. Clients join `base + path`, so
  moving to another domain or CDN changes one client constant.

## Checks

Run both before publishing. CI runs `check:api`; `check:responsive` needs a browser
and is run locally.

```bash
bun run check:api          # data + structural integrity
bun run preview & bun run check:responsive   # layout across breakpoints
```

`check:api` catches the two languages drifting apart, `status` disagreeing between
them, `path` pointing at a missing page, links hardcoded in `config.ts` that
resolve to nothing (VitePress only validates links written in markdown), and pages
that exist in one language only.

`check:responsive` drives a real browser across eight viewports and asserts exactly
one language switcher is visible, nothing overflows horizontally, all six cards
render inside the viewport, and dark-mode contrast stays within WCAG AA. It exists
because a real bug shipped that eyeballing two wide viewports could not catch —
see `CONVENTIONS.md`.

## Deployment

Push to `main`; Actions builds and deploys. The workflow validates data before
building, smoke-tests the deployed site from inside the runner, and purges the
jsDelivr mirror.

One-time setup, in this order:

1. Settings → Pages → Source: **GitHub Actions** (must be done by hand —
   `GITHUB_TOKEN` cannot create a Pages site)
2. DNS: `CNAME showcase → bitsky-tech.github.io.` (on Cloudflare this record must
   be **DNS only**, grey cloud, or the certificate will not issue)
3. Settings → Pages → Custom domain: `showcase.bridgic.ai`
4. Enable **Enforce HTTPS** once the certificate is issued — allow up to an hour
   for it to reach the edge

## Known constraints

| Constraint | Value | Consequence |
|---|---|---|
| CDN cache | `max-age=600` | An edit takes up to 10 minutes to appear. `?v=` does not help — the query is stripped from the cache key |
| 404 response | ~9 KB **HTML**, not JSON | Clients must check `res.ok` before parsing |
| CORS | `access-control-allow-origin: *` | Clients fetch cross-origin directly, no proxy |
| Published size | 1 GB, enforced | Deploys fail past it |
| Monthly bandwidth | 100 GB, soft | mermaid puts first load at ~2.3 MB, so roughly 43k visits |
| Mermaid cost | +2 MB on first load | Accepted deliberately: flow diagrams are worth it here. See `CONVENTIONS.md` for the measurements and the way out if traffic grows |

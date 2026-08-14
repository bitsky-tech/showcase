# showcase

Workflow showcase and data API for bridgic clients, served from
`showcase.bridgic.ai`. Built with VitePress, bilingual (`zh` / `en`) with a pair
of JSON endpoints, one per language.

One site serves both audiences: humans read the pages, the desktop app reads
`api/*.json`. The home page grid and the API are driven by the **same payload**,
so a card and a client can never disagree about what exists.

## Quick start

```bash
bun install
bun run dev        # http://localhost:5273  (add --host to expose on the LAN)
bun run build
bun run preview    # serves the built site on :4273
```

Both ports are set explicitly in `package.json`, off Vite's defaults (5173 /
4173) so a stray dev server from another project cannot answer — or be answered
by — these.

## Layout

| Path | Purpose |
|---|---|
| `docs/zh/**`, `docs/en/**` | Pages. The two trees are independent — see *Bilingual contract* |
| `docs/**/_*.md` | Drafts. Rendered by `dev`, never built or published |
| `docs/index.md` | Root redirect; picks a language from the browser |
| `docs/public/api/*.json` | Hand-written data endpoints, published verbatim |
| `docs/public/assets/` | Brand logo and favicon |
| `docs/.vitepress/config.ts` | Locales, nav, markdown and mermaid setup |
| `docs/.vitepress/theme/` | Brand tokens, the workflow card grid, the language switcher |
| `scripts/` | Pre-publish checks (see below) |
| `README.md`, `CONVENTIONS.md` | **Never published** — CI only uploads the built site |

Anything under `docs/public/` is copied to the site root untouched, which is why
the API lives there: `docs/public/api/index.json` serves at `/api/index.json`, with
no build step in between.

## Adding a workflow

Two edits per language, and `check:api` will tell you if you miss one:

1. `docs/<lang>/workflows/<slug>.md`
2. An entry in `api/workflows.<lang>.json` whose `path` is `<lang>/workflows/<slug>`
3. `bun run check:api`

Write it in one language and ship it — the other language can follow later, or
never. There is no sidebar and no nav entry to maintain: the card grid on the home
page is the index, and it is driven by the payload.

**Drafts.** Name the file `_<slug>.md` while it is unfinished. `bun run dev`
renders it so you can preview, `bun run build` drops it, and `check:api` does not
ask for a payload entry. The reverse is enforced too: an entry may not point at a
draft, since that would be a card leading to a 404. Rename when it is ready.

## Offering a file for download

For anything the reader downloads rather than views — an exported
`.amphi-workflow`, a sample dataset — follow this exactly. The obvious way does
not work, and fails in a way that is easy to misread:

1. Put the file in `docs/public/downloads/`, with an **ASCII name**.
2. Link it with a raw `<a>` tag and the `download` attribute:
   ```html
   <a href="/downloads/report-dev-task.amphi-workflow" download>上报开发任务</a>
   ```
3. `bun run check:api`

Why each part, since none of it is guessable:

- **`docs/public/`** is copied to the site root untouched. Under `docs/` the file
  goes through the asset pipeline, which only recognises extensions it knows.
- **Raw `<a>`, not `[text](link)`** — VitePress resolves a markdown link against
  its *page routes* unless the extension is a known asset type. An unknown one is
  read as a route, matches no page, and `ignoreDeadLinks: false` fails the build
  **even though the file is right there**. The error says "dead link", which reads
  like the file is missing; it is not.
- **`download`** — the server recognises no extension here and sends an empty
  `Content-Type`, so without it a browser may render the bytes instead of saving
  a file.
- **ASCII name** — a name with spaces or CJK does resolve once encoded, but the
  emitted `href` carries the raw characters, and an unencoded request 404s.

Raw HTML buys its way past the dead-link check, so `check:api` re-imposes it:
every `href="/downloads/..."` must exist under `docs/public` and carry
`download`. Otherwise a typo would build clean, deploy clean, and 404 on click.

## Bilingual contract

Both languages sit under a prefix (`/zh/`, `/en/`) rather than one at the root, so
adding a third needs no restructuring.

**The trees do not have to match.** A workflow is written in one language and
translated whenever it is translated, so `check:api` compares each language only
against its own payload. Across languages it enforces exactly one thing: for an
`id` both of them carry, `status` must agree — otherwise a workflow shows a
"verified" badge in one language and not the other.

The language switcher only rewrites the leading path segment
(`/zh/workflows/pdf-extract` → `/en/workflows/pdf-extract`), which is only safe
where both trees carry the page. So it is **hidden on workflow detail pages** and
shown everywhere else — home, the workflow index and the API page are always
bilingual.

## API

| Purpose | URL |
|---|---|
| Endpoint index | `https://showcase.bridgic.ai/api/index.json` |
| Workflows (zh) | `https://showcase.bridgic.ai/api/workflows.zh.json` |
| Workflows (en) | `https://showcase.bridgic.ai/api/workflows.en.json` |

Clients hardcode only `index.json` and discover the rest from its response.
Six fields, each of them rendered: `name` / `desc` / `domain` / `status` on the
card, `path` for the page behind it, `id` as the stable key. Full reference on the
site itself at `/zh/api` and `/en/api`.

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

`check:api` keeps each language consistent with its own payload — every workflow
page has an entry, every entry's `path` points at a page that exists, no duplicate
ids, no empty fields, no entry pointing at a draft. Plus `status` agreeing across
languages for a shared id, and links hardcoded in `config.ts` that resolve to
nothing (VitePress only validates links written in markdown).

`check:responsive` drives a real browser across eight viewports and asserts the
expected number of language switchers is visible (one, or none on workflow detail
pages), nothing overflows horizontally, every card in the payload renders inside
the viewport, and dark-mode contrast stays within WCAG AA. It exists because a real
bug shipped that eyeballing two wide viewports could not catch — see
`CONVENTIONS.md`.

Start `preview` **after** `build`, and do not rebuild while it runs: it caches the
file list at startup, so a rebuild underneath it makes it serve stale HTML and then
crash on a missing chunk.

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

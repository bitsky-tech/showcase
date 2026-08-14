/**
 * Validates the hand-written API payloads under docs/public/api/.
 *
 * The payloads are hand-edited on purpose (no build step), so the guardrails
 * live here instead. The two languages are deliberately NOT required to match:
 * a workflow is written in Chinese first and translated whenever it is
 * translated, so demanding symmetry only ever blocked the Chinese half. Each
 * language is checked against itself, and the pair only where disagreeing is
 * always a mistake:
 *
 *   1. Every workflow page appears in its own language's payload, and every
 *      entry's `path` points at a page that exists. Both directions matter:
 *      overwriting an entry when meaning to append one drops the overwritten
 *      workflow off the home page, and a stale `path` turns a card click into a
 *      404 -- GitHub Pages answers a miss with a 9KB HTML body, so that is easy
 *      to ship unnoticed.
 *   2. Letting `status` drift between languages *for an id both of them carry*,
 *      which would show a "verified" badge in Chinese and not in English.
 *
 * A page whose file name starts with `_` is a draft: exempt from (1) in both
 * directions -- it needs no entry, and no entry may point at it. `config.ts`
 * keeps drafts out of `vitepress build`, so an entry pointing at one would be a
 * card leading to a 404 on the live site.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const API = join(DOCS, 'public', 'api')

const STATUSES = new Set(['verified', 'new'])
const errors: string[] = []
const fail = (message: string) => errors.push(message)

function readJson(path: string): unknown {
  if (!existsSync(path)) {
    fail(`missing file: ${path.replace(ROOT + '/', '')}`)
    return null
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (err) {
    fail(`invalid JSON in ${path.replace(ROOT + '/', '')}: ${(err as Error).message}`)
    return null
  }
}

interface Workflow {
  id: string
  name: string
  desc: string
  domain: string
  status: string
  path: string
}

/** Shape-check one entry; returns it only when every field is usable. */
function checkEntry(lang: string, index: number, raw: unknown): Workflow | null {
  const where = `${lang}[${index}]`
  if (typeof raw !== 'object' || raw === null) {
    fail(`${where}: not an object`)
    return null
  }
  const e = raw as Record<string, unknown>
  for (const key of ['id', 'name', 'desc', 'domain', 'status', 'path'] as const) {
    if (typeof e[key] !== 'string' || (e[key] as string).length === 0) {
      fail(`${where}: field '${key}' must be a non-empty string`)
      return null
    }
  }
  const entry = e as unknown as Workflow
  if (!STATUSES.has(entry.status)) {
    fail(`${where} (${entry.id}): status '${entry.status}' is not one of ${[...STATUSES].join(' | ')}`)
  }
  if (!entry.path.startsWith(`${lang}/`)) {
    fail(`${where} (${entry.id}): path '${entry.path}' should start with '${lang}/'`)
  }
  if (basename(entry.path).startsWith('_')) {
    fail(`${where} (${entry.id}): path '${entry.path}' is a draft, which never reaches the built site`)
  }
  const page = join(DOCS, `${entry.path}.md`)
  if (!existsSync(page)) {
    fail(`${where} (${entry.id}): path points at a missing page -- docs/${entry.path}.md`)
  }
  return entry
}

function loadLang(lang: string): Workflow[] {
  const data = readJson(join(API, `workflows.${lang}.json`)) as
    | { lang?: unknown; workflows?: unknown }
    | null
  if (data === null) return []
  if (data.lang !== lang) fail(`workflows.${lang}.json: 'lang' should be '${lang}', got ${JSON.stringify(data.lang)}`)
  if (!Array.isArray(data.workflows)) {
    fail(`workflows.${lang}.json: 'workflows' must be an array`)
    return []
  }
  return data.workflows
    .map((raw, i) => checkEntry(lang, i, raw))
    .filter((e): e is Workflow => e !== null)
}

// --- index.json points at both languages -----------------------------------
const index = readJson(join(API, 'index.json')) as { endpoints?: Record<string, unknown> } | null
const advertised = index?.endpoints?.workflows as Record<string, string> | undefined
if (!advertised) {
  fail("index.json: missing endpoints.workflows")
} else {
  for (const [lang, rel] of Object.entries(advertised)) {
    if (!existsSync(join(DOCS, 'public', rel))) {
      fail(`index.json advertises '${rel}' for ${lang}, which does not exist`)
    }
  }
}

// --- the two languages only have to agree where they overlap ----------------
// Which entries exist, and in what order, is each language's own business: the
// order drives that language's card grid, and a workflow may well be published
// in Chinese months before anyone translates it.
const zh = loadLang('zh')
const en = loadLang('en')

const enById = new Map(en.map((e) => [e.id, e]))
for (const z of zh) {
  const e = enById.get(z.id)
  if (e !== undefined && z.status !== e.status) {
    fail(`status differs for '${z.id}': zh '${z.status}' vs en '${e.status}'`)
  }
}

const dupes = (list: Workflow[], lang: string) => {
  const seen = new Set<string>()
  for (const e of list) {
    if (seen.has(e.id)) fail(`${lang}: duplicate id '${e.id}'`)
    seen.add(e.id)
  }
}
dupes(zh, 'zh')
dupes(en, 'en')


// --- config nav/sidebar links resolve to real pages ------------------------
// VitePress's `ignoreDeadLinks: false` only validates links written inside
// markdown. Links hardcoded in config.ts (nav and sidebar) are never checked, so
// a typo there ships a 404 that nothing catches.
const configSource = readFileSync(join(ROOT, 'docs', '.vitepress', 'config.ts'), 'utf8')
const configLinks = [...configSource.matchAll(/link:\s*'(\/[^']*)'/g)].map((m) => m[1] as string)
const seenLinks = new Set<string>()
for (const link of configLinks) {
  if (seenLinks.has(link)) continue
  seenLinks.add(link)
  const rel = link.replace(/^\//, '').replace(/\/$/, '')
  const candidates = rel === '' ? ['index.md'] : [`${rel}.md`, `${rel}/index.md`]
  if (!candidates.some((c) => existsSync(join(DOCS, c)))) {
    fail(`config.ts links to '${link}', but neither ${candidates.join(' nor ')} exists`)
  }
}

// --- download links in raw HTML point at files that exist -------------------
// The same blind spot, one step further. A workflow file has to be linked with a
// raw `<a>` tag: VitePress resolves markdown links against its page routes, and
// `.amphi-workflow` is not an extension it treats as an asset, so the markdown
// form is reported as a dead link and fails the build even when the file is
// right there. Raw HTML sidesteps that check -- and with it, every guarantee it
// was providing. A typo here would build clean, deploy clean, and 404 on click.
function checkDownloadLinks(lang: string): number {
  const dir = join(DOCS, lang, 'workflows')
  if (!existsSync(dir)) return 0
  let count = 0
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.md')) continue
    const source = readFileSync(join(dir, name), 'utf8')
    for (const m of source.matchAll(/href="(\/downloads\/[^"]+)"/g)) {
      count++
      const href = m[1] as string
      if (!existsSync(join(DOCS, 'public', href.replace(/^\//, '')))) {
        fail(`${lang}/workflows/${name} links to '${href}', which does not exist under docs/public`)
      }
      if (!/download(\s|=|>)/.test(source.slice(m.index ?? 0, (m.index ?? 0) + 200))) {
        fail(`${lang}/workflows/${name}: '${href}' needs the \`download\` attribute -- the server sends no Content-Type for this extension`)
      }
    }
  }
  return count
}
const downloads = checkDownloadLinks('zh') + checkDownloadLinks('en')

// --- every workflow page is reachable from its own payload ------------------
// checkEntry already covers the other direction (an entry whose `path` points at
// nothing). This catches the opposite slip: overwriting an entry when meaning to
// append one, which leaves the overwritten workflow with a page that no card
// links to any more. Purely within one language, so translation lag never trips
// it. `index.md` is the grid itself, not a workflow, and `_*.md` is a draft --
// unfinished work should not have to be listed to pass the check.
function checkListed(lang: string, entries: Workflow[]): string[] {
  const dir = join(DOCS, lang, 'workflows')
  if (!existsSync(dir)) return []
  const listed = new Set(entries.map((e) => e.path))
  const pages = readdirSync(dir)
    .filter((name) => name.endsWith('.md') && name !== 'index.md' && !name.startsWith('_'))
    .map((name) => `${lang}/workflows/${name.slice(0, -'.md'.length)}`)
  for (const page of pages) {
    if (!listed.has(page)) fail(`docs/${page}.md has no entry in workflows.${lang}.json`)
  }
  return pages
}
const zhPages = checkListed('zh', zh)
const enPages = checkListed('en', en)

// --- report ----------------------------------------------------------------
if (errors.length > 0) {
  console.error(`check-api: ${errors.length} problem(s)`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(
  `check-api: ok -- ${zh.length} zh / ${en.length} en workflows, ` +
    `${zhPages.length} zh / ${enPages.length} en pages all listed, ` +
    `${seenLinks.size} config links resolve, ${downloads} download links resolve`,
)

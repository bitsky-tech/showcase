/**
 * Validates the hand-written API payloads under docs/public/api/.
 *
 * The payloads are hand-edited on purpose (six entries, no build step), so the
 * guardrails live here instead. It catches the three mistakes that are actually
 * likely:
 *
 *   1. Editing one language and forgetting the other -- id sets and their order
 *      must match, because the order drives the card grid on the home page.
 *   2. Letting `status` drift between languages, which would show a "verified"
 *      badge in Chinese and not in English.
 *   3. Pointing `path` at a page that does not exist, which turns a card click
 *      into a 404. GitHub Pages answers a miss with a 9KB HTML body, so this is
 *      easy to ship unnoticed.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
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

// --- the two languages must stay in lockstep --------------------------------
const zh = loadLang('zh')
const en = loadLang('en')

if (zh.length !== en.length) {
  fail(`entry count differs: zh has ${zh.length}, en has ${en.length}`)
} else {
  zh.forEach((z, i) => {
    const e = en[i]
    if (e === undefined) return
    if (z.id !== e.id) fail(`order differs at [${i}]: zh '${z.id}' vs en '${e.id}'`)
    if (z.status !== e.status) fail(`status differs for '${z.id}': zh '${z.status}' vs en '${e.status}'`)
  })
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

// --- the two language trees stay symmetric --------------------------------
// A page added in one language and forgotten in the other leaves the language
// switcher pointing at a 404, since LangSwitch only rewrites the leading segment.
function pagesOf(lang: string): string[] {
  const base = join(DOCS, lang)
  const out: string[] = []
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(join(dir, entry.name), `${prefix}${entry.name}/`)
      else if (entry.name.endsWith('.md')) out.push(prefix + entry.name)
    }
  }
  if (existsSync(base)) walk(base, '')
  return out.sort()
}
const zhPages = pagesOf('zh')
const enPages = pagesOf('en')
for (const page of zhPages) if (!enPages.includes(page)) fail(`zh/${page} has no en counterpart`)
for (const page of enPages) if (!zhPages.includes(page)) fail(`en/${page} has no zh counterpart`)

// --- report ----------------------------------------------------------------
if (errors.length > 0) {
  console.error(`check-api: ${errors.length} problem(s)`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(
  `check-api: ok -- ${zh.length} workflows x 2 languages, ${seenLinks.size} config links resolve, ` +
    `${zhPages.length} pages symmetric across zh/en`,
)

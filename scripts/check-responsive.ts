/**
 * Responsive smoke check across breakpoints.
 *
 * Exists because a real bug shipped that manual spot-checking missed: VitePress
 * relocates its language flyout at 1280px and again at 768px, so between those
 * two widths the page showed *two* language switchers side by side. Checking a
 * couple of wide viewports by eye could never have caught that -- the breakpoints
 * have to be enumerated.
 *
 * What it asserts, on every breakpoint and in both languages:
 *   - exactly one language switcher is visible -- none on workflow detail pages,
 *     which deliberately carry no switcher (their counterpart may not exist yet)
 *   - nothing overflows the viewport horizontally
 *   - the workflow cards render and stay inside the container
 *   - no console errors
 *
 * Run: bun run check:responsive   (needs `bun run preview` on :4173)
 */

import { chromium, type Browser, type Page } from 'playwright'

// The card count is read from the payloads rather than hardcoded: the two
// languages are free to list different workflows, so there is no single number.
import en from '../docs/public/api/workflows.en.json'
import zh from '../docs/public/api/workflows.zh.json'

const BASE = process.env.CHECK_BASE ?? 'http://127.0.0.1:4173'

/** Chosen around VitePress's own breakpoints (768 / 960 / 1280) plus the edges. */
const VIEWPORTS = [
  { name: 'phone', width: 375, height: 812 },
  { name: 'phone-lg', width: 640, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'tablet-lg', width: 960, height: 1000 },
  { name: 'laptop', width: 1279, height: 900 },
  { name: 'laptop-wide', width: 1280, height: 900 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-xl', width: 1920, height: 1000 },
]

const PAGES = ['/zh/', '/en/', '/zh/workflows/xiaohongshu', '/en/api']

/**
 * Workflow detail pages carry no switcher on purpose: a workflow published in one
 * language may have no counterpart yet, and a switch into a 404 is worse than no
 * switch. Everywhere else it is exactly one -- the assertion the two-at-once bug
 * above calls for.
 */
const expectedSwitchers = (path: string) => (/\/workflows\/.+/.test(path) ? 0 : 1)

interface Problem {
  viewport: string
  path: string
  issue: string
}

const problems: Problem[] = []

/** Count every language switcher that is actually visible to the user. */
async function visibleLangSwitchers(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const shown = (el: Element) => {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    const found: string[] = []
    // Ours
    for (const el of document.querySelectorAll('.lang-switch')) if (shown(el)) found.push('LangSwitch')
    // VitePress's navbar flyout
    for (const el of document.querySelectorAll('.VPNavBarTranslations')) if (shown(el)) found.push('VPNavBarTranslations')
    // VitePress's language group inside the "..." extra menu
    for (const el of document.querySelectorAll('.VPNavBarExtra .group')) {
      if (el.querySelector('.trans-title') && shown(el)) found.push('VPNavBarExtra/translations')
    }
    // VitePress's full-screen menu (only counts when that menu is open)
    for (const el of document.querySelectorAll('.VPNavScreenTranslations')) if (shown(el)) found.push('VPNavScreenTranslations')
    return found
  })
}

/** Relative luminance per WCAG, for contrast ratios. */
function luminance(rgb: string): number {
  const [r, g, b] = (rgb.match(/\d+/g) ?? ['0', '0', '0']).slice(0, 3).map((n) => Number(n) / 255)
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r ?? 0) + 0.7152 * f(g ?? 0) + 0.0722 * f(b ?? 0)
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05)
}

/**
 * Dark mode gets its own pass. A real bug shipped here: vitepress-plugin-mermaid
 * replaces mermaid's theme when the site is dark, which discarded the brand
 * themeVariables and left nodes at #1F2020 on a #242422 page -- a diagram with no
 * visible structure. Only a dark-mode assertion catches that.
 */
async function checkDarkMode(browser: Browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' })
  const page = await ctx.newPage()
  const label = 'dark 1440px'

  await page.goto(`${BASE}/zh/workflows/xiaohongshu`, { waitUntil: 'networkidle' })
  await page.waitForSelector('.mermaid svg', { timeout: 20_000 })
  await page.waitForTimeout(600)

  const m = await page.evaluate(() => {
    const c = document.querySelector('.mermaid')
    const rect = c?.querySelector('.node rect')
    const text = c?.querySelector('.nodeLabel') ?? c?.querySelector('text')
    return {
      isDark: document.documentElement.classList.contains('dark'),
      pageBg: getComputedStyle(document.body).backgroundColor,
      nodeFill: rect ? getComputedStyle(rect).fill : '',
      nodeStroke: rect ? getComputedStyle(rect).stroke : '',
      labelFill: text ? getComputedStyle(text).fill : '',
    }
  })

  if (!m.isDark) problems.push({ viewport: label, path: '-', issue: 'dark mode did not activate' })

  // The stroke is what makes node boundaries readable: two dark surfaces sit near
  // 1.2:1 no matter what, so the border carries the signal.
  const strokeContrast = contrast(m.nodeStroke, m.pageBg)
  if (strokeContrast < 3) {
    problems.push({
      viewport: label,
      path: '/zh/workflows/xiaohongshu',
      issue: `mermaid node stroke vs page background is ${strokeContrast.toFixed(2)}:1, want >= 3 (stroke ${m.nodeStroke}, bg ${m.pageBg})`,
    })
  }

  const textContrast = contrast(m.labelFill, m.nodeFill)
  if (textContrast < 4.5) {
    problems.push({
      viewport: label,
      path: '/zh/workflows/xiaohongshu',
      issue: `mermaid label vs node fill is ${textContrast.toFixed(2)}:1, want >= 4.5 (WCAG AA)`,
    })
  }

  await ctx.close()
  process.stdout.write(`  checked dark mode (mermaid stroke ${strokeContrast.toFixed(1)}:1, label ${textContrast.toFixed(1)}:1)\n`)
}

async function main() {
  // Reuse the system Chrome so this needs no `playwright install` step. Falls
  // back to a downloaded chromium where no Chrome channel exists (e.g. CI).
  const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await ctx.newPage()
    const consoleErrors: string[] = []
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text())
    })
    page.on('pageerror', (e) => consoleErrors.push(String(e)))

    for (const path of PAGES) {
      await page.goto(BASE + path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      // 1. the expected number of language switchers
      const switchers = await visibleLangSwitchers(page)
      const expected = expectedSwitchers(path)
      if (switchers.length !== expected) {
        problems.push({
          viewport: `${vp.name} ${vp.width}px`,
          path,
          issue: `${switchers.length} language switchers visible, expected ${expected}: [${switchers.join(', ')}]`,
        })
      }

      // 2. nothing overflows horizontally
      const overflow = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth
        const offenders: string[] = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.right > docW + 1 || r.left < -1) {
            const cs = getComputedStyle(el)
            // Elements deliberately parked offscreen are not overflow bugs.
            if (cs.position === 'fixed' || cs.visibility === 'hidden' || cs.overflow === 'hidden') continue
            offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}`)
          }
        }
        return { docW, scrollW: document.documentElement.scrollWidth, offenders: [...new Set(offenders)].slice(0, 5) }
      })
      if (overflow.scrollW > overflow.docW + 1) {
        problems.push({
          viewport: `${vp.name} ${vp.width}px`,
          path,
          issue: `horizontal overflow: scrollWidth ${overflow.scrollW} > ${overflow.docW}; first offenders ${overflow.offenders.join(', ')}`,
        })
      }

      // 3. cards render and stay inside the container, on pages that have them
      if (path === '/zh/' || path === '/en/') {
        const expectedCards = (path === '/zh/' ? zh : en).workflows.length
        const cards = await page.evaluate(() => {
          const list = [...document.querySelectorAll('.wf-card')]
          const docW = document.documentElement.clientWidth
          return {
            count: list.length,
            outside: list.filter((c) => {
              const r = c.getBoundingClientRect()
              return r.left < -1 || r.right > docW + 1
            }).length,
          }
        })
        if (cards.count !== expectedCards) {
          problems.push({
            viewport: `${vp.name} ${vp.width}px`,
            path,
            issue: `expected ${expectedCards} cards, found ${cards.count}`,
          })
        }
        if (cards.outside > 0) {
          problems.push({ viewport: `${vp.name} ${vp.width}px`, path, issue: `${cards.outside} card(s) outside the viewport` })
        }
      }

      if (consoleErrors.length > 0) {
        problems.push({ viewport: `${vp.name} ${vp.width}px`, path, issue: `console errors: ${consoleErrors.join(' | ')}` })
        consoleErrors.length = 0
      }
    }

    await ctx.close()
    process.stdout.write(`  checked ${vp.name} (${vp.width}px)\n`)
  }

  await checkDarkMode(browser)

  await browser.close()

  if (problems.length > 0) {
    console.error(`\ncheck-responsive: ${problems.length} problem(s)`)
    for (const p of problems) console.error(`  - [${p.viewport}] ${p.path}: ${p.issue}`)
    process.exit(1)
  }
  console.log(
    `\ncheck-responsive: ok -- ${VIEWPORTS.length} breakpoints x ${PAGES.length} pages, ` +
      `one switcher each (none on workflow pages), no overflow`,
  )
}

await main()

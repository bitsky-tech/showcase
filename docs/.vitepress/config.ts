import footnote from 'markdown-it-footnote'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

/**
 * Both languages live under a prefix (`/zh/`, `/en/`) rather than putting one at
 * the root. That keeps the page tree symmetric with the API
 * (`workflows.zh.json` / `workflows.en.json`), and adding a third language later
 * needs no restructuring. `/` is a small redirect page that picks a language
 * from the browser.
 */
export default withMermaid(
  defineConfig({
    title: 'Bridgic Showcase',
    description: 'Workflow showcase and data API for bridgic clients',
    cleanUrls: true,
    lastUpdated: true,

    // Fail the build on a broken internal link instead of shipping a 404 --
    // GitHub Pages answers a miss with a 9KB HTML page, which is easy to miss.
    ignoreDeadLinks: false,

    head: [
      ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
      ['meta', { name: 'theme-color', content: '#0099FF' }],
      // Embedding hooks for the desktop app, read from the URL.
      //
      // Prefixed with `bridgic-` on purpose: VitePress reads no query parameters
      // today (it routes on path and hash), but `theme` is a name a future release
      // or plugin could plausibly claim, and a prefix also makes it obvious these
      // come from the host app rather than from the site.
      //
      // The theme is written into VitePress's own storage key rather than toggling
      // the class directly: its inline `check-dark-mode` script reads that key
      // before the first paint, and it owns the class afterwards, so setting the
      // class alone would be reverted. Doing it here — ahead of that script —
      // means the first frame is already correct, with no flash of the wrong theme
      // inside the dialog.
      [
        'script',
        { id: 'bridgic-embed-params' },
        `(() => {
  try {
    const q = new URLSearchParams(location.search)
    const t = q.get('bridgic-theme')
    if (t === 'dark' || t === 'light') localStorage.setItem('vitepress-theme-appearance', t)
    if (q.get('bridgic-embed') === '1') document.documentElement.classList.add('bridgic-embed')
  } catch {}
})()`,
      ],
    ],

    locales: {
      zh: {
        label: '简体中文',
        lang: 'zh-Hans',
        title: 'Bridgic 工作流展示',
        description: '面向 bridgic 客户端的工作流展示与数据接口',
        themeConfig: {
          nav: [
            { text: '首页', link: '/zh/' },
            { text: '工作流', link: '/zh/workflows/' },
            { text: '接口', link: '/zh/api' },
          ],
          sidebar: {
            '/zh/workflows/': [
              {
                text: '工作流',
                items: [
                  { text: '全部工作流', link: '/zh/workflows/' },
                  { text: '小红书内容爬虫', link: '/zh/workflows/xiaohongshu' },
                  { text: '飞书日报生成器', link: '/zh/workflows/feishu-daily' },
                  { text: '竞品价格监控', link: '/zh/workflows/price-monitor' },
                  { text: 'GitHub Issue 分析', link: '/zh/workflows/github-issues' },
                  { text: 'PDF 批量提取器', link: '/zh/workflows/pdf-extract' },
                  { text: '邮件自动回复', link: '/zh/workflows/mail-reply' },
                ],
              },
            ],
          },
          outline: { level: [2, 3], label: '本页目录' },
          docFooter: { prev: '上一页', next: '下一页' },
          lastUpdatedText: '最后更新',
          returnToTopLabel: '回到顶部',
          sidebarMenuLabel: '菜单',
          darkModeSwitchLabel: '主题',
          lightModeSwitchTitle: '切换到浅色模式',
          darkModeSwitchTitle: '切换到深色模式',
          langMenuLabel: '切换语言',
          editLink: undefined,
        },
      },
      en: {
        label: 'English',
        lang: 'en-US',
        title: 'Bridgic Showcase',
        description: 'Workflow showcase and data API for bridgic clients',
        themeConfig: {
          nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Workflows', link: '/en/workflows/' },
            { text: 'API', link: '/en/api' },
          ],
          sidebar: {
            '/en/workflows/': [
              {
                text: 'Workflows',
                items: [
                  { text: 'All workflows', link: '/en/workflows/' },
                  { text: 'Xiaohongshu content scraper', link: '/en/workflows/xiaohongshu' },
                  { text: 'Feishu daily report generator', link: '/en/workflows/feishu-daily' },
                  { text: 'Competitor price monitor', link: '/en/workflows/price-monitor' },
                  { text: 'GitHub Issue analysis', link: '/en/workflows/github-issues' },
                  { text: 'PDF batch extractor', link: '/en/workflows/pdf-extract' },
                  { text: 'Automatic email replies', link: '/en/workflows/mail-reply' },
                ],
              },
            ],
          },
          outline: { level: [2, 3] },
        },
      },
    },

    themeConfig: {
      logo: { light: '/assets/logo.svg', dark: '/assets/logo_dark.svg' },
      // The logo is a wordmark that already contains "Bridgic", so showing the
      // site title next to it renders the brand name twice.
      siteTitle: false,
      socialLinks: [{ icon: 'github', link: 'https://github.com/bitsky-tech/showcase' }],
      search: { provider: 'local' },
    },

    /**
     * Drop the eager `modulepreload` hints for shared chunks.
     *
     * VitePress emits one `<link rel="modulepreload">` per chunk in a page's
     * dependency graph, and mermaid's graph is every diagram renderer it ships:
     * measured on the built site, each page — including the home page, which has
     * no diagram at all — preloaded 44 chunks totalling 2352 KB (`architectureDiagram`
     * 148 KB, `swimlanes` 117 KB, `katex` 255 KB, plus `abnf/c4/class/cynefin/er/
     * gantt/gitGraph/...`). The HTML itself is 30 KB and arrives in well under a
     * second, so that payload *was* the wait, and none of it is used unless the
     * page actually draws that kind of diagram.
     *
     * Stripping the hint does not stop anything from loading: mermaid imports the
     * renderer it needs dynamically, so the chunk is fetched then instead of up
     * front. Eager bytes drop to 929 KB.
     *
     * `framework` and `theme` are kept because every page genuinely needs them
     * immediately, as is anything outside `chunks/` (the page's own content module).
     * Not done via `vite.build.modulePreload: false` — that is a Vite build option,
     * and these links are injected by VitePress's own SSG render, so it has no
     * effect here (verified).
     */
    transformHtml(code) {
      return code.replace(
        /<link rel="modulepreload"[^>]*?href="\/assets\/chunks\/(?!framework\.|theme\.)[^"]*"[^>]*>/g,
        '',
      )
    },

    markdown: {
      lineNumbers: true,
      math: true,
      image: { lazyLoading: true },
      // Highlight both a light and a dark theme so code blocks follow the site.
      theme: { light: 'github-light', dark: 'github-dark' },
      config(md) {
        // Footnotes are not part of VitePress's default markdown-it setup.
        md.use(footnote)
      },
    },

    // Brand-matched instead of mermaid's default lilac. Fixed values rather than
    // CSS variables, which mermaid cannot read. These are the light-theme values;
    // custom.css overrides fill/stroke/text under `.dark` with `!important`, since
    // this palette on a dark background measured 1.05:1.
    mermaid: {
      theme: 'base',
      themeVariables: {
        primaryColor: '#e8f4ff',
        primaryBorderColor: '#0099ff',
        primaryTextColor: '#1a1d28',
        lineColor: '#8b8f9e',
        secondaryColor: '#f3ecfb',
        secondaryBorderColor: '#b370e0',
        tertiaryColor: '#f5f6f9',
        fontFamily: "'Plus Jakarta Sans', -apple-system, 'PingFang SC', sans-serif",
        fontSize: '13px',
      },
    },
  }),
)

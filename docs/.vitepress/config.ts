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
    // CSS variables, which mermaid cannot read -- the light palette stays legible
    // on the dark theme because .mermaid gets a light container in custom.css.
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

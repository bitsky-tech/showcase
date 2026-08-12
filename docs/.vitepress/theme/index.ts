import type { Theme } from 'vitepress'
// `theme-without-fonts` instead of `theme`: the default entry ships Inter and
// its @font-face declarations, which are dead weight here since the font stack
// is Plus Jakarta Sans. This is VitePress's own entry point for custom fonts,
// not a workaround.
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'

import LangSwitch from './LangSwitch.vue'
import WorkflowGrid from './WorkflowGrid.vue'
import './custom.css'

/**
 * Extends the default theme rather than replacing it: docs pages keep
 * VitePress's layout. Two additions -- the workflow grid used by the home and
 * list pages, and an inline language switcher that replaces the default flyout
 * (see LangSwitch.vue for why).
 */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LangSwitch),
    })
  },
  enhanceApp({ app }) {
    app.component('WorkflowGrid', WorkflowGrid)
  },
} satisfies Theme

import type { Theme } from 'vitepress'
// `theme-without-fonts` instead of `theme`: the default entry ships Inter and
// its @font-face declarations, which are dead weight here since the font stack
// is Plus Jakarta Sans. This is VitePress's own entry point for custom fonts,
// not a workaround.
import DefaultTheme from 'vitepress/theme-without-fonts'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import { h, nextTick, onMounted, watch } from 'vue'

import EmbedVideo from './EmbedVideo.vue'
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
    app.component('EmbedVideo', EmbedVideo)
  },
  setup() {
    // Click-to-zoom for content images. Images wrapped in a link are excluded:
    // there the click is a deliberate navigation. VitePress is an SPA, so the
    // zoom must be re-attached after each route change, and only after nextTick
    // -- the new page's images don't exist in the DOM before that.
    const route = useRoute()
    const attachZoom = () => {
      mediumZoom('.vp-doc :not(a) > img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(attachZoom)
    watch(
      () => route.path,
      () => nextTick(attachZoom),
    )
  },
} satisfies Theme

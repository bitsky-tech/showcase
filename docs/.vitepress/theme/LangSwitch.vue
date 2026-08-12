<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

/**
 * Replaces VitePress's default language flyout.
 *
 * The default treats the *current* language as an unclickable menu heading and
 * offers only the other one as a link. With exactly two languages that means the
 * two labels swap places every time you switch, so repeatedly toggling looks like
 * the menu is jumping around. A flyout is built for many locales; with two, both
 * labels can simply sit side by side at fixed positions — no hover, one click.
 *
 * Keeps the reader on the same page across the switch: only the leading language
 * segment is rewritten. Safe here because the two trees are kept symmetric (the
 * check-api script enforces it for workflow pages).
 */
const { lang, page } = useData()

const isZh = computed(() => lang.value.startsWith('zh'))

/** `zh/workflows/xiaohongshu.md` -> `/en/workflows/xiaohongshu` */
function hrefFor(target: 'zh' | 'en'): string {
  const rest = page.value.relativePath.replace(/^(zh|en)\//, '').replace(/(index)?\.md$/, '')
  return `/${target}/${rest}`
}

const langs = [
  { code: 'zh' as const, label: '中文' },
  { code: 'en' as const, label: 'EN' },
]
</script>

<template>
  <div class="lang-switch">
    <template v-for="(l, i) in langs" :key="l.code">
      <span v-if="i > 0" class="sep" aria-hidden="true">/</span>
      <span v-if="(l.code === 'zh') === isZh" class="lang current" aria-current="true">{{ l.label }}</span>
      <a v-else class="lang" :href="hrefFor(l.code)">{{ l.label }}</a>
    </template>
  </div>
</template>

<style scoped>
.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
  padding-left: 0.75rem;
  border-left: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
}

.lang {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.lang:hover {
  color: var(--vp-c-brand-1);
}

.lang.current {
  color: var(--vp-c-text-1);
  font-weight: 600;
  cursor: default;
}

.sep {
  color: var(--vp-c-divider);
}

/* Kept visible at every width. The alternative -- falling back to VitePress's
   full-screen menu on phones -- costs three taps (hamburger, expand the language
   group, pick a language) and reintroduces the swapping-labels problem, since that
   menu also renders the current language as an unclickable heading. */
@media (max-width: 767px) {
  .lang-switch {
    margin-left: 0.35rem;
    padding-left: 0.5rem;
  }
}
</style>

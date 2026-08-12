<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

import en from '../../public/api/workflows.en.json'
import zh from '../../public/api/workflows.zh.json'

interface Workflow {
  id: string
  name: string
  desc: string
  domain: string
  status: string
  path: string
}

const { lang } = useData()
const isZh = computed(() => lang.value.startsWith('zh'))

/**
 * The grid reads the very same JSON the API serves, so a card on this page and a
 * client consuming `api/workflows.*.json` can never disagree about what exists
 * or how it is ordered. Order matters: it mirrors the desktop app's card order.
 */
const workflows = computed<Workflow[]>(() => ((isZh.value ? zh : en) as { workflows: Workflow[] }).workflows)

const copy = computed(() =>
  isZh.value
    ? { verified: '已验证', fresh: '新增', view: '查看详情' }
    : { verified: 'Verified', fresh: 'New', view: 'View details' },
)
</script>

<template>
  <div class="wf-grid">
    <a v-for="w in workflows" :key="w.id" class="wf-card" :href="withBase(`/${w.path}`)">
      <div class="wf-head">
        <span class="wf-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="6" height="6" rx="1.5" />
            <rect x="15" y="15" width="6" height="6" rx="1.5" />
            <path d="M9 6h4a2 2 0 0 1 2 2v10" />
          </svg>
        </span>
        <span v-if="w.status === 'verified'" class="wf-badge wf-badge--ok">{{ copy.verified }}</span>
        <span v-else class="wf-badge wf-badge--new">{{ copy.fresh }}</span>
      </div>

      <div class="wf-name">{{ w.name }}</div>
      <div class="wf-desc">{{ w.desc }}</div>

      <div class="wf-foot">
        <span class="wf-tag">{{ w.domain }}</span>
        <span class="wf-view">{{ copy.view }} →</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.wf-grid {
  display: grid;
  gap: 1rem;
  /* Capped and centred to line up with the page copy: `layout: page` gives no
     container of its own, so without this the grid spans the whole viewport,
     touches both edges, and grows to 5-6 columns on a wide screen (six cards
     then wrap as 5+1). 1152px keeps it at three columns on any desktop width. */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  max-width: 1152px;
  margin: 2rem auto 1rem;
  padding: 0 1.5rem;
}

.wf-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.wf-card:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.wf-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.wf-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.wf-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  border: 1px solid currentColor;
  line-height: 1.5;
}

.wf-badge--ok {
  color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.wf-badge--new {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.wf-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

/* min-height keeps the footers aligned when descriptions differ in length --
   the desktop card does the same with min-h-[32px]. */
.wf-desc {
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  min-height: 40px;
  margin-bottom: 0.85rem;
}

.wf-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
}

.wf-tag {
  font-size: 11.5px;
  padding: 0.15rem 0.5rem;
  border-radius: 5px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.wf-view {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}
</style>

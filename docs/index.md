---
layout: page
title: Bridgic Showcase
aside: false
editLink: false
lastUpdated: false
---

<script setup>
import { onMounted } from 'vue'

// Both languages live under a prefix, so `/` only picks one and forwards. Uses
// replace() so the redirect does not add a history entry the back button lands on.
onMounted(() => {
  const zh = (navigator.language || '').toLowerCase().startsWith('zh')
  location.replace(zh ? '/zh/' : '/en/')
})
</script>

<div class="lang-gate">
  <h1>Bridgic Showcase</h1>
  <p>Redirecting…</p>
  <noscript>
    <p>Choose a language:</p>
    <p><a href="/zh/">简体中文</a> &nbsp;·&nbsp; <a href="/en/">English</a></p>
  </noscript>
</div>

<style scoped>
.lang-gate {
  max-width: 32rem;
  margin: 6rem auto;
  padding: 0 1.5rem;
  text-align: center;
}
.lang-gate h1 {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.lang-gate p {
  color: var(--vp-c-text-2);
  margin-top: 0.6rem;
}
.lang-gate a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>

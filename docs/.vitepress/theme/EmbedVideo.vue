<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * Embeds a platform video player (Bilibili or YouTube) at a fixed 16:9 ratio.
 *
 * The iframe only renders after mount: during SSR the frame stays empty, so
 * server and client markup always agree. Writing platform iframes straight in
 * markdown is a known source of hydration mismatches (vuejs/vitepress#2441),
 * since player scripts mutate the DOM before Vue hydrates it.
 */
const props = defineProps<{
  /** Bilibili video id, e.g. "BV1GJ411x7h7". Takes precedence over `yt`. */
  bvid?: string
  /** YouTube video id, e.g. "dQw4w9WgXcQ" */
  yt?: string
}>()

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const src = props.bvid
  ? `https://player.bilibili.com/player.html?bvid=${props.bvid}&autoplay=0`
  : `https://www.youtube-nocookie.com/embed/${props.yt}`
</script>

<template>
  <div class="embed-video">
    <iframe
      v-if="mounted"
      :src="src"
      loading="lazy"
      allow="fullscreen; picture-in-picture; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.embed-video {
  aspect-ratio: 16 / 9;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.embed-video iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

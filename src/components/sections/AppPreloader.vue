<script setup>
/*
 * Tukiio's own two-dot bounce loader (tukiio/03-brand-identity.md):
 * the two yellow dots bounce alternately (1s, second delayed 400ms),
 * rising 10px and turning black at the top, above the two black stems.
 * Short (max ~1.6s), dismissible by click / Escape, skipped for reduced motion.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '../../composables/motion.js'

const visible = ref(!prefersReducedMotion())
const leaving = ref(false)
let timers = []
let onLoad = null

function dismiss() {
  if (!visible.value || leaving.value) return
  leaving.value = true
  timers.push(setTimeout(() => (visible.value = false), 500))
}

const onKey = (e) => {
  if (e.key === 'Escape') dismiss()
}

onMounted(() => {
  if (!visible.value) return
  const start = performance.now()
  onLoad = () => {
    const wait = Math.max(0, 700 - (performance.now() - start))
    timers.push(setTimeout(dismiss, wait))
  }
  if (document.readyState === 'complete') onLoad()
  else window.addEventListener('load', onLoad, { once: true })
  timers.push(setTimeout(dismiss, 1600)) // hard cap
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  window.removeEventListener('keydown', onKey)
  if (onLoad) window.removeEventListener('load', onLoad)
})
</script>

<template>
  <div v-if="visible" class="preloader" :class="{ 'is-leaving': leaving }" role="status" @click="dismiss">
    <span class="sr-only">Loading Tukiio…</span>
    <div class="loader" aria-hidden="true">
      <span class="dot dot--l" />
      <span class="dot dot--r" />
      <svg class="stems" viewBox="0 36 82 82" width="40" height="40">
        <path
          fill="#0b0b0b"
          d="M9,75.8v4.5v33.4v2.3h26.8V80.3v-4.5c0-20.6-15.6-37.7-35.7-39.9v27.3C5.2,65.1,9,70,9,75.8z"
        />
        <path
          fill="#0b0b0b"
          d="M53.6,75.8v4.5v33.4v2.3h26.8V80.3v-4.5c0-20.6-15.6-37.7-35.7-39.9v27.3C49.8,65.1,53.6,70,53.6,75.8z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: var(--bg-page);
  cursor: pointer;
  transition:
    opacity 0.5s var(--ease-out),
    visibility 0.5s;
}

.preloader.is-leaving {
  opacity: 0;
  visibility: hidden;
}

.loader {
  position: relative;
  width: 40px;
  height: 58px;
}

.stems {
  position: absolute;
  left: 0;
  bottom: 0;
}

/* dots sized to the stems (13.4/82 * 40 ≈ 6.5px radius) */
.dot {
  position: absolute;
  top: 0;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--accent);
  animation: tukiio-bounce 1s infinite ease-in-out;
}

.dot--l {
  left: 0;
}

.dot--r {
  left: 21.8px;
  animation-delay: 400ms;
}

@keyframes tukiio-bounce {
  0% {
    transform: translateY(0);
    background: var(--accent);
  }
  50% {
    transform: translateY(-10px);
    background: #000;
  }
  100% {
    transform: translateY(0);
    background: var(--accent);
  }
}
</style>

<script setup>
/*
 * Scroll-reveal quote (Tukiio's own mission statement, tukiio/01-company.md)
 * followed by the organiser dashboard, which scales up as it scrolls in.
 * Words fill from grey to ink; key words also get the yellow highlighter.
 */
import { computed, ref } from 'vue'
import DashboardMock from '../mockups/DashboardMock.vue'
import { useScrollProgress } from '../../composables/motion.js'

const quote =
  'Redefining events and their experiences by making the whole process easy, convenient and safe.'
const keywords = new Set(['easy,', 'convenient', 'safe.'])
const words = quote.split(' ')

const quoteEl = ref(null)
const progress = ref(0)
useScrollProgress(quoteEl, (p) => (progress.value = p), { start: 0.9, end: 0.35 })
const litCount = computed(() => Math.round(progress.value * words.length))

const zoomEl = ref(null)
const zoom = ref(0)
useScrollProgress(zoomEl, (p) => (zoom.value = p), { start: 1, end: 0.25 })
const zoomStyle = computed(() => ({
  transform: `scale(${0.62 + 0.38 * zoom.value})`,
  opacity: 0.35 + 0.65 * Math.min(1, zoom.value * 1.6),
}))
</script>

<template>
  <section id="story" class="story section" aria-labelledby="story-title">
    <div class="container container--narrow">
      <h2 id="story-title" class="sr-only">Our mission</h2>
      <figure ref="quoteEl" class="quote">
        <blockquote>
          <p class="sr-only">“{{ quote }}”</p>
          <p class="quote__text" aria-hidden="true">
            <span class="quote__mark">“</span
            ><span
              v-for="(w, i) in words"
              :key="i"
              class="w"
              :class="{ on: i < litCount, key: keywords.has(w) }"
              >{{ w }}</span
            ><span class="quote__mark" :class="{ on: litCount >= words.length }">”</span>
          </p>
        </blockquote>
        <figcaption class="quote__cap">Tukiio’s mission, in its own words</figcaption>
      </figure>
    </div>

    <div ref="zoomEl" class="zoom-wrap container">
      <div class="zoom glass glass--sheet glass--static" :style="zoomStyle">
        <span class="glass-light" aria-hidden="true" />
        <span class="glow glow--z1" aria-hidden="true" />
        <span class="glow glow--z2" aria-hidden="true" />
        <div class="frame glass glass--tint">
          <DashboardMock />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  padding-top: 72px;
}

.quote {
  text-align: center;
}

.quote__text {
  font-family: var(--font-display);
  font-size: clamp(28px, 4.2vw, 48px);
  line-height: 1.22;
  font-weight: 400;
  letter-spacing: -0.06em;
  color: var(--placeholder);
  text-wrap: balance;
}

.w {
  display: inline-block;
  margin-right: 0.24em;
  padding: 0 0.04em;
  border-radius: 0.2em;
  background-image: var(--brand-gradient);
  background-repeat: no-repeat;
  background-size: 0% 38%;
  background-position: 0 88%;
  transition:
    color 0.35s ease,
    background-size 0.5s var(--ease-out);
}

.w.on {
  color: var(--ink);
}

.w.key.on {
  background-size: 100% 38%;
}

.quote__mark.on {
  color: var(--ink);
}

.quote__cap {
  margin-top: 28px;
  font-size: 15px;
  color: var(--text-muted);
}

.zoom-wrap {
  margin-top: 72px;
}

.zoom {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  overflow: hidden;
  isolation: isolate;
  transform-origin: 50% 0;
  will-change: transform;
}

.glow--z1 {
  width: 600px;
  height: 500px;
  top: -200px;
  left: -120px;
  background: var(--glow-amber);
  opacity: 0.45;
}

.glow--z2 {
  width: 500px;
  height: 400px;
  bottom: -160px;
  right: -100px;
  background: var(--glow-peach);
  opacity: 0.6;
}

/* the yellow-glass bezel: outer 36px radius, inner 30px, 6px of glossy yellow showing.
   No backdrop-filter here: the zoom scales on scroll, so the frost is painted, not sampled. */
.frame {
  z-index: 1;
  padding: 6px;
  border-radius: var(--r-3xl);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 18%, rgba(255, 255, 255, 0) 40%),
    linear-gradient(135deg, rgba(255, 226, 122, 0.9) 0%, rgba(255, 197, 11, 0.82) 50%, rgba(255, 168, 0, 0.9) 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(196, 120, 0, 0.25),
    var(--shadow-float);
}

@media (max-width: 767px) {
  .zoom {
    padding: 10px;
    border-radius: 28px;
  }
  .zoom-wrap {
    margin-top: 48px;
  }
  .frame {
    border-radius: 26px;
  }
  .frame :deep(.dash) {
    border-radius: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zoom {
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>

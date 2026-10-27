<script setup>
/*
 * Figures are Tukiio's own published claims (tukiio/01 & 07): "more than 200 events",
 * "more than 20,000 users", "payouts within 24 hours". The copy is unchanged since ~2023.
 * TODO(client): replace with current numbers (events, tickets sold, TZS processed, check-ins).
 */
import { ref } from 'vue'
import { prefersReducedMotion, useOnceVisible } from '../../composables/motion.js'

const stats = [
  { to: 200, suffix: '+', label: 'Events powered', desc: 'Concerts, forums, races, awards and more.' },
  { to: 24, suffix: 'h', label: 'Payouts', desc: 'Funds processed within 24 hours of your request.', raised: true },
  { to: 20000, suffix: '+', label: 'Users', desc: 'Fans and organisers across Tanzania.' },
]

const shown = ref(stats.map(() => 0))
const root = ref(null)

useOnceVisible(root, () => {
  if (prefersReducedMotion()) {
    shown.value = stats.map((s) => s.to)
    return
  }
  const start = performance.now()
  const dur = 1600
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur)
    const e = 1 - Math.pow(1 - p, 3)
    shown.value = stats.map((s) => Math.round(s.to * e))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})

const fmt = (n) => n.toLocaleString('en-US')
</script>

<template>
  <section class="section" aria-labelledby="stats-title">
    <div class="container container--narrow">
      <h2 id="stats-title" class="sr-only">Tukiio in numbers</h2>
      <ul ref="root" class="stats" role="list">
        <li v-for="(s, i) in stats" :key="s.label" v-reveal="i * 100" class="stat-wrap" :class="{ 'is-raised': s.raised }">
          <div class="stat card">
            <span class="stat__num" aria-hidden="true">{{ fmt(shown[i]) }}{{ s.suffix }}</span>
            <span class="sr-only">{{ fmt(s.to) }}{{ s.suffix }}</span>
            <span class="stat__label">{{ s.label }}</span>
            <span class="stat__desc">{{ s.desc }}</span>
          </div>
        </li>
      </ul>
      <p class="note">Figures as published by Tukiio.<!-- TODO(client): confirm founding year (2013 vs 2015, tukiio/09) before stating one. --></p>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: end;
  padding-top: 48px;
}

.stat-wrap {
  position: relative;
  border-radius: var(--r-4xl);
}

.stat-wrap.is-raised {
  transform: translateY(-48px);
  padding-bottom: 6px;
}

.stat-wrap.is-raised.reveal:not(.is-visible) {
  transform: translateY(-20px);
}

/* the gradient lip under the raised card */
.stat-wrap.is-raised::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r-4xl);
  background: var(--brand-gradient);
  z-index: 0;
}

.stat {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 40px 32px;
  border-radius: var(--r-4xl);
  min-height: 260px;
  justify-content: flex-end;
}

.stat__num {
  font-family: var(--font-ui);
  font-size: clamp(56px, 6.4vw, 80px);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.06em;
  color: var(--ink-strong);
  font-variant-numeric: tabular-nums;
}

.stat__label {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.06em;
  color: var(--ink);
}

.stat__desc {
  color: var(--text-muted);
  font-size: 15px;
}

.note {
  margin-top: 28px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 899px) {
  .stats {
    grid-template-columns: 1fr;
    padding-top: 0;
    gap: 16px;
  }
  .stat-wrap.is-raised,
  .stat-wrap.is-raised.reveal:not(.is-visible) {
    transform: none;
  }
  .stat {
    min-height: 0;
    padding: 28px;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import EyebrowPill from '../ui/EyebrowPill.vue'
import AppIcon from '../ui/AppIcon.vue'

const paused = ref(false)

/*
 * Events that have publicly run on Tukiio (tukiio/01-company.md, data/ snapshots).
 * Rendered as neutral TEXT wordmarks only — no third-party logo images.
 * ⚠️ Written permission from each organiser is required before publishing this
 * strip, and before swapping any name for a real logo (see tukiio/09-gaps-and-risks.md).
 */
const names = [
  { name: 'Tanzania Startup Week', style: 'a' },
  { name: 'Tanzania Institute of Education', style: 'b' },
  { name: 'Women in Energy Forum', style: 'c' },
  { name: 'TEDxKivukoni', style: 'a' },
  { name: 'Simba SC Marathon', style: 'd' },
  { name: 'Bongo Star Search', style: 'b' },
  { name: 'Swahili Fashion Week', style: 'c' },
  { name: 'Kili Country Fest', style: 'd' },
  { name: 'Bagamoyo Heritage Run', style: 'a' },
  { name: 'Swahili Komik Con', style: 'b' },
]
</script>

<template>
  <section class="section trusted" aria-labelledby="trusted-title">
    <span class="arc" aria-hidden="true" />
    <div class="container">
      <div class="section-head">
        <EyebrowPill v-reveal>Trusted across Tanzania</EyebrowPill>
        <h2 id="trusted-title" v-reveal="80" class="section-title trusted__title">
          Behind the gates of concerts, forums, races and awards nights
        </h2>
      </div>

      <div v-reveal class="logos-wrap">
        <div class="logos" :class="{ 'is-paused': paused }" @click="paused = !paused">
        <ul class="logos__track" role="list">
          <li v-for="(n, i) in [...names, ...names]" :key="i" class="wm" :class="[`wm--${n.style}`, { dup: i >= names.length }]" :aria-hidden="i >= names.length ? 'true' : undefined">
            {{ n.name }}
          </li>
        </ul>
        </div>
        <button
          type="button"
          class="logos__toggle"
          :aria-pressed="paused ? 'true' : 'false'"
          @click="paused = !paused"
        >
          <AppIcon :name="paused ? 'play' : 'pause'" :size="16" />
          <span class="sr-only">{{ paused ? 'Play' : 'Pause' }} the scrolling list of events</span>
        </button>
      </div>

      <!--
        Sourced quote: TiME Tickets co-founder, How We Made It in Africa (13 Feb 2015).
        TODO(client): replace/add organiser testimonials (name, role, event, photo) once collected — none are public yet.
      -->
      <figure v-reveal class="testimonial">
        <blockquote>
          <p class="testimonial__quote">“Our goal is to make ticketing easy.”</p>
        </blockquote>
        <figcaption>
          <!-- TODO(client): founding year is contested (2013 vs 2015); no year asserted here. -->
          <span class="testimonial__title">Roots in TiME Tickets</span>
          <span class="testimonial__who">Mwasapi Kihongosi, Co-founder of TiME Tickets, speaking in 2015</span>
        </figcaption>
        <p class="testimonial__story">
          Tukiio began as TiME Tickets: mobile-money QR tickets, scanned at the door, years before that was common.
          Organiser stories are coming soon.
        </p>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.trusted {
  position: relative;
  overflow: hidden;
}

.arc {
  position: absolute;
  left: 50%;
  bottom: -620px;
  width: 1100px;
  height: 1100px;
  margin-left: -550px;
  border-radius: 50%;
  border: 1px solid rgba(255, 197, 11, 0.35);
  background: radial-gradient(circle, rgba(255, 226, 122, 0.22), transparent 60%);
  pointer-events: none;
}

.trusted__title {
  font-size: clamp(26px, 3.2vw, 36px);
}

.logos {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.logos__track {
  display: flex;
  align-items: center;
  gap: 56px;
  width: max-content;
  animation: logos 50s linear infinite;
}

.logos:hover .logos__track,
.logos:focus-within .logos__track,
.logos.is-paused .logos__track {
  animation-play-state: paused;
}

.logos-wrap {
  position: relative;
}

.logos__toggle {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin: 20px auto 0;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-hairline);
  color: var(--ink);
}

.logos__toggle:hover {
  background: var(--accent);
}

@keyframes logos {
  to {
    transform: translateX(calc(-50% - 28px));
  }
}

.wm {
  white-space: nowrap;
  color: var(--ink-soft);
  font-size: 22px;
  opacity: 0.85;
}

.wm--a {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.05em;
}
.wm--b {
  font-family: var(--font-ui);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.12em;
}
.wm--c {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  letter-spacing: -0.02em;
}
.wm--d {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: -0.07em;
  font-size: 24px;
}

.testimonial {
  position: relative;
  max-width: 820px;
  margin: 96px auto 0;
  text-align: center;
  display: grid;
  gap: 18px;
  justify-items: center;
}

.testimonial__quote {
  font-family: var(--font-display);
  font-size: clamp(32px, 4.6vw, 52px);
  line-height: 1.15;
  letter-spacing: -0.06em;
  color: var(--ink);
}

.testimonial figcaption {
  display: grid;
  gap: 4px;
}

.testimonial__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.06em;
  color: var(--ink);
}

.testimonial__who {
  color: var(--text-muted);
}

.testimonial__story {
  max-width: 560px;
  color: var(--text-muted);
  font-size: 15px;
}

@media (prefers-reduced-motion: reduce) {
  .logos__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    gap: 20px 40px;
  }
  .wm.dup {
    display: none;
  }
  .logos__toggle {
    display: none;
  }
  .logos {
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>

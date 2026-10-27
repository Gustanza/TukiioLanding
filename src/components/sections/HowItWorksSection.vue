<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import PrimaryButton from '../ui/PrimaryButton.vue'
import AppIcon from '../ui/AppIcon.vue'
import TukiioLogo from '../ui/TukiioLogo.vue'
import { prefersReducedMotion, useInView } from '../../composables/motion.js'

const steps = [
  {
    title: 'Create your event',
    body: 'Add ticket types, prices and dates in minutes. Free events are free, forever.',
    points: ['Ticket types, batches and releases', 'Templates: event, experience, conference, marathon, voting', 'English and Kiswahili'],
  },
  {
    title: 'Sell & promote',
    body: 'Share your link, embed tickets on your site, add agents and promo codes.',
    points: ['Shareable event link and embeds', 'Ticket agents and affiliates', 'SMS and email campaigns'],
  },
  {
    title: 'Check in & get paid',
    body: 'Scan guests at the door and receive your money within 24 hours of your request.',
    points: ['Tukiio Organizer app for your team', 'Live entries, gate by gate', 'Withdraw within 24h of your request'],
  },
]

const active = ref(0)
const root = ref(null)
const inView = useInView(root, 0.4)
const hovering = ref(false)
let stopped = false
let timer

function stop() {
  stopped = true
  clearInterval(timer)
}

function open(i) {
  stop()
  active.value = i
}

// Gentle auto-advance (WCAG 2.2.2): only while in view, paused on hover/focus,
// and stopped for good after any interaction. Off for reduced motion.
onMounted(() => {
  if (prefersReducedMotion()) return
  timer = setInterval(() => {
    if (stopped || hovering.value || !inView.value || document.visibilityState !== 'visible') return
    active.value = (active.value + 1) % steps.length
  }, 6000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="how-it-works" class="section" aria-labelledby="how-title">
    <div class="container">
      <div class="section-head">
        <EyebrowPill v-reveal>How it works</EyebrowPill>
        <h2 id="how-title" v-reveal="80" class="section-title">
          From idea to <HighlightPill>full house</HighlightPill><br class="br" />
          in three simple steps
        </h2>
      </div>

      <div
        ref="root"
        v-reveal
        class="tray how"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @focusin="stop"
        @pointerdown="stop"
      >
        <div class="how__inner">
          <!-- Visual well -->
          <div class="well" aria-hidden="true">
            <Transition name="swap" mode="out-in">
              <div v-if="active === 0" key="0" class="vcard">
                <TukiioLogo :height="20" />
                <span class="vcard__title">Create a new event</span>
                <span class="input"><small>Event name</small>Kili Jazz Evening</span>
                <span class="row">
                  <span class="input"><small>Date</small>Sat, 12 Dec</span>
                  <span class="input"><small>Venue</small>Arusha</span>
                </span>
                <span class="ttypes">
                  <span class="ttype"><b>Regular</b>TZS 25,000</span>
                  <span class="ttype"><b>VIP</b>TZS 50,000</span>
                  <span class="ttype ttype--add">+ Add ticket</span>
                </span>
                <span class="fake-btn">Publish event</span>
              </div>
              <div v-else-if="active === 1" key="1" class="vcard">
                <span class="vcard__title">Share your event</span>
                <span class="link-box">tukiio.com/kili-jazz <span class="copy">Copy</span></span>
                <span class="share">
                  <span>💬 WhatsApp</span><span>📸 Instagram</span><span>✉️ SMS blast</span>
                </span>
                <span class="promo"><b>EARLYBIRD</b> · 15% off · 120 used</span>
                <span class="agents">
                  <span class="agent"><i>A</i>Agent · Kariakoo <b>184 sold</b></span>
                  <span class="agent"><i>M</i>Agent · Mwenge <b>96 sold</b></span>
                </span>
              </div>
              <div v-else key="2" class="vcard">
                <span class="vcard__title">Payout</span>
                <span class="payout">
                  <small>Available to withdraw</small>
                  <b>TZS 4,185,000</b>
                  <small>Gross TZS 4,500,000 · 7% fee TZS 315,000</small>
                </span>
                <span class="timeline">
                  <span class="tl tl--done"><i /> Requested · 09:12</span>
                  <span class="tl tl--done"><i /> Processing</span>
                  <span class="tl"><i /> Paid within 24h</span>
                </span>
                <span class="fake-btn">Withdraw</span>
              </div>
            </Transition>
          </div>

          <!-- Steps accordion -->
          <ol class="steps" role="list">
            <li v-for="(s, i) in steps" :key="s.title" class="step" :class="{ 'is-open': i === active }">
              <h3 class="step__h">
                <button
                  :id="`step-btn-${i}`"
                  type="button"
                  class="step__btn"
                  :aria-expanded="i === active ? 'true' : 'false'"
                  :aria-controls="`step-panel-${i}`"
                  @click="open(i)"
                >
                  <span class="step__num">Step {{ i + 1 }}</span>
                  <span class="step__title">{{ s.title }}</span>
                </button>
              </h3>
              <div
                v-show="i === active"
                :id="`step-panel-${i}`"
                class="step__panel"
                role="region"
                :aria-labelledby="`step-btn-${i}`"
              >
                <p>{{ s.body }}</p>
                <ul role="list">
                  <li v-for="p in s.points" :key="p"><AppIcon name="check" :size="14" :stroke="2.4" />{{ p }}</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div v-reveal class="how__cta">
        <PrimaryButton href="#pricing" icon="arrowRight">See pricing</PrimaryButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how {
  border-radius: 46px;
}

.how__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.well {
  display: grid;
  place-items: center;
  min-height: 520px;
  padding: 40px;
  border-radius: var(--r-3xl);
  background:
    radial-gradient(60% 50% at 30% 20%, rgba(255, 197, 11, 0.18), transparent 70%),
    var(--surface-muted);
}

.vcard {
  display: grid;
  gap: 12px;
  width: min(100%, 360px);
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 28px;
  box-shadow: var(--shadow-float);
  font-family: var(--font-display);
  font-size: 13px;
  color: var(--ink);
}

.vcard__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.05em;
}

.input {
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--surface-muted);
}

.input small,
.payout small {
  font-size: 11px;
  color: var(--text-muted);
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.ttypes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ttype {
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid var(--border);
  font-size: 11px;
}

.ttype b {
  font-weight: 500;
  font-size: 13px;
}

.ttype--add {
  justify-content: center;
  border-style: dashed;
  border-color: var(--border-strong);
}

.fake-btn {
  display: block;
  margin-top: 4px;
  padding: 12px;
  text-align: center;
  border-radius: 12px;
  background: var(--ink);
  color: #fff;
  font-family: var(--font-ui);
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 6px 0 0 var(--accent);
}

.link-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--surface-muted);
}

.copy {
  padding: 4px 10px;
  border-radius: 8px;
  background: var(--ink);
  color: #fff;
  font-size: 11px;
}

.share {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.share span {
  padding: 6px 10px;
  border-radius: 99px;
  border: 1px solid var(--border);
  font-size: 12px;
}

.promo {
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--accent-tint);
  border: 1px dashed var(--accent-deep);
}

.promo b {
  font-weight: 600;
}

.agents {
  display: grid;
  gap: 6px;
}

.agent {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.agent i {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  font-style: normal;
  font-size: 11px;
}

.agent b {
  margin-left: auto;
  font-weight: 500;
}

.payout {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  border-radius: 16px;
  background: var(--accent);
}

.payout small {
  color: rgba(0, 0, 0, 0.7);
}

.payout b {
  font-family: var(--font-ui);
  font-weight: 400;
  font-size: 28px;
  letter-spacing: -0.05em;
}

.timeline {
  display: grid;
  gap: 8px;
  padding: 4px 4px 4px 2px;
}

.tl {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
}

.tl i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
}

.tl--done {
  color: var(--ink);
}

.tl--done i {
  border-color: var(--ink);
  background: var(--ink);
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s var(--ease-out);
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ---- steps ---- */
.steps {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  margin: 0;
}

.step {
  border-radius: var(--r-2xl);
  transition: background-color 0.3s;
}

.step.is-open {
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-hairline);
}

.step__h {
  font-size: inherit;
}

.step__btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  padding: 22px 24px;
  border: 0;
  background: transparent;
  text-align: left;
  border-radius: var(--r-2xl);
}

.step__num {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}

.is-open .step__num {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--ink);
}

.step__title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.06em;
  color: var(--text-muted);
}

.is-open .step__title,
.step__btn:hover .step__title {
  color: var(--ink);
}

.step__panel {
  padding: 0 24px 24px;
  display: grid;
  gap: 12px;
  color: var(--text);
}

.step__panel ul {
  display: grid;
  gap: 8px;
  font-size: 15px;
  color: var(--ink);
}

.step__panel li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step__panel :deep(svg) {
  flex: none;
  padding: 3px;
  box-sizing: content-box;
  background: var(--accent);
  border-radius: 50%;
}

.how__cta {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 991px) {
  .how__inner {
    grid-template-columns: 1fr;
  }
  .well {
    min-height: 420px;
    padding: 24px 16px;
  }
  .steps {
    padding: 8px 0 4px;
  }
}

@media (max-width: 767px) {
  .br {
    display: none;
  }
  .how {
    border-radius: 36px;
    padding: 6px;
  }
  .well {
    border-radius: 30px;
  }
  .step__btn {
    padding: 18px;
  }
  .step__panel {
    padding: 0 18px 18px;
  }
  .step__title {
    font-size: 21px;
  }
}
</style>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import PrimaryButton from '../ui/PrimaryButton.vue'
import AppIcon from '../ui/AppIcon.vue'
import UseCaseMock from '../mockups/UseCaseMock.vue'
import { links } from '../../data/site.js'
import { prefersReducedMotion, useInView } from '../../composables/motion.js'

const tabs = [
  {
    id: 'ticketing',
    icon: 'ticket',
    label: 'Ticketing',
    title: 'Sell every ticket type, everywhere',
    body: 'Ticket types, batches and releases, group packages, promo codes and invitations. Fans pay with mobile money, TanQR or card and get a unique QR ticket in the app, by email and by SMS.',
    points: ['Book now, pay later with order expiry', 'Embed tickets on your own website', 'Sell through agents and at the venue'],
    cta: 'Start selling tickets',
  },
  {
    id: 'checkin',
    icon: 'scan',
    label: 'Registration & check-in',
    title: 'Fast, fraud-proof entry at every gate',
    body: 'Scan tickets with the Tukiio Organizer app, run desk registration and self check-in, and watch entries live, gate by gate. Every QR is unique, so duplicates are caught at the door.',
    points: ['Group registration with a group leader', 'Digital badges and certificates', 'Team roles and multiple devices'],
    cta: 'Set up registration',
  },
  {
    id: 'voting',
    icon: 'trophy',
    label: 'Voting & awards',
    title: 'Transparent public voting for awards and pageants',
    body: 'Categories, nominees and shareable “vote for me” links. Voters verify with a one-time code by SMS or WhatsApp, and you follow the tally live.',
    points: ['Phone-verified votes', 'Live results dashboard', 'Shareable nominee links'],
    cta: 'Launch a voting campaign',
  },
  {
    id: 'marathon',
    icon: 'run',
    label: 'Marathons & races',
    title: 'Built for races, from 5 km fun runs to half marathons',
    body: 'Distances, race categories, bib numbers, T-shirt sizes and runner age, plus “add another runner” for families and teams.',
    points: ['Bib numbers and race categories', 'Group and team registration', 'Race-day check-in with the Organizer app'],
    cta: 'Open race registration',
  },
  {
    id: 'membership',
    icon: 'heart',
    label: 'Memberships, raffles & donations',
    title: 'Memberships, raffles and donations in one place',
    body: 'Collect member fees with member numbers, run “JISAJILI na USHINDE” raffles, and accept donations for causes, with the same payments and reports you use for tickets.',
    points: ['Member numbers and fees', 'Register-and-win raffles', 'Donations by mobile money'],
    cta: 'Create a campaign',
  },
  {
    id: 'whitelabel',
    icon: 'building',
    label: 'White-label portals',
    title: 'Your brand, our engine',
    body: 'Institutions and recurring events can run their own branded Tukiio portal, with their own logo and colours, and “Powered by Tukiio” underneath.',
    points: ['Your colours and logo', 'Your own tukiio.com subdomain', 'Same ticketing, payments and check-in'],
    cta: 'Talk to us about white-label',
    href: '#contact',
  },
]

const active = ref(0)
const tabEls = ref([])
const tablist = ref(null)
const root = ref(null)
const inView = useInView(root, 0.3)
const paused = ref(false)
const vertical = ref(true)
let stopped = false
let timer
let mq

function stop() {
  stopped = true
  clearInterval(timer)
}

// Keep the active tab visible inside the horizontally scrolling tablist (tablet/mobile)
// without scrolling the page vertically.
function revealTab(i) {
  const list = tablist.value
  const tab = tabEls.value[i]
  if (!list || !tab || list.scrollWidth <= list.clientWidth) return
  const left = tab.offsetLeft - list.offsetLeft
  const right = left + tab.offsetWidth
  if (left < list.scrollLeft) list.scrollTo({ left: left - 8, behavior: 'smooth' })
  else if (right > list.scrollLeft + list.clientWidth)
    list.scrollTo({ left: right - list.clientWidth + 8, behavior: 'smooth' })
}

function select(i, focus = false) {
  active.value = (i + tabs.length) % tabs.length
  if (focus) tabEls.value[active.value]?.focus()
  nextTick(() => revealTab(active.value))
}

function onClick(i) {
  stop()
  select(i)
}

function onKeydown(e) {
  const keys = {
    ArrowDown: active.value + 1,
    ArrowRight: active.value + 1,
    ArrowUp: active.value - 1,
    ArrowLeft: active.value - 1,
    Home: 0,
    End: tabs.length - 1,
  }
  if (e.key in keys) {
    e.preventDefault()
    stop()
    select(keys[e.key], true)
  }
}

const syncOrientation = () => (vertical.value = mq.matches)

onMounted(() => {
  mq = window.matchMedia('(min-width: 1200px)')
  syncOrientation()
  mq.addEventListener?.('change', syncOrientation)

  if (prefersReducedMotion()) return
  // Gentle auto-advance: only while in view, paused on hover/focus, and stopped for good
  // after any click, tap, touch or key press.
  timer = setInterval(() => {
    if (stopped || paused.value || !inView.value || document.visibilityState !== 'visible') return
    select(active.value + 1)
  }, 8000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  mq?.removeEventListener?.('change', syncOrientation)
})
</script>

<template>
  <section id="use-cases" class="section" aria-labelledby="uc-title">
    <div class="container">
      <div class="section-head">
        <EyebrowPill v-reveal>For every event</EyebrowPill>
        <h2 id="uc-title" v-reveal="80" class="section-title">
          Queues, fake tickets and slow payouts?<br />
          <HighlightPill>One platform</HighlightPill> runs it all
        </h2>
        <p v-reveal="160" class="section-sub">
          Ticketing is only the start. Tukiio runs registration, check-in, voting, races, memberships and branded
          portals from the same dashboard.
        </p>
      </div>

      <div
        ref="root"
        v-reveal
        class="tabs"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
        @pointerdown="stop"
        @touchstart.passive="stop"
      >
        <div
          ref="tablist"
          class="tablist"
          role="tablist"
          aria-label="Use cases"
          :aria-orientation="vertical ? 'vertical' : 'horizontal'"
          @keydown="onKeydown"
        >
          <button
            v-for="(t, i) in tabs"
            :id="`tab-${t.id}`"
            :key="t.id"
            :ref="(el) => (tabEls[i] = el)"
            class="tab"
            :class="{ 'is-active': i === active }"
            role="tab"
            type="button"
            :aria-selected="i === active ? 'true' : 'false'"
            :aria-controls="`panel-${t.id}`"
            :tabindex="i === active ? 0 : -1"
            @click="onClick(i)"
          >
            <AppIcon :name="t.icon" :size="20" />
            <span>{{ t.label }}</span>
          </button>
        </div>

        <div class="panel-wrap">
          <div
            v-for="(t, i) in tabs"
            v-show="i === active"
            :id="`panel-${t.id}`"
            :key="t.id"
            class="panel"
            role="tabpanel"
            :aria-labelledby="`tab-${t.id}`"
            tabindex="0"
          >
            <div class="panel__copy">
              <h3 class="panel__title">{{ t.title }}</h3>
              <p class="panel__body">{{ t.body }}</p>
              <ul class="panel__points" role="list">
                <li v-for="p in t.points" :key="p"><AppIcon name="check" :size="14" :stroke="2.4" />{{ p }}</li>
              </ul>
              <PrimaryButton :href="t.href || links.createEvent" icon="arrowRight" size="sm">{{ t.cta }}</PrimaryButton>
            </div>
            <div class="panel__visual" aria-hidden="true">
              <UseCaseMock :variant="t.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tabs {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: start;
}

.tablist {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: sticky;
  top: 120px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid transparent;
  border-radius: var(--r-xl);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.03em;
  text-align: left;
  transition:
    background-color 0.3s,
    color 0.3s,
    box-shadow 0.3s;
}

.tab:hover {
  color: var(--ink);
}

.tab.is-active {
  background: var(--surface);
  border-color: var(--border);
  box-shadow: var(--shadow-hairline);
  color: var(--ink);
}

.tab.is-active :deep(svg) {
  color: var(--ink);
  background: var(--accent);
  border-radius: 8px;
  padding: 2px;
  box-sizing: content-box;
}

.panel {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  align-items: center;
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-3xl);
  box-shadow: var(--shadow-float);
  min-height: 460px;
  animation: panel-in 0.5s var(--ease-out);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

.panel__copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}

.panel__title {
  font-size: clamp(24px, 2.5vw, 32px);
  line-height: 1.25;
  font-weight: 400;
  letter-spacing: -0.06em;
}

.panel__body {
  font-size: 16px;
  line-height: 1.45;
  color: var(--text);
}

.panel__points {
  display: grid;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 15px;
  color: var(--ink);
}

.panel__points li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel__points :deep(svg) {
  flex: none;
  padding: 3px;
  box-sizing: content-box;
  background: var(--accent);
  border-radius: 50%;
}

.panel__visual {
  border-radius: 28px;
  background:
    radial-gradient(60% 60% at 70% 30%, rgba(255, 197, 11, 0.22), transparent 70%),
    var(--surface-muted);
  overflow: hidden;
}

@media (max-width: 1199px) {
  .tabs {
    grid-template-columns: 1fr;
  }

  .tablist {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 4px;
    margin: -4px;
  }

  .tablist::-webkit-scrollbar {
    display: none;
  }

  .tab {
    width: auto;
    flex: none;
    padding: 12px 16px;
    font-size: 15px;
    white-space: nowrap;
  }
}

@media (max-width: 899px) {
  .panel {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}

@media (max-width: 767px) {
  .panel {
    padding: 20px 16px;
    border-radius: 28px;
  }
}
</style>

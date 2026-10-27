<script setup>
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import AppIcon from '../ui/AppIcon.vue'
import PayoutCalculator from './PayoutCalculator.vue'
import { links } from '../../data/site.js'

// Pricing facts from tukiio/01 & 07. TODO(client): confirm exactly which "basic features"
// the free tier includes, and the 7% fee details (payment method, who pays, minimums).
const plans = [
  {
    name: 'Free events',
    price: 'TZS 0',
    unit: '· forever',
    desc: 'Manage free events with basic features at no cost.',
    // TODO(client): list the exact basic features once confirmed; kept deliberately general.
    items: [
      { t: 'No ticket fee', d: 'Free events stay free, forever' },
      { t: 'Basic event features', d: 'Full feature list to be confirmed' },
    ],
    cta: 'Create a free event',
    href: links.createEvent,
  },
  {
    name: 'Paid events',
    price: '7%',
    unit: '/ per ticket',
    desc: 'Covers payment gateway and transfer fees. Deducted at payout.',
    featured: true,
    tag: 'For ticketed events',
    items: [
      { t: 'Sell on every channel', d: 'Web, app, USSD, SMS, agents, paper' },
      { t: 'Mobile money, TanQR & cards', d: 'Local payments built in' },
      { t: 'Payouts within 24 hours', d: 'Of your withdrawal request' },
      { t: 'Live sales & check-in reports', d: 'Gate by gate' },
    ],
    cta: 'Start selling',
    href: links.createEvent,
  },
  {
    name: 'Custom',
    price: 'Let’s talk',
    unit: '',
    desc: 'Big events, white-label portals, hardware and on-site teams, quoted for your needs.',
    items: [
      { t: 'White-label portal', d: 'Your brand, our engine' },
      { t: 'Wristbands, badges & printing', d: 'QR paper tickets from TZS 500/pc' },
      { t: 'Scanners, displays & desk team', d: 'On-site, sorted' },
    ],
    cta: 'Request a quote',
    href: '#contact',
  },
]
</script>

<template>
  <section id="pricing" class="section" aria-labelledby="pricing-title">
    <div class="container">
      <div class="section-head">
        <EyebrowPill v-reveal>Pricing</EyebrowPill>
        <h2 id="pricing-title" v-reveal="80" class="section-title">
          Simple pricing. <HighlightPill>Free</HighlightPill> for free events
        </h2>
        <p v-reveal="160" class="section-sub">Pay only when you sell, and get paid within 24 hours of your request.</p>
      </div>

      <ul class="plans" role="list">
        <li v-for="(p, i) in plans" :key="p.name" v-reveal="i * 100" class="plan" :class="{ 'plan--featured': p.featured }">
          <div class="plan__card">
            <div class="plan__head">
              <h3 class="plan__name">{{ p.name }}</h3>
              <span v-if="p.tag" class="plan__badge">{{ p.tag }}</span>
            </div>
            <p class="plan__price">
              <span class="plan__amount">{{ p.price }}</span>
              <span v-if="p.unit" class="plan__unit">{{ p.unit }}</span>
            </p>
            <p class="plan__desc">{{ p.desc }}</p>
            <hr />
            <ul class="plan__items" role="list">
              <li v-for="it in p.items" :key="it.t">
                <span class="tick"><AppIcon name="check" :size="12" :stroke="2.6" /></span>
                <span><b>{{ it.t }}</b><small>{{ it.d }}</small></span>
              </li>
            </ul>
          </div>
          <a :href="p.href" class="plan__base">
            {{ p.cta }} <AppIcon name="arrowRight" :size="18" />
            <span class="sr-only">: {{ p.name }}</span>
          </a>
        </li>
      </ul>

      <div v-reveal class="calc-wrap tray">
        <PayoutCalculator />
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
}

.plan {
  display: flex;
  flex-direction: column;
  border-radius: var(--r-3xl);
  background: var(--surface-muted);
  border: 1px solid var(--border);
}

.plan__card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background: var(--surface);
  border-radius: var(--r-3xl);
  box-shadow: var(--shadow-hairline);
  border: 1px solid var(--border);
  margin: -1px -1px 0;
}

.plan--featured .plan__card {
  box-shadow:
    var(--shadow-float),
    inset 0 6px 0 0 var(--accent);
}

.plan__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 30px;
}

.plan__name {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.06em;
}

.plan__badge {
  padding: 5px 12px;
  border-radius: 99px;
  background: var(--ink);
  color: var(--accent);
  font-size: 13px;
  font-weight: 500;
}

.plan__price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.plan__amount {
  font-family: var(--font-ui);
  font-size: clamp(44px, 4.6vw, 60px);
  line-height: 1;
  letter-spacing: -0.06em;
  color: var(--ink-strong);
}

.plan__unit {
  color: var(--text-muted);
}

.plan__desc {
  color: var(--text-muted);
  font-size: 15px;
  min-height: 3em;
}

hr {
  width: 100%;
  border: 0;
  border-top: 1px solid var(--border);
  margin: 4px 0;
}

.plan__items {
  display: grid;
  gap: 14px;
}

.plan__items li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.plan__items li > span:last-child {
  display: flex;
  flex-direction: column;
}

.plan__items b {
  font-weight: 500;
  color: var(--ink);
}

.plan__items small {
  font-size: 13px;
  color: var(--text-muted);
}

.tick {
  flex: none;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  border-radius: 50%;
  background: var(--accent);
  color: var(--ink);
}

.plan__base {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  font-family: var(--font-ui);
  font-weight: 500;
  color: var(--ink);
  border-radius: 0 0 var(--r-3xl) var(--r-3xl);
  transition: background-color 0.3s;
}

.plan__base:hover {
  background: var(--surface-hover);
}

.plan--featured .plan__base {
  background: var(--ink);
  color: #fff;
}

.plan--featured .plan__base:hover {
  background: var(--ink-hover);
}

.calc-wrap {
  margin-top: 48px;
}

@media (max-width: 991px) {
  .plans {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
  .plan__desc {
    min-height: 0;
  }
}

@media (max-width: 767px) {
  .plan__card {
    padding: 24px;
  }
  .calc-wrap {
    padding: 6px;
  }
}
</style>

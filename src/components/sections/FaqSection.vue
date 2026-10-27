<script setup>
import { ref } from 'vue'
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import AppIcon from '../ui/AppIcon.vue'

// Drafts from tukiio/07-copy-bank.md (operator names deliberately not listed: unconfirmed).
const faqs = [
  {
    q: 'How much does Tukiio cost?',
    a: 'Free events are free forever. For paid events we charge 7% of the ticket price, which covers payment and transfer fees. Custom packages are available for large events.',
  },
  { q: 'When do I get my money?', a: 'Funds are processed to your preferred account within 24 hours of your request.' },
  {
    q: 'How can my audience pay?',
    a: 'With mobile money, TanQR and debit or credit cards. Fans can also buy from a feature phone without internet.',
  },
  {
    q: 'Can you print tickets, wristbands and badges?',
    a: 'Yes. QR-coded, verifiable paper tickets start from TZS 500 per piece, and we also supply wristbands, badges, scanners and displays.',
  },
  {
    q: 'How do I check guests in?',
    a: 'Download the Tukiio Organizer app, add your team, and scan tickets at the entrance. Desk registration is supported too.',
  },
  {
    q: 'Can attendees buy for a group?',
    a: 'Yes. Group and multiple-ticket purchases are supported, including group registration for races.',
  },
  { q: 'Do you support voting and awards?', a: 'Yes. Run public voting campaigns with phone verification via SMS or WhatsApp.' },
  { q: 'Is Tukiio available in Kiswahili?', a: 'Yes, the platform supports both English and Kiswahili.' },
  {
    q: 'Can I have my own branded portal?',
    a: 'Yes. Institutions can run a white-label Tukiio portal with their own branding.',
  },
]

const open = ref(0)
const toggle = (i) => (open.value = open.value === i ? -1 : i)
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="container container--narrow">
      <div class="section-head">
        <EyebrowPill v-reveal>Got questions?</EyebrowPill>
        <h2 id="faq-title" v-reveal="80" class="section-title">
          Frequently asked <HighlightPill>questions</HighlightPill>
        </h2>
      </div>

      <div v-reveal class="faq card">
        <div v-for="(f, i) in faqs" :key="f.q" class="item" :class="{ 'is-open': open === i }">
          <h3 class="item__h">
            <button
              :id="`faq-btn-${i}`"
              type="button"
              class="item__btn"
              :aria-expanded="open === i ? 'true' : 'false'"
              :aria-controls="`faq-panel-${i}`"
              @click="toggle(i)"
            >
              <span class="item__icon"><AppIcon :name="open === i ? 'minus' : 'plus'" :size="16" :stroke="2" /></span>
              <span class="item__q"><span class="item__n">{{ String(i + 1).padStart(2, '0') }}.</span> {{ f.q }}</span>
            </button>
          </h3>
          <div
            :id="`faq-panel-${i}`"
            class="item__panel"
            role="region"
            :aria-labelledby="`faq-btn-${i}`"
            :hidden="open !== i"
          >
            <p>{{ f.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  border-radius: 32px;
  padding: 8px 32px;
}

.item + .item {
  border-top: 1px solid var(--border);
}

.item__h {
  font-size: inherit;
}

.item__btn {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 0;
  border: 0;
  background: none;
  text-align: left;
  font-family: var(--font-ui);
  font-size: 17px;
  font-weight: 500;
  color: var(--ink);
}

.item__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  transition: background-color 0.3s;
}

.is-open .item__icon,
.item__btn:hover .item__icon {
  background: var(--accent);
  border-color: var(--accent);
}

.item__n {
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  margin-right: 4px;
}

.item__panel {
  padding: 0 0 24px 48px;
  color: var(--text-muted);
  line-height: 1.5;
  max-width: 760px;
}

.item__panel:not([hidden]) {
  animation: faq-in 0.4s var(--ease-out);
}

@keyframes faq-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
}

@media (max-width: 767px) {
  .faq {
    padding: 4px 18px;
    border-radius: 26px;
  }
  .item__btn {
    font-size: 16px;
    gap: 12px;
    padding: 20px 0;
  }
  .item__panel {
    padding-left: 44px;
  }
}
</style>

<script setup>
/*
 * Simple estimate: ticket price × quantity, minus Tukiio's 7% on paid tickets.
 * TODO(client): confirm whether the 7% differs by payment method, who bears it, and any minimums (tukiio/09).
 */
import { computed, ref } from 'vue'
import { tzs } from '../../data/site.js'

const FEE = 0.07
const LIMITS = {
  price: { min: 0, max: 100000000 },
  qty: { min: 0, max: 1000000 },
}

const price = ref(25000)
const qty = ref(500)

const clamp = (v, { min, max }) => Math.min(max, Math.max(min, Number.isFinite(+v) && v !== '' ? +v : min))

// Write sanitised values back to the inputs on change/blur.
function commitPrice() {
  price.value = Math.round(clamp(price.value, LIMITS.price))
}
function commitQty() {
  qty.value = Math.floor(clamp(qty.value, LIMITS.qty))
}

const gross = computed(() => clamp(price.value, LIMITS.price) * Math.floor(clamp(qty.value, LIMITS.qty)))
const fee = computed(() => Math.round(gross.value * FEE))
const payout = computed(() => gross.value - fee.value)
</script>

<template>
  <div class="calc card">
    <div class="calc__inputs">
      <h3 class="calc__title">Payout calculator</h3>
      <p class="calc__sub">See what lands in your account, assuming the 7% fee is deducted from your sales.</p>

      <div class="field">
        <label for="calc-price">Ticket price (TZS)</label>
        <input
          id="calc-price"
          v-model.number="price"
          type="number"
          inputmode="numeric"
          :min="LIMITS.price.min"
          :max="LIMITS.price.max"
          step="1"
          @change="commitPrice"
          @blur="commitPrice"
        />
        <input v-model.number="price" type="range" min="0" max="200000" step="500" aria-label="Ticket price slider" />
      </div>

      <div class="field">
        <label for="calc-qty">Tickets sold</label>
        <input
          id="calc-qty"
          v-model.number="qty"
          type="number"
          inputmode="numeric"
          :min="LIMITS.qty.min"
          :max="LIMITS.qty.max"
          step="1"
          @change="commitQty"
          @blur="commitQty"
        />
        <input v-model.number="qty" type="range" min="0" max="10000" step="10" aria-label="Tickets sold slider" />
      </div>
    </div>

    <div class="calc__out">
      <dl>
        <div class="line">
          <dt>Ticket sales</dt>
          <dd>{{ tzs(gross) }}</dd>
        </div>
        <div class="line">
          <dt>Tukiio fee (7%)</dt>
          <dd>− {{ tzs(fee) }}</dd>
        </div>
        <div class="line line--total">
          <dt>Your estimated payout</dt>
          <dd aria-live="polite">{{ tzs(payout) }}</dd>
        </div>
      </dl>
      <p class="calc__note">
        Estimate only, assuming the 7% fee is deducted from your ticket sales. Paid out within 24 hours of your request.
      </p>
    </div>
  </div>
</template>

<style scoped>
.calc {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: var(--r-3xl);
}

.calc__inputs {
  display: grid;
  gap: 18px;
  padding: 28px;
}

.calc__title {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.06em;
}

.calc__sub {
  margin-top: -10px;
  color: var(--text-muted);
}

.field {
  display: grid;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

input[type='number'] {
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--r-md);
  border: 1px solid var(--border-strong);
  background: var(--surface-muted);
  font-family: var(--font-ui);
  font-size: 16px;
  color: var(--ink);
}

input[type='number']:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 1px;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--ink);
}

.calc__out {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(80% 80% at 100% 0%, rgba(255, 197, 11, 0.25), transparent 60%),
    var(--surface-muted);
}

dl {
  display: grid;
  gap: 4px;
  margin: 0;
}

.line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-strong);
  color: var(--text);
}

dd {
  margin: 0;
  font-family: var(--font-ui);
  color: var(--ink);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.line--total {
  flex-direction: column;
  border: 0;
  padding-top: 16px;
}

.line--total dt {
  font-weight: 500;
  color: var(--ink);
}

.line--total dd {
  text-align: left;
  font-size: clamp(30px, 3.6vw, 42px);
  letter-spacing: -0.05em;
  line-height: 1.1;
  word-break: break-word;
}

.line--total dd::after {
  content: '';
  display: block;
  height: 6px;
  margin-top: 10px;
  width: 64px;
  border-radius: 6px;
  background: var(--brand-gradient);
}

.calc__note {
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 899px) {
  .calc {
    grid-template-columns: 1fr;
  }
  .calc__inputs,
  .calc__out {
    padding: 20px;
  }
}
</style>

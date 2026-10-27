<script setup>
/* Organiser dashboard illustration (HTML/CSS). All figures are illustrative sample data. */
import TukiioMark from '../ui/TukiioMark.vue'
import AppIcon from '../ui/AppIcon.vue'

const kpis = [
  { label: 'Tickets sold', value: '3,482', delta: '+12% today' },
  { label: 'Checked in (live)', value: '1,248', live: true, delta: 'Gate A · Gate B' },
  { label: 'Revenue', value: 'TZS 87.0M', delta: 'Web, app, USSD, agents' },
  { label: 'Next payout', value: 'Within 24h', delta: 'Of your request · after 7% fee', accent: true },
]

const channels = [
  { name: 'Web', pct: 44 },
  { name: 'App', pct: 22 },
  { name: 'USSD', pct: 17 },
  { name: 'Agents', pct: 11 },
  { name: 'Paper QR', pct: 6 },
]

const orders = [
  { who: 'Neema M.', what: '2 × VIP', how: 'Mobile money', amt: 'TZS 100,000' },
  { who: 'Juma K.', what: '1 × Regular', how: 'USSD', amt: 'TZS 25,000' },
  { who: 'Asha R.', what: '4 × Group', how: 'TanQR', amt: 'TZS 80,000' },
  { who: 'Peter L.', what: '1 × VVIP', how: 'Card', amt: 'TZS 150,000' },
]

const nav = ['Overview', 'Tickets', 'Check-in', 'Voting', 'Payouts', 'Reports']
</script>

<template>
  <div
    class="dash"
    role="img"
    aria-label="Illustration of the Tukiio organiser dashboard: tickets sold, live check-ins, revenue in Tanzanian shillings, sales by channel and a payout due within 24 hours of the organiser's request."
  >
    <aside class="side">
      <div class="side__brand"><TukiioMark :size="18" /> <span>Organiser</span></div>
      <span v-for="(n, i) in nav" :key="n" class="side__item" :class="{ on: i === 0 }">{{ n }}</span>
      <div class="side__foot">
        <span class="side__chip">EN · SW</span>
      </div>
    </aside>

    <div class="main">
      <div class="top">
        <div>
          <span class="top__eyebrow">Sat 12 Dec · Dar es Salaam</span>
          <span class="top__title">Bahari Music Festival 2026</span>
        </div>
        <span class="top__status"><i />Sales open</span>
      </div>

      <div class="kpis">
        <div v-for="k in kpis" :key="k.label" class="kpi" :class="{ 'kpi--accent': k.accent }">
          <span class="kpi__label"><i v-if="k.live" class="pulse" />{{ k.label }}</span>
          <span class="kpi__value">{{ k.value }}</span>
          <span class="kpi__delta">{{ k.delta }}</span>
        </div>
      </div>

      <div class="grid">
        <div class="panel panel--chart">
          <div class="panel__head">
            <span>Ticket sales</span><span class="muted">Last 14 days</span>
          </div>
          <svg viewBox="0 0 400 140" preserveAspectRatio="none" class="chart">
            <defs>
              <linearGradient id="dashFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#FFC50B" stop-opacity="0.55" />
                <stop offset="100%" stop-color="#FFC50B" stop-opacity="0" />
              </linearGradient>
            </defs>
            <g stroke="#EFEFEF" stroke-width="1">
              <line x1="0" y1="35" x2="400" y2="35" />
              <line x1="0" y1="70" x2="400" y2="70" />
              <line x1="0" y1="105" x2="400" y2="105" />
            </g>
            <path
              d="M0,120 C30,112 50,116 80,100 S130,92 160,86 S210,96 240,70 S290,58 320,44 S370,30 400,18 L400,140 L0,140Z"
              fill="url(#dashFill)"
            />
            <path
              d="M0,120 C30,112 50,116 80,100 S130,92 160,86 S210,96 240,70 S290,58 320,44 S370,30 400,18"
              fill="none"
              style="stroke: var(--accent-line)"
              stroke-width="2.5"
            />
            <line x1="320" y1="44" x2="320" y2="140" stroke="#0b0b0b" stroke-dasharray="3 3" />
            <circle cx="320" cy="44" r="5" fill="#0b0b0b" stroke="#fff" stroke-width="2" />
          </svg>
          <span class="tooltip">412 sold</span>
        </div>

        <div class="panel">
          <div class="panel__head"><span>Sales by channel</span></div>
          <ul class="bars">
            <li v-for="c in channels" :key="c.name">
              <span class="bars__name">{{ c.name }}</span>
              <span class="bars__track"><span class="bars__fill" :style="{ width: c.pct * 2 + '%' }" /></span>
              <span class="bars__pct">{{ c.pct }}%</span>
            </li>
          </ul>
        </div>

        <div class="panel panel--wide">
          <div class="panel__head"><span>Recent orders</span><span class="muted">Live</span></div>
          <ul class="orders">
            <li v-for="o in orders" :key="o.who">
              <span class="avatar">{{ o.who[0] }}</span>
              <span class="orders__who">{{ o.who }}<small>{{ o.what }}</small></span>
              <span class="orders__how">{{ o.how }}</span>
              <span class="orders__amt">{{ o.amt }}</span>
              <span class="orders__ok"><AppIcon name="check" :size="12" :stroke="2.4" /></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dash {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0;
  background: var(--surface-muted);
  border-radius: 30px;
  overflow: hidden;
  font-family: var(--font-display);
  color: var(--ink);
  text-align: left;
  letter-spacing: -0.02em;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 22px 14px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.side__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px 16px;
  font-weight: 500;
  font-size: 14px;
}

.side__item {
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13px;
  color: var(--text-muted);
}

.side__item.on {
  background: var(--ink);
  color: var(--accent);
  font-weight: 500;
}

.side__foot {
  margin-top: auto;
  padding: 10px;
}

.side__chip {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 99px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.main {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.top > div {
  display: flex;
  flex-direction: column;
}

.top__eyebrow {
  font-size: 12px;
  color: var(--text-muted);
}

.top__title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.05em;
}

.top__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.top__status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--online);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.kpi {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-hairline);
}

.kpi--accent {
  background: var(--accent);
  border-color: var(--accent);
}

.kpi__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.kpi--accent .kpi__label,
.kpi--accent .kpi__delta {
  color: rgba(0, 0, 0, 0.72);
}

.kpi__value {
  font-family: var(--font-ui);
  font-size: 22px;
  letter-spacing: -0.05em;
  color: var(--ink-strong);
  white-space: nowrap;
}

.kpi__delta {
  font-size: 11px;
  color: var(--text-muted);
}

.pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--online);
  box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.5);
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 7px rgba(22, 163, 74, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(22, 163, 74, 0);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 12px;
}

.panel {
  position: relative;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  min-width: 0;
}

.panel--wide {
  grid-column: 1 / -1;
}

.panel__head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 10px;
}

.muted {
  color: var(--text-muted);
  font-weight: 400;
}

.chart {
  width: 100%;
  height: 130px;
}

.tooltip {
  position: absolute;
  top: 36px;
  right: 14%;
  padding: 4px 9px;
  border-radius: 8px;
  background: var(--ink);
  color: #fff;
  font-size: 11px;
}

.bars {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.bars li {
  display: grid;
  grid-template-columns: 62px 1fr 34px;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.bars__track {
  height: 8px;
  border-radius: 99px;
  background: var(--surface-muted);
  overflow: hidden;
}

.bars__fill {
  display: block;
  height: 100%;
  border-radius: 99px;
  background: var(--brand-gradient);
}

.bars__pct {
  text-align: right;
  color: var(--text-muted);
}

.orders {
  list-style: none;
  padding: 0;
  margin: 0;
}

.orders li {
  display: grid;
  grid-template-columns: 30px 1.3fr 1fr 1fr 20px;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 13px;
  border-top: 1px solid var(--border);
}

.orders li:first-child {
  border-top: 0;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--accent-tint);
  font-weight: 500;
}

.orders__who {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.orders__who small {
  font-weight: 400;
  color: var(--text-muted);
  font-size: 11px;
}

.orders__how {
  color: var(--text-muted);
}

.orders__amt {
  font-family: var(--font-ui);
  white-space: nowrap;
}

.orders__ok {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 900px) {
  .dash {
    grid-template-columns: 1fr;
  }
  .side {
    display: none;
  }
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .main {
    padding: 14px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .orders li {
    grid-template-columns: 30px 1fr auto 20px;
  }
  .orders__how {
    display: none;
  }
  .kpi__value {
    font-size: 18px;
  }
  .top__title {
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }
}
</style>

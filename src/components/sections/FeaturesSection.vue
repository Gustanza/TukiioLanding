<script setup>
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import TukiioMark from '../ui/TukiioMark.vue'
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon.vue'

const channels = [
  { label: 'Web', icon: 'globe' },
  { label: 'App', icon: 'phone' },
  { label: 'USSD', icon: 'sms' },
  { label: 'SMS', icon: 'mail' },
  { label: 'Agents', icon: 'users' },
  { label: 'Paper QR', icon: 'qr' },
]

const onsite = ['🎫 Printed QR tickets', '🔖 Wristbands', '🪪 Attendee badges', '💌 E-cards', '📷 Scanners', '🖥️ Displays', '🧑‍💼 Desk team']
const events = ['🎤 Concerts', '💼 Conferences', '🏃 Marathons', '🏆 Awards', '💍 Weddings', '📚 Trainings', '🎪 Festivals', '🎓 Campus events']

// USSD menu: the real Tukiio short code still needs confirming with the client (tukiio/09).
// Tap/click toggles the decorative marquee (it is aria-hidden; the list is repeated in sr-only text).
const mqPaused = ref(false)

const ussd = ['1. Buy ticket', '2. My tickets', '3. Vote', '4. Register', '5. Help']
</script>

<template>
  <section id="features" class="section" aria-labelledby="features-title">
    <div class="container">
      <div class="section-head section-head--left">
        <EyebrowPill v-reveal>Everything you need</EyebrowPill>
        <h2 id="features-title" v-reveal="80" class="section-title">
          Discover what <HighlightPill>Tukiio</HighlightPill> can do<br class="br" />
          for your next event
        </h2>
        <p v-reveal="160" class="section-sub">
          Built for how Tanzania buys tickets: on any phone, with local payments, online or offline.
        </p>
      </div>

      <div class="bento">
        <!-- 1. Sell everywhere -->
        <div v-reveal class="tray cell cell--wide">
          <article class="card feat">
            <div class="feat__art art-hub" aria-hidden="true">
              <svg class="hub-lines" viewBox="0 0 600 260" preserveAspectRatio="none">
                <g stroke="#cfcfcf" stroke-dasharray="4 5" fill="none">
                  <path d="M300 130 C220 130 200 50 110 50" />
                  <path d="M300 130 C220 130 200 130 90 130" />
                  <path d="M300 130 C220 130 200 210 110 210" />
                  <path d="M300 130 C380 130 400 50 490 50" />
                  <path d="M300 130 C380 130 400 130 510 130" />
                  <path d="M300 130 C380 130 400 210 490 210" />
                </g>
              </svg>
              <span class="hub-core"><TukiioMark :size="40" /></span>
              <span v-for="(c, i) in channels" :key="c.label" class="hub-pill" :class="`hub-pill--${i}`">
                <AppIcon :name="c.icon" :size="16" />{{ c.label }}
              </span>
            </div>
            <div class="feat__text">
              <h3 class="feat__title"><span aria-hidden="true">🌍</span> Sell everywhere</h3>
              <p>Web, mobile app, USSD and SMS, ticket agents, paper and at the door. Nobody gets left out.</p>
            </div>
          </article>
        </div>

        <!-- 2. Pay the local way -->
        <div v-reveal="100" class="tray cell cell--wide">
          <article class="card feat">
            <div class="feat__art art-pay" aria-hidden="true">
              <div class="push">
                <span class="push__app"><AppIcon name="wallet" :size="18" /> Mobile Money Push</span>
                <span class="push__msg">Pay <b>TZS 50,000</b> to TUKIIO for 2 × Regular?</span>
                <span class="push__actions"><span>Cancel</span><span class="ok">Confirm</span></span>
              </div>
              <div class="pay-chips">
                <span>📲 Mobile money</span>
                <span>🔳 TanQR</span>
                <span>💳 Debit &amp; credit cards</span>
              </div>
            </div>
            <div class="feat__text">
              <h3 class="feat__title"><span aria-hidden="true">💳</span> Pay the local way</h3>
              <p>Mobile money push, TanQR and cards. Fans pay in seconds, and every payment lands in your reports.</p>
            </div>
          </article>
        </div>

        <!-- 3. USSD -->
        <div v-reveal class="tray cell">
          <article class="card feat">
            <div class="feat__art art-ussd" aria-hidden="true">
              <div class="fphone">
                <div class="fphone__screen">
                  <span class="fphone__head">TUKIIO</span>
                  <span v-for="l in ussd" :key="l" class="fphone__line">{{ l }}</span>
                  <span class="fphone__input">Reply: 1<i /></span>
                </div>
                <div class="fphone__keys"><span v-for="k in 9" :key="k" /></div>
              </div>
            </div>
            <div class="feat__text">
              <h3 class="feat__title"><span aria-hidden="true">📱</span> Works on any phone</h3>
              <p>Fans buy from a feature phone, with no internet needed.</p>
            </div>
          </article>
        </div>

        <!-- 4. Paper QR -->
        <div v-reveal="100" class="tray cell">
          <article class="card feat">
            <div class="feat__art art-paper" aria-hidden="true">
              <div class="stub">
                <div class="stub__l">
                  <span class="stub__ev">Gospel Night</span>
                  <span class="stub__meta">Regular · No. 000214</span>
                  <span class="stub__price">from TZS 500 / pc</span>
                </div>
                <div class="stub__r">
                  <span class="stub__qr"><span v-for="n in 16" :key="n" :class="{ on: [1, 2, 4, 6, 7, 9, 11, 12, 13, 16].includes(n) }" /></span>
                </div>
              </div>
              <span class="verify"><AppIcon name="shield" :size="16" /> Verified with your phone camera</span>
            </div>
            <div class="feat__text">
              <h3 class="feat__title"><span aria-hidden="true">🛡️</span> Fraud-proof paper tickets</h3>
              <p>Unique QR on every ticket. Fans can verify before they buy.</p>
            </div>
          </article>
        </div>

        <!-- 5. Reports & payouts -->
        <div v-reveal="200" class="tray cell">
          <article class="card feat">
            <div class="feat__art art-chart" aria-hidden="true">
              <div class="chart-head">
                <span class="chart-head__num">+1,248 <span class="up">↑</span></span>
                <span class="chart-head__lbl">Check-ins tonight</span>
              </div>
              <svg viewBox="0 0 300 110" preserveAspectRatio="none" class="chart">
                <defs>
                  <linearGradient id="featFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#FFC50B" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="#FFC50B" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,95 C40,90 60,80 90,70 S150,74 180,48 S240,30 300,14 L300,110 L0,110Z" fill="url(#featFill)" />
                <path d="M0,95 C40,90 60,80 90,70 S150,74 180,48 S240,30 300,14" fill="none" style="stroke: var(--accent-line)" stroke-width="2.5" />
                <line x1="180" y1="48" x2="180" y2="110" stroke="#0b0b0b" stroke-dasharray="3 3" />
                <circle cx="180" cy="48" r="5" fill="#0b0b0b" stroke="#fff" stroke-width="2" />
              </svg>
              <span class="payout-pill">💸 Payout within 24h of request</span>
            </div>
            <div class="feat__text">
              <h3 class="feat__title"><span aria-hidden="true">📊</span> Reports &amp; payouts</h3>
              <p>See sales as they happen and withdraw within 24 hours of your request.</p>
            </div>
          </article>
        </div>

        <!-- 6. On-site services + marquee -->
        <div v-reveal class="tray cell cell--full">
          <article class="card feat feat--row">
            <div class="feat__text feat__text--big">
              <h3 class="feat__title"><span aria-hidden="true">🧰</span> On-site, sorted</h3>
              <p>
                Wristbands, badges, printed tickets, scanners, displays and a desk team when you need one, from the same
                partner that runs your tickets.
              </p>
            </div>
            <div class="marquee" :class="{ 'is-paused': mqPaused }" aria-hidden="true" @click="mqPaused = !mqPaused">
              <div class="marquee__row">
                <div class="marquee__track">
                  <span v-for="(p, i) in [...onsite, ...onsite]" :key="'a' + i" class="mq-pill" :class="{ dup: i >= onsite.length }">{{ p }}</span>
                </div>
              </div>
              <div class="marquee__row marquee__row--rev">
                <div class="marquee__track">
                  <span v-for="(p, i) in [...events, ...events]" :key="'b' + i" class="mq-pill" :class="{ dup: i >= events.length }">{{ p }}</span>
                </div>
              </div>
            </div>
            <p class="sr-only">
              On-site services: {{ onsite.join(', ') }}. Event types: {{ events.join(', ') }}.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}

.cell {
  min-width: 0;
  grid-column: span 2;
  display: flex;
}

.cell--wide {
  grid-column: span 3;
}

.cell--full {
  grid-column: 1 / -1;
}

.feat {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--r-3xl);
  overflow: hidden;
}

.feat__art {
  position: relative;
  flex: 1;
  min-height: 260px;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(180deg, var(--surface-muted), var(--surface) 90%);
  overflow: hidden;
}

.feat__text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 28px 28px;
}

.feat__title {
  font-size: 20px;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.06em;
}

.feat__text p {
  font-size: 15px;
  line-height: 1.4;
  color: var(--text-muted);
}

/* ---- hub ---- */
.art-hub {
  min-height: 300px;
}

.hub-lines {
  position: absolute;
  inset: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}

.hub-core {
  position: relative;
  display: grid;
  place-items: center;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff, var(--accent-tint) 60%, var(--accent-soft));
  box-shadow:
    0 0 0 10px rgba(255, 197, 11, 0.12),
    0 0 0 22px rgba(255, 197, 11, 0.06),
    var(--shadow-float);
}

.hub-pill {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 99px;
  box-shadow: var(--shadow-hairline);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.hub-pill--0 {
  top: 16%;
  left: 8%;
}
.hub-pill--1 {
  top: 44%;
  left: 3%;
}
.hub-pill--2 {
  bottom: 16%;
  left: 8%;
}
.hub-pill--3 {
  top: 16%;
  right: 8%;
}
.hub-pill--4 {
  top: 44%;
  right: 3%;
}
.hub-pill--5 {
  bottom: 16%;
  right: 6%;
}

/* ---- pay ---- */
.art-pay {
  gap: 18px;
  align-content: center;
}

.push {
  display: grid;
  gap: 10px;
  width: min(100%, 300px);
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-float);
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text);
}

.push__app {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--ink);
}

.push__msg b {
  color: var(--ink);
  font-weight: 500;
}

.push__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.push__actions span {
  padding: 7px 14px;
  border-radius: 10px;
  background: var(--surface-muted);
  font-size: 13px;
  color: var(--ink);
}

.push__actions .ok {
  background: var(--ink);
  color: #fff;
}

.pay-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.pay-chips span {
  padding: 7px 12px;
  border-radius: 99px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-hairline);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}

/* ---- feature phone ---- */
.fphone {
  width: 150px;
  padding: 14px 14px 16px;
  border-radius: 30px 30px 40px 40px;
  background: linear-gradient(160deg, #2a2a2a, #0b0b0b);
  box-shadow: var(--shadow-float);
  transform: rotate(-6deg) translateY(24px);
}

.fphone__screen {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
  border-radius: 8px;
  background: #e9f3c9;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0;
  color: #1d2a12;
}

.fphone__head {
  font-weight: 700;
  margin-bottom: 2px;
}

.fphone__input {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.fphone__input i {
  display: inline-block;
  width: 6px;
  height: 11px;
  margin-left: 2px;
  vertical-align: -2px;
  background: #1d2a12;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.fphone__keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 12px;
}

.fphone__keys span {
  height: 12px;
  border-radius: 6px;
  background: #3a3a3a;
}

/* ---- paper stub ---- */
.art-paper {
  gap: 16px;
  align-content: center;
}

.stub {
  display: flex;
  width: 250px;
  border-radius: 14px;
  background: var(--accent);
  box-shadow: 0 16px 30px -14px rgba(200, 130, 0, 0.6);
  transform: rotate(-4deg);
  position: relative;
}

.stub::before,
.stub::after {
  content: '';
  position: absolute;
  left: 160px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--surface-muted);
}

.stub::before {
  top: -8px;
}
.stub::after {
  bottom: -8px;
}

.stub__l {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  border-right: 2px dashed rgba(0, 0, 0, 0.25);
  font-family: var(--font-display);
  color: var(--ink);
}

.stub__ev {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.04em;
}

.stub__meta {
  font-size: 11px;
}

.stub__price {
  margin-top: 8px;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 99px;
  background: var(--ink);
  color: var(--accent);
  align-self: flex-start;
}

.stub__r {
  display: grid;
  place-items: center;
  width: 80px;
}

.stub__qr {
  display: grid;
  grid-template-columns: repeat(4, 9px);
  gap: 2px;
  padding: 5px;
  border-radius: 6px;
  background: #fff;
}

.stub__qr span {
  width: 9px;
  height: 9px;
}

.stub__qr .on {
  background: var(--ink);
}

.verify {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 99px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-hairline);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}

/* ---- chart ---- */
.art-chart {
  align-content: center;
  justify-items: stretch;
  gap: 8px;
}

.chart-head {
  display: flex;
  flex-direction: column;
}

.chart-head__num {
  font-family: var(--font-ui);
  font-size: 32px;
  letter-spacing: -0.05em;
  color: var(--ink-strong);
}

.up {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--accent);
  font-size: 15px;
  vertical-align: 4px;
}

.chart-head__lbl {
  font-size: 13px;
  color: var(--text-muted);
}

.chart {
  width: 100%;
  max-width: 420px;
  height: 100px;
}

.payout-pill {
  justify-self: start;
  padding: 7px 12px;
  border-radius: 99px;
  background: var(--ink);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
}

/* ---- full-width row with marquee ---- */
.feat--row {
  flex-direction: row;
  align-items: center;
}

.feat__text--big {
  flex: 0 0 38%;
  padding: 40px;
}

.feat__text--big .feat__title {
  font-size: 28px;
}

.marquee {
  flex: 1;
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: 40px 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.marquee__row {
  overflow: hidden;
}

.marquee__track {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.marquee__row--rev .marquee__track {
  animation-direction: reverse;
}

.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track,
.marquee.is-paused .marquee__track {
  animation-play-state: paused;
}

.mq-pill {
  flex: none;
  padding: 10px 18px;
  border-radius: 99px;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
}

@keyframes marquee {
  to {
    transform: translateX(calc(-50% - 6px));
  }
}

@media (max-width: 1199px) {
  .cell:not(.cell--full),
  .cell--wide {
    grid-column: span 3;
  }
  .cell--full {
    grid-column: 1 / -1;
  }
  .cell:nth-child(5) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 899px) {
  .bento {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
  .cell,
  .cell--wide,
  .cell:nth-child(5) {
    grid-column: auto;
  }
  .feat--row {
    flex-direction: column;
    align-items: stretch;
  }
  .feat__text--big {
    padding: 28px 28px 0;
  }
  .marquee {
    padding: 24px 0 32px;
  }
}

@media (max-width: 767px) {
  .br {
    display: none;
  }
  .hub-pill {
    font-size: 12px;
    padding: 6px 10px;
  }
  .hub-pill--1,
  .hub-pill--4 {
    top: 42%;
  }
  .hub-pill--1 {
    left: 0;
  }
  .hub-pill--4 {
    right: 0;
  }
  .hub-core {
    width: 72px;
    height: 72px;
  }
  .feat__text {
    padding: 18px 20px 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* static, swipeable rows instead of an auto-scrolling marquee */
  .marquee__track {
    animation: none;
    padding-inline: 24px;
  }
  .mq-pill.dup {
    display: none;
  }
  .marquee {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .marquee__row {
    overflow-x: auto;
    scrollbar-width: none;
  }
  .fphone__input i {
    animation: none;
  }
}
</style>

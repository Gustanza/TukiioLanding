<script setup>
/* Product-UI illustrations for each use-case tab. Sample data only. */
import AppIcon from '../ui/AppIcon.vue'
import TukiioMark from '../ui/TukiioMark.vue'

defineProps({
  variant: { type: String, required: true },
})

const qrOn = [0, 1, 2, 4, 6, 7, 9, 10, 12, 13, 16, 18, 20, 21, 23, 24, 25, 27, 28, 31, 33, 35]

const nominees = [
  { name: 'Nominee A', votes: 18420, pct: 92 },
  { name: 'Nominee B', votes: 15108, pct: 76 },
  { name: 'Nominee C', votes: 11270, pct: 57 },
  { name: 'Nominee D', votes: 6034, pct: 30 },
]
</script>

<template>
  <!-- Ticketing: QR ticket on a phone + mobile-money prompt -->
  <div v-if="variant === 'ticketing'" class="m m--ticket">
    <div class="phone">
      <div class="phone__notch" />
      <div class="phone__screen">
        <span class="phone__label">My Tickets</span>
        <div class="tk">
          <div class="tk__top">
            <span class="tk__date"><b>12</b>Dec</span>
            <span class="tk__info"><b>Bahari Music Festival</b>Coco Beach · 18:00</span>
          </div>
          <div class="tk__cut" />
          <div class="tk__qr">
            <span v-for="n in 36" :key="n" :class="{ on: qrOn.includes(n - 1) }" />
          </div>
          <span class="tk__type">VIP · Admit 1 · #TK-48213</span>
        </div>
      </div>
    </div>
    <div class="momo">
      <span class="momo__title"><AppIcon name="phone" :size="16" /> Mobile money</span>
      <span class="momo__text">Confirm payment of <b>TZS 50,000</b> to TUKIIO. Enter PIN.</span>
      <span class="momo__pin"><i /><i /><i /><i /></span>
    </div>
  </div>

  <!-- Registration & check-in: scanner -->
  <div v-else-if="variant === 'checkin'" class="m m--scan">
    <div class="phone phone--dark">
      <div class="phone__notch" />
      <div class="phone__screen phone__screen--dark">
        <span class="scan__head">Gate A · Scanner</span>
        <div class="scan__view">
          <span class="scan__corner scan__corner--tl" />
          <span class="scan__corner scan__corner--tr" />
          <span class="scan__corner scan__corner--bl" />
          <span class="scan__corner scan__corner--br" />
          <span class="scan__beam" />
        </div>
        <div class="scan__ok">
          <span class="scan__tick"><AppIcon name="check" :size="16" :stroke="2.6" /></span>
          <span><b>Valid ticket</b>Asha R. · Regular</span>
        </div>
      </div>
    </div>
    <div class="stat-card">
      <span class="stat-card__label">Checked in</span>
      <span class="stat-card__value">1,248 <small>/ 3,482</small></span>
      <span class="stat-card__bar"><span style="width: 36%" /></span>
      <span class="stat-card__meta">Desk registration · 3 devices online</span>
    </div>
  </div>

  <!-- Voting & awards -->
  <div v-else-if="variant === 'voting'" class="m m--vote">
    <div class="board">
      <div class="board__head">
        <span><AppIcon name="trophy" :size="18" /> Best New Artist</span>
        <span class="live"><i />Live tally</span>
      </div>
      <ul class="board__list">
        <li v-for="(n, i) in nominees" :key="n.name">
          <span class="board__rank">{{ i + 1 }}</span>
          <span class="board__name">{{ n.name }}</span>
          <span class="board__bar"><span :style="{ width: n.pct + '%' }" /></span>
          <span class="board__votes">{{ n.votes.toLocaleString('en-US') }}</span>
        </li>
      </ul>
      <div class="otp">
        <span>Verify your vote</span>
        <span class="otp__boxes"><i>4</i><i>8</i><i>1</i><i /></span>
        <span class="otp__via">Code sent by SMS or WhatsApp</span>
      </div>
    </div>
  </div>

  <!-- Marathons -->
  <div v-else-if="variant === 'marathon'" class="m m--race">
    <div class="form">
      <span class="form__title">Register a runner</span>
      <div class="seg"><span class="on">21 km</span><span>10 km</span><span>5 km</span></div>
      <div class="field"><span>Category</span><b>Women 30–39</b></div>
      <div class="field"><span>T-shirt size</span><b>M</b></div>
      <div class="field field--add"><AppIcon name="plus" :size="14" /> Add another runner</div>
    </div>
    <div class="bib">
      <span class="bib__pins"><i /><i /></span>
      <span class="bib__event">City Half Marathon</span>
      <span class="bib__no">2147</span>
      <span class="bib__race">21 km · Wave B</span>
    </div>
  </div>

  <!-- Memberships, raffles, donations -->
  <div v-else-if="variant === 'membership'" class="m m--member">
    <div class="mcard">
      <span class="mcard__top"><TukiioMark :size="18" stem="#fff" /> <span>Member</span></span>
      <span class="mcard__no">MBR · 00482</span>
      <span class="mcard__name">Association member · 2026</span>
    </div>
    <div class="mini-cards">
      <div class="mc">
        <span class="mc__emoji" aria-hidden="true">🎁</span>
        <span><b>JISAJILI na USHINDE</b>Register and win · Raffle closes Fri</span>
      </div>
      <div class="mc">
        <span class="mc__emoji" aria-hidden="true">💛</span>
        <span><b>Donation received</b>TZS 20,000 · Thank you!</span>
      </div>
    </div>
  </div>

  <!-- White-label -->
  <div v-else class="m m--white">
    <div class="browser">
      <div class="browser__bar">
        <span class="dots"><i /><i /><i /></span>
        <span class="url">yourbrand.tukiio.com</span>
      </div>
      <div class="browser__body">
        <div class="wl__nav">
          <span class="wl__logo">Your Logo</span>
          <span class="wl__links"><i /><i /><i /></span>
        </div>
        <div class="wl__hero">
          <span class="wl__h" />
          <span class="wl__h wl__h--short" />
          <span class="wl__btn">Register</span>
        </div>
        <div class="wl__cards"><span /><span /><span /></div>
        <span class="wl__powered">Powered by <b>tukiio</b></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.m {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 340px;
  padding: 24px;
  font-family: var(--font-display);
  color: var(--ink);
  letter-spacing: -0.02em;
}

b {
  font-weight: 500;
}

/* ---------- phone ---------- */
.phone {
  position: relative;
  flex: none;
  width: 196px;
  padding: 10px;
  border-radius: 34px;
  background: var(--ink);
  box-shadow: var(--shadow-float);
}

.phone__notch {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 56px;
  height: 14px;
  margin-left: -28px;
  border-radius: 10px;
  background: #000;
  z-index: 2;
}

.phone__screen {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 330px;
  padding: 38px 12px 14px;
  border-radius: 26px;
  background: var(--surface-muted);
}

.phone__screen--dark {
  background: #161616;
  color: #fff;
}

.phone__label {
  font-size: 15px;
  font-weight: 500;
}

/* ticket */
.tk {
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--border);
  overflow: hidden;
}

.tk__top {
  display: flex;
  gap: 8px;
  padding: 10px;
  background: var(--accent);
}

.tk__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 7px;
  border-radius: 8px;
  background: var(--surface);
  font-size: 10px;
  line-height: 1.1;
}

.tk__date b {
  font-size: 15px;
}

.tk__info {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  line-height: 1.3;
}

.tk__info b {
  font-size: 12px;
}

.tk__cut {
  border-top: 2px dashed var(--border-strong);
  margin: 0 8px;
}

.tk__qr {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  width: 112px;
  margin: 12px auto 8px;
}

.tk__qr span {
  aspect-ratio: 1;
  border-radius: 2px;
  background: var(--surface-muted);
}

.tk__qr span.on {
  background: var(--ink);
}

.tk__type {
  display: block;
  padding: 0 10px 10px;
  text-align: center;
  font-size: 10px;
  color: var(--text-muted);
}

.momo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 210px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-float);
  font-size: 13px;
  transform: translateY(40px);
}

.momo__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.momo__text {
  color: var(--text);
  line-height: 1.35;
}

.momo__text b {
  color: var(--ink);
}

.momo__pin {
  display: flex;
  gap: 6px;
}

.momo__pin i {
  flex: 1;
  height: 30px;
  border-radius: 8px;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  position: relative;
}

.momo__pin i:nth-child(-n + 3)::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ink);
}

/* ---------- scanner ---------- */
.scan__head {
  font-size: 13px;
  font-weight: 500;
}

.scan__view {
  position: relative;
  height: 150px;
  border-radius: 14px;
  background: radial-gradient(circle at 50% 40%, #2b2b2b, #111);
  overflow: hidden;
}

.scan__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 0 solid var(--accent);
}

.scan__corner--tl {
  top: 22px;
  left: 30px;
  border-top-width: 3px;
  border-left-width: 3px;
}
.scan__corner--tr {
  top: 22px;
  right: 30px;
  border-top-width: 3px;
  border-right-width: 3px;
}
.scan__corner--bl {
  bottom: 22px;
  left: 30px;
  border-bottom-width: 3px;
  border-left-width: 3px;
}
.scan__corner--br {
  bottom: 22px;
  right: 30px;
  border-bottom-width: 3px;
  border-right-width: 3px;
}

.scan__beam {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 30px;
  height: 2px;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
  animation: beam 2.2s ease-in-out infinite alternate;
}

@keyframes beam {
  to {
    top: 118px;
  }
}

.scan__ok {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border-radius: 14px;
  background: var(--accent);
  color: var(--ink);
  font-size: 11px;
}

.scan__ok span:last-child {
  display: flex;
  flex-direction: column;
}

.scan__ok b {
  font-size: 13px;
}

.scan__tick {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--accent);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 220px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-float);
  transform: translateY(-40px);
}

.stat-card__label {
  font-size: 13px;
  color: var(--text-muted);
}

.stat-card__value {
  font-family: var(--font-ui);
  font-size: 30px;
  letter-spacing: -0.05em;
}

.stat-card__value small {
  font-size: 14px;
  color: var(--text-muted);
}

.stat-card__bar {
  height: 8px;
  border-radius: 9px;
  background: var(--surface-muted);
  overflow: hidden;
}

.stat-card__bar span {
  display: block;
  height: 100%;
  background: var(--brand-gradient);
}

.stat-card__meta {
  font-size: 11px;
  color: var(--text-muted);
}

/* ---------- voting ---------- */
.board {
  width: min(100%, 400px);
  padding: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow-float);
}

.board__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-bottom: 14px;
}

.board__head > span:first-child {
  display: flex;
  gap: 8px;
  align-items: center;
}

.live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--online);
}

.board__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.board__list li {
  display: grid;
  grid-template-columns: 24px 82px 1fr 52px;
  gap: 8px;
  align-items: center;
  font-size: 13px;
}

.board__rank {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--surface-muted);
  font-size: 12px;
}

.board__list li:first-child .board__rank {
  background: var(--accent);
}

.board__bar {
  height: 10px;
  border-radius: 9px;
  background: var(--surface-muted);
  overflow: hidden;
}

.board__bar span {
  display: block;
  height: 100%;
  border-radius: 9px;
  background: var(--brand-gradient);
}

.board__votes {
  font-family: var(--font-ui);
  text-align: right;
  font-size: 12px;
}

.otp {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 16px;
  background: var(--surface-muted);
  font-size: 13px;
  font-weight: 500;
}

.otp__boxes {
  display: flex;
  gap: 6px;
}

.otp__boxes i {
  display: grid;
  place-items: center;
  width: 34px;
  height: 38px;
  border-radius: 9px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  font-style: normal;
  font-family: var(--font-ui);
}

.otp__boxes i:last-child {
  border-color: var(--ink);
}

.otp__via {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-muted);
}

/* ---------- marathon ---------- */
.form {
  display: grid;
  gap: 10px;
  width: 240px;
  padding: 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: var(--shadow-float);
  font-size: 13px;
}

.form__title {
  font-size: 16px;
  font-weight: 500;
}

.seg {
  display: flex;
  padding: 4px;
  gap: 4px;
  border-radius: 12px;
  background: var(--surface-muted);
}

.seg span {
  flex: 1;
  text-align: center;
  padding: 6px 0;
  border-radius: 9px;
  font-size: 12px;
}

.seg .on {
  background: var(--ink);
  color: #fff;
}

.field {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-muted);
  color: var(--text-muted);
}

.field b {
  color: var(--ink);
}

.field--add {
  justify-content: center;
  gap: 6px;
  align-items: center;
  background: transparent;
  border: 1px dashed var(--border-strong);
  color: var(--ink);
}

.bib {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 26px 16px 18px;
  background: var(--surface);
  border-radius: 18px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-float);
  transform: rotate(4deg) translateY(30px);
}

.bib__pins {
  position: absolute;
  top: 10px;
  left: 14px;
  right: 14px;
  display: flex;
  justify-content: space-between;
}

.bib__pins i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-strong);
}

.bib__event {
  font-size: 12px;
  color: var(--text-muted);
}

.bib__no {
  font-family: var(--font-ui);
  font-size: 58px;
  line-height: 1.1;
  letter-spacing: -0.06em;
  padding: 0 14px;
  margin: 6px 0;
  border-radius: 12px;
  background: var(--accent);
}

.bib__race {
  font-size: 12px;
  font-weight: 500;
}

/* ---------- membership ---------- */
.m--member {
  flex-direction: column;
}

.mcard {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: min(100%, 320px);
  padding: 22px;
  border-radius: 22px;
  background: radial-gradient(120% 120% at 100% 0%, rgba(255, 197, 11, 0.35), transparent 50%), var(--ink);
  color: #fff;
  box-shadow: var(--shadow-float);
  transform: rotate(-3deg);
}

.mcard__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--accent);
}

.mcard__no {
  font-family: var(--font-ui);
  font-size: 24px;
  letter-spacing: 0.02em;
}

.mcard__name {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}

.mini-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: min(100%, 460px);
}

.mc {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow-hairline);
  font-size: 12px;
  color: var(--text-muted);
}

.mc span:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mc b {
  color: var(--ink);
  font-size: 13px;
}

.mc__emoji {
  font-size: 20px;
}

/* ---------- white-label ---------- */
.browser {
  width: min(100%, 440px);
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-float);
  overflow: hidden;
}

.browser__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--surface-muted);
  border-bottom: 1px solid var(--border);
}

.dots {
  display: flex;
  gap: 5px;
}

.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--border-strong);
}

.url {
  flex: 1;
  padding: 4px 10px;
  border-radius: 8px;
  background: var(--surface);
  font-size: 11px;
  color: var(--text-muted);
}

.browser__body {
  display: grid;
  gap: 14px;
  padding: 16px;
  /* the client's own brand colour, here a neutral teal stand-in */
  --client: #1f6f78;
}

.wl__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wl__logo {
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--client);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
}

.wl__links {
  display: flex;
  gap: 6px;
}

.wl__links i {
  width: 34px;
  height: 7px;
  border-radius: 4px;
  background: var(--surface-muted);
}

.wl__hero {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--client) 10%, white);
}

.wl__h {
  height: 12px;
  width: 80%;
  border-radius: 6px;
  background: color-mix(in srgb, var(--client) 55%, white);
}

.wl__h--short {
  width: 50%;
}

.wl__btn {
  justify-self: start;
  margin-top: 4px;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--client);
  color: #fff;
  font-size: 11px;
}

.wl__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.wl__cards span {
  height: 54px;
  border-radius: 10px;
  background: var(--surface-muted);
}

.wl__powered {
  justify-self: center;
  padding: 4px 10px;
  border-radius: 99px;
  border: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-muted);
}

.wl__powered b {
  color: var(--ink);
}

@media (max-width: 600px) {
  .m {
    flex-direction: column;
    padding: 16px 8px;
    min-height: 0;
  }
  .momo,
  .stat-card,
  .bib {
    transform: none;
  }
  .mini-cards {
    grid-template-columns: 1fr;
  }
  .board__list li {
    grid-template-columns: 24px 74px 1fr 46px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scan__beam {
    animation: none;
  }
}
</style>

<script setup>
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import PrimaryButton from '../ui/PrimaryButton.vue'
import SecondaryLink from '../ui/SecondaryLink.vue'
import BracketFrame from '../ui/BracketFrame.vue'
import FloatBubble from '../ui/FloatBubble.vue'
import AppIcon from '../ui/AppIcon.vue'
import { links } from '../../data/site.js'
import { ref } from 'vue'
import { useGlassPointer } from '../../composables/motion.js'

const shell = ref(null)
useGlassPointer(shell)
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <!-- Colour lives BEHIND the glass so the sheet frosts it; it also bleeds past the
         shell edges and under the floating header, like the reference. -->
    <div class="ambient" aria-hidden="true">
      <span class="glow glow--a" />
      <span class="glow glow--b" />
      <span class="glow glow--c" />
      <span class="glow glow--d" />
    </div>

    <div ref="shell" class="shell glass glass--sheet">
      <span class="glass-light" aria-hidden="true" />

      <!-- Floating, bracket-framed event moments (decorative) -->
      <div class="floats" aria-hidden="true">
        <BracketFrame class="f f--1" delay="0s">
          <FloatBubble emoji="🎟️" title="2 tickets confirmed" meta="Check your SMS for the QR code" />
        </BracketFrame>
        <BracketFrame class="f f--2" delay="-1.5s">
          <div class="tile glass">
            <span class="tile__ticket">
              <span class="tile__ticket-notch tile__ticket-notch--l" />
              <span class="tile__ticket-notch tile__ticket-notch--r" />
              <span class="tile__ticket-line" />
            </span>
          </div>
        </BracketFrame>
        <BracketFrame class="f f--3" delay="-3s">
          <FloatBubble emoji="✅" title="Checked in: Gate A" meta="VIP · 19:42" tail="bl" />
        </BracketFrame>
        <BracketFrame class="f f--4" delay="-4.2s">
          <div class="tile tile--qr glass">
            <span class="qr">
              <span v-for="n in 25" :key="n" :class="{ on: [1, 2, 3, 5, 6, 8, 10, 11, 13, 15, 16, 19, 21, 22, 23, 25].includes(n) }" />
            </span>
          </div>
        </BracketFrame>
      </div>

      <div class="content">
        <EyebrowPill v-reveal>Events &amp; Tickets for everyone</EyebrowPill>

        <h1 id="hero-title" v-reveal="80" class="title">
          Sell tickets. Fill the venue.<br class="br-desk" />
          Get paid <HighlightPill>in 24 hours</HighlightPill>
        </h1>

        <p v-reveal="160" class="lead">
          From concerts to conferences, marathons to awards: sell on web, app, USSD and paper, accept mobile money, and
          check in every guest with Tukiio.
        </p>

        <div v-reveal="240" class="ctas">
          <PrimaryButton :href="links.createEvent" icon="plus">Create your event, it's free</PrimaryButton>
          <SecondaryLink :href="links.browse" icon="ticket">Browse events</SecondaryLink>
        </div>

        <ul v-reveal="320" class="proof" role="list">
          <li><AppIcon name="check" :size="16" />Free events, free forever</li>
          <li><AppIcon name="check" :size="16" />7% on paid tickets</li>
          <li><AppIcon name="check" :size="16" />Payouts within 24h of your request</li>
        </ul>

        <!-- Small-screen version of the floating moments -->
        <div class="mini" aria-hidden="true">
          <BracketFrame :float="false">
            <FloatBubble emoji="🎟️" title="2 tickets confirmed" meta="Check your SMS for the QR code" />
          </BracketFrame>
          <BracketFrame :float="false">
            <FloatBubble emoji="✅" title="Checked in: Gate A" meta="VIP · 19:42" tail="bl" />
          </BracketFrame>
        </div>
      </div>
    </div>

    <a href="#story" class="scroll-cue">
      <span class="scroll-cue__line" aria-hidden="true" />
      <span class="scroll-cue__mouse" aria-hidden="true"><span /></span>
      <span class="sr-only">Scroll to learn more</span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  padding: 24px var(--gutter) 0;
  margin-top: -88px; /* tuck under the floating header */
}

/* glow field behind the glass; clipped so nothing causes horizontal scroll */
.ambient {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  /* fade out under the scroll cue so the glow field has no hard bottom edge */
  -webkit-mask-image: linear-gradient(#000 calc(100% - 260px), transparent);
  mask-image: linear-gradient(#000 calc(100% - 260px), transparent);
}

.shell {
  position: relative;
  max-width: 1329px;
  margin: 0 auto;
  padding: 196px 24px 140px;
  overflow: hidden;
}

.glow--a {
  width: 560px;
  height: 960px;
  top: -360px;
  right: 8%;
  background: var(--glow-amber);
  opacity: 0.62;
  transform: rotate(-35deg);
}

.glow--b {
  width: 520px;
  height: 520px;
  bottom: -120px;
  left: 2%;
  background: var(--glow-peach);
  opacity: 0.9;
}

.glow--c {
  width: 420px;
  height: 420px;
  top: 32%;
  left: 38%;
  background: var(--glow-cream);
  opacity: 0.9;
}

/* cool counter-tint, low and left, so the frost has something to refract */
.glow--d {
  width: 420px;
  height: 380px;
  top: 40%;
  left: -6%;
  background: var(--glow-sky);
  opacity: 0.25;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 860px;
  margin: 0 auto;
}

.title {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.1;
  font-weight: 500;
  letter-spacing: -0.055em;
  color: var(--ink);
  text-wrap: balance;
}

.lead {
  max-width: 620px;
  font-family: var(--font-display);
  font-size: clamp(16px, 1.5vw, 18px);
  line-height: 1.4;
  letter-spacing: -0.025em;
  color: var(--text-strong);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 24px;
  margin-top: 8px;
}

.proof {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

.proof li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.proof :deep(svg) {
  color: var(--ink);
  background: var(--accent);
  border-radius: 50%;
  padding: 2px;
}

/* ---------- floating moments ---------- */
.floats {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.f {
  position: absolute;
}

.f--1 {
  top: 170px;
  left: 5%;
}
.f--2 {
  top: 140px;
  right: 9%;
}
.f--3 {
  bottom: 120px;
  right: 5%;
}
.f--4 {
  bottom: 110px;
  left: 9%;
}

.tile {
  /* a glossy glass block: milky fill, warm caustic pooled under the glyph */
  --glass-fill: radial-gradient(circle at 50% 72%, rgba(255, 197, 11, 0.22), transparent 58%),
    rgba(255, 255, 255, 0.52);
  --glass-rim-width: 2px;
  width: 128px;
  height: 128px;
  display: grid;
  place-items: center;
  border-radius: var(--r-3xl);
  box-shadow:
    var(--glass-highlight),
    inset 0 2px 2px rgba(255, 255, 255, 0.8),
    inset 0 -10px 24px -10px rgba(255, 255, 255, 0.7),
    inset 0 0 24px rgba(255, 255, 255, 0.35),
    var(--shadow-float);
}

/* glossy, translucent yellow ticket glyph (yellow glass) */
.tile__ticket {
  position: relative;
  width: 72px;
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(
    150deg,
    rgba(255, 233, 140, 0.95) 0%,
    rgba(255, 197, 11, 0.86) 48%,
    rgba(255, 168, 0, 0.94) 100%
  );
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.35),
    inset 0 -6px 10px rgba(214, 128, 0, 0.35),
    0 14px 24px -10px rgba(255, 168, 0, 0.7);
  transform: rotate(-12deg);
}

/* specular highlight across the top of the glyph */
.tile__ticket::after,
.qr::after {
  content: '';
  position: absolute;
  inset: 2px 4px 52%;
  border-radius: 8px 8px 40% 40% / 8px 8px 100% 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.05));
  pointer-events: none;
}

.tile__ticket-notch {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  margin-top: -7px;
  border-radius: 50%;
  /* punched hole: reads as a cut-out through to the milky tile */
  background: rgba(255, 252, 240, 0.95);
  box-shadow: inset 0 1px 2px rgba(150, 90, 0, 0.3);
}
.tile__ticket-notch--l {
  left: -7px;
}
.tile__ticket-notch--r {
  right: -7px;
}

.tile__ticket-line {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  border-left: 2px dashed rgba(0, 0, 0, 0.25);
}

.qr {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 11px);
  gap: 3px;
  padding: 10px;
  border-radius: 14px;
  background: linear-gradient(150deg, rgba(255, 233, 140, 0.95), rgba(255, 197, 11, 0.88) 50%, rgba(255, 168, 0, 0.94));
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.35),
    inset 0 -6px 10px rgba(214, 128, 0, 0.3),
    0 14px 24px -10px rgba(255, 168, 0, 0.7);
  transform: rotate(8deg);
}

.qr span {
  width: 11px;
  height: 11px;
  border-radius: 3px;
}

.qr span.on {
  background: var(--ink);
}

.mini {
  display: none;
}

/* ---------- scroll cue ---------- */
.scroll-cue {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: max-content;
  margin: 40px auto 0;
  padding: 4px;
}

.scroll-cue__line {
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, transparent, var(--hairline-fade));
}

.scroll-cue__mouse {
  display: grid;
  justify-items: center;
  width: 24px;
  height: 36px;
  padding-top: 6px;
  border: 1.5px solid var(--ink);
  border-radius: 14px;
}

.scroll-cue__mouse span {
  width: 3px;
  height: 7px;
  border-radius: 2px;
  background: var(--ink);
  animation: wheel 1.8s ease-in-out infinite;
}

@keyframes wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(9px);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

/* ---------- responsive ---------- */
@media (max-width: 1279px) {
  .f--1 {
    top: 150px;
    left: 2%;
  }
  .f--2 {
    right: 3%;
  }
  .f--3 {
    right: 2%;
    bottom: 60px;
  }
  .f--4 {
    left: 3%;
    bottom: 60px;
  }
  .tile {
    width: 104px;
    height: 104px;
    border-radius: 30px;
  }
}

@media (max-width: 1199px) {
  .floats {
    display: none;
  }

  .mini {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px 40px;
    margin-top: 32px;
  }
}

@media (max-width: 767px) {
  .hero {
    padding-top: 12px;
    margin-top: -84px;
  }

  .shell {
    padding: 128px 16px 72px;
    border-radius: 32px;
  }

  .br-desk {
    display: none;
  }

  .ctas {
    flex-direction: column;
    width: 100%;
  }

  .ctas > :first-child {
    width: 100%;
    max-width: 360px;
  }

  .ctas > :first-child :deep(.btn) {
    width: 100%;
  }

  .mini {
    gap: 28px;
  }

  .mini > :nth-child(2) {
    display: none;
  }
}
</style>

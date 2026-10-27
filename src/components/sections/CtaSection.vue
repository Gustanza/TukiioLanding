<script setup>
import EyebrowPill from '../ui/EyebrowPill.vue'
import HighlightPill from '../ui/HighlightPill.vue'
import PrimaryButton from '../ui/PrimaryButton.vue'
import SecondaryLink from '../ui/SecondaryLink.vue'
import BracketFrame from '../ui/BracketFrame.vue'
import FloatBubble from '../ui/FloatBubble.vue'
import { contact, links, telHref } from '../../data/site.js'
import { ref } from 'vue'
import { useGlassPointer } from '../../composables/motion.js'

const shell = ref(null)
useGlassPointer(shell)
</script>

<template>
  <section id="contact" class="cta" aria-labelledby="cta-title">
    <div class="ambient" aria-hidden="true">
      <span class="glow glow--a" />
      <span class="glow glow--b" />
      <span class="glow glow--c" />
    </div>

    <div ref="shell" class="shell glass glass--sheet">
      <span class="glass-light" aria-hidden="true" />

      <div class="floats" aria-hidden="true">
        <BracketFrame class="f f--1" delay="-1s">
          <FloatBubble emoji="💸" title="Payout sent" meta="TZS 4,185,000 · within 24h of request" />
        </BracketFrame>
        <BracketFrame class="f f--2" delay="-3s">
          <FloatBubble emoji="🎉" title="Sold out: VIP tables" meta="Release 2 opens Friday" tail="bl" />
        </BracketFrame>
      </div>

      <div class="content">
        <EyebrowPill v-reveal>Let’s talk</EyebrowPill>
        <h2 id="cta-title" v-reveal="80" class="title">
          Launch your next event<br />
          on <HighlightPill>Tukiio</HighlightPill>
        </h2>
        <p v-reveal="160" class="lead">Free to start. Paid out within 24 hours of your request.</p>
        <div v-reveal="240" class="ctas">
          <PrimaryButton :href="links.createEvent" icon="plus">Create your event</PrimaryButton>
          <SecondaryLink :href="telHref(contact.phones[0])" icon="phone">Talk to our team: {{ contact.phones[0] }}</SecondaryLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  isolation: isolate;
  padding: calc(var(--section-gap) / 2) var(--gutter) 24px;
}

/* glow field behind the glass sheet, clipped to the section */
.ambient {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(transparent, #000 120px, #000 calc(100% - 80px), transparent);
  mask-image: linear-gradient(transparent, #000 120px, #000 calc(100% - 80px), transparent);
}

.shell {
  position: relative;
  max-width: 1329px;
  margin: 0 auto;
  padding: 134px 24px;
  overflow: hidden;
}

.glow--a {
  width: 560px;
  height: 760px;
  top: -120px;
  left: 8%;
  background: var(--glow-amber);
  opacity: 0.6;
  transform: rotate(30deg);
}

.glow--b {
  width: 560px;
  height: 460px;
  bottom: -160px;
  right: 6%;
  background: var(--glow-peach);
  opacity: 0.9;
}

.glow--c {
  width: 380px;
  height: 340px;
  top: 30%;
  right: 30%;
  background: var(--glow-sky);
  opacity: 0.25;
}

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
  top: 80px;
  left: 6%;
}

.f--2 {
  bottom: 80px;
  right: 6%;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  text-align: center;
}

.title {
  font-size: clamp(36px, 4.6vw, 56px);
  line-height: 1.15;
  font-weight: 500;
  letter-spacing: -0.05em;
}

.lead {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-strong);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px 24px;
}

@media (max-width: 1099px) {
  .floats {
    display: none;
  }
}

@media (max-width: 767px) {
  .shell {
    padding: 72px 16px;
    border-radius: 32px;
  }
  .ctas {
    flex-direction: column;
  }
}
</style>

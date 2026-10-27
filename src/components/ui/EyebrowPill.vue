<script setup>
import AppIcon from './AppIcon.vue'
</script>

<template>
  <p class="eyebrow glass glass--static">
    <span class="eyebrow__spark"><AppIcon name="sparkle" :size="14" /></span>
    <span><slot /></span>
  </p>
</template>

<style scoped>
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px 7px 12px;
  --glass-fill: rgba(255, 255, 255, 0.66);
  --glass-shadow: var(--shadow-hairline), 0 6px 18px -8px rgba(40, 32, 10, 0.14);
  border-radius: 50px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: var(--ink);
}

/* Sparkle: yellow star with a hairline ink edge so it reads on white */
.eyebrow__spark {
  display: grid;
  place-items: center;
  color: var(--accent);
  filter: drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.35));
}
</style>

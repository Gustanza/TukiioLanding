<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  href: { type: String, required: true },
  icon: { type: String, default: 'play' },
  external: { type: Boolean, default: false },
})
</script>

<template>
  <a :href="href" class="sec" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined">
    <AppIcon :name="icon" :size="22" />
    <span class="sec__label"><slot /></span>
    <span v-if="external" class="sr-only">(opens in a new tab)</span>
  </a>
</template>

<style scoped>
.sec {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 8px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  border-radius: var(--r-md);
}

.sec__label {
  background-image: linear-gradient(var(--accent), var(--accent));
  background-size: 0% 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s var(--ease-out);
}

.sec:hover .sec__label,
.sec:focus-visible .sec__label {
  background-size: 100% 3px;
}
</style>

<script setup>
/* Black button with a 6px yellow gradient "lip" and a hover shine sweep. */
import AppIcon from './AppIcon.vue'

defineProps({
  href: { type: String, default: '' },
  type: { type: String, default: 'button' },
  icon: { type: String, default: 'ticket' },
  size: { type: String, default: 'md' }, // md | sm
  block: { type: Boolean, default: false },
})
</script>

<template>
  <span class="btn-wrap" :class="[`btn-wrap--${size}`, { 'btn-wrap--block': block }]">
    <a v-if="href" :href="href" class="btn">
      <AppIcon v-if="icon" :name="icon" :size="18" />
      <span><slot /></span>
    </a>
    <button v-else :type="type" class="btn">
      <AppIcon v-if="icon" :name="icon" :size="18" />
      <span><slot /></span>
    </button>
  </span>
</template>

<style scoped>
.btn-wrap {
  position: relative;
  display: inline-flex;
  padding-bottom: 6px;
  border-radius: var(--r-md);
  isolation: isolate;
}

.btn-wrap--block {
  display: flex;
  width: 100%;
}

/* the gradient lip that peeks out under the key */
.btn-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r-md);
  background: var(--brand-gradient);
  z-index: -1;
}

.btn {
  position: relative;
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 20px;
  border: 0;
  border-radius: var(--r-md);
  background: var(--ink);
  color: #fff;
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  transition:
    transform 0.3s linear,
    background-color 0.3s linear;
}

.btn-wrap--sm .btn {
  padding: 10px 16px;
  font-size: 15px;
}

/* glossy sheen */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -200%;
  width: 200%;
  height: 100%;
  transform: skewX(-20deg);
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.35), transparent);
  pointer-events: none;
}

.btn:hover::before,
.btn:focus-visible::before {
  animation: btn-shine 1.8s ease 0.1s;
}

.btn:hover {
  background: var(--ink-hover);
}

.btn:active {
  transform: translateY(3px);
}

.btn:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 4px;
}

@keyframes btn-shine {
  from {
    left: -200%;
  }
  to {
    left: 200%;
  }
}

@media (max-width: 380px) {
  .btn {
    white-space: normal;
    text-align: center;
  }
}
</style>

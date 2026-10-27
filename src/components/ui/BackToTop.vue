<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const show = ref(false)
const onScroll = () => (show.value = window.scrollY > 900)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a href="#top" class="btt" :class="{ 'is-shown': show }" :tabindex="show ? 0 : -1" :aria-hidden="show ? undefined : 'true'">
    <AppIcon name="arrowUp" :size="18" :stroke="2" />
    <span class="sr-only">Back to top</span>
  </a>
</template>

<style scoped>
.btt {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ink);
  color: #fff;
  box-shadow:
    0 0 0 4px rgba(255, 197, 11, 0.35),
    var(--shadow-float);
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition:
    opacity 0.3s,
    transform 0.3s var(--ease-out);
}

.btt.is-shown {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.btt:hover {
  background: var(--ink-hover);
}
</style>

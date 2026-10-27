<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

const show = ref(false)
const onScroll = () => (show.value = window.scrollY > 900)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <a href="#top" class="btt glass glass--static" :class="{ 'is-shown': show }" :tabindex="show ? 0 : -1" :aria-hidden="show ? undefined : 'true'">
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
  /* smoked ink glass with a yellow halo (painted, no backdrop blur: it fades/slides in);
     white arrow stays well above AA */
  --glass-fill: rgba(11, 11, 11, 0.8);
  --glass-fallback: var(--ink);
  --glass-rim: linear-gradient(150deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.05) 50%, rgba(255, 226, 122, 0.5));
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0) 55%),
    var(--glass-fill);
  color: #fff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
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
  --glass-fill: rgba(30, 30, 30, 0.9);
}
</style>

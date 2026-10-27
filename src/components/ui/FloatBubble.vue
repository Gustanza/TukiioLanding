<script setup>
/* Event-flavoured notification bubble with a Tukiio avatar on the corner. */
import TukiioMark from './TukiioMark.vue'

defineProps({
  emoji: { type: String, default: '' },
  title: { type: String, required: true },
  meta: { type: String, default: '' },
  tail: { type: String, default: 'br' }, // which corner is squared: br | bl
})
</script>

<template>
  <div class="bubble" :class="`bubble--${tail}`">
    <span v-if="emoji" class="bubble__emoji" aria-hidden="true">{{ emoji }}</span>
    <span class="bubble__body">
      <span class="bubble__title">{{ title }}</span>
      <span v-if="meta" class="bubble__meta">{{ meta }}</span>
    </span>
    <span class="bubble__avatar" aria-hidden="true"><TukiioMark :size="15" /></span>
  </div>
</template>

<style scoped>
.bubble {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 290px;
  padding: 14px 20px 14px 14px;
  background: var(--surface);
  border-radius: 16px 16px 0 16px;
  box-shadow: var(--shadow-float);
  border: 1px solid var(--border);
  text-align: left;
}

.bubble--bl {
  border-radius: 16px 16px 16px 0;
  padding: 14px 14px 14px 20px;
}

.bubble__emoji {
  font-size: 20px;
  line-height: 1;
}

.bubble__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bubble__title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: var(--ink);
}

.bubble__meta {
  font-family: var(--font-display);
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: -0.02em;
}

.bubble__avatar {
  position: absolute;
  right: -12px;
  bottom: -12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-pill);
}

.bubble--bl .bubble__avatar {
  right: auto;
  left: -12px;
}
</style>

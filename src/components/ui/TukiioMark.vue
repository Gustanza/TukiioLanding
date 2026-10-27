<script setup>
/* The "ii" people mark from the Tukiio logo: two stems + two yellow dots. */
defineProps({
  size: { type: Number, default: 24 },
  stem: { type: String, default: 'var(--ink)' },
  dot: { type: String, default: 'var(--accent)' },
})
</script>

<template>
  <svg :width="size * (82 / 118)" :height="size" viewBox="-0.5 -0.5 82 118" aria-hidden="true" focusable="false">
    <circle cx="13.4" cy="13.4" r="13.4" :fill="dot" />
    <circle cx="58" cy="13.4" r="13.4" :fill="dot" />
    <path
      :fill="stem"
      d="M9,75.8v4.5v33.4v2.3h26.8V80.3v-4.5c0-20.6-15.6-37.7-35.7-39.9v27.3C5.2,65.1,9,70,9,75.8z"
    />
    <path
      :fill="stem"
      d="M53.6,75.8v4.5v33.4v2.3h26.8V80.3v-4.5c0-20.6-15.6-37.7-35.7-39.9v27.3C49.8,65.1,53.6,70,53.6,75.8z"
    />
  </svg>
</template>

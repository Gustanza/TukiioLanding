<template>
  <!-- Highlighted phrase inside a heading: ink text on a warm yellow pill (never yellow text). -->
  <span class="hl glass glass--tint glass--static"><slot /></span>
</template>

<style scoped>
.hl {
  display: inline-block;
  padding: 0.02em 0.26em 0.1em;
  margin: 0.04em 0.02em;
  border-radius: 0.42em;
  /* yellow glass: brand gradient, slightly translucent, with a wet top highlight */
  --glass-fill: linear-gradient(90deg, rgba(255, 226, 122, 0.94) 0%, rgba(255, 197, 11, 0.9) 50%, rgba(255, 168, 0, 0.94) 100%),
    var(--accent);
  --glass-rim-width: 1.5px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0) 60%),
    var(--glass-fill);
  color: var(--ink);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -3px 6px rgba(196, 120, 0, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 10px 24px -10px rgba(255, 168, 0, 0.55),
    var(--shadow-pill);
  line-height: 1.05;
  transform: rotate(-1deg);
}
</style>

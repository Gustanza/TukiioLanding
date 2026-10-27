<template>
  <!-- Highlighted phrase inside a heading: ink text on a warm yellow pill (never yellow text). -->
  <span class="hl"><slot /></span>
</template>

<style scoped>
.hl {
  display: inline-block;
  padding: 0.02em 0.26em 0.1em;
  margin: 0.04em 0.02em;
  border-radius: 0.42em;
  background: var(--brand-gradient);
  color: var(--ink);
  box-shadow:
    var(--shadow-pill),
    inset 0 -2px 0 rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  line-height: 1.05;
  transform: rotate(-1deg);
}
</style>

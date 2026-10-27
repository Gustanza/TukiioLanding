<script setup>
/* Crop-mark / selection-handle brackets drawn ~10px outside the content. */
defineProps({
  float: { type: Boolean, default: true },
  delay: { type: String, default: '0s' },
})
</script>

<template>
  <div class="bf" :class="{ 'bf--float': float }" :style="{ '--float-delay': delay }">
    <span class="bf__c bf__c--tl" aria-hidden="true" />
    <span class="bf__c bf__c--tr" aria-hidden="true" />
    <span class="bf__c bf__c--bl" aria-hidden="true" />
    <span class="bf__c bf__c--br" aria-hidden="true" />
    <slot />
  </div>
</template>

<style scoped>
.bf {
  position: relative;
  display: inline-block;
}

.bf__c {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--bracket);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
}

.bf__c--tl {
  top: -10px;
  left: -10px;
  border-top-width: 1px;
  border-left-width: 1px;
}
.bf__c--tr {
  top: -10px;
  right: -10px;
  border-top-width: 1px;
  border-right-width: 1px;
}
.bf__c--bl {
  bottom: -10px;
  left: -10px;
  border-bottom-width: 1px;
  border-left-width: 1px;
}
.bf__c--br {
  bottom: -10px;
  right: -10px;
  border-bottom-width: 1px;
  border-right-width: 1px;
}

.bf--float {
  animation: bf-bob 6s ease-in-out infinite;
  animation-delay: var(--float-delay);
}

@keyframes bf-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bf--float {
    animation: none;
  }
}
</style>

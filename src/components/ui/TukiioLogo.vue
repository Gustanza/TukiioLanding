<script setup>
import logoUrl from '../../assets/brand/tukiio-logo.svg'

defineProps({
  height: { type: Number, default: 26 },
})
</script>

<template>
  <img :src="logoUrl" alt="tukiio" :height="height" :width="Math.round(height * (413 / 117))" class="logo" />
</template>

<style scoped>
.logo {
  display: block;
  width: auto;
}
</style>

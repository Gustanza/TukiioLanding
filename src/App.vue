<script setup>
import AppPreloader from './components/sections/AppPreloader.vue'
import SiteHeader from './components/sections/SiteHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import StorySection from './components/sections/StorySection.vue'
import UseCasesSection from './components/sections/UseCasesSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import HowItWorksSection from './components/sections/HowItWorksSection.vue'
import TrustedSection from './components/sections/TrustedSection.vue'
import StatsSection from './components/sections/StatsSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import CtaSection from './components/sections/CtaSection.vue'
import SiteFooter from './components/sections/SiteFooter.vue'
import BackToTop from './components/ui/BackToTop.vue'
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <AppPreloader />
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <StorySection />
    <UseCasesSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TrustedSection />
    <StatsSection />
    <PricingSection />
    <FaqSection />
    <CtaSection />
  </main>
  <SiteFooter />
  <BackToTop />
</template>

<style>
#main:focus {
  outline: none;
}
</style>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import TukiioLogo from '../ui/TukiioLogo.vue'
import PrimaryButton from '../ui/PrimaryButton.vue'
import AppIcon from '../ui/AppIcon.vue'
import { links } from '../../data/site.js'

const nav = [
  { label: 'Features', href: '#features' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQs', href: '#faq' },
]

const open = ref(false)
const scrolled = ref(false)
const toggleBtn = ref(null)
const panel = ref(null)

const onScroll = () => (scrolled.value = window.scrollY > 12)
const onKey = (e) => {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    toggleBtn.value?.focus()
  }
}
// Close the mobile menu when focus moves outside the header (e.g. tabbing past it).
const header = ref(null)
const onFocusOut = (e) => {
  if (open.value && e.relatedTarget && !header.value?.contains(e.relatedTarget)) open.value = false
}
const onResize = () => {
  if (window.innerWidth > 991) open.value = false
}

watch(open, async (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) {
    await nextTick()
    panel.value?.querySelector('a')?.focus()
  }
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header ref="header" class="header" :class="{ 'is-scrolled': scrolled, 'is-open': open }" @focusout="onFocusOut">
    <div class="bar">
      <a href="#top" class="brand" aria-label="Tukiio home">
        <TukiioLogo :height="24" />
      </a>

      <nav class="nav" aria-label="Primary">
        <ul role="list" class="nav__list">
          <li v-for="item in nav" :key="item.href">
            <a :href="item.href" class="nav__link">{{ item.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="actions">
        <a :href="links.login" class="login">Log in</a>
        <PrimaryButton :href="links.createEvent" icon="plus" size="sm" class="cta">Create event</PrimaryButton>
        <button
          ref="toggleBtn"
          class="toggle"
          type="button"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
          <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
        </button>
      </div>
    </div>

    <div id="mobile-menu" ref="panel" class="mobile" :hidden="!open">
      <nav aria-label="Mobile">
        <ul role="list" class="mobile__list">
          <li v-for="item in nav" :key="item.href">
            <a :href="item.href" class="mobile__link" @click="open = false">
              {{ item.label }}
              <AppIcon name="arrowRight" :size="18" />
            </a>
          </li>
        </ul>
      </nav>
      <div class="mobile__actions">
        <a :href="links.login" class="mobile__login">Log in</a>
        <PrimaryButton :href="links.createEvent" icon="plus" block>Create event</PrimaryButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 24px;
  z-index: 100;
  width: 100%;
  max-width: calc(1350px + var(--gutter) * 2);
  margin: 24px auto 0;
  padding-inline: var(--gutter);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 64px;
  padding: 0 8px 0 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-hairline);
  transition: box-shadow 0.3s var(--ease-out);
}

.is-scrolled .bar {
  box-shadow:
    var(--shadow-hairline),
    0 12px 40px -16px rgba(0, 0, 0, 0.12);
}

.brand {
  display: inline-flex;
  padding: 6px 0;
}

.nav__list {
  display: flex;
  gap: clamp(20px, 2.6vw, 40px);
}

.nav__link {
  position: relative;
  font-family: var(--font-ui);
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
  padding: 6px 0;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  border-radius: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.nav__link:hover::after,
.nav__link:focus-visible::after {
  transform: scaleX(1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-block: 8px 2px;
}

.login {
  font-weight: 500;
  color: var(--ink);
  padding: 6px 4px;
  margin-bottom: 6px;
}

.login:hover {
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}

.toggle {
  display: none;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 6px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  background: var(--surface-muted);
  color: var(--ink);
}

.mobile {
  margin-top: 8px;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  box-shadow: var(--shadow-float);
  max-height: calc(100dvh - 120px);
  overflow-y: auto;
}

.mobile[hidden] {
  display: none;
}

.mobile__link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.04em;
  color: var(--ink);
  border-radius: var(--r-md);
}

.mobile__link:hover {
  background: var(--surface-muted);
}

.mobile__list li + li {
  border-top: 1px solid var(--border);
}

.mobile__actions {
  display: grid;
  gap: 12px;
  padding: 16px 4px 4px;
}

.mobile__login {
  text-align: center;
  padding: 12px;
  font-weight: 500;
  color: var(--ink);
  border: 1px solid var(--border-strong);
  border-radius: var(--r-md);
}

@media (max-width: 991px) {
  .nav,
  .login,
  .cta {
    display: none;
  }

  .toggle {
    display: grid;
  }

  .actions {
    padding-block: 6px 0;
  }
}

@media (min-width: 992px) {
  .mobile {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .header {
    top: 12px;
    margin-top: 12px;
  }

  .bar {
    padding-left: 18px;
    min-height: 60px;
  }
}
</style>

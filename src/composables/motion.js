import { onBeforeUnmount, onMounted, ref } from 'vue'

/** True when the user asked the OS for reduced motion. */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/* ------------------------------------------------------------------ */
/* v-reveal: fade-up when the element enters the viewport.             */
/* Usage: v-reveal or v-reveal="120" (delay in ms)                     */
/* ------------------------------------------------------------------ */
let revealObserver
function getRevealObserver() {
  if (revealObserver) return revealObserver
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return revealObserver
}

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    getRevealObserver().observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
}

/**
 * Calls `cb(progress)` on scroll with 0..1 progress of `el` travelling
 * through the viewport. `start`/`end` are fractions of viewport height for
 * where the element's top sits at progress 0 and 1.
 */
export function useScrollProgress(elRef, cb, { start = 1, end = 0.3 } = {}) {
  let raf = 0
  const measure = () => {
    raf = 0
    const el = elRef.value
    if (!el) return
    const vh = window.innerHeight
    const top = el.getBoundingClientRect().top
    const from = vh * start
    const to = vh * end
    const p = (from - top) / (from - to)
    cb(Math.min(1, Math.max(0, p)))
  }
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(measure)
  }
  onMounted(() => {
    if (prefersReducedMotion()) {
      cb(1)
      return
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })
}

/** Run `cb` once when the element first becomes visible. */
export function useOnceVisible(elRef, cb, threshold = 0.35) {
  let io
  onMounted(() => {
    if (!('IntersectionObserver' in window)) return cb()
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cb()
          io.disconnect()
        }
      },
      { threshold },
    )
    if (elRef.value) io.observe(elRef.value)
  })
  onBeforeUnmount(() => io?.disconnect())
}

/** Reactive flag: true while the element is at least partly in the viewport. */
export function useInView(elRef, threshold = 0.2) {
  const inView = ref(false)
  let io
  onMounted(() => {
    if (!('IntersectionObserver' in window) || !elRef.value) return
    io = new IntersectionObserver(([entry]) => (inView.value = entry.isIntersecting), { threshold })
    io.observe(elRef.value)
  })
  onBeforeUnmount(() => io?.disconnect())
  return inView
}

/**
 * Liquid-glass pointer light: translates the sheet's `.glass-light` child toward
 * the pointer (transform only, so it stays on the compositor). Fine pointers only,
 * off under reduced motion. One rect read + one transform write per rAF.
 */
export function useGlassPointer(elRef) {
  let raf = 0
  let cx = 0
  let cy = 0
  let active = false
  let light = null
  const apply = () => {
    raf = 0
    const el = elRef.value
    if (!el || !light) return
    if (!active) {
      light.style.transform = ''
      return
    }
    const r = el.getBoundingClientRect()
    // offset from the light's rest anchor (left: 26%, top: 0)
    const tx = Math.round(cx - r.left - r.width * 0.26)
    const ty = Math.round(cy - r.top)
    light.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(apply)
  }
  const onMove = (e) => {
    cx = e.clientX
    cy = e.clientY
    active = true
    schedule()
  }
  const onLeave = () => {
    active = false
    schedule()
  }
  let enabled = false
  onMounted(() => {
    const el = elRef.value
    if (!el || prefersReducedMotion()) return
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return
    light = el.querySelector(':scope > .glass-light')
    if (!light) return
    enabled = true
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave, { passive: true })
  })
  onBeforeUnmount(() => {
    const el = elRef.value
    if (enabled && el) {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
    if (raf) cancelAnimationFrame(raf)
  })
}

<script setup>
/* Thin line icons (1.6px, rounded caps), Lucide-style, drawn inline. */
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  stroke: { type: [Number, String], default: 1.6 },
})

const paths = {
  ticket:
    'M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z M9 6v12',
  arrowRight: 'M5 12h14 M13 6l6 6-6 6',
  arrowUp: 'M12 19V5 M6 11l6-6 6 6',
  arrowDown: 'M12 5v14 M6 13l6 6 6-6',
  plus: 'M12 5v14 M5 12h14',
  minus: 'M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6L6 18',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  scan: 'M4 8V6a2 2 0 0 1 2-2h2 M16 4h2a2 2 0 0 1 2 2v2 M20 16v2a2 2 0 0 1-2 2h-2 M8 20H6a2 2 0 0 1-2-2v-2 M7 12h10',
  users:
    'M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20 M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7 M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35 M15.5 4.15a3.5 3.5 0 0 1 0 6.7',
  trophy:
    'M8 21h8 M12 17v4 M7 4h10v5a5 5 0 0 1-10 0Z M17 6h2.5a1.5 1.5 0 0 1 1.5 1.5A3.5 3.5 0 0 1 17.5 11 M7 6H4.5A1.5 1.5 0 0 0 3 7.5 3.5 3.5 0 0 0 6.5 11',
  run: 'M14.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3 M7 21l3-6 3 2v4 M6 12l3-3.5 4 1 2.5 3.5H19 M10 15l1.5-5',
  heart: 'M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10C19.5 15.5 12 20 12 20Z',
  building:
    'M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16 M15 9h4a1 1 0 0 1 1 1v11 M3 21h18 M8 8h3 M8 12h3 M8 16h3',
  play: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18 M10 8.8v6.4l5-3.2Z',
  pause: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18 M10 9v6 M14 9v6',
  mail: 'M4 6h16v12H4Z M4 7l8 6 8-6',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  whatsapp: 'M4 20l1.3-4A8 8 0 1 1 8.2 19Z M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18 M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18',
  wallet: 'M4 7a2 2 0 0 1 2-2h12v4 M4 7v10a2 2 0 0 0 2 2h14V9H6a2 2 0 0 1-2-2 M16 14h.01',
  chart: 'M4 20V10 M10 20V4 M16 20v-7 M21 20H3',
  shield: 'M12 21s7-3 7-9V5l-7-2-7 2v7c0 6 7 9 7 9Z M9 12l2 2 4-4',
  qr: 'M4 4h6v6H4Z M14 4h6v6h-6Z M4 14h6v6H4Z M14 14h2v2h-2Z M18 18h2v2h-2Z M14 18h2 M18 14h2',
  calendar: 'M4 6h16v14H4Z M4 10h16 M8 3v4 M16 3v4',
  layout: 'M4 4h16v16H4Z M4 9h16 M9 9v11',
  sms: 'M4 5h16v11H9l-5 4Z M8 10h.01 M12 10h.01 M16 10h.01',
  store: 'M4 9l1.5-5h13L20 9 M4 9v11h16V9 M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0 M10 20v-5h4v5',
  facebook: 'M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3.5h2V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15Z',
  instagram:
    'M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7 M17 7h.01',
  x: 'M4 4l16 16 M20 4L4 20',
  linkedin:
    'M4 9h3.5v11H4Z M5.75 6.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5 M10.5 9H14v1.5a3.5 3.5 0 0 1 6 2.5v7h-3.5v-6a1.5 1.5 0 0 0-3 0v6h-3.5Z',
}
</script>

<template>
  <svg
    v-if="props.name === 'sparkle'"
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M12 1.5c.6 5.3 4.7 9.9 10.5 10.5-5.8.6-9.9 4.7-10.5 10.5C11.4 16.7 7.3 12.6 1.5 12 7.3 11.4 11.4 6.8 12 1.5Z"
    />
  </svg>
  <svg
    v-else
    :width="props.size"
    :height="props.size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="props.stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="paths[props.name]" />
  </svg>
</template>

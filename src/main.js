import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './composables/motion.js'

createApp(App).directive('reveal', vReveal).mount('#app')

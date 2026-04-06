<script setup>
import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const lenis = ref(null)

onMounted(() => {
  lenis.value = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  lenis.value.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.value.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  if (lenis.value) {
    lenis.value.destroy()
  }
})

provide('lenis', lenis)
</script>

<template>
  <div class="selection:bg-primary selection:text-white font-mono text-white min-h-screen bg-transparent relative">
    <PixelGridBackground />
    <CustomCursor />
    <GlassNav />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import '@unocss/reset/tailwind.css';

:root {
  --primary: #ba002b;
  --secondary: #7f40b0;
  --background: #050505;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: var(--background);
  color: #ffffff;
  overflow-x: hidden;
  font-family: 'JetBrains Mono', monospace;
  cursor: none !important; /* Hide system cursor globally */
}

/* Page Transitions - Technical Fade & Blur */
.page-enter-active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-enter-from {
  opacity: 0;
  filter: blur(20px) grayscale(100%);
  transform: scale(1.05);
}

.page-leave-to {
  opacity: 0;
  filter: blur(10px) grayscale(100%);
  transform: scale(0.98);
}

/* Custom Scrollbar - Minimal */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
}

::selection {
  background: var(--primary);
  color: white;
}
</style>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  { id: '01', title: 'IMMERSE', desc: 'Diving deep into the brand narrative to identify the undercurrents of the creative brief.' },
  { id: '02', title: 'IDEATE', desc: 'Crafting the structural blueprint and selecting the typography that will speak for the brand.' },
  { id: '03', title: 'REFINE', desc: 'Iterating with microscopic precision until the design resonates with editorial authority.' },
  { id: '04', title: 'DEPLOY', desc: 'Launching high-performance digital experiences that command attention across all platforms.' },
]

const titleRef = ref(null)

const shuffleText = (el, finalValue, duration = 1) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
  const obj = { value: 0 }
  gsap.to(obj, {
    value: 1,
    duration: duration,
    ease: 'none',
    onUpdate: () => {
      const progress = obj.value
      const result = finalValue.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (progress > index / finalValue.length) return char
        return chars[Math.floor(Math.random() * chars.length)]
      }).join('')
      el.textContent = result
    }
  })
}

onMounted(() => {
  // Title Shuffle on Scroll
  ScrollTrigger.create({
    trigger: '.approach-section',
    start: 'top 80%',
    onEnter: () => {
       if (titleRef.value) shuffleText(titleRef.value, 'BOLDNESS.', 1.2)
    }
  })

  // Card Reveal Animations
  gsap.from('.approach-card', {
    y: 100,
    rotateX: -20,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.approach-grid',
      start: 'top 75%',
    }
  })

  // Left Content Reveal
  gsap.from('.approach-left-content', {
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.approach-section',
      start: 'top 70%',
    }
  })
})
</script>

<template>
  <section class="approach-section py-24 md:py-48 bg-black overflow-hidden relative border-t border-zinc-900 border-b min-h-screen">
    <!-- Abstract Canvas Background (Locked to viewport background) -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20 filter contrast-125">
      <AbstractGridCanvas />
    </div>

    <div class="max-w-[1440px] mx-auto px-8 md:px-16 relative z-10 w-full">
      <!-- Section Intro Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 md:mb-48 border-b border-zinc-900 pb-12">
        <h2 class="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white">
          <span class="block text-primary font-mono text-sm tracking-[0.3em] mb-4 opacity-70">SYSTEM_ARCHITECTURE</span>
          Structural<br>
          <span ref="titleRef" class="text-transparent" style="-webkit-text-stroke: 1px #fff;">Logic</span>
        </h2>
        <div class="font-mono text-xs text-zinc-500 uppercase tracking-widest leading-loose max-w-sm mt-12 md:mt-0 md:text-right">
          A rigid methodology designed for scalable, high-impact digital execution. Bypassing convention for pure precision.
        </div>
      </div>

      <!-- The Blueprint Flowchart Matrix -->
      <div class="relative w-full">
        <!-- Visual Grid Columns (Background structural lines) -->
        <div class="absolute inset-0 flex justify-between pointer-events-none opacity-20">
          <div class="w-px h-full bg-zinc-700"></div>
          <div class="w-px h-full bg-zinc-700 hidden md:block"></div>
          <div class="w-px h-full bg-zinc-700 hidden md:block"></div>
          <div class="w-px h-full bg-zinc-700"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-y-0 relative z-10">
          
          <!-- Phase 01 -->
          <div class="md:col-start-1 md:col-end-3 approach-node p-8 border border-zinc-800 bg-black hover:border-primary transition-colors duration-500 group relative">
            <div class="absolute -top-1 -left-1 w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="font-mono text-[10px] text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
              [ NODE_01 ] <span class="float-right text-primary">STATUS: AWAIT</span>
            </div>
            <h3 class="text-3xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-primary transition-colors">
              01. Immerse
            </h3>
            <div class="font-mono text-xs text-zinc-400 leading-loose flex flex-col gap-2">
              <span><span class="text-primary">> RUN:</span> DEEP_DIVE()</span>
              <span class="pl-4 opacity-70">Extracting brand narrative undercurrents.</span>
              <span class="pl-4 opacity-70">Identifying core structural constraints.</span>
            </div>
          </div>

          <!-- Connecting line mobile hidden, desktop visible -->
          <div class="hidden md:block col-start-2 border-b border-zinc-800 -translate-y-1/2 w-full self-end pointer-events-none"></div>

          <!-- Phase 02 -->
          <div class="md:col-start-2 md:col-end-4 approach-node md:-mt-12 p-8 border border-zinc-800 bg-black hover:border-primary transition-colors duration-500 group relative">
            <div class="absolute -bottom-1 -right-1 w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="font-mono text-[10px] text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
              [ NODE_02 ] <span class="float-right text-primary">STATUS: ALLOCATED</span>
            </div>
            <h3 class="text-3xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-primary transition-colors">
              02. Ideate
            </h3>
            <div class="font-mono text-xs text-zinc-400 leading-loose flex flex-col gap-2">
               <span><span class="text-primary">> RUN:</span> BLUEPRINT_GEN()</span>
               <span class="pl-4 opacity-70">Establishing typographic hierarchies.</span>
               <span class="pl-4 opacity-70">Drafting wireframe architecture.</span>
            </div>
          </div>

          <!-- Connecting line -->
          <div class="hidden md:block col-start-3 border-b border-zinc-800 -translate-y-[150%] w-full pointer-events-none"></div>
          
          <!-- Phase 03 -->
          <div class="md:col-start-3 md:col-end-5 approach-node md:-mt-24 p-8 border border-zinc-800 bg-black hover:border-primary transition-colors duration-500 group relative">
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="font-mono text-[10px] text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
              [ NODE_03 ] <span class="float-right text-primary">STATUS: PROCESSING</span>
            </div>
            <h3 class="text-3xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-primary transition-colors">
              03. Refine
            </h3>
            <div class="font-mono text-xs text-zinc-400 leading-loose flex flex-col gap-2">
               <span><span class="text-primary">> RUN:</span> MICRO_ADJUST()</span>
               <span class="pl-4 opacity-70">Iterating with pixel superiority.</span>
               <span class="pl-4 opacity-70">Injecting fluid interaction physics.</span>
            </div>
          </div>

          <!-- Phase 04 -->
          <div class="md:col-start-2 md:col-end-4 approach-node md:mt-12 p-8 border border-primary/30 bg-primary/5 hover:border-primary transition-colors duration-500 group relative">
            <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-primary opacity-100"></div>
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-primary opacity-100"></div>
            <div class="font-mono text-[10px] text-zinc-400 mb-8 border-b border-zinc-800 pb-4">
              [ NODE_04 ] <span class="float-right text-primary animate-pulse w-max">STATUS: DEPLOY_READY</span>
            </div>
            <h3 class="text-3xl font-black uppercase tracking-tighter text-white mb-6 group-hover:text-white transition-colors">
              04. Execute
            </h3>
            <div class="font-mono text-xs text-zinc-300 leading-loose flex flex-col gap-2">
               <span><span class="text-primary">> RUN:</span> LAUNCH_SEQUENCE()</span>
               <span class="pl-4 opacity-70 text-zinc-500">Compiling asset pipelines.</span>
               <span class="pl-4 opacity-70 text-white">Digital monument transferred to live.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  border-radius: 0 !important;
}
</style>

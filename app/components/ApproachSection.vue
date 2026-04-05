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

onMounted(() => {
  gsap.from('.approach-card', {
    x: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.approach-grid',
      start: 'top 75%',
    }
  })
})
</script>

<template>
  <section class="py-24 md:py-48 px-8 md:px-16 max-w-[1440px] mx-auto bg-surfaceContainer overflow-hidden">
    <div class="label-text text-primary mb-12">Methodology</div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
      <div class="md:col-span-5">
        <h2 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
          Architecture <br>of <span class="text-stroke">Boldness.</span>
        </h2>
        <p class="text-onSurfaceVariant/80 font-body text-xl md:text-2xl max-w-sm leading-relaxed mb-12">
          Fusing avant-garde aesthetics with structural logic to create authoritative digital presences.
        </p>
        
        <div class="flex gap-4">
           <div class="w-12 h-1 structural-divider"></div>
           <div class="w-24 h-1 bg-onSurface/10"></div>
        </div>

        <!-- High-end architectural mood image -->
        <div class="mt-20 w-full aspect-[4/5] bg-zinc-100 overflow-hidden">
           <img 
            src="/images/aura.png" 
            alt="Process visual" 
            class="w-full h-full object-cover grayscale brightness-110 contrast-125"
           />
        </div>
      </div>

      <div class="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border-2 border-zinc-200 approach-grid">
        <div 
          v-for="step in steps" 
          :key="step.id"
          class="approach-card aspect-square p-10 bg-surface flex flex-col justify-between group hover:bg-zinc-950 transition-all duration-700"
        >
          <div class="flex justify-between items-start">
            <span class="font-label text-primary text-xl font-bold group-hover:text-white transition-colors">[{{step.id}}]</span>
            <div class="i-material-symbols-arrow-outward-rounded text-3xl text-zinc-100 group-hover:text-primary transition-all group-hover:rotate-45"></div>
          </div>
          <div>
            <h3 class="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 group-hover:text-white transition-colors">{{step.title}}</h3>
            <p class="text-onSurfaceVariant group-hover:text-zinc-500 transition-colors font-body text-lg leading-snug">
              {{step.desc}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-stroke {
  -webkit-text-stroke: 2px #ba002b;
  color: transparent;
}

@media (max-width: 768px) {
  .text-stroke {
    -webkit-text-stroke: 1.5px #ba002b;
  }
}

* {
  border-radius: 0 !important;
}
</style>

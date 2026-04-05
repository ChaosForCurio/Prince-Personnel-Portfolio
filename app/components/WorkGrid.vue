<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  { id: 1, name: 'Vortex Digital', type: 'BRAND IDENTITY', desc: 'Experimental sonic branding for an avant-garde label.', color: 'bg-primary', image: '/images/vortex.png' },
  { id: 2, name: 'Aura Genesis', type: 'E-COMMERCE', desc: 'Crafting luxury for the next generation of fashion.', color: 'bg-secondary', image: '/images/aura.png' },
  { id: 3, name: 'Neon Pulse', type: 'DATA VISUALIZATION', desc: 'Real-time monitoring of complex digital ecosystems.', color: 'bg-zinc-900', image: '/images/neon.png' },
  { id: 4, name: 'Onyx Core', type: 'MOBILE APP', desc: 'Precision mapping interfaces for high-performance teams.', color: 'bg-primaryContainer', image: '/images/onyx.png' },
]

onMounted(() => {
  gsap.from('.project-card', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.work-grid',
      start: 'top 80%',
    }
  })
})
</script>

<template>
  <div class="work-grid grid grid-cols-1 md:grid-cols-2 w-full">
    <div 
      v-for="project in projects" 
      :key="project.id"
      class="project-card relative group aspect-square md:aspect-video overflow-hidden border-b-2 border-zinc-200"
      :class="project.id % 2 === 0 ? '' : 'md:border-r-2'"
    >
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-transparent group-hover:bg-onSurface/95 transition-all duration-700 z-10 flex flex-col justify-end p-8 md:p-16 opacity-0 group-hover:opacity-100">
        <div class="label-text text-zinc-500 mb-4">{{project.type}}</div>
        <h3 class="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
          {{project.name}}
        </h3>
        <p class="text-zinc-400 max-w-md font-body text-lg leading-relaxed">
          {{project.desc}}
        </p>
        <div class="mt-8">
           <div class="text-primary font-label text-xs uppercase tracking-[0.2em] inline-flex items-center gap-4 cursor-pointer hover:gap-8 transition-all">
             View Case Study <div class="i-material-symbols-arrow-right-alt-rounded text-xl"></div>
           </div>
        </div>
      </div>
      
      <!-- Static Label -->
      <div class="absolute top-8 left-8 z-10 label-text text-zinc-300 group-hover:opacity-0 transition-opacity">
        [NO. {{project.id.toString().padStart(2, '0')}}]
      </div>

      <!-- Main Content / Background -->
      <div class="w-full h-full bg-zinc-900 transition-transform duration-1000 group-hover:scale-105 flex items-center justify-center overflow-hidden">
         <img 
           :src="project.image" 
           :alt="project.name"
           class="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-1000"
         />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure no border radius as per DESIGN.md */
* {
  border-radius: 0 !important;
}
</style>

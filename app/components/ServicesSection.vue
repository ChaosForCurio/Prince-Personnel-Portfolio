<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  { id: '01', name: 'DIGITAL ARCHITECTURE', tags: ['WEB', 'WEB APP', 'ECOMMERCE'], image: '/images/vortex.png' },
  { id: '02', name: 'EDITORIAL DESIGN', tags: ['BRAND', 'PRINT', 'IDENTITY'], image: '/images/aura.png' },
  { id: '03', name: 'MOTION & NARRATIVE', tags: ['GSAP', 'CSS', 'VFX'], image: '/images/neon.png' },
  { id: '04', name: 'UI/UX STRATEGY', tags: ['PLATFORM', 'RESEARCH', 'PRODUCT'], image: '/images/onyx.png' },
]

onMounted(() => {
  gsap.from('.service-item', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-list',
      start: 'top 80%',
    }
  })
})
</script>

<template>
  <section class="py-24 md:py-48 px-8 md:px-16 max-w-[1440px] mx-auto border-t-[8px] border-onSurface services-list">
    <div class="label-text text-primary mb-16 md:mb-24">Capabilities</div>
    
    <div 
      v-for="service in services" 
      :key="service.id"
      class="service-item group py-12 md:py-20 border-b-2 border-onSurface/5 flex flex-col xl:flex-row justify-between items-start xl:items-center hover:bg-zinc-50 transition-all duration-500 px-6 -mx-6 overflow-hidden relative"
    >
      <!-- Background Text Reveal -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 text-9xl md:text-[15rem] font-black opacity-0 group-hover:opacity-[0.03] transition-all duration-700 select-none pointer-events-none translate-x-12 group-hover:translate-x-0">
        {{service.name}}
      </div>

      <div class="flex items-center gap-6 md:gap-16 mb-12 xl:mb-0 z-10">
        <span class="font-label text-zinc-300 text-sm md:text-lg group-hover:text-primary transition-colors flex flex-col">
          <span class="text-[10px] opacity-40">ITEM</span>
          {{service.id}}
        </span>
        <h3 class="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none group-hover:text-primary-container transition-all duration-500 group-hover:translate-x-4">
          {{service.name}}
        </h3>
      </div>
      
      <!-- Hover Image Preview -->
      <div 
        class="absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-40 bg-zinc-100 overflow-hidden opacity-0 group-hover:opacity-100 translate-x-12 group-hover:translate-x-0 transition-all duration-700 pointer-events-none z-20"
      >
         <img 
           :src="service.image" 
           :alt="service.name" 
           class="w-full h-full object-cover grayscale brightness-110" 
         />
      </div>

      <div class="flex flex-wrap gap-4 z-10 md:pl-24 xl:pl-0">
        <div 
          v-for="tag in service.tags" 
          :key="tag"
          class="font-label text-xs uppercase tracking-[0.5em] border-2 border-zinc-100 px-6 py-3 group-hover:border-primary group-hover:text-primary-container group-hover:bg-white transition-all duration-300 hover:scale-105"
        >
          {{tag}}
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

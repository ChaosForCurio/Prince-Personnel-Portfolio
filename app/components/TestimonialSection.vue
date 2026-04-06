<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  { id: 'A', quote: "The ability to translate complex brand values into bold, architectural digital experiences is unparalleled. A true visionary.", author: "Elena Rossi", role: "Creative Director, Vortex Digital", avatar: "/images/avatar-1.png" },
  { id: 'B', quote: "A masterclass in editorial design. The digital environment they built for us feels like a high-end magazine come to life.", author: "Marcus Thorne", role: "CMO, Aura Genesis", avatar: "/images/hero-bg.png" },
  { id: 'C', quote: "Sharp, intentional, and unapologetically bold. They don't just design websites; they build digital monuments.", author: "Julian Vane", role: "Founder, Onyx Core", avatar: "/images/onyx.png" },
]

onMounted(() => {
  // Section Title Reveal
  gsap.from('.testimonial-title', {
    x: -30,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonial-section',
      start: 'top 80%',
    }
  })

  // Card Reveal Animations
  gsap.from('.testimonial-card', {
    y: 80,
    scale: 0.95,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.testimonial-grid',
      start: 'top 75%',
    }
  })
})
</script>

<template>
  <section class="testimonial-section py-24 md:py-48 px-8 md:px-16 max-w-[1440px] mx-auto bg-black overflow-hidden relative">
    <!-- Animated Canvas Background -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-30">
      <AbstractGridCanvas />
    </div>

    <div class="testimonial-title label-text text-primary mb-16 md:mb-24 flex items-center gap-8 relative z-10">
       <span class="shrink-0">ACCOLADES & TRUST</span>
       <div class="flex-grow h-px bg-zinc-800"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 testimonial-grid border-[0.5px] border-zinc-800 relative z-10">
      <div 
        v-for="(t, index) in testimonials" 
        :key="t.author"
        class="testimonial-card bg-zinc-950 p-12 md:p-16 flex flex-col justify-between group hover:bg-black transition-all duration-700 min-h-[450px] border-[0.5px] border-zinc-900 hover:border-zinc-700 relative"
      >
        <!-- Corner brackets -->
        <div class="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-800 group-hover:border-primary transition-colors duration-500"></div>
        <div class="absolute top-4 right-4 w-4 h-4 border-t border-r border-zinc-800 group-hover:border-primary transition-colors duration-500"></div>

        <div>
          <div class="font-mono text-xs text-primary mb-8 tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity">ENTRY // {{ String(index + 1).padStart(2, '0') }}</div>
          <p class="text-2xl md:text-3xl font-bold uppercase tracking-tighter leading-tight mb-16 block text-zinc-400 group-hover:text-white transition-colors">
            "{{t.quote}}"
          </p>
        </div>
        
        <div class="border-t border-zinc-900 pt-8 group-hover:border-zinc-800 transition-colors flex items-center gap-6">
          <div class="w-16 h-16 bg-black border border-zinc-800 overflow-hidden shrink-0 filter grayscale group-hover:grayscale-0 transition-all duration-500 relative">
             <div class="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
             <img 
               v-if="t.avatar" 
               :src="t.avatar" 
               :alt="t.author" 
               class="w-full h-full object-cover"
             />
             <div v-else class="w-full h-full flex items-center justify-center font-black text-zinc-700 font-mono">
                {{t.author.charAt(0)}}
             </div>
          </div>
          <div>
            <div class="font-bold text-xl mb-1 uppercase tracking-tighter text-zinc-200 group-hover:text-white transition-colors">{{t.author}}</div>
            <div class="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">{{t.role}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
q::before, q::after {
  content: none;
}

* {
  border-radius: 0 !important;
}
</style>

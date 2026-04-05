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
  gsap.from('.testimonial-card', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.testimonial-grid',
      start: 'top 70%',
    }
  })
})
</script>

<template>
  <section class="py-24 md:py-48 px-8 md:px-16 max-w-[1440px] mx-auto bg-surface overflow-hidden">
    <div class="label-text text-primary mb-16 md:mb-24 flex items-center gap-8">
       Accolades & Trust
       <div class="flex-grow h-px bg-zinc-200"></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200 testimonial-grid border-2 border-zinc-200">
      <div 
        v-for="t in testimonials" 
        :key="t.author"
        class="testimonial-card bg-white p-12 md:p-16 flex flex-col justify-between group hover:bg-zinc-950 transition-all duration-700 min-h-[500px]"
      >
        <div>
          <div class="text-7xl font-black text-primary/10 group-hover:text-primary transition-colors leading-none mb-12">
            “
          </div>
          <q class="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-16 block group-hover:text-white transition-colors">
            {{t.quote}}
          </q>
        </div>
        
        <div class="border-t border-zinc-100 pt-8 group-hover:border-zinc-800 transition-colors flex items-center gap-6">
          <div class="w-16 h-16 bg-zinc-100 overflow-hidden shrink-0">
             <img 
               v-if="t.avatar" 
               :src="t.avatar" 
               :alt="t.author" 
               class="w-full h-full object-cover grayscale brightness-110"
             />
             <div v-else class="w-full h-full flex items-center justify-center font-black text-zinc-300">
                {{t.author.charAt(0)}}
             </div>
          </div>
          <div>
            <div class="font-headline text-xl mb-1 uppercase tracking-tighter group-hover:text-white transition-colors">{{t.author}}</div>
            <div class="font-label text-[10px] text-zinc-400 uppercase tracking-[0.3em] group-hover:text-zinc-600 transition-colors">{{t.role}}</div>
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

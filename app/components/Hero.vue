<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

onMounted(() => {
  const tl = gsap.timeline()
  
  tl.from('.hero-label', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.hero-title span', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
  }, '-=0.4')
  .from('.hero-desc', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-scroll', {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: 'elastic.out(1, 0.5)'
  }, '-=0.4')
})
</script>

<template>
  <section class="min-h-screen pt-48 pb-24 px-8 md:px-16 max-w-[1440px] mx-auto flex flex-col justify-center relative overflow-hidden">
    <!-- High-end architectural background -->
    <div class="absolute inset-0 z-[-1] overflow-hidden">
      <img 
        src="/images/hero-bg.png" 
        alt="Architectural abstraction"
        class="w-full h-full object-cover opacity-20 grayscale brightness-50 scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/40 to-surface"></div>
    </div>

    <div class="hero-label label-text text-primary mb-8">
      Digital Designer & Creative Director
    </div>
    
    <h1 class="hero-title text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase relative">
      <span class="block">Bold</span>
      <span class="block text-stroke py-4">Visions</span>
      <span class="block">Defined.</span>
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
      <p class="hero-desc md:col-span-6 text-xl md:text-2xl font-body font-light text-onSurfaceVariant leading-relaxed">
        Crafting high-impact digital experiences for brands that aren't afraid to make a statement. Based in India, working globally.
      </p>
      
      <div class="hero-scroll md:col-span-6 flex justify-end">
        <div class="w-32 h-32 rounded-full border-2 border-primary flex items-center justify-center text-primary group cursor-pointer hover:bg-primary hover:text-white transition-all duration-500 bg-surface/10 backdrop-blur-sm">
          <div class="i-material-symbols-arrow-downward text-4xl transform group-hover:rotate-45 transition-transform"></div>
        </div>
      </div>
    </div>

    <!-- Decorative blurs updated for new background -->
    <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
    <div class="absolute -left-20 bottom-20 w-80 h-80 bg-secondary/10 blur-[130px] rounded-full pointer-events-none opacity-50"></div>
  </section>
</template>

<style scoped>
.text-stroke {
  -webkit-text-stroke: 2px #1a1c1c;
  color: transparent;
}

@media (max-width: 768px) {
  .text-stroke {
    -webkit-text-stroke: 1px #1a1c1c;
  }
}
</style>

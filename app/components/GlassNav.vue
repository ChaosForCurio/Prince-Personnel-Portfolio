<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })

  // Fade in navigation
  gsap.from('.nav-item', {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out',
    delay: 0.5
  })
})

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Approach', href: '#approach' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
]
</script>

<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-500"
    :class="[isScrolled ? 'py-4 glass-effect shadow-sm' : 'py-8 bg-transparent']"
  >
    <nav class="flex justify-between items-center px-8 md:px-16 max-w-[1440px] mx-auto">
      <div class="nav-item text-2xl font-black tracking-tighter text-white">
        PRINCE<span class="text-primary font-black">.</span>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex gap-12 items-center">
        <a 
          v-for="link in navLinks" 
          :key="link.name"
          :href="link.href"
          class="nav-item font-headline uppercase tracking-tighter text-sm text-zinc-400 hover:text-white transition-colors duration-300"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="nav-item">
        <button class="font-mono text-xs uppercase tracking-widest text-primary hover:text-white border border-primary/30 hover:border-primary px-6 py-3 transition-colors bg-primary/5">
          Get in Touch
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.glass-effect {
  background: rgba(5, 5, 5, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>

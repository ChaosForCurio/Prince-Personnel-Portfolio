<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const titleRef = ref(null)
const subTitleRef = ref(null)

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
  const tl = gsap.timeline()
  
  tl.to('.hero-grid', {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut'
  })
  
  // Trigger text shuffle
  setTimeout(() => {
    if (titleRef.value) shuffleText(titleRef.value, 'SHAPING DIGITAL', 1.2)
    if (subTitleRef.value) shuffleText(subTitleRef.value, 'ARCHITECTURE', 1)
  }, 300)

  tl.from('.hero-meta', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }, '+=1')
})
</script>

<template>
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden bg-transparent">
    <!-- Cinematic Animated Background -->
    <div class="absolute inset-0 z-[-3] pointer-events-none overflow-hidden">
      <div class="hero-bg-animate w-full h-full"></div>
      <div class="absolute inset-0 bg-black/60"></div>
    </div>

    <!-- Fine-line grid overlay -->
    <div class="hero-grid absolute inset-0 opacity-0 pointer-events-none grid-fine"></div>

    <div class="relative z-10">
      <div class="hero-meta label-text text-primary mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        CREATIVE DIRECTOR / BOLD CURATOR
      </div>
      
      <h1 class="font-mono text-5xl md:text-9xl font-bold leading-none tracking-tighter uppercase mb-8">
        <span ref="titleRef" class="block">------- -------</span>
        <span ref="subTitleRef" class="block text-primary">------------</span>
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <p class="hero-meta md:col-span-6 text-lg md:text-xl font-mono text-onSurfaceVariant leading-relaxed uppercase max-w-lg">
          [ SYSTEM ] : Crafting high-impact digital experiences through technical precision and aesthetic boldness.
        </p>
        
        <div class="hero-meta md:col-span-6 flex justify-end">
          <div class="group cursor-pointer flex flex-col items-end gap-2">
            <span class="text-xs uppercase tracking-widest opacity-50 font-bold group-hover:text-primary transition-colors">Initialize Scroll</span>
            <div class="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all">
              <div class="i-material-symbols-arrow-downward text-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical decorations -->
    <div class="absolute bottom-8 left-8 hero-meta text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
      Location: 28.6139° N, 77.2090° E // New Delhi, India
    </div>
    <div class="absolute top-8 right-8 hero-meta text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
      Version: 4.0.1 // Beta-Curator-Protocol
    </div>
  </section>
</template>

<style scoped>
/* Scramble effect styles */
span {
  transition: color 0.3s ease;
}

/* Cinematic animated background - mimics abstract digital video */
.hero-bg-animate {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(186, 0, 43, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(60, 0, 80, 0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 80%, rgba(0, 20, 60, 0.1) 0%, transparent 50%),
    #050505;
  animation: bgShift 12s ease-in-out infinite alternate;
  transform: scale(1.05);
}

@keyframes bgShift {
  0% {
    background:
      radial-gradient(ellipse at 20% 50%, rgba(186, 0, 43, 0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 30%, rgba(60, 0, 80, 0.12) 0%, transparent 55%),
      radial-gradient(ellipse at 50% 80%, rgba(0, 20, 60, 0.1) 0%, transparent 50%),
      #050505;
  }
  33% {
    background:
      radial-gradient(ellipse at 70% 20%, rgba(186, 0, 43, 0.2) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 70%, rgba(80, 0, 100, 0.14) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 90%, rgba(0, 30, 80, 0.12) 0%, transparent 50%),
      #050505;
  }
  66% {
    background:
      radial-gradient(ellipse at 50% 80%, rgba(186, 0, 43, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 90% 10%, rgba(40, 0, 90, 0.1) 0%, transparent 55%),
      radial-gradient(ellipse at 10% 40%, rgba(0, 10, 50, 0.1) 0%, transparent 50%),
      #050505;
  }
  100% {
    background:
      radial-gradient(ellipse at 30% 60%, rgba(186, 0, 43, 0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 60% 90%, rgba(70, 0, 110, 0.12) 0%, transparent 55%),
      radial-gradient(ellipse at 90% 50%, rgba(0, 15, 70, 0.1) 0%, transparent 50%),
      #050505;
  }
}
</style>

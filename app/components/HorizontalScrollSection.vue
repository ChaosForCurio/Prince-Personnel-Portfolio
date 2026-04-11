<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const trackRef = ref(null)
let scrollTween = null

// Sample data for the horizontal section
const items = [
  { id: '01', title: 'DIGITAL IDENTITY', category: 'BRANDING', year: '2026', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { id: '02', title: 'SPATIAL INTERFACES', category: 'WEBGL', year: '2026', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2564&auto=format&fit=crop' },
  { id: '03', title: 'AESTHETIC SYSTEMS', category: 'UI/UX', year: '2025', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2564&auto=format&fit=crop' },
  { id: '04', title: 'MOTION GRAPHICS', category: 'ANIMATION', year: '2025', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2564&auto=format&fit=crop' },
]

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
    
    // Allow a small delay for DOM to settle
    setTimeout(() => {
      const section = sectionRef.value
      const track = trackRef.value
      
      if (!section || !track) return
      
      // Calculate how far to move the track
      // It's the total scroll width of the track minus the viewport width
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)
      
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1, // Smooth scrubbing
          invalidateOnRefresh: true // Recalculate on resize
        }
      })
    }, 100)
  }
})

onUnmounted(() => {
  if (scrollTween) {
    scrollTween.scrollTrigger?.kill()
    scrollTween.kill()
  }
})
</script>

<template>
  <!-- The outer section acts as the pin spacer -->
  <section ref="sectionRef" class="horizontal-scroll-section relative h-screen bg-white overflow-hidden flex items-center border-y border-black/5">
    
    <!-- Decorative background elements -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-5 bg-black/5" style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAA6fKPSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF7u7uAAAA////8uU76AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wMREBIny9rj7AAAAElJREFUeNpjYGRkZGJmYWVjZ2Dk4OTi5uHl4+fjF+AXEBQS5hHmExYQFBImEBIWEhYRFhEWERYRlhGWERYRFhGWERYRFhGWERYRl/8B4S0C+hF8YkwAAAAASUVORK5CYII=')"></div>
    <div class="absolute top-1/2 left-0 w-full h-px bg-black/5 -translate-y-1/2 pointer-events-none z-0"></div>

    <!-- The exact scrolling track -->
    <div ref="trackRef" class="horizontal-track flex h-full items-center relative z-10 pl-8 md:pl-24 pr-[30vw]">
      
      <!-- Intro Card inside horizontal scroll -->
      <div class="w-[80vw] sm:w-[50vw] md:w-[40vw] flex-shrink-0 mr-12 md:mr-32 flex flex-col justify-center h-full">
        <h2 class="text-4xl md:text-7xl font-black text-onSurface leading-none uppercase mb-6 uppercase tracking-tighter">
          Selected <br>
          <span class="text-primary italic font-serif tracking-normal">Works</span>
        </h2>
        <p class="text-onSurfaceVariant font-mono text-sm max-w-xs uppercase">
          A showcase of recent digital monuments focusing on interaction and technical precision.
        </p>
      </div>

      <!-- Item Cards -->
      <div 
        v-for="(item, index) in items" 
        :key="item.id"
        class="horizontal-item w-[85vw] sm:w-[60vw] md:w-[45vw] h-[60vh] flex-shrink-0 mr-8 md:mr-16 relative group"
      >
        <div class="w-full h-full overflow-hidden bg-surfaceContainer relative border-l border-black/5">
          
          <!-- Image with parallax scale effect on hover -->
          <img 
            :src="item.image" 
            :alt="item.title"
            class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
          >
          
          <!-- Overlay gradient - adjusted for light background -->
          <div class="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          <!-- Content -->
          <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
            <div class="flex justify-between items-end mb-4 overflow-hidden">
              <span class="font-mono text-xs text-primary tracking-[0.2em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">{{ item.category }} // {{ item.year }}</span>
              <span class="font-mono text-xs text-onSurfaceVariant">{{ item.id }}</span>
            </div>
            
            <h3 class="text-3xl md:text-5xl font-bold uppercase tracking-tight text-onSurface group-hover:text-primary transition-colors duration-500">
              {{ item.title }}
            </h3>
          </div>
          
          <!-- Corner brackets for technical feel -->
          <div class="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/0 group-hover:border-primary/100 transition-colors duration-500 delay-200"></div>
          <div class="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/0 group-hover:border-primary/100 transition-colors duration-500 delay-200"></div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
.horizontal-scroll-section {
  /* Hide horizontal overflow globally inside this section to allow track animation outside viewport bounds */
  overflow: hidden;
}

.horizontal-track {
  width: max-content;
  will-change: transform;
}
</style>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursor = ref(null)
const follower = ref(null)

const onMouseMove = (e) => {
  gsap.to(cursor.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0,
  })
  gsap.to(follower.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.15,
    ease: 'power2.out',
  })
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
    <!-- Main Precision Dot -->
    <div 
      ref="cursor"
      class="absolute w-1.5 h-1.5 bg-primary -left-0.75 -top-0.75 mix-blend-difference"
    ></div>
    
    <!-- Lagging 'Glitch' Follower -->
    <div 
      ref="follower"
      class="absolute w-8 h-8 border-[0.5px] border-primary/30 -left-4 -top-4 mix-blend-difference opacity-50"
    ></div>
    
    <!-- Crosshair Lines -->
    <div 
      ref="cursor"
      class="absolute w-[20px] h-[0.5px] bg-white/20 -left-[10px] top-0"
    ></div>
    <div 
      ref="cursor"
      class="absolute w-[0.5px] h-[20px] bg-white/20 left-0 -top-[10px]"
    ></div>
  </div>
</template>

<style scoped>
/* Ensure the system cursor is hidden globally when this component is active */
:global(body) {
  cursor: none !important;
}

:global(a, button, [role="button"]) {
  cursor: none !important;
}
</style>

<script setup>
const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prince-mehra-562681366/' },
  { name: 'Github', href: 'https://github.com/princemehra9024' },
]
</script>

<template>
  <footer class="w-full bg-white text-onSurface relative overflow-hidden border-t border-zinc-100">
    <!-- Subtle grid background for footer -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
    <div class="absolute inset-0 z-0 pointer-events-none opacity-5" style="background-image: radial-gradient(circle at 50% 0%, rgba(186,0,43,0.1) 0%, transparent 50%);"></div>

    <div class="flex flex-col justify-between px-8 md:px-16 pt-24 pb-12 max-w-[1440px] mx-auto min-h-[60vh] relative z-10">
      
      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
        <div class="md:col-span-8">
          <p class="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em] leading-loose max-w-lg mb-8">
            Fusing technical precision with structural logic. Available for selective collaborations and visionary projects globally.
          </p>
          <a href="mailto:hello@example.com" class="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-primary transition-colors duration-500 inline-block border-b-4 border-transparent hover:border-primary pb-2">
            INITIATE_CONTACT<span class="text-primary animate-pulse">_</span>
          </a>
        </div>
        
        <div class="md:col-span-4 flex flex-col gap-6 md:text-right">
          <a 
            v-for="link in socialLinks" 
            :key="link.name"
            :href="link.href"
            class="text-zinc-400 font-mono text-xl uppercase tracking-widest hover:text-black transition-all duration-300 flex items-center md:justify-end gap-4 group"
          >
            <span class="w-0 h-px bg-primary transition-all duration-300 group-hover:w-8 hidden md:block"></span>
            {{ link.name }}
          </a>
        </div>
      </div>

      <!-- Bottom Massive Typographic Section -->
      <div class="mt-auto pt-16 flex flex-col md:flex-row justify-between items-end border-t border-zinc-100 relative">
        <span class="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter text-black/5 select-none absolute bottom-12 left-0 pointer-events-none whitespace-nowrap">
          PRINCE MEHRA
        </span>
        
        <div class="w-full flex flex-col md:flex-row justify-between items-end z-10">
          <span class="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-0">
            SYS.VER 2.0.26 // DIGITAL MONUMENT
          </span>
          <span class="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
            © 2026 THE BOLD CURATOR. ALL PROCESSES EXECUTED.
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

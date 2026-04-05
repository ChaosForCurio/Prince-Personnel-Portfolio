<script setup>
const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prince-mehra-562681366/' },
  { name: 'Github', href: 'https://github.com/princemehra9024' },
]
</script>

<template>
  <footer class="w-full border-t-[8px] border-primary bg-zinc-950 text-white">
    <div class="flex flex-col md:flex-row justify-between items-start px-8 pt-16 pb-12 max-w-[1440px] mx-auto">
      <div class="mb-12 md:mb-0">
        <span class="text-4xl font-black text-white mb-8 block tracking-tighter">PRINCE<span class="text-primary">.</span></span>
        <p class="text-zinc-500 max-w-xs font-label text-xs uppercase tracking-widest leading-loose">
          Bold curator of digital experiences. Defying the ordinary through high-impact design and editorial precision.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16 md:mb-0">
        <a 
          v-for="link in socialLinks" 
          :key="link.name"
          :href="link.href"
          class="text-zinc-500 font-label text-xs uppercase tracking-widest hover:text-primary transition-all duration-300"
        >
          {{ link.name }}
        </a>
      </div>

      <div class="w-full md:w-auto text-left md:text-right mt-12 md:mt-0 pt-8 border-t border-zinc-900 md:border-t-0">
        <span class="text-zinc-500 font-label text-[10px] uppercase tracking-[0.3em]">
          © 2026 THE BOLD CURATOR. ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  </footer>
</template>

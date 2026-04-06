// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  app: {
    head: {
      title: 'Prince Mehra | Bold Curator & Digital Designer',
      meta: [
        { name: 'description', content: 'Portfolio of Prince Mehra, a versatile developer focusing on high-impact digital experiences.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  experimental: {
    payloadExtraction: false
  },
  nitro: {
    compressPublicAssets: true
  }
})

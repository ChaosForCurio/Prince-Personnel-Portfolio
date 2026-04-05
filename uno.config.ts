import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-6 py-3 font-semibold transition-all active:scale-95 duration-200 ease-in-out uppercase tracking-tighter font-headline inline-block cursor-pointer text-center'],
    ['btn-primary', 'bg-primary text-on-primary hover:bg-primary-container border-none'],
    ['btn-secondary', 'bg-transparent text-primary border-2 border-solid border-primary'],
    ['structural-divider', 'h-2 md:h-8 bg-primary w-full'],
    ['glass-effect', 'bg-[#f9f9f9]/80 backdrop-blur-xl'],
    ['label-text', 'font-label uppercase tracking-[0.2em] text-xs font-bold'],
  ],
  theme: {
    colors: {
      primary: '#ba002b',
      primaryContainer: '#e90039',
      secondary: '#7f40b0',
      background: '#f9f9f9',
      surface: '#f9f9f9',
      surfaceContainer: '#eeeeee',
      surfaceContainerLowest: '#ffffff',
      onSurface: '#1a1c1c',
      onPrimary: '#ffffff',
      onSurfaceVariant: '#5f3e3e',
    },
    borderRadius: {
      DEFAULT: '0px',
      lg: '0px',
      xl: '0px',
      full: '9999px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        headline: {
          name: 'Epilogue',
          weights: ['700', '800', '900']
        },
        body: {
          name: 'Work Sans',
          weights: ['300', '400', '500']
        },
        label: {
          name: 'Space Grotesk',
          weights: ['500', '700']
        }
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})

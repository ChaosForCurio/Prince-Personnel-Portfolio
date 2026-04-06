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
    ['btn', 'px-6 py-3 font-semibold transition-all active:scale-95 duration-200 ease-in-out uppercase tracking-tighter font-mono inline-block cursor-pointer text-center'],
    ['btn-primary', 'bg-primary text-on-primary hover:bg-primary-container border-none'],
    ['btn-secondary', 'bg-transparent text-primary border-1 border-solid border-primary'],
    ['structural-divider', 'h-[1px] bg-primary/20 w-full'],
    ['glass-effect', 'bg-black/80 backdrop-blur-xl border-1 border-white/10'],
    ['label-text', 'font-mono uppercase tracking-[0.2em] text-xs font-bold opacity-70'],
    ['grid-fine', 'bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]'],
  ],
  theme: {
    colors: {
      primary: '#ba002b',
      primaryContainer: '#e90039',
      secondary: '#7f40b0',
      background: '#050505',
      surface: '#0a0a0a',
      surfaceContainer: '#111111',
      surfaceContainerLowest: '#000000',
      onSurface: '#ffffff',
      onPrimary: '#ffffff',
      onSurfaceVariant: '#a0a0a0',
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
          name: 'JetBrains Mono',
          weights: ['700', '800']
        },
        mono: {
          name: 'JetBrains Mono',
          weights: ['400', '500', '700']
        },
        body: {
          name: 'Inter',
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

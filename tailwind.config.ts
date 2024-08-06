import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/**/fuma/dist/**/*.svelte',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
  },
} as Config

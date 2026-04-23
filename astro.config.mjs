// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import playformFormat from '@playform/format';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://quiet-guardian.com',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [playformFormat(), sitemap({
    filter: (page) => page !== 'https://quiet-guardian.com/thank-you'
  })]
});
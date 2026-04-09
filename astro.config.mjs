// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://davidoliver-ai.pages.dev',

  integrations: [
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    imageService: 'cloudflare',
  }),

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

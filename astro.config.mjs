import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://cloudcruncher.github.io',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
});

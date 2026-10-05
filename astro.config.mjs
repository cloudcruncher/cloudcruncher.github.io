import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://robinsaini.dev',
  base: process.env.BASE_PATH || '/',
  integrations: [sitemap()],
});

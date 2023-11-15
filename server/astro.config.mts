import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({ edgeMiddleware: true }),
  output: 'server',
  site: 'https://primer-checkout.vercel.app',
});

import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Deploy to Cloudflare Pages
    adapter: adapter({
      // Routes to exclude from static generation
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
  },
};

export default config;

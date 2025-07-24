import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Deploy to Vercel with edge runtime for better performance
    adapter: adapter({
      runtime: 'edge',
      // Opt specific routes out of edge runtime if needed
      // functions: {
      //   '/api/heavy-computation': {
      //     runtime: 'nodejs20.x'
      //   }
      // }
    }),
  },
};

export default config;

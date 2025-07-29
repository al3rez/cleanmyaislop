import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { buildInfoPlugin } from "./vite-plugin-build-info.js";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), buildInfoPlugin()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: '/snacksinmalta.github.io/',       // URL prefix for your repo
  build: {
    outDir: 'docs',              // Must output files here
    emptyOutDir: true,
  },
});
 
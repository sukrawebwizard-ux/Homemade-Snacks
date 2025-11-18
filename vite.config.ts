import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: '/snacksinmalta/',       // URL prefix
  build: {
    outDir: 'docs',              // Must output files here
    emptyOutDir: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: '/-Homemade-Snacks/',
  build: {
    // GitHub Pages can only deploy from root or /docs
    outDir: 'docs',
  },
});

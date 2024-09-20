import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// Convertir import.meta.url en __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PanicMode",
      fileName: (format) => `panicmode.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [dts()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});

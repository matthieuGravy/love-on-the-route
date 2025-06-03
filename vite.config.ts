import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LoveOnTheRoute",
      fileName: (format) => `love-on-the-route.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "love-on-the-route.css";
          return assetInfo.name || "unknown";
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [dts()],
});

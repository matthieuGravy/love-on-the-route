import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dts from "vite-plugin-dts";

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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "panicmode.css";
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [dts()],
});

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PanicMode",
      fileName: (format) => `panicmode.${format}.js`,
    },
    rollupOptions: {
      external: [
        // Ajoutez ici les dépendances externes si nécessaire
      ],
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
  // Ajout de la configuration pour le développement
  optimizeDeps: {
    include: [], // Vous pouvez ajouter des dépendances spécifiques ici si nécessaire
  },
  // Spécifiez un fichier HTML pour le développement
  server: {
    open: "/index.html",
  },
});

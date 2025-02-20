import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5175,
  },
  plugins: [react()],
  build: {
    outDir: "build",
    // rollupOptions: {
    //   output: {
    //     manualChunks: (id) => {
    //       if (id.includes("node_modules")) {
    //         return "vendor";
    //       }
    //     },
    //   },
    // },
  },
});

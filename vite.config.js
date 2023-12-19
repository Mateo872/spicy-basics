import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      port: 3000,
    },
  },
  build: {
    outDir: "dist/client",
    ssrManifest: true,
    rollupOptions: {
      input: {
        "entry-client": path.resolve(__dirname, "src/main.jsx"),
        "entry-server": path.resolve(__dirname, "src/entry-server.jsx"),
      },
    },
  },
});

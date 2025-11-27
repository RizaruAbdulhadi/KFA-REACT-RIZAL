import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true, // Gunakan describe, it, expect tanpa import
    environment: "jsdom", // Simulasi browser environment
    setupFiles: "./src/test/setup.js", // File setup yang dijalankan sebelum test
  },
});

// vite.config.ts - Exercise 5.1: Build System Setup
import { defineConfig } from "vite";

export default defineConfig({
  // Build options
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "es2020",
  },
  
  // Dev server options
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  
  // Optimization
  optimizeDeps: {
    include: [],
  },
  
  // Define global constants
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
  },
});
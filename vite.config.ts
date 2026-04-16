import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages 项目站为 /<仓库名>/；用户站 aptacc2421.github.io 应为 "/" */
const base = process.env.VITE_BASE?.trim() || "/";

export default defineConfig({
  plugins: [react()],
  base,
});

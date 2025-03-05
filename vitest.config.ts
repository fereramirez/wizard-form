import {URL, fileURLToPath} from "node:url";

import {defineConfig} from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr({include: "**/*.svg"})],
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

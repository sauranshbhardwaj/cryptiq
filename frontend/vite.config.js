import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  preview: {
    port: 8080,
    strictPort: true,
    allowedHosts: true,
  },
  server: {
    port: 8000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  test: {
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [
        {
          browser: "chromium",
          launch: {
            executablePath: "/usr/bin/chromium-browser",
          },
        },
      ],
    },
  },
});

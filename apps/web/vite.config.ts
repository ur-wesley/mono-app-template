import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import UnocssPlugin from "@unocss/vite";
import { loadConfig } from "c12";
import type { AppConfig } from "@mono/shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load config from root TypeScript file
const { config } = await loadConfig<AppConfig>({
 name: "config",
 configFile: "config.ts",
 cwd: "../../", // Look for config at repo root
 defaults: {
  api: {
   port: 4000,
   host: "localhost",
   logLevel: "info",
   cors: {
    enabled: true,
    origins: ["http://localhost:3000", "http://localhost:3001"],
   },
  },
  web: {
   port: 3000,
   apiUrl: "http://localhost:4000",
  },
 },
});

export default defineConfig({
 plugins: [solidPlugin(), UnocssPlugin({})],
 server: {
  port: config.web.port,
  proxy: {
   "/api": {
    target: config.web.apiUrl,
    changeOrigin: true,
   },
  },
 },
 build: {
  target: "esnext",
 },
 resolve: {
  alias: {
   "@": resolve(__dirname, "./src"),
  },
 },
});

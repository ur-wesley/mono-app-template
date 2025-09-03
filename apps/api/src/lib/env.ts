import { loadConfig } from "c12";
import { resolve } from "node:path";
import type { AppConfig } from "@mono/shared/types";

// Find the repo root by looking for package.json with workspaces
const repoRoot = resolve(process.cwd(), "../..");

export const config = await loadConfig<AppConfig>({
 name: "config",
 configFile: "config.ts",
 cwd: repoRoot,
 defaults: {
  api: {
   port: process.env.API_PORT ? Number(process.env.API_PORT) : 5005,
   host: process.env.API_HOST || "localhost",
   logLevel: process.env.LOG_LEVEL || "info",
   cors: {
    enabled: process.env.CORS_ENABLED !== "false",
    origins: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5000"],
   },
   database: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : undefined,
  },
  web: {
   port: process.env.WEB_PORT ? Number(process.env.WEB_PORT) : 5000,
   apiUrl: process.env.API_URL || "http://localhost:5005",
  },
 },
 jitiOptions: {
  debug: false,
 },
});

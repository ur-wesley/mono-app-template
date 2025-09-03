import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { apiRoutes } from "@/routes/api";
import { healthRoutes } from "@/routes/health";
import { logger } from "@/lib/logger";
import { config } from "@/lib/env";
import { requestLogger } from "@/lib/plugins/request-logger";
import consola from "consola";

// Set log level from loaded config
consola.level = config.config.api.logLevel === "debug" ? 4 : 3;

const app = new Elysia()
 .use(
  openapi({
   documentation: {
    info: {
     title: "Mono Template API",
     version: "1.0.0",
     description: "A modern API built with Elysia and Bun",
    },
    tags: [
     { name: "Health", description: "Health check endpoints" },
     { name: "API", description: "Main API endpoints" },
    ],
   },
   path: "/docs",
  })
 )
 .use(
  cors({
   origin: config.config.api.cors.enabled
    ? config.config.api.cors.origins
    : false,
   credentials: true,
  })
 )
 .use(requestLogger())
 .use(healthRoutes)
 .use(apiRoutes)
 .onError(({ code, error, set }) => {
  // Centralized error logging
  logger.error(code, error);
  if (!set.status) set.status = 500;
  let message: string;
  if (error instanceof Error) message = error.message;
  else if (typeof error === "string") message = error;
  else message = JSON.stringify(error);
  return { message, code };
 })
 .listen(config.config.api.port);

export type App = typeof app;

logger.ready(`API ready at http://${app.server?.hostname}:${app.server?.port}`);

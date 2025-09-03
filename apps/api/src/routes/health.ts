import { Elysia, t } from "elysia";

export const healthRoutes = new Elysia({ tags: ["Health"] }).get(
 "/health",
 () => ({ ok: true }),
 {
  detail: {
   summary: "Health Check",
   description: "Check if the API server is running and healthy",
   tags: ["Health"],
  },
  response: t.Object({
   ok: t.Boolean({ description: "Health status" }),
  }),
 }
);

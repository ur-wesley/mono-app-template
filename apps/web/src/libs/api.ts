import { treaty } from "@elysiajs/eden";
import type { App } from "@mono/api";

// For dev, point to local API proxy at /api or direct URL
export const api = treaty<App>(typeof window === "undefined" ? "http://localhost:4000" : "/");

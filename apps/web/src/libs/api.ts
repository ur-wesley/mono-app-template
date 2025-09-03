import { treaty } from "@elysiajs/eden";
import type { App } from "@mono/api";
import { config } from "@/lib/config";

export const apiClient = treaty<App>(config.config.web.apiUrl);

import type { Elysia } from "elysia";
import { logger } from "../logger";

export function requestLogger() {
	return (app: Elysia) =>
		app
			.onRequest(({ request }) => {
				const { method } = request;
				const url = new URL(request.url);
				logger.start(`${method} ${url.pathname}`);
			})
			.onAfterHandle(({ request, set, response }) => {
				const { method } = request;
				const url = new URL(request.url);
				const status = typeof set.status === "number" ? set.status : 200;
				logger.success(`${method} ${url.pathname} -> ${status}`);
				if (status >= 400) logger.warn({ response });
			});
}

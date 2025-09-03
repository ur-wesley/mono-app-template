// test/app.test.ts
import { beforeAll, describe, expect, it } from "bun:test";
import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { apiRoutes } from "../src/routes/api";
import { healthRoutes } from "../src/routes/health";

describe("Full Application", () => {
	let app: Elysia;

	beforeAll(() => {
		// Create test app without the actual config dependencies
		app = new Elysia()
			.use(
				openapi({
					documentation: {
						info: {
							title: "Test API",
							version: "1.0.0",
							description: "Test API for unit tests",
						},
						tags: [
							{ name: "Health", description: "Health check endpoints" },
							{ name: "API", description: "Main API endpoints" },
						],
					},
					path: "/docs",
				}),
			)
			.use(
				cors({
					origin: true,
					credentials: true,
				}),
			)
			.use(healthRoutes)
			.use(apiRoutes);
	});

	describe("Health endpoints", () => {
		it("health check returns ok", async () => {
			const response = await app.handle(new Request("http://localhost/health")).then((res) => res.json());

			expect(response).toEqual({ ok: true });
		});
	});

	describe("API endpoints", () => {
		it("hello endpoint works", async () => {
			const response = await app.handle(new Request("http://localhost/api/hello?name=Test")).then((res) => res.json());

			expect(response.message).toBe("Hello Test");
		});

		it("echo endpoint works", async () => {
			const response = await app
				.handle(
					new Request("http://localhost/api/echo", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ text: "test message" }),
					}),
				)
				.then((res) => res.json());

			expect(response.echo).toBe("test message");
		});
	});

	describe("OpenAPI documentation", () => {
		it("docs endpoint returns openapi spec", async () => {
			const response = await app.handle(new Request("http://localhost/docs/json"));

			expect(response.status).toBe(200);

			const spec = await response.json();
			expect(spec).toHaveProperty("openapi");
			expect(spec).toHaveProperty("info");
			expect(spec.info.title).toBe("Test API");
		});
	});

	describe("Error handling", () => {
		it("returns 404 for unknown routes", async () => {
			const response = await app.handle(new Request("http://localhost/unknown"));

			expect(response.status).toBe(404);
		});

		it("handles validation errors", async () => {
			const response = await app.handle(
				new Request("http://localhost/api/echo", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ wrongField: "test" }),
				}),
			);

			expect(response.status).toBe(422);
		});
	});
});

import { Elysia, t } from "elysia";
import { type EchoData, echo, type HelloData, hello } from "@/services/greetings";

export const apiRoutes = new Elysia({ prefix: "/api", tags: ["API"] })
	.get(
		"/hello",
		({ query, set }) =>
			hello(query.name)
				.map((data: HelloData) => data)
				.mapErr((e: Error) => {
					set.status = 400;
					return { message: e.message };
				})
				.match(
					(data: HelloData) => data,
					(e: { message: string }) => e,
				),
		{
			detail: {
				summary: "Say Hello",
				description: "Returns a greeting message, optionally personalized with a name",
				tags: ["API"],
			},
			query: t.Object({
				name: t.Optional(t.String({ description: "Name to greet" })),
			}),
			response: {
				200: t.Object({
					message: t.String({ description: "Greeting message" }),
				}),
				400: t.Object({
					message: t.String({ description: "Error message" }),
				}),
			},
		},
	)
	.post(
		"/echo",
		({ body, set }) =>
			echo(body.text)
				.map((data: EchoData) => data)
				.mapErr((e: Error) => {
					set.status = 400;
					return { message: e.message };
				})
				.match(
					(data: EchoData) => data,
					(e: { message: string }) => e,
				),
		{
			detail: {
				summary: "Echo Text",
				description: "Echoes back the provided text",
				tags: ["API"],
			},
			body: t.Object({
				text: t.String({ description: "Text to echo back" }),
			}),
			response: {
				200: t.Object({
					echo: t.String({ description: "Echoed text" }),
				}),
				400: t.Object({
					message: t.String({ description: "Error message" }),
				}),
			},
		},
	);

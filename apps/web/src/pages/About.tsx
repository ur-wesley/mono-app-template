import type { Component } from "solid-js";

const About: Component = () => {
	return (
		<div class="p-8 space-y-4">
			<h1 class="text-4xl font-bold text-gray-800">About</h1>
			<div class="space-y-4 text-gray-600">
				<p>This is a monorepo template built with:</p>
				<ul class="list-disc list-inside space-y-2">
					<li>
						<strong>Frontend:</strong> Solid.js + Vite + UnoCSS
					</li>
					<li>
						<strong>Backend:</strong> Bun + Elysia + Eden Treaty
					</li>
					<li>
						<strong>Router:</strong> TanStack Solid Router
					</li>
					<li>
						<strong>State Management:</strong> TanStack Solid Query
					</li>
					<li>
						<strong>Configuration:</strong> c12 with YAML
					</li>
					<li>
						<strong>Build System:</strong> Turborepo
					</li>
				</ul>
				<p>
					The frontend and backend are fully type-safe with Eden Treaty providing end-to-end type safety between the
					client and server.
				</p>
			</div>
		</div>
	);
};

export default About;

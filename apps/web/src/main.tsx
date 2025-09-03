import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { Outlet, RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/solid-router";
import { render } from "solid-js/web";

import About from "@/pages/About";
// Import pages
import Home from "@/pages/Home";

// Import styles
import "@/app.css";
import "virtual:uno.css";

const queryClient = new QueryClient();

// Create the root route
const rootRoute = createRootRoute({
	component: () => (
		<div>
			<nav class="p-4 bg-gray-100 border-b">
				<a href="/" class="mr-4 text-blue-600 hover:underline">
					Home
				</a>
				<a href="/about" class="text-blue-600 hover:underline">
					About
				</a>
			</nav>
			<Outlet />
		</div>
	),
});

// Create individual routes
const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/about",
	component: About,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router
const router = createRouter({ routeTree });

const App = () => (
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
);

const root = document.getElementById("root");

if (import.meta.env.DEV && !root) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

if (root) {
	render(() => App(), root);
}

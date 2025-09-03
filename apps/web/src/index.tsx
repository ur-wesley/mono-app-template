import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import App from "./App";
import "./app.css";
import "virtual:uno.css";

const rootEl = document.getElementById("root");

if (!(rootEl instanceof HTMLElement)) {
	throw new Error("Root element #root not found");
}

const queryClient = new QueryClient();

render(
	() => (
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	),
	rootEl,
);

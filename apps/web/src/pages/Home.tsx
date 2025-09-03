import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { useEchoMutation, useHelloQuery } from "@/libs/queries";

const Home: Component = () => {
	const [name, setName] = createSignal("Solid");
	const hello = useHelloQuery(name());
	const echo = useEchoMutation();

	return (
		<div class="p-8 space-y-4 text-center">
			<h1 class="text-4xl text-green-700">
				<span>Hello</span>
				<a
					class="ml-2 text-pink-600 hover:font-bold hover:border-1"
					href="https://antfu.me/posts/reimagine-atomic-css"
					target="atomic-css"
				>
					Atomic CSS
				</a>
				<span>!</span>
			</h1>

			<div class="space-x-2">
				<input
					value={name()}
					onInput={(e) => setName((e.target as HTMLInputElement).value)}
					class="border px-2 py-1 rounded"
				/>
				<button type="button" class="border px-3 py-1 rounded hover:bg-gray-100" onClick={() => hello.refetch()}>
					Refetch hello
				</button>
			</div>

			<p class="text-lg">API says: {hello.data?.message ?? (hello.isLoading ? "loading..." : "-")}</p>

			<div class="space-x-2">
				<button
					type="button"
					class="border px-3 py-1 rounded hover:bg-gray-100"
					onClick={() => echo.mutateAsync("Ping from web")}
				>
					Echo
				</button>
				<span class="opacity-70">{echo.isPending ? "sending..." : (echo.data?.received ?? "")}</span>
			</div>
		</div>
	);
};

export default Home;

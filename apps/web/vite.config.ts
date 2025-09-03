import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import UnocssPlugin from "@unocss/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default configuration values
const API_URL = process.env.VITE_API_URL || "http://localhost:5005";
const WEB_PORT = Number(process.env.VITE_WEB_PORT) || 5000;

export default defineConfig({
	plugins: [solidPlugin(), UnocssPlugin({})],
	server: {
		port: WEB_PORT,
		proxy: {
			"/api": {
				target: API_URL,
				changeOrigin: true,
			},
		},
	},
	build: {
		target: "esnext",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	define: {
		// Make API URL available to the client
		__API_URL__: JSON.stringify(API_URL),
	},
});

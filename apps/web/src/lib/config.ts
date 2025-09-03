import type { AppConfig } from "@mono/shared/types";

// Browser-compatible configuration
// In production, these would typically come from environment variables
// injected at build time via Vite's define or import.meta.env
export const config: { config: AppConfig } = {
	config: {
		api: {
			port: 5005,
			host: "localhost",
			logLevel: "info",
			cors: {
				enabled: true,
				origins: ["http://localhost:5000"],
			},
		},
		web: {
			port: 5000,
			apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5005",
		},
	},
};

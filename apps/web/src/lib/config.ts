import type { AppConfig } from "@mono/shared/types";
import { loadConfig } from "c12";

export const config = await loadConfig<AppConfig>({
	name: "config",
	configFile: "config.ts",
	cwd: "../../..",
	defaults: {
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
			apiUrl: "http://localhost:5005",
		},
	},
});

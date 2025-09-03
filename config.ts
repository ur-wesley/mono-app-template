import type { AppConfig } from "@mono/shared/types";

/**
 * Application Configuration
 *
 * This file contains the configuration for both the API and web applications.
 * When using this template, rename @mono to your project name throughout the codebase.
 */
export const config: AppConfig = {
	api: {
		port: Number(process.env.API_PORT) || 5005,
		host: process.env.API_HOST || "localhost",
		logLevel: process.env.LOG_LEVEL || "info",
		cors: {
			enabled: true,
			origins: [process.env.WEB_URL || "http://localhost:5000"],
		},
		database: {
			url: process.env.DATABASE_URL || null,
		},
	},
	web: {
		port: Number(process.env.WEB_PORT) || 5000,
		apiUrl: process.env.API_URL || "http://localhost:5005",
	},
};

export default config;

export interface AppConfig {
	api: {
		port: number;
		host: string;
		logLevel: string;
		cors: {
			enabled: boolean;
			origins: string[];
		};
		database?: {
			url: string | null;
		};
	};
	web: {
		port: number;
		apiUrl: string;
	};
}

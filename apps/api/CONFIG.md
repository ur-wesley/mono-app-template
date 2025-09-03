# API Configuration

The API uses [c12](https://unjs.io/packages/c12) for configuration management with a shared root config.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_PORT` | `4000` | API server port |
| `API_HOST` | `localhost` | API server host |
| `LOG_LEVEL` | `info` | Log level (debug, info, warn, error) |
| `CORS_ENABLED` | `true` | Enable CORS middleware |
| `CORS_ORIGINS` | `http://localhost:3000,http://localhost:3001` | Allowed CORS origins (comma-separated) |
| `DATABASE_URL` | - | Database connection string (optional) |
| `WEB_PORT` | `3000` | Web app port |
| `API_URL` | `http://localhost:4000` | API URL for web app |

## Configuration File

The configuration is managed at the root level in `mono.config.ts`:

```typescript
export default {
  api: {
    port: 4000,
    host: "localhost",
    logLevel: "info",
    cors: {
      enabled: true,
      origins: ["http://localhost:3000"],
    },
    database: {
      url: "postgresql://user:pass@localhost:5432/db",
    },
  },
  web: {
    port: 3000,
    apiUrl: "http://localhost:4000",
  },
};
```

## Development

```bash
# Set environment variables
export API_PORT=3001
export LOG_LEVEL=debug

# Run API
bun run api
```

# Mono App Template

A modern monorepo template with Turborepo, featuring a Solid.js web app and Bun/Elysia API server.

## Quick Start

You can quickly scaffold a new project using [giget](https://github.com/unjs/giget):

```bash
bunx giget@latest gh:ur-wesley/mono-app-template <project-directory>
cd <project-directory>
bun install
bun setup.ts <project-name>  # Optional: rename from "mono" namespace
bun run dev
```

Or use degit:

```bash
bunx degit ur-wesley/mono-app-template <project-directory>
cd <project-directory>
bun install
bun setup.ts <project-name>  # Optional: rename from "mono" namespace
bun run dev
```

## Stack

### Web App (`apps/web`)

| Technology          | Description                                                                            |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Solid.js**        | A declarative, efficient, and flexible JavaScript library for building user interfaces |
| **Vite**            | Next generation frontend tooling                                                       |
| **UnoCSS**          | Instant on-demand atomic CSS engine                                                    |
| **TanStack Router** | Type-safe router for web applications                                                  |
| **TanStack Query**  | Powerful data synchronization for web applications                                     |
| **shadcn-solid**    | A collection of reusable components built with Solid.js and Tailwind CSS               |

### API Server (`apps/api`)

| Technology     | Description                                |
| -------------- | ------------------------------------------ |
| **Bun**        | Fast all-in-one JavaScript runtime         |
| **Elysia**     | Ergonomic framework for humans             |
| **OpenAPI**    | API documentation with Scalar interface    |
| **CORS**       | Cross-Origin Resource Sharing support      |
| **neverthrow** | Type-safe error handling with Result types |

### Shared (`packages/shared`)

| Technology     | Description                          |
| -------------- | ------------------------------------ |
| **TypeScript** | Shared types and utilities           |
| **Config**     | Centralized configuration management |

### Code Quality

| Technology | Description                                            |
| ---------- | ------------------------------------------------------ |
| **Biome**  | Fast formatter, linter, and import organizer for TS/JS |

## Project Structure

```
├── apps/
│   ├── api/           # Bun + Elysia API server
│   └── web/           # Solid.js web application
├── packages/
│   └── shared/        # Shared types and utilities
├── config.ts          # Global configuration
├── setup.ts           # Template setup script
└── turbo.json         # Turborepo configuration
```

## Available Scripts

### Root Level

| Script       | Description                                   |
| ------------ | --------------------------------------------- |
| `dev`        | Start all apps in development mode            |
| `build`      | Build all apps for production                 |
| `lint`       | Run linting across all packages               |
| `format`     | Format code across all packages               |
| `check`      | Run Biome checks (lint + format)              |
| `check:fix`  | Run Biome checks and fix issues automatically |
| `ci`         | Run Biome in CI mode (fails on any issues)    |
| `test`       | Run tests across all packages                 |
| `test:watch` | Run tests in watch mode                       |
| `web`        | Start only the web app                        |
| `api`        | Start only the API server                     |

### Web App (`apps/web`)

| Script   | Description                          |
| -------- | ------------------------------------ |
| `dev`    | Start development server (port 5000) |
| `build`  | Build for production                 |
| `serve`  | Preview production build             |
| `lint`   | Run Biome linting and fix issues     |
| `format` | Run Biome formatting                 |
| `test`   | Run web app tests                    |
| `add`    | Add shadcn-solid components          |

### API Server (`apps/api`)

| Script   | Description                          |
| -------- | ------------------------------------ |
| `dev`    | Start development server (port 5005) |
| `start`  | Start production server              |
| `lint`   | Run Biome linting and fix issues     |
| `format` | Run Biome formatting                 |
| `test`   | Run API tests                        |
| `test`   | Run API tests                        |

## Development

1. **Install dependencies**: `bun install`
2. **Start development**: `bun run dev`
3. **Run tests**: `bun run test`
4. **Check code quality**: `bun run check`

### Code Quality

The project uses [Biome](https://biomejs.dev/) for fast linting, formatting, and import organization:

- **Format code**: `bun run format:fix`
- **Lint code**: `bun run lint:fix`
- **Check everything**: `bun run check:fix`
- **CI checks**: `bun run ci` (fails on any issues)

### Pre-commit Hooks

To automatically run Biome checks before commits:

```bash
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### URLs

- **Web App**: http://localhost:5000
- **API Server**: http://localhost:5005
- **API Documentation**: http://localhost:5005/docs

## Configuration

The project uses a centralized configuration system with TypeScript. Configuration is defined in `config.ts` and shared across all applications.

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
API_PORT=5005
API_HOST=localhost
API_LOG_LEVEL=info

# CORS Configuration
CORS_ORIGINS=http://localhost:5000

# Web Configuration
WEB_PORT=5000
WEB_API_URL=http://localhost:5005
```

## Features

- ✅ **Monorepo with Turborepo** - Efficient build system and caching
- ✅ **Type-safe APIs** - End-to-end type safety with shared types
- ✅ **Modern UI** - Solid.js with UnoCSS and shadcn components
- ✅ **API Documentation** - Automatic OpenAPI docs with Scalar
- ✅ **Testing Setup** - Comprehensive test suites for both apps
- ✅ **Code Quality** - Biome for fast linting, formatting, and import organization
- ✅ **Template System** - Easy project scaffolding

## Template Usage

This template includes a setup script that will rename all instances of "mono" to your project name:

```bash
bun setup.ts my-awesome-app
```

This will update:

- Package names and dependencies
- Import statements and module references
- Configuration files
- TypeScript path mappings

## License

MIT
| `bump` | Bumps the version number using bumpp. |

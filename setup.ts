#!/usr/bin/env bun

/**
 * Template Setup Script
 *
 * This script helps rename the template from "mono" to your project name.
 * Run: bun setup.ts your-project-name
 */

import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { consola } from "consola";

const args = process.argv.slice(2);
const newName = args[0];

if (!newName) {
	consola.error("Please provide a project name:");
	consola.info("Usage: bun setup.ts your-project-name");
	process.exit(1);
}

// Validate project name (basic npm package name validation)
if (!/^[a-z][a-z0-9-]*$/.test(newName)) {
	consola.error("Invalid project name. Use lowercase letters, numbers, and hyphens only.");
	process.exit(1);
}

consola.start(`Setting up template with name: ${newName}`);

const replacements = [
	// Package names
	{ from: '"mono-template"', to: `"${newName}"` },
	{ from: '"@mono/', to: `"@${newName}/` },
	{ from: '"mono-web"', to: `"${newName}-web"` },

	// Import statements
	{ from: "'@mono/", to: `'@${newName}/` },
	{ from: '"@mono/', to: `"@${newName}/` },

	// TypeScript paths
	{ from: '"@mono/', to: `"@${newName}/` },

	// README and comments
	{ from: "mono-template", to: newName },
	{ from: "@mono", to: `@${newName}` },
];

async function processFile(filePath: string) {
	try {
		let content = await readFile(filePath, "utf-8");
		let modified = false;

		for (const { from, to } of replacements) {
			if (content.includes(from)) {
				content = content.replaceAll(from, to);
				modified = true;
			}
		}

		if (modified) {
			await writeFile(filePath, content, "utf-8");
			consola.success(`Updated: ${filePath}`);
		}
	} catch (error) {
		consola.error(`Error processing ${filePath}:`, error);
	}
}

async function processDirectory(dirPath: string) {
	try {
		const entries = await readdir(dirPath);

		for (const entry of entries) {
			const fullPath = join(dirPath, entry);
			const stats = await stat(fullPath);

			if (stats.isDirectory()) {
				// Skip node_modules, .git, dist, and other build directories
				if (!["node_modules", ".git", "dist", ".turbo", ".next"].includes(entry)) {
					await processDirectory(fullPath);
				}
			} else if (stats.isFile()) {
				// Process text files
				if (/\.(ts|tsx|js|jsx|json|md|yaml|yml)$/.test(entry)) {
					await processFile(fullPath);
				}
			}
		}
	} catch (error) {
		consola.error(`Error processing directory ${dirPath}:`, error);
	}
}

// Main execution
async function main() {
	consola.info("Processing files...");
	await processDirectory(".");

	consola.success("Template setup complete!");
	consola.box({
		title: "Next steps:",
		message: ["1. bun install", "2. bun run dev", `3. Start building your ${newName} application!`].join("\n"),
	});

	// Ask if user wants to delete the setup script
	const shouldDelete = await consola.prompt("Delete setup.ts file?", {
		type: "confirm",
		initial: true,
	});

	if (shouldDelete) {
		try {
			await unlink("setup.ts");
			consola.success("setup.ts has been deleted!");
		} catch (error) {
			consola.error("Failed to delete setup.ts:", error);
		}
	} else {
		consola.info("💡 You can manually delete setup.ts when you're ready");
	}
}

main().catch(console.error);

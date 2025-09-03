// test/services/greetings.test.ts
import { describe, expect, it } from "bun:test";
import { echo, hello } from "../../src/services/greetings";

describe("Greetings Service", () => {
	describe("hello function", () => {
		it("returns default greeting without name", () => {
			const result = hello();

			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.message).toBe("Hello world");
			}
		});

		it("returns personalized greeting with name", () => {
			const result = hello("John");

			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.message).toBe("Hello John");
			}
		});

		it("handles empty string name", () => {
			const result = hello("");

			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.message).toBe("Hello ");
			}
		});
	});

	describe("echo function", () => {
		it("returns echo response with message", () => {
			const testMessage = "test message";
			const result = echo(testMessage);

			expect(result.isOk()).toBe(true);
			if (result.isOk()) {
				expect(result.value.echo).toBe(testMessage);
			}
		});

		it("returns error for empty message", () => {
			const result = echo("");

			expect(result.isErr()).toBe(true);
			if (result.isErr()) {
				expect(result.error.message).toBe("text must not be empty");
			}
		});
	});
});

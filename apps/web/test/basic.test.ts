// test/basic.test.ts
import { describe, expect, it } from "bun:test";

describe("Basic Web Tests", () => {
	it("should be able to run tests", () => {
		expect(1 + 1).toBe(2);
	});

	it("should have math functions available", () => {
		expect(Math.max(1, 2, 3)).toBe(3);
		expect(Math.min(1, 2, 3)).toBe(1);
	});

	it("can work with arrays", () => {
		const arr = [1, 2, 3];
		expect(arr.length).toBe(3);
		expect(arr.includes(2)).toBe(true);
	});

	it("can work with objects", () => {
		const obj = { name: "test", value: 42 };
		expect(obj.name).toBe("test");
		expect(obj.value).toBe(42);
	});
});

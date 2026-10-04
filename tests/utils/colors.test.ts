import { describe, test, expect } from "bun:test";
import { cyan, yellow, green, red } from "../../src/utils/colors";

describe("colors", () => {
  test("applies correct ANSI codes", () => {
    expect(cyan("test")).toBe("\x1B[36mtest\x1B[0m");
    expect(yellow("test")).toBe("\x1B[33mtest\x1B[0m");
    expect(green("test")).toBe("\x1B[32mtest\x1B[0m");
    expect(red("test")).toBe("\x1B[31mtest\x1B[0m");
  });
});

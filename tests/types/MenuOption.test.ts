import { describe, test, expect } from "bun:test";
import { isMenuOption } from "../../src/types/MenuOption";

describe("MenuOption type guard", () => {
  test("accepts valid menu options", () => {
    expect(isMenuOption("1")).toBe(true);
    expect(isMenuOption("2")).toBe(true);
    expect(isMenuOption("3")).toBe(true);
    expect(isMenuOption("4")).toBe(true);
    expect(isMenuOption("5")).toBe(true);
    expect(isMenuOption("6")).toBe(true);
    expect(isMenuOption("8")).toBe(true);
    expect(isMenuOption("9")).toBe(true);
  });

  test("rejects invalid values", () => {
    expect(isMenuOption("0")).toBe(false);
    expect(isMenuOption("7")).toBe(false);
    expect(isMenuOption("10")).toBe(false);
    expect(isMenuOption("-1")).toBe(false);
    expect(isMenuOption("a")).toBe(false);
    expect(isMenuOption("")).toBe(false);
    expect(isMenuOption(" 1")).toBe(false);
  });
});

import { describe, test, expect } from "bun:test";
import type { Config, Settings } from "../../src/types/Config";
import type { Units } from "../../src/types/Weather";

describe("Config types", () => {
  test("creates config correctly", () => {
    const config: Config = { cities: [], units: "celsius", defaultCity: null };
    expect(config.cities).toEqual([]);
    expect(config.units).toBe("celsius");
  });

  test("creates settings correctly", () => {
    const settings: Settings = { units: "fahrenheit", defaultCity: "Madrid" };
    expect(settings.units).toBe("fahrenheit");
    expect(settings.defaultCity).toBe("Madrid");
  });
});

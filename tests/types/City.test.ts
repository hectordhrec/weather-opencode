import { describe, test, expect } from "bun:test";
import type { City } from "../../src/types/City";

describe("City type", () => {
  test("can create city object", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3 };
    expect(city.name).toBe("Madrid");
    expect(city.latitude).toBe(40);
    expect(city.longitude).toBe(-3);
  });

  test("can create city with optional fields", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3, country: "ES", admin1: "Madrid" };
    expect(city.country).toBe("ES");
    expect(city.admin1).toBe("Madrid");
  });
});

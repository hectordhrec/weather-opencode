import { describe, test, expect } from "bun:test";
import { formatTemp, formatLocation, formatDate, formatUnitLabel, defaultMarker } from "../../src/utils/format";
import type { City } from "../../src/types/City";

describe("formatTemp", () => {
  test("formats in celsius", () => {
    expect(formatTemp(20, "celsius")).toBe("20.0°C");
    expect(formatTemp(20.5, "celsius")).toBe("20.5°C");
    expect(formatTemp(0, "celsius")).toBe("0.0°C");
    expect(formatTemp(-5, "celsius")).toBe("-5.0°C");
  });

  test("formats in fahrenheit", () => {
    expect(formatTemp(0, "fahrenheit")).toBe("32.0°F");
    expect(formatTemp(100, "fahrenheit")).toBe("212.0°F");
    expect(formatTemp(20, "fahrenheit")).toBe("68.0°F");
  });

  test("rounds to 1 decimal place", () => {
    expect(formatTemp(20.123, "celsius")).toBe("20.1°C");
    expect(formatTemp(20.156, "celsius")).toBe("20.2°C");
  });
});

describe("formatLocation", () => {
  test("formats with country and admin1", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3, country: "España", admin1: "Madrid" };
    expect(formatLocation(city)).toBe("Madrid, Madrid, España");
  });

  test("formats without admin1", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3, country: "España" };
    expect(formatLocation(city)).toBe("Madrid, España");
  });

  test("formats without country", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3 };
    expect(formatLocation(city)).toBe("Madrid");
  });

  test("handles admin1 only", () => {
    const city: City = { name: "Madrid", latitude: 40, longitude: -3, admin1: "Madrid" };
    expect(formatLocation(city)).toBe("Madrid, Madrid");
  });
});

describe("formatDate", () => {
  test("formats date with valid components", () => {
    const result = formatDate("2026-01-15");
    expect(result).toContain("15");
    expect(result).toMatch(/ene|jan/i);
  });

  test("returns original if invalid", () => {
    expect(formatDate("2026/01/15")).toBe("2026/01/15");
    expect(formatDate("invalid")).toBe("invalid");
  });
});

describe("formatUnitLabel", () => {
  test("returns correct label", () => {
    expect(formatUnitLabel("celsius")).toBe("°C");
    expect(formatUnitLabel("fahrenheit")).toBe("°F");
  });
});

describe("defaultMarker", () => {
  test("returns marker only for default city", () => {
    const madrid: City = { name: "Madrid", latitude: 40, longitude: -3 };
    expect(defaultMarker(madrid, "Madrid")).toBe(" ★");
    expect(defaultMarker(madrid, "Barcelona")).toBe("");
    expect(defaultMarker(madrid, "madrid")).toBe("");
    expect(defaultMarker(madrid, null)).toBe("");
  });
});

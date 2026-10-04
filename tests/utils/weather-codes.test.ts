import { describe, test, expect } from "bun:test";
import { describeWeatherCode } from "../../src/utils/weather-codes";

describe("describeWeatherCode", () => {
  test("returns known weather codes", () => {
    expect(describeWeatherCode(0)).toEqual({ emoji: "☀️", label: "Despejado" });
    expect(describeWeatherCode(1)).toEqual({ emoji: "🌤️", label: "Mayormente despejado" });
    expect(describeWeatherCode(2)).toEqual({ emoji: "⛅", label: "Parcialmente nublado" });
    expect(describeWeatherCode(3)).toEqual({ emoji: "☁️", label: "Nublado" });
    expect(describeWeatherCode(45)).toEqual({ emoji: "🌫️", label: "Niebla" });
    expect(describeWeatherCode(48)).toEqual({ emoji: "🌫️", label: "Niebla" });
    expect(describeWeatherCode(51)).toEqual({ emoji: "🌦️", label: "Llovizna" });
    expect(describeWeatherCode(95)).toEqual({ emoji: "⛈️", label: "Tormenta" });
    expect(describeWeatherCode(99)).toEqual({ emoji: "⛈️", label: "Tormenta con granizo" });
  });

  test("returns default for unknown codes", () => {
    expect(describeWeatherCode(100)).toEqual({ emoji: "❓", label: "Desconocido" });
    expect(describeWeatherCode(-1)).toEqual({ emoji: "❓", label: "Desconocido" });
  });
});

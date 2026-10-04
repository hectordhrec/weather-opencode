import { describe, test, expect } from "bun:test";
import type { DailyForecast, WeatherDescription, Units } from "../../src/types/Weather";

describe("Weather types", () => {
  test("creates daily forecast", () => {
    const forecast: DailyForecast = {
      date: "2026-10-04",
      weatherCode: 0,
      tempMax: 25,
      tempMin: 15,
      precipitationProbability: 10,
    };
    expect(forecast.date).toBe("2026-10-04");
    expect(forecast.tempMax).toBe(25);
  });

  test("creates weather description", () => {
    const desc: WeatherDescription = { emoji: "☀️", label: "Despejado" };
    expect(desc.emoji).toBe("☀️");
    expect(desc.label).toBe("Despejado");
  });

  test("units type is correct", () => {
    const units: Units = "celsius";
    expect(units).toBe("celsius");
    const units2: Units = "fahrenheit";
    expect(units2).toBe("fahrenheit");
  });
});

import { describe, test, expect } from "bun:test";
import {
  CONFIG_FILE_NAME,
  DEFAULT_CONFIG,
  GEOCODING_API_URL,
  FORECAST_API_URL,
  GEOCODING_COUNT,
  FORECAST_DAYS,
  LINE,
} from "../../src/utils/constants";

describe("constants", () => {
  test("has expected values", () => {
    expect(CONFIG_FILE_NAME).toBe("config.json");
    expect(DEFAULT_CONFIG.units).toBe("celsius");
    expect(DEFAULT_CONFIG.defaultCity).toBeNull();
    expect(DEFAULT_CONFIG.cities).toEqual([]);
    expect(GEOCODING_API_URL).toBe("https://geocoding-api.open-meteo.com/v1/search");
    expect(FORECAST_API_URL).toBe("https://api.open-meteo.com/v1/forecast");
    expect(GEOCODING_COUNT).toBe(5);
    expect(FORECAST_DAYS).toBe(7);
    expect(LINE).toBeDefined();
  });
});

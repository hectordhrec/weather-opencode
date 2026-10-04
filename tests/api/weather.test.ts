import { describe, test, expect, beforeEach, mock } from "bun:test";

describe("getWeather", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("returns null on non-ok response", async () => {
    global.fetch = mock(() => Promise.resolve({ ok: false } as Response)) as any;
    const { getWeather } = await import("../../src/api/weather");
    const result = await getWeather(40, -3);
    expect(result).toBeNull();
  });

  test("returns null on error", async () => {
    global.fetch = mock(() => Promise.reject(new Error("error"))) as any;
    const { getWeather } = await import("../../src/api/weather");
    const result = await getWeather(40, -3);
    expect(result).toBeNull();
  });

  test("returns temperature", async () => {
    global.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ current: { temperature_2m: 23.5 } }),
      } as Response)
    ) as any;
    const { getWeather } = await import("../../src/api/weather");
    const result = await getWeather(40, -3);
    expect(result).toBe(23.5);
  });

  test("returns null if missing data", async () => {
    global.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    ) as any;
    const { getWeather } = await import("../../src/api/weather");
    const result = await getWeather(40, -3);
    expect(result).toBeNull();
  });
});

describe("getDailyForecast", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("returns empty array on non-ok", async () => {
    global.fetch = mock(() => Promise.resolve({ ok: false } as Response)) as any;
    const { getDailyForecast } = await import("../../src/api/weather");
    const result = await getDailyForecast(40, -3);
    expect(result).toEqual([]);
  });

  test("returns mapped daily forecasts", async () => {
    global.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            daily: {
              time: ["2026-10-04", "2026-10-05"],
              weather_code: [0, 1],
              temperature_2m_max: [25, 24],
              temperature_2m_min: [15, 14],
              precipitation_probability_max: [10, 20],
            },
          }),
      } as Response)
    ) as any;
    const { getDailyForecast } = await import("../../src/api/weather");
    const result = await getDailyForecast(40, -3);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      date: "2026-10-04",
      weatherCode: 0,
      tempMax: 25,
      tempMin: 15,
      precipitationProbability: 10,
    });
  });

  test("returns empty if no times", async () => {
    global.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ daily: {} }),
      } as Response)
    ) as any;
    const { getDailyForecast } = await import("../../src/api/weather");
    const result = await getDailyForecast(40, -3);
    expect(result).toEqual([]);
  });

  test("handles partial data", async () => {
    global.fetch = mock(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            daily: {
              time: ["2026-10-04"],
              weather_code: undefined,
              temperature_2m_max: undefined,
              temperature_2m_min: undefined,
              precipitation_probability_max: undefined,
            },
          }),
      } as Response)
    ) as any;
    const { getDailyForecast } = await import("../../src/api/weather");
    const result = await getDailyForecast(40, -3);
    expect(result[0]).toEqual({
      date: "2026-10-04",
      weatherCode: 0,
      tempMax: 0,
      tempMin: 0,
      precipitationProbability: 0,
    });
  });
});

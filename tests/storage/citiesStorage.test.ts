import { describe, test, expect, beforeEach, mock } from "bun:test";

describe("citiesStorage", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("loadCities returns default config cities if no data", async () => {
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve(null)),
      saveJson: mock(() => Promise.resolve()),
    }));
    const { loadCities } = await import("../../src/storage/citiesStorage");
    const result = await loadCities();
    expect(result).toEqual([]);
  });

  test("loadCities returns cities from storage", async () => {
    const cities = [{ name: "Madrid", latitude: 40, longitude: -3 }];
    const config = { cities, units: "celsius", defaultCity: null };
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve(config)),
      saveJson: mock(() => Promise.resolve()),
    }));
    const { loadCities } = await import("../../src/storage/citiesStorage");
    const result = await loadCities();
    expect(result).toEqual(cities);
  });

  test("saveCities calls saveJson", async () => {
    const saveSpy = mock(() => Promise.resolve());
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve(null)),
      saveJson: saveSpy,
    }));
    const { saveCities } = await import("../../src/storage/citiesStorage");
    const cities = [{ name: "Barcelona", latitude: 41, longitude: 2 }];
    await saveCities(cities);
    expect(saveSpy).toHaveBeenCalled();
  });
});

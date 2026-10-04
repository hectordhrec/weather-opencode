import { describe, test, expect, beforeEach, mock } from "bun:test";

describe("settingsStorage", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("loadSettings returns defaults if no data", async () => {
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve(null)),
      saveJson: mock(() => Promise.resolve()),
    }));
    const { loadSettings } = await import("../../src/storage/settingsStorage");
    const result = await loadSettings();
    expect(result.units).toBe("celsius");
    expect(result.defaultCity).toBeNull();
  });

  test("loadSettings merges with defaults", async () => {
    const partial = { units: "fahrenheit" };
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve(partial)),
      saveJson: mock(() => Promise.resolve()),
    }));
    const { loadSettings } = await import("../../src/storage/settingsStorage");
    const result = await loadSettings();
    expect(result.units).toBe("fahrenheit");
    expect(result.defaultCity).toBeNull();
  });

  test("saveSettings saves merged config", async () => {
    const saveSpy = mock(() => Promise.resolve());
    mock.module("../../src/storage/jsonStore", () => ({
      getConfigPath: mock(() => "/tmp/config.json"),
      loadJson: mock(() => Promise.resolve({ cities: [] })),
      saveJson: saveSpy,
    }));
    const { saveSettings } = await import("../../src/storage/settingsStorage");
    await saveSettings({ units: "fahrenheit", defaultCity: "Madrid" });
    expect(saveSpy).toHaveBeenCalled();
  });
});

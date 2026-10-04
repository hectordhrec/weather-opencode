import type { Config, Settings } from "../types/Config";
import { DEFAULT_CONFIG } from "../utils/constants";
import { getConfigPath, loadJson, saveJson } from "./jsonStore";

export async function loadSettings(): Promise<Settings> {
  const data = await loadJson<Config>(getConfigPath());
  return {
    defaultCity: data?.defaultCity ?? DEFAULT_CONFIG.defaultCity,
    units: data?.units ?? DEFAULT_CONFIG.units,
  };
}

export async function saveSettings(settings: Settings): Promise<void> {
  const data = await loadJson<Config>(getConfigPath());
  const config: Config = { ...DEFAULT_CONFIG, ...data, ...settings };
  await saveJson(getConfigPath(), config);
}

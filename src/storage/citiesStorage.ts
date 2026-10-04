import type { City } from "../types/City";
import type { Config } from "../types/Config";
import { DEFAULT_CONFIG } from "../utils/constants";
import { getConfigPath, loadJson, saveJson } from "./jsonStore";

export async function loadCities(): Promise<City[]> {
  const data = await loadJson<Config>(getConfigPath());
  return data?.cities ?? DEFAULT_CONFIG.cities;
}

export async function saveCities(cities: City[]): Promise<void> {
  const data = await loadJson<Config>(getConfigPath());
  const config: Config = { ...DEFAULT_CONFIG, ...data, cities };
  await saveJson(getConfigPath(), config);
}

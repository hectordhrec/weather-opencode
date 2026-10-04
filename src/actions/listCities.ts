import type { City } from "../types/City";
import { promptIndex } from "../presentation/input";
import { showCityOptions, showError, showErrorBlock } from "../presentation/output";

export interface CitySelectionLabels {
  title: string;
  badge: string;
}

export const DEFAULT_SELECTION: CitySelectionLabels = {
  title: "Ciudades registradas:",
  badge: "(default)",
};

export function listCities(cities: City[], defaultCity: string | null): void {
  showCityOptions(cities, defaultCity, DEFAULT_SELECTION.title, DEFAULT_SELECTION.badge);
}

export async function selectCity(
  cities: City[],
  defaultCity: string | null,
  question: string,
  labels: CitySelectionLabels = DEFAULT_SELECTION
): Promise<City | null> {
  if (cities.length === 0) {
    showErrorBlock("No hay ciudades registradas.");
    return null;
  }
  showCityOptions(cities, defaultCity, labels.title, labels.badge);
  const index = await promptIndex(question, cities.length);
  if (index === null) return null;
  const city = cities[index];
  if (!city) {
    showError("Opción no válida.");
    return null;
  }
  return city;
}

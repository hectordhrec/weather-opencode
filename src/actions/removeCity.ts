import type { Config } from "../types/Config";
import { showSuccess } from "../presentation/output";
import { saveCities } from "../storage/citiesStorage";
import { saveSettings } from "../storage/settingsStorage";
import { formatLocation } from "../utils/format";
import { selectCity } from "./listCities";

export async function removeCity(config: Config): Promise<void> {
  const city = await selectCity(
    config.cities,
    config.defaultCity,
    "\n  Número de la ciudad a eliminar: "
  );
  if (city === null) return;

  const index = config.cities.indexOf(city);
  config.cities.splice(index, 1);

  const wasDefault = config.defaultCity === city.name;
  if (wasDefault) {
    config.defaultCity = config.cities.length > 0 ? config.cities[0]!.name : null;
  }

  await saveCities(config.cities);
  if (wasDefault) {
    await saveSettings({ defaultCity: config.defaultCity, units: config.units });
  }

  const location = formatLocation(city);
  if (!wasDefault) {
    showSuccess(`"${location}" eliminada.`);
  } else if (config.defaultCity) {
    showSuccess(`"${location}" eliminada. Default ahora: ${config.defaultCity}`);
  } else {
    showSuccess(`"${location}" eliminada. No hay default.`);
  }
}

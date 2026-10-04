import type { Config } from "../types/Config";
import { showSuccess } from "../presentation/output";
import { saveSettings } from "../storage/settingsStorage";
import { selectCity } from "./listCities";

export async function setDefaultCity(config: Config): Promise<void> {
  const city = await selectCity(
    config.cities,
    config.defaultCity,
    "\n  Número de la nueva ciudad default: ",
    { title: "Ciudades disponibles:", badge: "(actual default)" }
  );
  if (city === null) return;

  config.defaultCity = city.name;
  await saveSettings({ defaultCity: config.defaultCity, units: config.units });
  showSuccess(`Default cambiado a "${config.defaultCity}".`);
}

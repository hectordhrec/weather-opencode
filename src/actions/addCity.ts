import type { City } from "../types/City";
import type { Config } from "../types/Config";
import { geocode } from "../api/geocoding";
import { promptCityName, promptCityOption } from "../presentation/input";
import { showError, showSuccess } from "../presentation/output";
import { run as spin } from "../presentation/spinner";
import { saveCities } from "../storage/citiesStorage";
import { saveSettings } from "../storage/settingsStorage";
import { formatLocation } from "../utils/format";

export async function addCity(config: Config): Promise<void> {
  const name = await promptCityName("\n  Nombre de la ciudad: ");
  if (name === null) return;

  const results = await spin(`Buscando "${name}"...`, () => geocode(name));
  if (results.length === 0) {
    showError("Ciudad no encontrada.");
    return;
  }

  const selected = await resolveCity(results);
  if (selected === null) return;

  const exists = config.cities.some(
    (c) => c.name.toLowerCase() === selected.name.toLowerCase()
  );
  if (exists) {
    showError(`"${selected.name}" ya está registrada.`);
    return;
  }

  config.cities.push({
    name: selected.name,
    latitude: selected.latitude,
    longitude: selected.longitude,
    country: selected.country,
    admin1: selected.admin1,
  });

  const isFirst = config.cities.length === 1;
  if (isFirst) {
    config.defaultCity = selected.name;
  }
  await saveCities(config.cities);
  if (isFirst) {
    await saveSettings({ defaultCity: config.defaultCity, units: config.units });
    showSuccess(`"${formatLocation(selected)}" agregada como ciudad por defecto.`);
  } else {
    showSuccess(`"${formatLocation(selected)}" agregada.`);
  }
}

async function resolveCity(results: City[]): Promise<City | null> {
  const only = results[0];
  if (results.length === 1 && only) return only;
  return promptCityOption(results);
}

import type { Config } from "../types/Config";
import { getWeather } from "../api/weather";
import { showWeather } from "../presentation/menu";
import { showBlankLine, showDetailError, showErrorBlock } from "../presentation/output";
import { run as spin, start as spinStart, stop as spinStop } from "../presentation/spinner";
import { defaultMarker, formatLocation, formatTemp } from "../utils/format";

export async function getDefaultCityWeather(config: Config): Promise<void> {
  if (!config.defaultCity) {
    showErrorBlock("No hay ciudad por defecto configurada.");
    return;
  }
  const city = config.cities.find((c) => c.name === config.defaultCity);
  if (!city) {
    showErrorBlock(`La ciudad "${config.defaultCity}" no está registrada.`);
    return;
  }
  const temp = await spin(
    `Obteniendo clima de ${city.name}...`,
    () => getWeather(city.latitude, city.longitude)
  );
  if (temp === null) {
    showErrorBlock("No se pudo obtener el clima.");
    return;
  }
  showWeather(city.name, formatTemp(temp, config.units));
}

export async function getAllCitiesWeather(config: Config): Promise<void> {
  if (config.cities.length === 0) {
    showErrorBlock("No hay ciudades registradas.");
    return;
  }
  showBlankLine();
  for (const city of config.cities) {
    spinStart(`Obteniendo clima de ${city.name}...`);
    const temp = await getWeather(city.latitude, city.longitude);
    spinStop();
    if (temp !== null) {
      const marker = defaultMarker(city, config.defaultCity);
      showWeather(`${formatLocation(city)}${marker}`, formatTemp(temp, config.units));
    } else {
      showDetailError(`${city.name}: Error al obtener clima`);
    }
  }
  showBlankLine();
}

import type { Config } from "../types/Config";
import { getDailyForecast } from "../api/weather";
import { showDailyForecast, showDailyForecastError } from "../presentation/menu";
import { showBlankLine, showErrorBlock } from "../presentation/output";
import { start as spinStart, stop as spinStop } from "../presentation/spinner";
import { defaultMarker, formatLocation } from "../utils/format";

export async function getAllCitiesDailyForecast(config: Config): Promise<void> {
  if (config.cities.length === 0) {
    showErrorBlock("No hay ciudades registradas.");
    return;
  }
  spinStart(`Obteniendo pronósticos de ${config.cities.length} ciudades...`);
  const forecasts = await Promise.all(
    config.cities.map((city) => getDailyForecast(city.latitude, city.longitude))
  );
  spinStop();
  for (const [i, city] of config.cities.entries()) {
    const days = forecasts[i] ?? [];
    const marker = defaultMarker(city, config.defaultCity);
    if (days.length === 0) {
      showDailyForecastError(`${city.name}${marker}`);
      continue;
    }
    showDailyForecast(`${formatLocation(city)}${marker}`, days, config.units);
  }
  showBlankLine();
}

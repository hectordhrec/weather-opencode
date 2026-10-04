import type { DailyForecast, Units } from "../types/Weather";
import { cyan, yellow } from "../utils/colors";
import { LINE } from "../utils/constants";
import { formatDate, formatTemp, formatUnitLabel } from "../utils/format";
import { describeWeatherCode } from "../utils/weather-codes";
import { showDetailError } from "./output";

export function showMenu(cityCount: number, units: Units): void {
  const unitLabel = formatUnitLabel(units);
  console.log(cyan(`
${LINE}
         WEATHER CLI
${LINE}
  1. Clima de ciudad default
  2. Clima de todas las ciudades (${cityCount})
  3. Buscar y agregar ciudad
  4. Eliminar ciudad
  5. Establecer ciudad default
  6. Pronóstico 7 días (${cityCount})
  8. Ajustes (${unitLabel})
  9. Salir
${LINE}`));
}

export function showWeather(city: string, temp: string): void {
  console.log(`  Clima en ${city}: ${yellow(temp)}`);
}

export function showDailyForecast(
  location: string,
  days: DailyForecast[],
  units: Units
): void {
  console.log("");
  console.log(cyan(`  Pronóstico 7 días — ${location}`));
  console.log(`  ${"Fecha".padEnd(13)}${"Máx".padStart(8)}${"Mín".padStart(8)}${"Lluvia".padStart(9)}   Clima`);
  for (const day of days) {
    const max = formatTemp(day.tempMax, units, 0);
    const min = formatTemp(day.tempMin, units, 0);
    const rain = `${day.precipitationProbability}%`;
    const { emoji, label } = describeWeatherCode(day.weatherCode);
    console.log(
      `  ${formatDate(day.date).padEnd(13)}${yellow(max.padStart(8))}${yellow(min.padStart(8))}${rain.padStart(9)}   ${emoji} ${label}`
    );
  }
}

export function showDailyForecastError(city: string): void {
  showDetailError(`${city}: Error al obtener pronóstico`);
}

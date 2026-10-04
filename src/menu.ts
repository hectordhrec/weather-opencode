import { cyan, red, yellow } from "./colors";
import { describeWeatherCode } from "./weather-codes";
import type { DailyForecast } from "./types";

const LINE = "═".repeat(40);

export function showMenu(cityCount: number, units: string): void {
  const unitLabel = units === "celsius" ? "°C" : "°F";
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

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return new Date(year, month - 1, day).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

export function showDailyForecast(
  location: string,
  days: DailyForecast[],
  units: string
): void {
  console.log("");
  console.log(cyan(`  Pronóstico 7 días — ${location}`));
  console.log(`  ${"Fecha".padEnd(13)}${"Máx".padStart(8)}${"Mín".padStart(8)}${"Lluvia".padStart(9)}   Clima`);
  for (const day of days) {
    const max = convertTemp(day.tempMax, units);
    const min = convertTemp(day.tempMin, units);
    const rain = `${day.precipitationProbability}%`;
    const { emoji, label } = describeWeatherCode(day.weatherCode);
    console.log(
      `  ${formatDate(day.date).padEnd(13)}${yellow(max.padStart(8))}${yellow(min.padStart(8))}${rain.padStart(9)}   ${emoji} ${label}`
    );
  }
}

export function showDailyForecastError(city: string): void {
  console.log(red(`  ${city}: Error al obtener pronóstico`));
}

function convertTemp(celsius: number, units: string): string {
  if (units === "fahrenheit") {
    return `${((celsius * 9) / 5 + 32).toFixed(0)}°F`;
  }
  return `${celsius.toFixed(0)}°C`;
}
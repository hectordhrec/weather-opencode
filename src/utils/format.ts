import type { City } from "../types/City";
import type { Units } from "../types/Weather";

export function formatTemp(celsius: number, units: Units, decimals = 1): string {
  if (units === "fahrenheit") {
    return `${((celsius * 9) / 5 + 32).toFixed(decimals)}°F`;
  }
  return `${celsius.toFixed(decimals)}°C`;
}

export function formatLocation(city: City): string {
  const parts = [city.name];
  if (city.admin1) parts.push(city.admin1);
  if (city.country) parts.push(city.country);
  return parts.join(", ");
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

export function formatUnitLabel(units: Units): string {
  return units === "celsius" ? "°C" : "°F";
}

export function defaultMarker(city: City, defaultCity: string | null): string {
  return city.name === defaultCity ? " ★" : "";
}

import type { WeatherDescription } from "../types/Weather";

const UNKNOWN: WeatherDescription = { emoji: "❓", label: "Desconocido" };

export function describeWeatherCode(code: number): WeatherDescription {
  switch (code) {
    case 0:
      return { emoji: "☀️", label: "Despejado" };
    case 1:
      return { emoji: "🌤️", label: "Mayormente despejado" };
    case 2:
      return { emoji: "⛅", label: "Parcialmente nublado" };
    case 3:
      return { emoji: "☁️", label: "Nublado" };
    case 45:
    case 48:
      return { emoji: "🌫️", label: "Niebla" };
    case 51:
    case 53:
    case 55:
      return { emoji: "🌦️", label: "Llovizna" };
    case 56:
    case 57:
      return { emoji: "🌧️", label: "Llovizna helada" };
    case 61:
    case 63:
    case 65:
      return { emoji: "🌧️", label: "Lluvia" };
    case 66:
    case 67:
      return { emoji: "🌧️", label: "Lluvia helada" };
    case 71:
    case 73:
    case 75:
      return { emoji: "❄️", label: "Nieve" };
    case 77:
      return { emoji: "🌨️", label: "Granos de nieve" };
    case 80:
    case 81:
    case 82:
      return { emoji: "🌦️", label: "Chubascos" };
    case 85:
    case 86:
      return { emoji: "🌨️", label: "Chubascos de nieve" };
    case 95:
      return { emoji: "⛈️", label: "Tormenta" };
    case 96:
    case 99:
      return { emoji: "⛈️", label: "Tormenta con granizo" };
    default:
      return UNKNOWN;
  }
}
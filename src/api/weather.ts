import type { DailyForecast } from "../types/Weather";
import { FORECAST_API_URL, FORECAST_DAYS } from "../utils/constants";

interface CurrentResponse {
  current?: { temperature_2m?: number };
}

interface DailyResponse {
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<number | null> {
  const url =
    `${FORECAST_API_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as CurrentResponse;
    return data.current?.temperature_2m ?? null;
  } catch {
    return null;
  }
}

export async function getDailyForecast(
  latitude: number,
  longitude: number,
  days = FORECAST_DAYS
): Promise<DailyForecast[]> {
  const url =
    `${FORECAST_API_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto&forecast_days=${days}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as DailyResponse;
    const times = data.daily?.time;
    if (!times || times.length === 0) return [];
    const codes = data.daily?.weather_code;
    const maxes = data.daily?.temperature_2m_max;
    const mins = data.daily?.temperature_2m_min;
    const rains = data.daily?.precipitation_probability_max;
    return times.map((date, i) => ({
      date,
      weatherCode: codes?.[i] ?? 0,
      tempMax: maxes?.[i] ?? 0,
      tempMin: mins?.[i] ?? 0,
      precipitationProbability: rains?.[i] ?? 0,
    }));
  } catch {
    return [];
  }
}

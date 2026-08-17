import type { City } from "./types";

export async function geocode(city: string): Promise<City | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json() as { results?: Array<{ name: string; latitude: number; longitude: number }> };
    if (!data.results || data.results.length === 0) return null;
    const r = data.results[0]!;
    return { name: r.name, latitude: r.latitude, longitude: r.longitude };
  } catch {
    return null;
  }
}

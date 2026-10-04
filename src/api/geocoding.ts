import type { City } from "../types/City";
import { GEOCODING_API_URL, GEOCODING_COUNT } from "../utils/constants";

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export async function geocode(city: string): Promise<City[]> {
  const url =
    `${GEOCODING_API_URL}?name=${encodeURIComponent(city)}` +
    `&count=${GEOCODING_COUNT}&language=es&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { results?: GeocodingResult[] };
    if (!data.results || data.results.length === 0) return [];
    return data.results.map((r) => ({
      name: r.name,
      latitude: r.latitude,
      longitude: r.longitude,
      country: r.country,
      admin1: r.admin1,
    }));
  } catch {
    return [];
  }
}
